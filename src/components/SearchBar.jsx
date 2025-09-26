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
      <div className={style.searchGroup}>
        <svg className={style.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search products..."
          value={value}
          onChange={handleChange}
          className={style.input}
        />
        {value && (
          <button type="button" onClick={handleClear} className={style.clearButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="m15 9-6 6" strokeWidth="2" strokeLinecap="round"/>
              <path d="m9 9 6 6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;