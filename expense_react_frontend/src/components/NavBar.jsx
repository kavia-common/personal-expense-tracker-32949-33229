import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Top navigation bar displaying brand, navigation links, auth state and theme toggle.
 */
export default function NavBar({ onToggleTheme, theme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand link">
          <span className="logo retro-shadow" />
          <span>Expense Tracker</span>
        </Link>

        <div className="nav-links">
          {user && (
            <>
              <NavLink to="/dashboard" className={({isActive}) => `link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
              <NavLink to="/categories" className={({isActive}) => `link ${isActive ? 'active' : ''}`}>Categories</NavLink>
            </>
          )}
        </div>

        <div className="nav-links">
          <button className="btn secondary" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {!user ? (
            <>
              <NavLink to="/login" className="link">Login</NavLink>
              <NavLink to="/signup" className="link">Sign Up</NavLink>
            </>
          ) : (
            <>
              <span className="badge mono">{user?.name || user?.email}</span>
              <button className="btn danger" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
