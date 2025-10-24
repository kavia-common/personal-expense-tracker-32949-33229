import React, { useEffect, useState } from 'react';
import { listCategories } from '../api/categories';

/**
 * Form to create or update an expense.
 */
export default function ExpenseForm({ initial = null, onSubmit, submitting }) {
  const [form, setForm] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().slice(0,10),
    category_id: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (initial) {
      setForm({
        amount: initial.amount ?? '',
        description: initial.description ?? '',
        date: initial.date ? initial.date.slice(0,10) : new Date().toISOString().slice(0,10),
        category_id: initial.category_id ?? ''
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: parseFloat(form.amount)
    };
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="grid cols-2">
        <div>
          <label className="text-muted">Amount</label>
          <input className="input" name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} required />
        </div>
        <div>
          <label className="text-muted">Date</label>
          <input className="input" name="date" type="date" value={form.date} onChange={handleChange} required />
        </div>
      </div>

      <div className="mt-3">
        <label className="text-muted">Category</label>
        <select className="select" name="category_id" value={form.category_id} onChange={handleChange} required>
          <option value="" disabled>Select category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label className="text-muted">Description</label>
        <input className="input" name="description" value={form.description} onChange={handleChange} placeholder="e.g., Coffee with client" />
      </div>

      <div className="mt-4">
        <button className="btn" type="submit" disabled={submitting}>{submitting ? 'Saving...' : (initial ? 'Update Expense' : 'Add Expense')}</button>
      </div>
    </form>
  );
}
