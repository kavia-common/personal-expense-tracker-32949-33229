import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Login page for users to authenticate.
 */
export default function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.detail || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2 className="mb-3 mono">Welcome back</h2>
      <form onSubmit={handleSubmit} className="card">
        {error && <div className="badge" style={{ background: 'rgba(239,68,68,.12)', color: '#991b1b' }}>{error}</div>}
        <div className="mt-3">
          <label className="text-muted">Email</label>
          <input className="input" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mt-3">
          <label className="text-muted">Password</label>
          <input className="input" name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mt-4">
          <button className="btn" type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Login'}</button>
        </div>
        <div className="mt-3">
          <span className="text-muted">No account? </span>
          <Link to="/signup" className="link">Create one</Link>
        </div>
      </form>
    </div>
  );
}
