import React, { useEffect, useState } from 'react';
import { createCategory, deleteCategory, listCategories, updateCategory } from '../api/categories';

/**
 * Categories management page for CRUD operations.
 */
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await listCategories();
      setCategories(Array.isArray(data) ? data : data?.items || []);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editing) {
      await updateCategory(editing.id, { name });
      setEditing(null);
    } else {
      await createCategory({ name });
    }
    setName('');
    await refresh();
  };

  const handleEdit = (c) => {
    setEditing(c);
    setName(c.name);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    await refresh();
  };

  return (
    <div className="container" style={{ maxWidth: 700 }}>
      <h2 className="mono">Categories</h2>

      <form onSubmit={handleSubmit} className="card">
        <div className="grid cols-2">
          <div>
            <label className="text-muted">Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Food" />
          </div>
          <div className="mt-4" style={{ alignSelf: 'end' }}>
            <button className="btn" type="submit">{editing ? 'Update' : 'Add Category'}</button>{' '}
            {editing && <button type="button" className="btn secondary" onClick={() => { setEditing(null); setName(''); }}>Cancel</button>}
          </div>
        </div>
      </form>

      <div className="card mt-4">
        <h3 className="mono">Your Categories</h3>
        {loading ? (
          <div className="mt-3 text-muted">Loading...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-muted">No categories yet.</td>
                </tr>
              )}
              {categories.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td className="text-right">
                    <button className="btn secondary" onClick={() => handleEdit(c)}>Edit</button>{' '}
                    <button className="btn danger" onClick={() => handleDelete(c.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
