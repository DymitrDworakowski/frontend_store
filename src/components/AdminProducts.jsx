import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminProducts, deleteItem } from "../api/admin";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import FormItems from "./FormItems";
import Pagination from "./Pagination";
import style from "./AdminProducts.module.css";
import Loader from "./Loader";

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

  // memoized handlers (declare unconditionally)
  const handleSearch = React.useCallback((term) => {
    setFilters((f) => ({ ...f, search: term, page: 1 }));
  }, []);

  const handleFilterChange = React.useCallback((newFilters) => {
    setFilters((f) => ({ ...f, ...newFilters, page: 1 }));
  }, []);

  const handlePageChange = React.useCallback((p) => {
    setFilters((f) => ({ ...f, page: p }));
  }, []);

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

  if (isLoading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Loader center />
      </div>
    );
  if (error)
    return <div style={{ color: "var(--danger)" }}>Error: {error.message}</div>;

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
      {/* memoized handlers to avoid child re-renders */}
      <SearchBar initialValue={filters.search} onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} autoApply={true} />

      {/* Add new product form */}
      <FormItems
        onSuccess={() => {
          queryClient.invalidateQueries(["adminProducts"]);
        }}
      />
      <h2 className={style.title}>Admin Products</h2>
      <ul className={style.productList}>
        {items.length === 0 && (
          <div className={style.emptyState}>No products found.</div>
        )}
        {items.map((product) => (
          <li key={product._id} className={style.productItem}>
            <div className={style.productTop}>
              <img
                src={product.imageUrl || "/logo192.png"}
                alt={product.title}
                className={style.productImage}
              />

              <div className={style.productBody}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <h3 className={style.productName}>{product.title}</h3>
                    <p className={style.description}>
                      {product.description || "No description"}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className={style.productPrice}>
                      {" "}
                      Price: {product.price}
                    </div>
                    <div className={style.productMeta}>
                      <span className={style.badge}>
                        {product.category || "—"}
                      </span>
                      <span style={{ color: "var(--muted)", fontSize: 12 }}>
                        Stock: {product.stock ?? "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={style.actions}>
              <button
                className={`${style.btn} ${style.editButton}`}
                onClick={() => handleStartEdit(product)}
              >
                Edit
              </button>
              <button
                className={`${style.btn} ${style.deleteButton}`}
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>

            {editingId === product._id && onOpen && (
              <div
                className={style.editFormModal}
                role="dialog"
                aria-modal="true"
              >
                <div className={style.modalContent}>
                  <div className={style.modalHeader}>
                    <h3 className={style.modalTitle}>Edit product</h3>
                    <button
                      aria-label="Close edit"
                      className={style.modalClose}
                      onClick={stopEditing}
                    >
                      &times;
                    </button>
                  </div>
                  <div className={style.modalBody}>
                    <FormItems
                      mode="edit"
                      itemId={editingId}
                      initialData={editingData}
                      onSuccess={() => {
                        queryClient.invalidateQueries(["adminProducts"]);
                        stopEditing();
                      }}
                    />
                  </div>
                  <div className={style.modalFooter}>
                    <button
                      className={`${style.btn} ${style.cancelButton}`}
                      onClick={stopEditing}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
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
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
export default AdminProducts;
