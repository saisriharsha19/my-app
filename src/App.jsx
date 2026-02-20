// src/App.js
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; // eager — it's the landing page
import { ThemeProvider } from './ThemeContext';
import './App.css';
import { initGA, logPageView } from './analytics';

// Route-level code splitting: non-home pages are lazy-loaded so their JS
// is not parsed on the initial landing-page visit, saving ~200-400ms parse time.
const Blog = lazy(() => import('./pages/Blog'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const FullPost = lazy(() => import('./pages/FullPost'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const Resume = lazy(() => import('./pages/Resume'));

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
          {/* Suspense fallback is null — pages handle their own loading states */}
          <Suspense fallback={null}>
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
          </Suspense>
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
