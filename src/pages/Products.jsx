import ProductsList from "../components/ProductsList";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/goods";
import Loader from "../components/Loader";

const { useState, useCallback } = require("react");

function Products() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: "",
    sort: "createdAt:desc",
  });

  const handleSearch = useCallback((val) => {
    setFilters((f) => ({ ...f, search: val, page: 1 }));
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((f) => ({ ...f, ...newFilters, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters((f) => ({ ...f, page }));
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    keepPreviousData: true,
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p>Error: {error instanceof Error ? error.message : String(error)}</p>
    );

  // defensive data shape handling
  const items = Array.isArray(data?.products) ? data.products : [];
  const serverPage = Number(data?.currentPage || data?.page || 0) || 0;
  const clientPage = Number(filters?.page || 0) || 0;
  const pageToShow = clientPage || serverPage || 1;
  const totalPages =
    Number(
      data?.totalPages ||
        data?.pages ||
        Math.ceil((data?.total || items.length) / (filters?.limit || 1))
    ) || 1;

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} />
      <ProductsList
        pageToShow={pageToShow}
        totalPages={totalPages}
        items={items}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Products;
