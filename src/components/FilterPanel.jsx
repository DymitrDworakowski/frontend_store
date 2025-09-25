import { useState, useEffect } from "react";

/*
Props:
  onFilterChange(updatedPartialFilters: object)

Internal controlled fields:
  category, minPrice, maxPrice, sort, limit
( page is controlled in parent when filters change )
*/

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest" },
  { value: "createdAt:asc", label: "Oldest" },
  { value: "price:asc", label: "Price Low → High" },
  { value: "price:desc", label: "Price High → Low" },
];

const LIMIT_OPTIONS = [10, 20, 50];

function FilterPanel({ onFilterChange }) {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [limit, setLimit] = useState(10);

  // Debounce / immediate sync (simple immediate approach here)
  useEffect(() => {
    onFilterChange?.({ category, minPrice, maxPrice, sort, limit });
  }, [category, minPrice, maxPrice, sort, limit, onFilterChange]);

  const handleReset = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("createdAt:desc");
    setLimit(10);
    onFilterChange?.({
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "createdAt:desc",
      limit: 10,
    });
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "0.75rem",
        marginBottom: "1rem",
        borderRadius: "4px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Filters</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "140px",
          }}
        >
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            placeholder="e.g. electronics"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "100px",
          }}
        >
          <label htmlFor="minPrice">Min Price</label>
          <input
            id="minPrice"
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "100px",
          }}
        >
          <label htmlFor="maxPrice">Max Price</label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "160px",
          }}
        >
          <label htmlFor="sort">Sort</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "100px",
          }}
        >
          <label htmlFor="limit">Limit</label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {LIMIT_OPTIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginTop: "0.75rem" }}>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;
