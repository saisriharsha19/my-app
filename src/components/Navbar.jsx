// src/components/Navbar.jsx - FULLY FIXED VERSION
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FiMenu, FiX, FiCode } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  // Theme detection
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');

    return () => observer.disconnect();
  }, []);

  // Fixed scroll progress calculation
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    const totalDocScrollLength = docHeight - windowHeight;
    const scrollPercent = totalDocScrollLength > 0 ? (scrollTop / totalDocScrollLength) * 100 : 0;
    
    setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100));
    setScrolled(scrollTop > 50);
  }, []);

  useEffect(() => {
    handleScroll(); // Initial calculation
    
    // Use requestAnimationFrame for smooth updates
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
    setScrollProgress(0);
    handleScroll();
  }, [location, handleScroll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/portfolio", label: "Projects" },
    { to: "/experience", label: "Experience" },
    { to: "/contact", label: "Contact" }
  ];

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'all 0.3s ease'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  };

  const brandStyle = {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 800,
    color: isDark ? '#f1f5f9' : '#1a1a1a',
    zIndex: 10
  };

  const navLinksStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '0.25rem',
    margin: 0,
    padding: 0,
    alignItems: 'center'
  };

  const navLinkStyle = (isActive) => ({
    position: 'relative',
    textDecoration: 'none',
    color: isActive ? '#667eea' : (isDark ? '#cbd5e1' : '#6b7280'),
    fontWeight: 600,
    fontSize: '1rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '10px',
    background: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap'
  });

  const activeDotStyle = {
    position: 'absolute',
    bottom: '6px',
    left: '50%',
    width: '6px',
    height: '6px',
    background: '#667eea',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(102, 126, 234, 0.8)',
    marginLeft: '-3px'
  };

  const progressBarStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    width: `${scrollProgress}%`,
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    transition: 'none',
    pointerEvents: 'none',
    zIndex: 5
  };

  const actionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    zIndex: 10
  };

  const menuButtonStyle = {
    display: 'none',
    width: '48px',
    height: '48px',
    background: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
    border: 'none',
    borderRadius: '12px',
    color: isDark ? '#f1f5f9' : '#1a1a1a',
    fontSize: '1.5rem',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const mobileBackdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 999
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '320px',
    maxWidth: '85vw',
    background: isDark ? '#1e293b' : '#ffffff',
    zIndex: 1002,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-20px 0 40px rgba(0, 0, 0, 0.3)'
  };

  const mobileHeaderStyle = {
    padding: '2rem',
    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
  };

  const mobileLinksContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const mobileNavLinkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 1.5rem',
    textDecoration: 'none',
    color: isActive ? '#667eea' : (isDark ? '#cbd5e1' : '#6b7280'),
    fontWeight: 600,
    fontSize: '1.1rem',
    borderRadius: '12px',
    background: isActive ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
    transition: 'all 0.2s ease',
    border: `2px solid ${isActive ? 'rgba(102, 126, 234, 0.3)' : 'transparent'}`
  });

  const mobileActiveDotStyle = {
    width: '10px',
    height: '10px',
    background: '#667eea',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(102, 126, 234, 0.8)',
    flexShrink: 0
  };

  const mobileFooterStyle = {
    padding: '1.5rem 2rem',
    borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    textAlign: 'center',
    color: isDark ? '#94a3b8' : '#6b7280',
    fontSize: '0.9rem'
  };

  return (
    <>
      <motion.nav
        style={navStyle}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div style={containerStyle}>
          <Link to="/" style={brandStyle}>
            <motion.div
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '10px',
                color: 'white'
              }}
              whileHover={{ scale: 1.05 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <FiCode />
            </motion.div>
            <span style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Sai
            </span>
            SriHarsha
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
              style={{ color: '#fbbf24', fontSize: '1.2rem' }}
            >
              <HiSparkles />
            </motion.div>
          </Link>

          <ul style={{...navLinksStyle, '@media (maxWidth: 768px)': { display: 'none' }}}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li key={link.to} style={{ listStyle: 'none', position: 'relative' }}>
                  <Link 
                    to={link.to} 
                    style={navLinkStyle(isActive)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                        e.currentTarget.style.color = '#667eea';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = isDark ? '#cbd5e1' : '#6b7280';
                      }
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        style={activeDotStyle}
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={actionsStyle}>
            <ThemeToggle />
            
            <motion.button
              style={{...menuButtonStyle, display: window.innerWidth <= 768 ? 'flex' : 'none'}}
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <div style={progressBarStyle} />
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              style={mobileBackdropStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              style={mobileMenuStyle}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div style={mobileHeaderStyle}>
                <motion.h2
                  style={{ 
                    margin: 0, 
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: isDark ? '#f1f5f9' : '#1a1a1a'
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Menu
                </motion.h2>
              </div>

              <div style={mobileLinksContainerStyle}>
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.to}
                        style={mobileNavLinkStyle(isActive)}
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <motion.div
                            style={mobileActiveDotStyle}
                            layoutId="mobileActiveDot"
                            initial={false}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                style={mobileFooterStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p style={{ margin: 0 }}>Let's build something amazing! ✨</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav ul {
            display: none !important;
          }
          nav button {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
