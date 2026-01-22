// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Experience', path: '/experience' },
    { name: 'Resume', path: '/resume' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Main Navbar - Hidden when mobile menu is open */}
      {!isOpen && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 z-50 h-auto bottom-auto transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`navbar-dock mx-auto transition-all duration-300 items-center justify-between flex ${isScrolled
              ? 'glass-panel rounded-full px-6 py-3 shadow-lg'
              : 'px-6 py-4 bg-transparent'
              }`}
            style={{ maxWidth: isScrolled ? '1000px' : '1200px', pointerEvents: 'auto' }}
          >
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl">
                Sai<span className="text-gradient"> Sri Harsha</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors rounded-full"
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="nav-active-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                className="md:hidden p-2 text-xl"
                onClick={() => setIsOpen(true)}
                aria-label="Open Menu"
                style={{ color: 'var(--text-primary)' }}
              >
                <FiMenu />
              </button>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Mobile Menu - Minimal Full Screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'var(--bg-primary)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Close Button - Top Right */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px' }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                <FiX />
              </button>
            </div>

            {/* Links - Centered, Large Typography */}
            <nav style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              paddingBottom: '80px'
            }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontSize: '32px',
                      fontWeight: location.pathname === link.path ? '700' : '400',
                      color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-primary)',
                      textDecoration: 'none',
                      padding: '8px 16px',
                      display: 'block'
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;