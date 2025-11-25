// src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTwitter, FiLinkedin, FiGithub, FiHeart, FiArrowUp, FiMail, FiMapPin, FiCoffee } from "react-icons/fi";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [coffeeCount, setCoffeeCount] = useState(0);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
    
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      setIsDark(newTheme === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FiTwitter />, url: "https://x.com/SriHarsha_19", label: "Twitter", color: "#1DA1F2" },
    { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/", label: "LinkedIn", color: "#0A66C2" },
    { icon: <FiGithub />, url: "https://github.com/saisriharsha19", label: "GitHub", color: "#333" }
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

  const styles = {
    footer: {
      position: 'relative',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#e2e8f0',
      marginTop: '6rem',
      overflow: 'hidden'
    },
    topBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent)'
    },
    scrollToTop: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
      zIndex: 998
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '4rem 2rem 2rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '4rem',
      marginBottom: '3rem'
    },
    brandSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    brandLink: {
      textDecoration: 'none'
    },
    brandName: {
      fontSize: '1.8rem',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'inline-block'
    },
    tagline: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#94a3b8',
      margin: 0
    },
    description: {
      fontSize: '0.95rem',
      lineHeight: 1.7,
      color: '#cbd5e1',
      maxWidth: '400px',
      margin: 0
    },
    quickInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginTop: '1rem'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#cbd5e1',
      fontSize: '0.9rem'
    },
    infoIcon: {
      color: '#667eea',
      fontSize: '1.1rem',
      flexShrink: 0
    },
    infoLink: {
      color: '#cbd5e1',
      textDecoration: 'none',
      transition: 'color 0.2s ease'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: '#f1f5f9',
      marginBottom: '1.5rem',
      position: 'relative',
      paddingBottom: '0.75rem'
    },
    titleUnderline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '40px',
      height: '3px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      borderRadius: '2px'
    },
    linksList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    footerLink: {
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '0.95rem',
      transition: 'all 0.2s ease',
      display: 'inline-block'
    },
    connectText: {
      fontSize: '0.9rem',
      color: '#cbd5e1',
      lineHeight: 1.6,
      marginBottom: '1.5rem'
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem'
    },
    socialLink: (color) => ({
      width: '44px',
      height: '44px',
      borderRadius: '10px',
      background: 'rgba(102, 126, 234, 0.1)',
      border: '1px solid rgba(102, 126, 234, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '1.2rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }),
    coffeeSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '1rem',
      padding: '1rem',
      background: 'rgba(102, 126, 234, 0.05)',
      borderRadius: '12px',
      border: '1px dashed rgba(102, 126, 234, 0.2)'
    },
    coffeeBtn: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      border: 'none',
      color: 'white',
      fontSize: '1.2rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    coffeeCount: {
      fontSize: '0.85rem',
      color: '#cbd5e1',
      fontWeight: 600
    },
    footerBottom: {
      borderTop: '1px solid rgba(102, 126, 234, 0.2)',
      padding: '2rem 2rem',
      background: 'rgba(15, 23, 42, 0.5)'
    },
    bottomContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    copyright: {
      fontSize: '0.9rem',
      color: '#94a3b8',
      margin: 0
    },
    madeWith: {
      fontSize: '0.9rem',
      color: '#94a3b8',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    funFact: {
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#cbd5e1',
      margin: 0
    }
  };

  const funFacts = [
    "💻 Code. Coffee. Repeat.",
    "🚀 Turning coffee into code",
    "✨ Making the web awesome"
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.topBorder} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            style={styles.scrollToTop}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, boxShadow: '0 15px 40px rgba(102, 126, 234, 0.6)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Brand Section */}
          <motion.div
            style={styles.brandSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" style={styles.brandLink}>
              <motion.span
                style={styles.brandName}
                whileHover={{ scale: 1.05 }}
              >
                Sai Sri Harsha
              </motion.span>
            </Link>
            
            <p style={styles.tagline}>Software Engineer & AI Enthusiast</p>
            <p style={styles.description}>
              Crafting innovative solutions at the intersection of AI and software engineering. 
              Passionate about building scalable systems and turning ideas into reality.
            </p>

            <div style={styles.quickInfo}>
              {quickInfo.map((item, index) => (
                <motion.div
                  key={index}
                  style={styles.infoItem}
                  whileHover={{ x: 5 }}
                >
                  <span style={styles.infoIcon}>{item.icon}</span>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      style={styles.infoLink}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 style={styles.sectionTitle}>
              Quick Links
              <div style={styles.titleUnderline} />
            </h3>
            <ul style={styles.linksList}>
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    style={styles.footerLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#667eea';
                      e.currentTarget.style.paddingLeft = '10px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#cbd5e1';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 style={styles.sectionTitle}>
              Let's Connect
              <div style={styles.titleUnderline} />
            </h3>
            <p style={styles.connectText}>
              Always open to interesting conversations and collaboration opportunities.
            </p>
            
            <div style={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  style={styles.socialLink(social.color)}
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
                    color: '#ffffff',
                    boxShadow: `0 8px 20px ${social.color}40`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <motion.div style={styles.coffeeSection}>
              <motion.button
                style={styles.coffeeBtn}
                onClick={() => setCoffeeCount(prev => prev + 1)}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiCoffee />
              </motion.button>
              <AnimatePresence>
                {coffeeCount > 0 && (
                  <motion.span
                    style={styles.coffeeCount}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {coffeeCount} {coffeeCount === 1 ? 'coffee' : 'coffees'} ☕
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={styles.footerBottom}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div style={styles.bottomContent}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} Sai Sri Harsha Guddati. All rights reserved.
          </p>
          
          <p style={styles.madeWith}>
            Crafted with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FiHeart style={{ fill: 'currentColor', color: '#ef4444' }} />
            </motion.span>
            and lots of
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              style={{ display: 'inline-block' }}
            >
              ☕
            </motion.span>
          </p>

          <p style={styles.funFact}>
            {funFacts[Math.floor(Date.now() / 10000) % 3]}
          </p>
                </div>
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .brand-section { grid-column: 1 / -1; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;