// src/App.js
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; // eager — it's the landing page
import { ThemeProvider } from './ThemeContext';
import './App.css';
import { logPageView } from './analytics';
import { HelmetProvider } from 'react-helmet-async';

// Route-level code splitting: non-home pages are lazy-loaded so their JS
// is not parsed on the initial landing-page visit, saving ~200-400ms parse time.
const Blog = lazy(() => import('./pages/Blog'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const FullPost = lazy(() => import('./pages/FullPost'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const Resume = lazy(() => import('./pages/Resume'));
const NameVariation = lazy(() => import('./pages/NameVariation'));

// PageTracker: Logs pageviews to GA on route changes
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Log pageview for Google Analytics after a brief delay
    // to allow react-helmet-async to update the document.title
    const timeoutId = setTimeout(() => {
      logPageView();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [location]);

  return null;
}


function AppContent() {
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
              
              {/* Name Variation SEO Landing Pages */}
              <Route path="/sai-sri-harsha" element={<NameVariation />} />
              <Route path="/sri-harsha" element={<NameVariation />} />
              <Route path="/sai-harsha" element={<NameVariation />} />
              <Route path="/harsha" element={<NameVariation />} />
              <Route path="/sai-harsha-distributed-systems" element={<NameVariation />} />
              <Route path="/sri-harsha-ai-engineer" element={<NameVariation />} />
              <Route path="/harsha-guddati-software-engineer" element={<NameVariation />} />
              <Route path="/sai-sri-harsha-gainesville" element={<NameVariation />} />
              <Route path="/sai-harsha-kubernetes" element={<NameVariation />} />
              <Route path="/sri-harsha-backend" element={<NameVariation />} />
              <Route path="/sai-sri-harsha-portfolio" element={<NameVariation />} />
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
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
