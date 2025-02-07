import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ThankYouPage from './pages/ThankYouPage';
import FullPost from './pages/FullPost';
import ExperiencePage from './pages/ExperiencePage';
import Resume  from './pages/Resume';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
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
    </Router>
  );
}

export default App;