// src/pages/Portfolio.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  if (error) {
    return (
      <div className="container min-h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          className="text-5xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          😕
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-secondary mb-6">{error}</p>
        <button
          className="btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h1>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          Innovative solutions crafted with passion, from AI benchmarks to scalable web systems.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-xl mb-6" />
              <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-4" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 gap-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-8"
              >
                {currentItems.map((item, index) => {
                  const globalIndex = indexOfFirstItem + index;

                  return (
                    <div
                      key={item.id}
                      className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden group transition-all duration-300 hover:border-indigo-500/30 hover:-translate-y-1"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'var(--gradient-primary)' }} />

                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-full md:w-1/3 shrink-0">
                          <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-4xl text-indigo-500 font-bold relative group-hover:shadow-lg transition-all">
                            {/* Placeholder for project image if available, or just index/icon */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5" />
                            <span className="relative z-10">{String(globalIndex + 1).padStart(2, '0')}</span>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                              Featured
                            </span>
                            <span className="text-secondary text-sm">
                              {item.tech_stack || [
                                "React • Node.js • MongoDB",
                                "Python • TensorFlow • AWS",
                                "Next.js • TypeScript • PostgreSQL",
                                "FastAPI • Docker • Redis",
                                "Vue.js • GraphQL • Firebase",
                                "Django • Kubernetes • GCP"
                              ][globalIndex % 6]}
                            </span>
                          </div>

                          <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-secondary leading-relaxed mb-6">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-white/5">
                            {item.project_url && (
                              <a
                                href={item.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary py-2 px-6 text-sm"
                              >
                                View Project <FiExternalLink />
                              </a>
                            )}
                            {item.github_url && (
                              <a
                                href={item.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary py-2 px-6 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                              >
                                Source Code <FiGithub />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {items.length > itemsPerPage && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1
                    ? 'bg-indigo-600 text-white shadow-lg scale-110'
                    : 'bg-gray-100 dark:bg-white/5 text-secondary hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  style={currentPage === i + 1 ? { background: 'var(--accent-primary)' } : {}}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Portfolio;