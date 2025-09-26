import ProductsList from "../components/ProductsList";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

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

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} />
      <ProductsList
        filters={filters}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Products;