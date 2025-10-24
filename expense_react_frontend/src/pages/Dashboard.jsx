import React, { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import CategoryFilter from '../components/CategoryFilter';
import { createExpense, deleteExpense, listExpenses, updateExpense } from '../api/expenses';

/**
 * Dashboard page: list expenses, filter by category, and quick add.
 */
export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await listExpenses(filterCategory ? { category_id: filterCategory } : {});
      setExpenses(Array.isArray(data) ? data : data?.items || []);
    } catch {
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategory]);

  const handleCreateOrUpdate = async (payload) => {
    setSaving(true);
    try {
      if (editing) {
        await updateExpense(editing.id, payload);
        setEditing(null);
      } else {
        await createExpense(payload);
      }
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    await refresh();
  };

  return (
    <div className="container">
      <div className="grid cols-2">
        <div>
          <h2 className="mono">{editing ? 'Edit Expense' : 'Quick Add Expense'}</h2>
          <ExpenseForm initial={editing} onSubmit={handleCreateOrUpdate} submitting={saving} />
        </div>
        <div>
          <div className="card">
            <h3 className="mono">Filters</h3>
            <div className="mt-3">
              <label className="text-muted">Category</label>
              <CategoryFilter value={filterCategory} onChange={setFilterCategory} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? <div className="card">Loading...</div> : (
              <ExpenseList items={expenses} onEdit={setEditing} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
