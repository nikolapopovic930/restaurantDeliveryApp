import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Moja dostava
        </Link>
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/about-us" className="nav-link" onClick={() => setIsOpen(false)}>
              O nama
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link" onClick={() => setIsOpen(false)}>
              Meni
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
              Prijava
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link" onClick={() => setIsOpen(false)}>
              Registracija
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
