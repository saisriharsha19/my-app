// src/components/ThemeToggle.jsx - Simplified working version
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-simple"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDarkMode ? 180 : 0,
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? <FiMoon size={20} /> : <FiSun size={20} />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
