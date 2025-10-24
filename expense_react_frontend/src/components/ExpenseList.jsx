import React from 'react';

/**
 * Renders expense rows with total amount and actions.
 */
export default function ExpenseList({ items = [], onEdit, onDelete }) {
  const total = items.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  return (
    <div className="card">
      <div className="grid cols-2">
        <h3 className="mono">Expenses</h3>
        <div className="text-right total">Total: ${total.toFixed(2)}</div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th className="mono">Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="5" className="text-muted">No expenses yet.</td>
            </tr>
          )}
          {items.map(e => (
            <tr key={e.id}>
              <td>{(e.date || '').slice(0,10)}</td>
              <td className="mono">${Number(e.amount || 0).toFixed(2)}</td>
              <td>{e.description}</td>
              <td><span className="badge">{e.category_name || e.category?.name || '—'}</span></td>
              <td className="text-right">
                <button className="btn secondary" onClick={() => onEdit?.(e)}>Edit</button>{' '}
                <button className="btn danger" onClick={() => onDelete?.(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
