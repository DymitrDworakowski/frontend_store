import { useState, useEffect, useRef } from 'react';

/* Props:
   onSearch(term: string) -> void
   debounceMs = number (default 400)
   initialValue = string
   submitMode = 'debounced' | 'instant' | 'manual' (default 'debounced')
*/
function SearchBar({ onSearch, debounceMs = 400, initialValue = '', submitMode = 'debounced' }) {
  const [value, setValue] = useState(initialValue);
  const timerRef = useRef(null);
  const lastSubmitted = useRef(initialValue);

  // Debounced/instant effect
  useEffect(() => {
    if (submitMode === 'manual') return; // only submit on explicit form submit
    if (submitMode === 'instant') {
      onSearch?.(value.trim());
      lastSubmitted.current = value.trim();
      return;
    }
    // debounced
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const term = value.trim();
      if (term !== lastSubmitted.current) {
        onSearch?.(term);
        lastSubmitted.current = term;
      }
    }, debounceMs);
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [value, debounceMs, onSearch, submitMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = value.trim();
    if (term !== lastSubmitted.current) {
      onSearch?.(term);
      lastSubmitted.current = term;
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    if (submitMode !== 'manual') {
      onSearch?.('');
      lastSubmitted.current = '';
    }
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
      {submitMode === 'manual' && <button type="submit">Search</button>}
      {value && (
        <button type="button" onClick={handleClear}>Clear</button>
      )}
    </form>
  );
}

export default SearchBar;
