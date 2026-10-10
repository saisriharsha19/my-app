import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeContext } from './ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouteMetadata from './components/RouteMetadata';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Experience from './pages/ExperiencePage';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Resume from './pages/Resume';

const pages = { '/': Home, '/portfolio': Portfolio, '/experience': Experience, '/blog': Blog, '/contact': Contact, '/resume': Resume };
export const routes = Object.keys(pages);
export function render(path) {
  const Page = pages[path];
  const context = {};
  const html = renderToString(<HelmetProvider context={context}><ThemeContext.Provider value={{ isDarkMode: false, toggleTheme() {} }}><StaticRouter location={path}><RouteMetadata /><div className="App flex flex-col min-h-screen"><Navbar /><main id="main-content" className="main-content flex-1 flex flex-col"><Page /></main><Footer /></div></StaticRouter></ThemeContext.Provider></HelmetProvider>);
  return { html, head: context.helmet.title.toString() + context.helmet.meta.toString() + context.helmet.link.toString() };
}

