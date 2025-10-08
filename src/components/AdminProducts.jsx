import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminProducts, deleteItem } from "../api/admin";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import FormItems from "./FormItems";
import Pagination from "./Pagination";
import style from "./AdminProducts.module.css";
import Loader from "./Loader";
import noImg from "../assets/images/brak-zdjecia_1030x578.jpg";

function AdminProducts() {
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = React.useState(null);
  const [editingData, setEditingData] = React.useState(null);
  const [onOpen, setOnOpen] = React.useState(false);

  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "createdAt:desc",
  });

  const handleSearch = React.useCallback((term) => {
    setFilters((f) => ({ ...f, search: term, page: 1 }));
  }, []);

  const handleFilterChange = React.useCallback((newFilters) => {
    setFilters((f) => ({ ...f, ...newFilters, page: 1 }));
  }, []);

  const handlePageChange = React.useCallback((p) => {
    setFilters((f) => ({ ...f, page: p }));
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["adminProducts", filters],
    queryFn: () => getAdminProducts(filters),
    keepPreviousData: true,
  });

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
      <div className={style.loaderContainer}>
        <Loader center />
      </div>
    );

  if (error) return <div className={style.error}>Error: {error.message}</div>;

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate({
        token: localStorage.getItem("token"),
        itemId: productId,
      });
    }
  };

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
    setOnOpen(false);
  };

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
      <div>
        <FormItems
          onSuccess={() => {
            queryClient.invalidateQueries(["adminProducts"]);
          }}
        />
        <div className={style.stats}>
          Total products: {data?.total ?? data?.count ?? items.length}
        </div>
      </div>
      <div className={style.header}>
        <h1 className={style.title}>Product Management</h1>
        <div className={style.controls}>
          <SearchBar initialValue={filters.search} onSearch={handleSearch} />
          <FilterPanel onFilterChange={handleFilterChange} autoApply={true} />
        </div>
      </div>
      <div className={style.productsGrid}>
        {items.length === 0 ? (
          <div className={style.emptyState}>No products found</div>
        ) : (
          items.map((product) => (
            <div key={product._id} className={style.productCard}>
              <div className={style.cardHeader}>
                <img
                  src={product.image || noImg}
                  alt={product.title}
                  className={style.productImage}
                />
                <div className={style.productInfo}>
                  <h3 className={style.productName}>{product.title}</h3>
                  <div className={style.price}>${product.price}</div>
                </div>
              </div>

              <div className={style.cardBody}>
                <p className={style.description}>
                  {product.description || "No description available"}
                </p>
                <div className={style.meta}>
                  <span className={style.category}>
                    {product.category || "—"}
                  </span>
                  <span className={style.stock}>
                    Stock: {product.stock ?? "0"}
                  </span>
                </div>
              </div>

              <div className={style.cardActions}>
                <button
                  className={style.editBtn}
                  onClick={() => handleStartEdit(product)}
                >
                  Edit
                </button>
                <button
                  className={style.deleteBtn}
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>

              {editingId === product._id && onOpen && (
                <div className={style.modalOverlay}>
                  <div className={style.modal}>
                    <div className={style.modalHeader}>
                      <h2>Edit Product</h2>
                      <button className={style.closeBtn} onClick={stopEditing}>
                        ×
                      </button>
                    </div>
                    <div className={style.modalContent}>
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
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className={style.paginationContainer}>
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
