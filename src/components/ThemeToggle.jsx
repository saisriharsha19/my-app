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
      width: '60px',
      height: '32px',
      background: isDarkMode 
        ? 'linear-gradient(135deg, #1e3a8a, #0f172a)' 
        : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: isDarkMode 
        ? '0 4px 12px rgba(30, 58, 138, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.2)'
        : '0 4px 12px rgba(251, 191, 36, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      overflow: 'visible'
    },
    thumb: {
      position: 'absolute',
      top: '4px',
      left: isDarkMode ? '32px' : '4px',
      width: '24px',
      height: '24px',
      background: '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
      transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    icon: {
      fontSize: '14px',
      color: isDarkMode ? '#1e3a8a' : '#f59e0b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    stars: {
      position: 'absolute',
      fontSize: '8px',
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
          <>
            <motion.span
              style={{...styles.stars, top: '6px', left: '8px'}}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              ✦
            </motion.span>
            <motion.span
              style={{...styles.stars, bottom: '6px', left: '14px'}}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              ✦
            </motion.span>
          </>
        )}
      </AnimatePresence>

      <motion.div
        style={styles.thumb}
        animate={{ left: isDarkMode ? '32px' : '4px' }}
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