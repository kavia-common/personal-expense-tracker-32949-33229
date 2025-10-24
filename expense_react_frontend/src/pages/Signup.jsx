import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Signup page to create a new account.
 */
export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.detail || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2 className="mb-3 mono">Create an account</h2>
      <form onSubmit={handleSubmit} className="card">
        {error && <div className="badge" style={{ background: 'rgba(239,68,68,.12)', color: '#991b1b' }}>{error}</div>}
        <div className="mt-3">
          <label className="text-muted">Name</label>
          <input className="input" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mt-3">
          <label className="text-muted">Email</label>
          <input className="input" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mt-3">
          <label className="text-muted">Password</label>
          <input className="input" name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mt-4">
          <button className="btn" type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Sign Up'}</button>
        </div>
        <div className="mt-3">
          <span className="text-muted">Already have an account? </span>
          <Link to="/login" className="link">Login</Link>
        </div>
      </form>
    </div>
  );
}
