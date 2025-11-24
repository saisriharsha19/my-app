// src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTwitter, FiLinkedin, FiGithub, FiHeart, FiArrowUp, FiMail, FiMapPin, FiCoffee } from "react-icons/fi";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [coffeeCount, setCoffeeCount] = useState(0);

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

  const handleCoffeeClick = () => {
    setCoffeeCount(prev => prev + 1);
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
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/portfolio", label: "Projects" },
    { to: "/experience", label: "Experience" },
    { to: "/contact", label: "Contact" }
  ];

  const quickInfo = [
    { icon: <FiMail />, text: "saisriharshaguddati1@gmail.com", href: "mailto:saisriharshaguddati1@gmail.com" },
    { icon: <FiMapPin />, text: "Gainesville, FL", href: null }
  ];

  return (
    <footer className="footer-pro">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-to-top-pro"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Footer Content */}
      <div className="footer-content-pro">
        <div className="footer-grid-pro">
          {/* Brand Section */}
          <motion.div
            className="footer-section-pro brand-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="footer-brand-pro">
              <motion.span
                className="brand-name"
                whileHover={{ scale: 1.05 }}
              >
                Sai Sri Harsha
              </motion.span>
            </Link>
            
            <p className="brand-tagline">
              Software Engineer & AI Enthusiast
            </p>

            <p className="brand-description">
              Crafting innovative solutions at the intersection of AI and software engineering. 
              Passionate about building scalable systems and turning ideas into reality.
            </p>

            {/* Quick Info */}
            <div className="quick-info">
              {quickInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="info-item"
                  whileHover={{ x: 5 }}
                >
                  <span className="info-icon">{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} className="info-text">{item.text}</a>
                  ) : (
                    <span className="info-text">{item.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-section-pro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="section-title-pro">Quick Links</h3>
            <ul className="footer-links-pro">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={link.to} className="footer-link-pro">
                    <motion.span whileHover={{ x: 5 }}>
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Connect */}
          <motion.div
            className="footer-section-pro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="section-title-pro">Let's Connect</h3>
            <p className="connect-text">
              Always open to interesting conversations and collaboration opportunities.
            </p>
            
            <div className="social-links-pro">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  className="social-link-pro"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: social.color,
                    color: "#ffffff"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Quirky Coffee Counter */}
            <motion.div className="coffee-section">
              <motion.button
                onClick={handleCoffeeClick}
                className="coffee-btn"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiCoffee />
              </motion.button>
              <AnimatePresence>
                {coffeeCount > 0 && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="coffee-count"
                  >
                    {coffeeCount} {coffeeCount === 1 ? 'coffee' : 'coffees'} ☕
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="footer-bottom-pro"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="footer-bottom-content">
          <p className="copyright">
            © {new Date().getFullYear()} Sai Sri Harsha Guddati. All rights reserved.
          </p>
          
          <motion.p className="made-with">
            Crafted with{" "}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="heart-icon"
            >
              <FiHeart style={{ fill: "currentColor", color: "#ef4444" }} />
            </motion.span>
            {" "}and lots of{" "}
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              style={{ display: "inline-block" }}
            >
              ☕
            </motion.span>
          </motion.p>

          <p className="fun-fact">
            {["💻 Code. Coffee. Repeat.", "🚀 Turning coffee into code", "✨ Making the web awesome"][Math.floor(Date.now() / 10000) % 3]}
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
