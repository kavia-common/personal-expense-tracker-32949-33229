import axios from 'axios';

/**
 * Axios API client configured with baseURL and interceptors to attach JWT token.
 * Uses REACT_APP_API_BASE_URL from environment variables.
 */
const baseURL = process.env.REACT_APP_API_BASE_URL || '';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT if available
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('auth');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch {
      // ignore parse errors
    }
  }
  return config;
});

export default api;
