import { useState, useEffect } from "react";
import style from "./SearchBar.module.css";

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
    <div className={style.container}>
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={handleChange}
        className={style.input}
      />
      {value && (
        <button type="button" onClick={handleClear} className={style.clearButton}>
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
