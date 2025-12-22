// src/components/Navbar.jsx - Ultra-Optimized Performance
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { FiMenu, FiX, FiCode } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';

// Memoized nav links to prevent recreation
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/portfolio", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" }
];

// Memoized Desktop Nav Link Component
const DesktopNavLink = memo(({ link, isActive, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = useMemo(() => ({
    position: 'relative',
    textDecoration: 'none',
    color: isActive ? '#667eea' : (isDark ? '#cbd5e1' : '#6b7280'),
    fontWeight: 600,
    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
    padding: '0.75rem 1.25rem',
    borderRadius: '10px',
    background: (isActive || isHovered) ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
    transition: 'background 0.2s ease, color 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    willChange: 'background, color',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  }), [isActive, isDark, isHovered]);

  const dotStyle = useMemo(() => ({
    position: 'absolute',
    bottom: '6px',
    left: '50%',
    width: '6px',
    height: '6px',
    background: '#667eea',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(102, 126, 234, 0.8)',
    marginLeft: '-3px'
  }), []);

  return (
    <li style={{ listStyle: 'none', position: 'relative' }}>
      <Link 
        to={link.to} 
        style={linkStyle}
        onMouseEnter={() => !isActive && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {link.label}
        {isActive && (
          <motion.div
            style={dotStyle}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    </li>
  );
});

DesktopNavLink.displayName = 'DesktopNavLink';

// Memoized Mobile Nav Link Component
const MobileNavLink = memo(({ link, isActive, isDark, onClick }) => {
  const linkStyle = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(1.25rem, 3vw, 1.5rem)',
    textDecoration: 'none',
    color: isActive ? '#667eea' : (isDark ? '#cbd5e1' : '#6b7280'),
    fontWeight: 600,
    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
    borderRadius: '12px',
    background: isActive ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
    transition: 'all 0.2s ease',
    border: `2px solid ${isActive ? 'rgba(102, 126, 234, 0.3)' : 'transparent'}`,
    willChange: 'background, color, border',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  }), [isActive, isDark]);

  const dotStyle = useMemo(() => ({
    width: '10px',
    height: '10px',
    background: '#667eea',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(102, 126, 234, 0.8)',
    flexShrink: 0
  }), []);

  return (
    <Link to={link.to} style={linkStyle} onClick={onClick}>
      <span>{link.label}</span>
      {isActive && (
        <motion.div
          style={dotStyle}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
});

MobileNavLink.displayName = 'MobileNavLink';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  
  // Refs for RAF optimization
  const rafRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Theme observer with debouncing
  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    checkTheme();
    
    let timeoutId;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkTheme, 16);
    };
    
    const observer = new MutationObserver(debouncedCheck);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Ultra-optimized scroll handler with RAF
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    const totalDocScrollLength = docHeight - windowHeight;
    const scrollPercent = totalDocScrollLength > 0 ? (scrollTop / totalDocScrollLength) * 100 : 0;
    
    // Batch state updates
    const newScrollProgress = Math.min(Math.max(scrollPercent, 0), 100);
    const newScrolled = scrollTop > 50;
    
    // Only update if values actually changed
    if (Math.abs(lastScrollY.current - newScrollProgress) > 0.1) {
      setScrollProgress(newScrollProgress);
      lastScrollY.current = newScrollProgress;
    }
    
    setScrolled(newScrolled);
    ticking.current = false;
  }, []);

  // RAF-based scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        rafRef.current = requestAnimationFrame(updateScrollProgress);
        ticking.current = true;
      }
    };

    // Initial calculation
    updateScrollProgress();
    
    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollProgress]);

  // Reset on location change
  useEffect(() => {
    setIsOpen(false);
    setScrollProgress(0);
    lastScrollY.current = 0;
    updateScrollProgress();
  }, [location, updateScrollProgress]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Memoized styles to prevent recreation
  const navStyle = useMemo(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'box-shadow 0.3s ease',
    willChange: 'box-shadow',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  }), [isDark, scrolled]);

  const containerStyle = useMemo(() => ({
    maxWidth: '1400px',
    margin: '0 auto',
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  }), []);

  const brandStyle = useMemo(() => ({
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
    fontWeight: 800,
    color: isDark ? '#f1f5f9' : '#1a1a1a',
    zIndex: 10
  }), [isDark]);

  const brandIconStyle = useMemo(() => ({
    width: 'clamp(35px, 8vw, 40px)',
    height: 'clamp(35px, 8vw, 40px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '10px',
    color: 'white',
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)'
  }), []);

  const brandTextStyle = useMemo(() => ({
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }), []);

  const desktopNavStyle = useMemo(() => ({
    display: 'none',
    listStyle: 'none',
    gap: '0.25rem',
    margin: 0,
    padding: 0,
    alignItems: 'center'
  }), []);

  const progressBarStyle = useMemo(() => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    width: `${scrollProgress}%`,
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    transition: 'none',
    pointerEvents: 'none',
    zIndex: 5,
    willChange: 'width',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  }), [scrollProgress]);

  const actionsStyle = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.5rem, 2vw, 1rem)',
    zIndex: 10
  }), []);

  const menuButtonStyle = useMemo(() => ({
    width: 'clamp(42px, 10vw, 48px)',
    height: 'clamp(42px, 10vw, 48px)',
    background: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
    border: 'none',
    borderRadius: '12px',
    color: isDark ? '#f1f5f9' : '#1a1a1a',
    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    willChange: 'transform',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  }), [isDark]);

  const mobileBackdropStyle = useMemo(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 999
  }), []);

  const mobileMenuStyle = useMemo(() => ({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: 'min(320px, 85vw)',
    background: isDark ? '#1e293b' : '#ffffff',
    zIndex: 1002,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-20px 0 40px rgba(0, 0, 0, 0.3)',
    willChange: 'transform',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  }), [isDark]);

  const mobileHeaderStyle = useMemo(() => ({
    padding: 'clamp(1.5rem, 4vw, 2rem)',
    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
  }), [isDark]);

  const mobileTitleStyle = useMemo(() => ({
    margin: 0,
    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
    fontWeight: 700,
    color: isDark ? '#f1f5f9' : '#1a1a1a'
  }), [isDark]);

  const mobileLinksContainerStyle = useMemo(() => ({
    flex: 1,
    overflowY: 'auto',
    padding: 'clamp(1rem, 3vw, 1.5rem)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }), []);

  const mobileFooterStyle = useMemo(() => ({
    padding: 'clamp(1.25rem, 3vw, 1.5rem) clamp(1.5rem, 4vw, 2rem)',
    borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    textAlign: 'center',
    color: isDark ? '#94a3b8' : '#6b7280',
    fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)'
  }), [isDark]);

  // Memoized handlers
  const handleToggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const handleCloseMenu = useCallback(() => setIsOpen(false), []);

  // Memoized desktop nav items
  const desktopNavItems = useMemo(() => 
    NAV_LINKS.map((link) => (
      <DesktopNavLink 
        key={link.to} 
        link={link} 
        isActive={location.pathname === link.to} 
        isDark={isDark}
      />
    )), 
  [location.pathname, isDark]);

  // Memoized mobile nav items
  const mobileNavItems = useMemo(() => 
    NAV_LINKS.map((link, index) => (
      <motion.div
        key={link.to}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <MobileNavLink 
          link={link} 
          isActive={location.pathname === link.to} 
          isDark={isDark}
          onClick={handleCloseMenu}
        />
      </motion.div>
    )), 
  [location.pathname, isDark, handleCloseMenu]);

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
              style={brandIconStyle}
              whileHover={{ scale: 1.05 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <FiCode />
            </motion.div>
            <span style={brandTextStyle}>Sai</span>
            SriHarsha
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
              style={{ color: '#fbbf24', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
            >
              <HiSparkles />
            </motion.div>
          </Link>

          <ul style={desktopNavStyle} className="desktop-nav">
            {desktopNavItems}
          </ul>

          <div style={actionsStyle}>
            <ThemeToggle />
            
            <motion.button
              style={menuButtonStyle}
              className="mobile-menu-btn"
              onClick={handleToggleMenu}
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
              onClick={handleCloseMenu}
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
                  style={mobileTitleStyle}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Menu
                </motion.h2>
              </div>

              <div style={mobileLinksContainerStyle}>
                {mobileNavItems}
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
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;