import ProductsList from "../components/ProductsList";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

const { useState } = require("react");

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

  return (
    <>
      <SearchBar onSearch={(val) => setFilters(f => ({ ...f, search: val, page: 1 }))} />
      <FilterPanel onFilterChange={(newFilters) => setFilters(f => ({ ...f, ...newFilters, page: 1 }))} />
      <ProductsList
        filters={filters}
        onPageChange={(page) => setFilters(f => ({ ...f, page }))}
      />
    </>
  );
}

export default Products;