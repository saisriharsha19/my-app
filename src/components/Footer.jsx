import React from "react";
import "../App.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">MyBrand</span>
        </div>
        <div className="footer-links">
          <ul className="footer-nav">
            <li><a href="#about" className="footer-link">About</a></li>
            <li><a href="#services" className="footer-link">Services</a></li>
            <li><a href="#portfolio" className="footer-link">Portfolio</a></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-social">
          <ul className="social-links">
            <li><a href="#" className="social-icon">🐦</a></li>
            <li><a href="#" className="social-icon">📘</a></li>
            <li><a href="#" className="social-icon">📸</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MyBrand. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
