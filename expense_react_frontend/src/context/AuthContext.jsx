import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as AuthAPI from '../api/auth';

/**
 * Authentication context for JWT token and user state. Persists to localStorage.
 */
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication state to the component tree. */
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Load from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.token) {
          setToken(parsed.token);
          setUser(parsed.user || null);
        }
      } catch {
        // ignore
      }
    }
    setReady(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    const state = JSON.stringify({ token, user });
    localStorage.setItem('auth', state);
  }, [token, user]);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    /** Login using API and set token + user. */
    const data = await AuthAPI.login({ email, password });
    setToken(data?.access_token || data?.token);
    setUser(data?.user || null);
    return data;
  };

  // PUBLIC_INTERFACE
  const signup = async (name, email, password) => {
    /** Signup using API and set token + user. */
    const data = await AuthAPI.signup({ name, email, password });
    setToken(data?.access_token || data?.token);
    setUser(data?.user || { name, email });
    return data;
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    /** Clear auth state. */
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth');
  };

  // PUBLIC_INTERFACE
  const refreshProfile = async () => {
    /** Refresh user profile from backend. */
    try {
      const me = await AuthAPI.getProfile();
      setUser(me);
      return me;
    } catch {
      // on failure, likely token invalid
      logout();
      throw new Error('Unable to refresh profile');
    }
  };

  const value = useMemo(() => ({
    token,
    user,
    ready,
    login,
    signup,
    logout,
    refreshProfile,
  }), [token, user, ready]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access the auth context. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
