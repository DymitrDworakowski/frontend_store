import { useState } from 'react';

// Props: onSearch(term: string)
function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={handleChange}
        style={{ flex: 1, padding: '0.5rem' }}
      />
      <button type="submit">Search</button>
      {value && (
        <button type="button" onClick={handleClear}>Clear</button>
      )}
    </form>
  );
}

export default SearchBar;
