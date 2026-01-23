// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const styles = {
    button: {
      position: 'relative',
      width: 'clamp(48px, 10vw, 56px)',
      height: 'clamp(26px, 6vw, 30px)',
      background: isDarkMode
        ? 'linear-gradient(135deg, #1e3a8a, #0f172a)'
        : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      borderRadius: 'clamp(13px, 3vw, 15px)',
      border: 'none',
      cursor: 'pointer',
      boxShadow: isDarkMode
        ? '0 2px 8px rgba(30, 58, 138, 0.3), inset 0 1px 3px rgba(0, 0, 0, 0.2)'
        : '0 2px 8px rgba(251, 191, 36, 0.3), inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      overflow: 'visible',
      flexShrink: 0
    },
    thumb: {
      position: 'absolute',
      top: '3px',
      left: isDarkMode ? 'calc(100% - 23px)' : '3px',
      width: 'clamp(20px, 4.5vw, 24px)',
      height: 'clamp(20px, 4.5vw, 24px)',
      background: '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
      transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    icon: {
      fontSize: 'clamp(10px, 2.5vw, 13px)',
      color: isDarkMode ? '#1e3a8a' : '#f59e0b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    stars: {
      position: 'absolute',
      fontSize: 'clamp(6px, 1.5vw, 8px)',
      color: 'rgba(255, 255, 255, 0.8)',
      pointerEvents: 'none'
    }
  };

  return (
    <motion.button
      style={styles.button}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait">
        {isDarkMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            <motion.span
              style={{ ...styles.stars, top: 'clamp(4px, 1.5vw, 6px)', left: 'clamp(6px, 2vw, 8px)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              ✦
            </motion.span>
            <motion.span
              style={{ ...styles.stars, bottom: 'clamp(4px, 1.5vw, 6px)', left: 'clamp(10px, 3vw, 14px)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              ✦
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={styles.thumb}
        animate={{ left: isDarkMode ? 'calc(100% - 23px)' : '3px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div
          style={styles.icon}
          animate={{ rotate: isDarkMode ? 0 : 360 }}
          transition={{ duration: 0.5 }}
        >
          {isDarkMode ? <FiMoon /> : <FiSun />}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;