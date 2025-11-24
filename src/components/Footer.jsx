// src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTwitter, FiLinkedin, FiGithub, FiHeart, FiArrowUp } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      icon: <FiTwitter />, 
      url: "https://x.com/SriHarsha_19", 
      label: "Twitter",
      color: "#1DA1F2"
    },
    { 
      icon: <FiLinkedin />, 
      url: "https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/", 
      label: "LinkedIn",
      color: "#0A66C2"
    },
    { 
      icon: <FiGithub />, 
      url: "https://github.com/saisriharsha19", 
      label: "GitHub",
      color: "#333"
    }
  ];

  const footerLinks = [
    { to: "/", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <footer className="footer">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="footer-container">
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="footer-logo"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 10px rgba(102, 126, 234, 0.5)",
                  "0 0 20px rgba(118, 75, 162, 0.5)",
                  "0 0 10px rgba(102, 126, 234, 0.5)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              #SaiSriHarsha
            </motion.span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="logo-sparkle"
            >
              <HiSparkles />
            </motion.div>
          </motion.div>
          <motion.p
            className="footer-tagline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Building the future, one line at a time
          </motion.p>
        </motion.div>

        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="footer-section-title">Quick Links</h3>
          <ul className="footer-nav">
            {footerLinks.map((link, index) => (
              <motion.li
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={link.to} className="footer-link">
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="footer-social"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="footer-section-title">Connect With Me</h3>
          <ul className="social-links">
            {socialLinks.map((social, index) => (
              <motion.li
                key={social.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <motion.a
                  href={social.url}
                  className="social-icon"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {social.icon}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <motion.div className="footer-divider" />
        <p>
          Made with <motion.span
            animate={{ 
              scale: [1, 1.3, 1],
              color: ["#ef4444", "#ec4899", "#ef4444"]
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ display: "inline-block" }}
          >
            <FiHeart style={{ fill: "currentColor" }} />
          </motion.span> by Sai Sri Harsha Guddati © 2025
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
