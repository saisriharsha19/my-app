// src/pages/Blog.jsx
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUser, FiArrowRight, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { fetchWithCache } from '../utils/apiCache';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 6;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchWithCache(
          'https://backend-482511937770.europe-west1.run.app/blog/',
          { signal: abortController.signal }
        );
        setPosts(data);
        setError(null);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching blog posts:', error);
          setError('Failed to load blog posts. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
    return () => abortController.abort();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    if (isNaN(formattedDate)) return "Invalid Date";
    return formattedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
          <FiRefreshCw className="mr-2" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      <Helmet>
        <title>Blog | Sai Sri Harsha Guddati</title>
        <meta name="description" content="Read my latest articles, stories, and thoughts on software engineering." />
      </Helmet>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Latest</span> Articles
        </h1>
        <p className="text-lg text-secondary mb-8">
          Thoughts, stories and ideas
        </p>

        <div style={{ maxWidth: '36rem', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ position: 'relative' }}>
            <FiSearch style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              fontSize: '18px',
              pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '48px',
                paddingRight: '16px',
                paddingTop: '16px',
                paddingBottom: '16px',
                borderRadius: '16px',
                border: '1px solid var(--border-color, #e5e7eb)',
                background: 'var(--bg-primary)',
                outline: 'none',
                fontSize: '16px',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-panel p-6 rounded-3xl animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-4" />
              <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-full mb-4" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <AnimatePresence>
              {currentPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="glass-panel p-6 rounded-3xl group cursor-pointer flex flex-col h-full"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8 }}
                >
                  <div className="flex items-center gap-2 text-sm text-secondary mb-4">
                    <FiClock className="text-indigo-500" />
                    <time>{formatDate(post.created_at)}</time>
                  </div>

                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-secondary text-sm leading-relaxed mb-6 flex-1">
                    {post.content
                      ? post.content.substring(0, 120) + '...'
                      : 'No content available'}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/5 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                      <FiUser />
                      <span>{post.author || 'Unknown'}</span>
                    </div>

                    <Link
                      to={`/blog/${post.id}`}
                      className="text-indigo-500 text-sm font-semibold flex items-center gap-1 group/link"
                    >
                      Read more
                      <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPosts.length > postsPerPage && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1
                    ? 'bg-indigo-600 text-white shadow-lg scale-110'
                    : 'bg-white dark:bg-white/5 text-secondary hover:bg-gray-100 dark:hover:bg-white/10'
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

export default Blog;