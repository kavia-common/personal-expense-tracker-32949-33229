import api from './client';

/**
 * Categories API helpers.
 */

// PUBLIC_INTERFACE
export async function listCategories() {
  /** List categories. */
  const { data } = await api.get('/categories');
  return data;
}

// PUBLIC_INTERFACE
export async function createCategory(payload) {
  /** Create a category {name}. */
  const { data } = await api.post('/categories', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function updateCategory(id, payload) {
  /** Update a category name. */
  const { data } = await api.put(`/categories/${id}`, payload);
  return data;
}

// PUBLIC_INTERFACE
export async function deleteCategory(id) {
  /** Delete a category by id. */
  const { data } = await api.delete(`/categories/${id}`);
  return data;
}
