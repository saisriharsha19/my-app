// src/pages/Portfolio.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiCode } from 'react-icons/fi';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredItem, setHoveredItem] = useState(null);
  const itemsPerPage = 3;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://backend-482511937770.europe-west1.run.app/portfolio/', {
          signal: abortController.signal
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
        setError(null);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching portfolio items:', error);
          setError('Failed to load portfolio items. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
    return () => abortController.abort();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const projectColors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-yellow-500 to-orange-500'
  ];

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="portfolio-page error-container"
      >
        <div className="error-message">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ⚠️
          </motion.div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="portfolio-page">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="portfolio-header"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="header-icon"
        >
          <FiCode />
        </motion.div>
        <h1 className="portfolio-heading">
          Featured <span className="gradient-text">Projects</span>
        </h1>
        <p className="portfolio-subtitle">Innovative solutions I've crafted</p>
      </motion.div>

      {isLoading ? (
        <div className="portfolio-items">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="portfolio-item skeleton"
            >
              <div className="skeleton-project-header"></div>
              <div className="skeleton-project-title"></div>
              <div className="skeleton-project-text"></div>
              <div className="skeleton-project-text short"></div>
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          <motion.div
            className="portfolio-items"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <AnimatePresence mode="wait">
              {currentItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="portfolio-item"
                >
                  <div className={`project-gradient bg-gradient-to-br ${projectColors[index % projectColors.length]}`}></div>
                  
                  <div className="project-number">{String(indexOfFirstItem + index + 1).padStart(2, '0')}</div>

                  <motion.div
                    className="project-icon"
                    animate={{
                      rotate: hoveredItem === item.id ? 360 : 0,
                      scale: hoveredItem === item.id ? 1.2 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <FiGithub />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="project-description"
                  >
                    {item.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="project-footer"
                  >
                    <a
                      href={item.project_url}
                                            rel="noopener noreferrer"
                      className="project-link"
                    >
                      <motion.span
                        animate={{
                          x: hoveredItem === item.id ? 5 : 0
                        }}
                      >
                        View Project
                      </motion.span>
                      <FiExternalLink />
                    </a>
                  </motion.div>

                  {/* Decorative corner accent */}
                  <div className="corner-accent"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pagination"
          >
            {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => (
              <motion.button
                key={i + 1}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(i + 1)}
                className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Portfolio;