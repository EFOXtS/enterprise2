import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const NavBar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <img src="/icons/favicon.ico" alt="Mamta Enterprises" className="logo-img" />
      <span>Mamta Enterprises</span>
    </div>
    <div className="navbar-links">
      <Link to="/">Home</Link>
      <Link to="/admin">Admin</Link>
    </div>
  </nav>
);

export default NavBar;

