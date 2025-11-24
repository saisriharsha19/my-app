// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle-enhanced"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle Track */}
      <motion.div
        className="toggle-track-enhanced"
        animate={{
          backgroundColor: isDarkMode ? '#1e3a8a' : '#fbbf24'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Stars for dark mode */}
        {isDarkMode && (
          <>
            <motion.span
              className="star-particle star-1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              ✦
            </motion.span>
            <motion.span
              className="star-particle star-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              ✦
            </motion.span>
          </>
        )}
        
        {/* Sliding Thumb */}
        <motion.div
          className="toggle-thumb-enhanced"
          animate={{
            x: isDarkMode ? 28 : 2,
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff'
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          <motion.div
            animate={{ rotate: isDarkMode ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="icon-wrapper"
          >
            {isDarkMode ? (
              <FiMoon className="toggle-icon moon" />
            ) : (
              <FiSun className="toggle-icon sun" />
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <span className="toggle-tooltip">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
