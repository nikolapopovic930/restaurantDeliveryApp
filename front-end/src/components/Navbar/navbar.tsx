import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

const logout = () => {
  setUser(null);
  setIsOpen(false);
  navigate("/"); // preusmerenje na home
};

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
            <Link to="/my-cart" className="nav-link cart-icon" onClick={() => setIsOpen(false)}>
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item user-name">
                <span>Pozdrav, {user.firstName}</span>
              </li>
              <li className="nav-item">
                <button className="nav-button" onClick={logout}>
                  Odjava
                </button>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
