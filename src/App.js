// App.js
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ThankYouPage from './pages/ThankYouPage';
import FullPost from './pages/FullPost';
import ExperiencePage from './pages/ExperiencePage';
import Resume from './pages/Resume';
import { ThemeContext, ThemeProvider } from './ThemeContext';
import ThemeToggle from './pages/ThemeToggle';
import './App.css';
import { initGA, logPageView } from './analytics';

function App() {
  const { isDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    logPageView();

    // Initialize Google Tag Manager
    const tagManagerArgs = {
      gtmId: 'GTM-K5B486R5', // Verify this is correct and published in GTM
    };
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <PageTracker />
        <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <Navbar />
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/blog/:postId" element={<FullPost />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

// PageTracker: Pushes a pageview event to GTM on route changes
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Ensure window.dataLayer exists; if not, initialize it
    window.dataLayer = window.dataLayer || [];
    
    // Push the pageview event to GTM
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        page: location.pathname + location.search,
      },
    });
    console.log('GTM pageview event pushed:', location.pathname + location.search);
  }, [location]);

  return null;
}

export default App;
