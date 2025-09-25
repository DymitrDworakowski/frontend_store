import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminProducts, deleteItem } from "../api/admin";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import FormItems from "./FormItems";
import Pagination from "./Pagination";

function AdminProducts() {
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = React.useState(null);
  const [editingData, setEditingData] = React.useState(null);

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
    console.log(productId)
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
  };

  const stopEditing = () => {
    setEditingId(null);
    setEditingData(null);
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
    <div>
      <h2>Admin Products</h2>

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

      <ul>
        {items.map((product) => (
          <li key={product._id} style={{ marginBottom: 12 }}>
            <div>
              <strong>{product.title}</strong> — {product.price}
              <button
                style={{ marginLeft: 8 }}
                onClick={() => handleStartEdit(product)}
              >
                Edit
              </button>
              <button
                style={{ marginLeft: 8 }}
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>

            {editingId === product._id && (
              <div
                style={{ marginTop: 8, padding: 8, border: "1px solid #eee" }}
              >
                <FormItems
                  mode="edit"
                  itemId={editingId}
                  initialData={editingData}
                  onSuccess={() => {
                    queryClient.invalidateQueries(["adminProducts"]);
                    stopEditing();
                  }}
                />
                <button onClick={stopEditing} style={{ marginTop: 8 }}>
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
