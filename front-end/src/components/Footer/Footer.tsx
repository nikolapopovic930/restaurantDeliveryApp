import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
            &copy; 2025 Sva prava zadržana.
        </div>
        <div className="footer-contact">
          <p>Adresa: Bulevar Oslobođenja 123, Novi Sad</p>
          <p>Telefon: +381 63 123 4567</p>
          <p>Email: info@mojadostava.rs</p>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="mailto:info@mojadostava.rs" aria-label="Email" className="social-icon">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
