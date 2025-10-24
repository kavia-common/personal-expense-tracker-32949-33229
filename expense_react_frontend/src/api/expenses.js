import api from './client';

/**
 * Expenses API helpers.
 */

// PUBLIC_INTERFACE
export async function listExpenses(params = {}) {
  /** List expenses with optional filters {category_id, from, to, search}. */
  const { data } = await api.get('/expenses', { params });
  return data;
}

// PUBLIC_INTERFACE
export async function createExpense(payload) {
  /** Create a new expense {amount, description, date, category_id}. */
  const { data } = await api.post('/expenses', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function updateExpense(id, payload) {
  /** Update expense by id. */
  const { data } = await api.put(`/expenses/${id}`, payload);
  return data;
}

// PUBLIC_INTERFACE
export async function deleteExpense(id) {
  /** Delete expense by id. */
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
}
