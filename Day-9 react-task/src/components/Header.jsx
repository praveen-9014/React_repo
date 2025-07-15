import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Employee Management System</h1>
      <div className="header-links">
        <Link to="/login" className="header-link">Login</Link>
        <Link to="/register" className="header-link register-link">Register</Link>
      </div>
    </header>
  );
};

export default Header;
