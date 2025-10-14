import { useState, useEffect } from "react";
import style from "./SearchBar.module.css";
import { ReactComponent as SearchIcon } from "../assets/svg/search.svg";
import { ReactComponent as ClearIcon } from "../assets/svg/clear.svg";

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
        <SearchIcon className={style.searchIcon} width={18} height={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={value}
          onChange={handleChange}
          className={style.input}
        />
        {value && (
          <button type="button" onClick={handleClear} className={style.clearButton}>
            <ClearIcon width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;