import api from './client';

/**
 * Authentication API helpers.
 */

// PUBLIC_INTERFACE
export async function login(payload) {
  /** Perform login with {email, password} and return token + user. */
  const { data } = await api.post('/auth/login', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function signup(payload) {
  /** Perform signup with {email, password, name} and return token + user. */
  const { data } = await api.post('/auth/signup', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function getProfile() {
  /** Fetch the authenticated user profile. */
  const { data } = await api.get('/auth/me');
  return data;
}
