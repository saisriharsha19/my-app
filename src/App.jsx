// src/App.js
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; // eager — it's the landing page
import { ThemeProvider } from './ThemeContext';
import './App.css';
import { logPageView } from './analytics';
import { HelmetProvider } from 'react-helmet-async';
import './editorial.css';
import RouteMetadata from './components/RouteMetadata';

// Route-level code splitting: non-home pages are lazy-loaded so their JS
// is not parsed on the initial landing-page visit, saving ~200-400ms parse time.
const Blog = lazy(() => import('./pages/Blog'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const FullPost = lazy(() => import('./pages/FullPost'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const Resume = lazy(() => import('./pages/Resume'));

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
      <RouteMetadata />
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <Suspense fallback={<div className="page-wrap empty-state" role="status">Opening the page…</div>}>
          <main id="main-content" className="main-content flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:projectSlug" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/thank-you" element={<Navigate to="/contact" replace />} />
              <Route path="/blog/:postId" element={<FullPost />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/resume" element={<Resume />} />
              
              {/* Name Variation SEO Landing Pages */}
              <Route path="/sai-sri-harsha" element={<Home />} />
              <Route path="/sri-harsha" element={<Home />} />
              <Route path="/sai-harsha" element={<Home />} />
              <Route path="/harsha" element={<Home />} />
              <Route path="/sai-harsha-distributed-systems" element={<Home />} />
              <Route path="/sri-harsha-ai-engineer" element={<Home />} />
              <Route path="/harsha-guddati-software-engineer" element={<Home />} />
              <Route path="/sai-sri-harsha-gainesville" element={<Home />} />
              <Route path="/sai-harsha-kubernetes" element={<Home />} />
              <Route path="/sri-harsha-backend" element={<Home />} />
              <Route path="/sai-sri-harsha-portfolio" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
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
