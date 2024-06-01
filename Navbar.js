import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this path is correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/book-train">Book Train</Link>
    </nav>
  );
};

export default Navbar;
