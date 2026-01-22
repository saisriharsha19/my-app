// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/portfolio' },
  { name: 'Experience', path: '/experience' },
  { name: 'Resume', path: '/resume' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Blob Animation State
  const navRefs = useRef({});
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Recalculate blob position on location change or resize
  useEffect(() => {
    const activeLink = navRefs.current[location.pathname];
    if (activeLink) {
      setBlobStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1,
      });
    } else {
      // If no active link found (e.g. 404), maybe hide it or default to something
      // For now, let's keep it visible if it was visible, or hide it.
      // But typically we want it to move to the valid link. 
      // If current path isn't in navLinks, maybe set opacity 0?
      // Let's assume there's always a valid link or we hide it.
      const found = navLinks.find(l => l.path === location.pathname);
      if (!found) setBlobStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  // Handle Resize to readjust blob
  useEffect(() => {
    const handleResize = () => {
      const activeLink = navRefs.current[location.pathname];
      if (activeLink) {
        setBlobStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <>

      {/* Main Navbar */}
      {!isOpen && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 z-50 h-auto bottom-auto transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`navbar-dock ${isScrolled ? 'scrolled' : ''}`}
            style={{
              pointerEvents: 'auto',
            }}
          >
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl">
                Sai<span className="text-gradient"> Sri Harsha</span>
              </span>
            </Link>

            {/* Nav Links with Sliding Blob - Manual Calculation */}
            <div className="hidden md:flex items-center gap-2 relative">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    ref={(el) => (navRefs.current[link.path] = el)}
                    className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-100"
                    style={{
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    <span
                      className="relative z-10 block"
                      style={{
                        transform: isActive ? 'scale(1.25)' : 'scale(1)',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}

              {/* The Blob */}
              <motion.div
                className="absolute top-0 bottom-0 rounded-full pointer-events-none"
                initial={false}
                animate={{
                  left: blobStyle.left,
                  width: blobStyle.width,
                  opacity: blobStyle.opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(5px)',
                  filter: 'url(#glass-warp)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: `
                    0 4px 12px rgba(99, 102, 241, 0.2),
                    inset 0 2px 4px rgba(255, 255, 255, 0.3),
                    inset 0 -2px 4px rgba(0, 0, 0, 0.05)
                  `,
                  height: '100%',
                }}
              />
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

      {/* Mobile Menu */}
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