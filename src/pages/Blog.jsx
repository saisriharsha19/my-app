// src/pages/Blog.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUser, FiArrowRight, FiRefreshCw } from 'react-icons/fi';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const postsPerPage = 6;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://backend-482511937770.europe-west1.run.app/blog/', {
          signal: abortController.signal
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    if (isNaN(formattedDate)) {
      return "Invalid Date";
    }
    return formattedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="blog-page error-container"
      >
        <div className="error-message">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ⚠️
          </motion.div>
          <h2>Something went wrong!</h2>
          <p>{error}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
          >
            <FiRefreshCw /> Retry
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="blog-page">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="blog-header"
      >
        <h1 className="page-title">
          <span className="gradient-text">Latest</span> Articles
        </h1>
        <p className="page-subtitle">Thoughts, stories and ideas</p>
      </motion.div>

      {isLoading ? (
        <div className="posts-grid">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="post-card skeleton"
            >
              <div className="skeleton-header"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          <motion.div 
            className="posts-grid"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <AnimatePresence>
              {currentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setHoveredCard(post.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="post-card"
                >
                  <div className="post-card-gradient"></div>
                  
                  <div className="post-meta">
                    <span className="post-date">
                      <FiClock /> {formatDate(post.created_at)}
                    </span>
                  </div>

                  <h2 className="post-title">{post.title}</h2>
                  
                  <p className="post-excerpt">
                    {post.content
                      ? post.content.substring(0, 150) + '...'
                      : 'No content available'}
                  </p>
                  <div className="post-footer">
                    <div className="post-author">
                      <FiUser className="author-icon" />
                      <span>{post.author || 'Unknown'}</span>
                    </div>
                    
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="read-more-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Read more</span>
                      <motion.div
                        animate={{ x: hoveredCard === post.id ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiArrowRight />
                      </motion.div>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pagination"
          >
            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
              <motion.button
                key={i + 1}
                whileHover={{ scale: 1.1 }}
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

export default Blog;
