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
            <li><Link to="/" className="footer-link">About</Link></li>
            <li><Link to="/blog" className="footer-link">Services</Link></li>
            <li><Link to="/portfolio" className="footer-link">Portfolio</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-social">
          <ul className="social-links">
            <li><a href="https://x.com/SriHarsha_19" className="social-icon">Twitter</a></li>
            <li><a href="https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/" className="social-icon">LinkedIn</a></li>
            <li><a href="https://github.com/saisriharsha19" className="social-icon">GitHub</a></li>
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
