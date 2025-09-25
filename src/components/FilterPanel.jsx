import { useState, useEffect, useRef, useMemo } from "react";

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

function FilterPanel({ onFilterChange, debounceMs = 400, autoApply = true, storageKey = 'productFilters' }) {
  const initial = useRef(null);
  if (initial.current === null) {
    try {
      const stored = localStorage.getItem(storageKey);
      initial.current = stored ? JSON.parse(stored) : {};
    } catch { initial.current = {}; }
  }

  const [category, setCategory] = useState(initial.current.category || "");
  const [minPrice, setMinPrice] = useState(initial.current.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initial.current.maxPrice || "");
  const [sort, setSort] = useState(initial.current.sort || "createdAt:desc");
  const [limit, setLimit] = useState(initial.current.limit || 10);
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  const currentFilters = useMemo(() => ({ category, minPrice, maxPrice, sort, limit }), [category, minPrice, maxPrice, sort, limit]);

  // Persist to localStorage whenever filters change
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(currentFilters)); } catch {}
  }, [currentFilters, storageKey]);

  // Validation
  useEffect(() => {
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setError('Min price cannot exceed max price');
    } else {
      setError('');
    }
  }, [minPrice, maxPrice]);

  // Debounced auto apply
  useEffect(() => {
    if (!autoApply) return; // manual apply mode
    if (error) return; // don't emit while invalid
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onFilterChange?.(currentFilters);
    }, debounceMs);
    return () => timerRef.current && clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, minPrice, maxPrice, sort, limit, error, autoApply, debounceMs]);

  const handleApply = () => {
    if (error) return;
    onFilterChange?.(currentFilters);
  };

  const handleReset = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("createdAt:desc");
    setLimit(10);
    setError("");
    onFilterChange?.({ category: "", minPrice: "", maxPrice: "", sort: "createdAt:desc", limit: 10 });
    try { localStorage.removeItem(storageKey); } catch {}
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
  {!autoApply && <small style={{ display: 'block', marginBottom: '0.5rem' }}>Manual mode: click Apply to update list</small>}
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
        {error && <span style={{ color: 'red', marginRight: '1rem' }}>{error}</span>}
        <button type="button" onClick={handleReset} style={{ marginRight: '0.5rem' }}>Reset</button>
        {!autoApply && <button type="button" disabled={!!error} onClick={handleApply}>Apply</button>}
      </div>
    </div>
  );
}

export default FilterPanel;
