// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { ThemeProvider } from './ThemeContext';
import './App.css';
import { initGA, logPageView } from './analytics';

// PageTracker: Logs pageviews to GA on route changes
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Log pageview for Google Analytics
    logPageView();

  }, [location]);

  return null;
}


const analyticsInitialized = { current: false };

function AppContent() {
  useEffect(() => {
    if (analyticsInitialized.current) return;
    analyticsInitialized.current = true;

    // Initialize Google Analytics
    initGA();
  }, []);

  return (
    <Router>
      <PageTracker />
      <div className="App">
        <Navbar />
        <main className="main-content">
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
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
