import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;