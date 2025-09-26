import { useState, useEffect } from "react";

function SearchBar({ onSearch, debounceMs = 400, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch?.(value.trim());
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [value, debounceMs, onSearch]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={handleChange}
        style={{ flex: 1, padding: "0.5rem" }}
      />
      {value && (
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
