// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';  // You can replace this with a custom icon if needed.

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Brand with Icon */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-bicycle me-2" style={{ fontSize: '1.5rem' }}></i> {/* Bootstrap icon for bicycle */}
          Boda-Boda Savings
        </Link>

        {/* Navbar Toggler for Mobile View */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">SignUp</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
