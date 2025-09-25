import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminProducts, deleteItem } from "../api/admin";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import FormItems from "./FormItems";
import Pagination from "./Pagination";
import style from "./AdminProducts.module.css";

function AdminProducts() {
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = React.useState(null);
  const [editingData, setEditingData] = React.useState(null);
  const [onOpen, setOnOpen] = React.useState(false);

  // Filters (kept local to admin panel)
  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "createdAt:desc",
  });

  // Fetch admin products with filters
  const { data, error, isLoading } = useQuery({
    queryKey: ["adminProducts", filters],
    queryFn: () => getAdminProducts(filters),
    keepPreviousData: true,
  });

  // Mutation for deleting an item
  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      alert("Item deleted successfully");
      queryClient.invalidateQueries(["adminProducts"]);
    },
    onError: (error) => {
      alert(`Delete failed: ${error.message}`);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Handle delete action
  const handleDelete = (productId) => {
    deleteMutation.mutate({
      token: localStorage.getItem("token"),
      itemId: productId,
    });
  };

  // Start editing an item
  const handleStartEdit = (product) => {
    setEditingId(product._id);
    setEditingData({
      title: product.title,
      price: product.price,
      stock: product.stock,
      category: product.category,
      barcode: product.barcode,
      description: product.description,
      imageUrl: product.imageUrl,
    });
    setOnOpen(true);
  };

  const stopEditing = () => {
    setEditingId(null);
    setEditingData(null);
    setOnOpen(false); // Ensure modal closes
  };

  // Support different shapes: { products: [...] } or array
  const items = Array.isArray(data?.products)
    ? data.products
    : Array.isArray(data)
    ? data
    : [];

  const fallbackPages = Math.ceil(
    (data?.total ?? items.length) / (filters.limit || 1)
  );
  const totalPages = (data?.totalPages ?? data?.pages ?? fallbackPages) || 1;

  return (
    <div className={style.container}>
      {/* Search + Filters */}
      <SearchBar
        initialValue={filters.search}
        onSearch={(term) =>
          setFilters((f) => ({ ...f, search: term, page: 1 }))
        }
      />
      <FilterPanel
        onFilterChange={(newFilters) =>
          setFilters((f) => ({ ...f, ...newFilters, page: 1 }))
        }
        autoApply={true}
      />

      {/* Add new product form */}
      <FormItems
        onSuccess={() => {
          queryClient.invalidateQueries(["adminProducts"]);
        }}
      />
      <h2 className={style.title}>Admin Products</h2>
      <ul className={style.productList}>
        {items.map((product) => (
          <li key={product._id} className={style.productItem}>
            <div className={style.productInfo}>
              <strong className={style.productName}>{product.title}</strong> —{" "}
              {product.price}
              <button
                className={style.editButton}
                onClick={() => handleStartEdit(product)}
              >
                Edit
              </button>
              <button
                className={style.deleteButton}
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>

            {editingId === product._id && onOpen && (
              <div className={style.editFormModal}>
                <FormItems
                  mode="edit"
                  itemId={editingId}
                  initialData={editingData}
                  onSuccess={() => {
                    queryClient.invalidateQueries(["adminProducts"]);
                    stopEditing();
                  }}
                />
                <button className={style.cancelButton} onClick={stopEditing}>
                  Cancel
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <div>Total products: {data?.total ?? data?.count ?? items.length}</div>
        <Pagination
          page={filters.page}
          totalPages={totalPages}
          onChange={(p) => setFilters((f) => ({ ...f, page: p }))}
        />
      </div>
    </div>
  );
}
export default AdminProducts;

