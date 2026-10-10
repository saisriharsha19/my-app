import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import { FiArrowUpRight, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../ThemeContext';

const links = [['Work', '/portfolio'], ['Experience', '/experience'], ['Journal', '/blog'], ['Resume', '/resume']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const menuButton = useRef(null);
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event) => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header"><a className="skip-link" href="#main-content">Skip to content</a><div className="page-wrap header-inner"><Link className="wordmark" to="/" aria-label="Harsha home"><img src="/favicon.svg" width="32" height="32" alt="" />harsha</Link><nav className={'site-navigation ' + (open ? 'is-open' : '')} id="site-navigation" aria-label="Main navigation">{links.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}<NavLink className="nav-contact" to="/contact">Let’s talk <FiArrowUpRight /></NavLink></nav><div className="header-controls"><button className="theme-control" onClick={toggleTheme} aria-label={'Switch to ' + (isDarkMode ? 'light' : 'dark') + ' mode'}>{isDarkMode ? <FiSun /> : <FiMoon />}</button><button className="menu-control" ref={menuButton} onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="site-navigation">{open ? <FiX /> : <FiMenu />}</button></div></div></header>;
}
