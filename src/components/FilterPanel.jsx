import { useState } from "react";

function SimpleFilterPanel({ onFilterChange }) {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [limit, setLimit] = useState(10);

  const handleApply = () => {
    onFilterChange({
      category,
      minPrice,
      maxPrice,
      sort,
      limit,
    });
  };

  const handleReset = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("createdAt:desc");
    setLimit(10);

    onFilterChange({
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "createdAt:desc",
      limit: 10,
    });
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
      <h3>Filters</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="createdAt:desc">Newest</option>
          <option value="createdAt:asc">Oldest</option>
          <option value="price:asc">Price Low → High</option>
          <option value="price:desc">Price High → Low</option>
        </select>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <div>
          <button onClick={handleApply}>Apply</button>
          <button onClick={handleReset} style={{ marginLeft: "0.5rem" }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimpleFilterPanel;