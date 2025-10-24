import React, { useEffect, useState } from 'react';
import { listCategories } from '../api/categories';

/**
 * Category filter dropdown.
 */
export default function CategoryFilter({ value, onChange, allowAll = true }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  return (
    <div>
      <select className="select" value={value} onChange={(e) => onChange?.(e.target.value)}>
        {allowAll && <option value="">All categories</option>}
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>
  );
}
