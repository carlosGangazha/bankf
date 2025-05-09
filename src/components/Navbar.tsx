import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Miller Commercial Bank</div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/accounts" className="navbar-link">
            Accounts
          </Link>
          <Link to="/transactions" className="navbar-link">
            Transactions
          </Link>
          <Link to="/settings" className="navbar-link">
            Settings
          </Link>
          <button onClick={handleLogout} className="navbar-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;