// src/pages/Blog.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUser, FiArrowRight, FiRefreshCw, FiSearch } from 'react-icons/fi';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useState(false);
  const postsPerPage = 6;

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
    
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      setIsDark(newTheme === 'dark');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, []);

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
    if (isNaN(formattedDate)) {
      return "Invalid Date";
    }
    return formattedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const styles = {
    container: {
      padding: '2rem 1rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 800,
      marginBottom: '1rem',
      color: isDark ? '#f1f5f9' : '#1a1a1a'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      color: isDark ? '#94a3b8' : '#6b7280',
      marginTop: '1rem'
    },
    searchContainer: {
      maxWidth: '600px',
      margin: '2rem auto 0',
      position: 'relative',
      padding: '0 1rem'
    },
    searchInput: {
      width: '100%',
      padding: '1rem 1rem 1rem 3rem',
      borderRadius: '12px',
      border: `2px solid ${isDark ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'}`,
      background: isDark ? '#1e293b' : '#ffffff',
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    searchIcon: {
      position: 'absolute',
      left: '1.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#667eea',
      fontSize: '1.2rem',
      pointerEvents: 'none'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem',
      padding: '0 1rem'
    },
    card: (isHovered) => ({
      position: 'relative',
      background: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '20px',
      padding: '1.5rem',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isHovered 
        ? '0 20px 50px rgba(102, 126, 234, 0.25)' 
        : isDark 
          ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
          : '0 10px 30px rgba(0, 0, 0, 0.1)',
      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.1)' : 'transparent'}`
    }),
    // REMOVED cardTopBar style from here
    cardGradient: (isHovered) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
      opacity: isHovered ? 1 : 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none'
    }),
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
      color: isDark ? '#94a3b8' : '#6b7280',
      fontSize: '0.85rem',
      position: 'relative',
      zIndex: 1,
      flexWrap: 'wrap'
    },
    postTitle: {
      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
      fontWeight: 700,
      marginBottom: '1rem',
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      lineHeight: 1.4,
      position: 'relative',
      zIndex: 1
    },
    excerpt: {
      color: isDark ? '#cbd5e1' : '#6b7280',
      lineHeight: 1.6,
      marginBottom: '1.5rem',
      position: 'relative',
      zIndex: 1,
      fontSize: 'clamp(0.9rem, 2vw, 1rem)'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      position: 'relative',
      zIndex: 1,
      gap: '1rem',
      flexWrap: 'wrap'
    },
    author: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: isDark ? '#94a3b8' : '#6b7280',
      fontSize: '0.85rem'
    },
    readMore: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#667eea',
      fontWeight: 600,
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      background: 'rgba(102, 126, 234, 0.1)',
      transition: 'all 0.3s ease',
      fontSize: '0.85rem',
      whiteSpace: 'nowrap'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '3rem',
      flexWrap: 'wrap',
      padding: '0 1rem'
    },
    pageButton: (isActive) => ({
      width: '40px',
      height: '40px',
      borderRadius: '12px',
      border: 'none',
      background: isActive 
        ? 'linear-gradient(135deg, #667eea, #764ba2)' 
        : isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
      color: isActive ? '#ffffff' : (isDark ? '#cbd5e1' : '#1a1a1a'),
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      boxShadow: isActive ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
      fontSize: '0.9rem'
    }),
    skeleton: {
      background: isDark 
        ? 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)'
        : 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '8px'
    },
    errorContainer: {
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      textAlign: 'center',
      padding: '2rem'
    },
    errorIcon: {
      fontSize: 'clamp(2.5rem, 8vw, 4rem)'
    },
    errorTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 700,
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      margin: 0
    },
    errorText: {
      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
      color: isDark ? '#94a3b8' : '#6b7280',
      margin: 0
    },
    retryButton: {
      padding: '0.875rem 1.75rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    }
  };

  if (error) {
    return (
      <div style={styles.container}>
        <motion.div
          style={styles.errorContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            style={styles.errorIcon}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            😕
          </motion.div>
          <h2 style={styles.errorTitle}>Oops! Something went wrong</h2>
          <p style={styles.errorText}>{error}</p>
          <motion.button
            style={styles.retryButton}
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw /> Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={styles.title}>
          <span style={styles.gradientText}>Latest</span> Articles
        </h1>
        <p style={styles.subtitle}>Thoughts, stories and ideas</p>
        <div style={styles.searchContainer}>
          <FiSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search articles..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'}
          />
        </div>
      </motion.div>

      {isLoading ? (
        <div style={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              style={{...styles.card(false), padding: '1.5rem'}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{...styles.skeleton, height: '12px', width: '30%', marginBottom: '1rem'}} />
              <div style={{...styles.skeleton, height: '24px', width: '80%', marginBottom: '1rem'}} />
              <div style={{...styles.skeleton, height: '16px', width: '100%', marginBottom: '0.5rem'}} />
              <div style={{...styles.skeleton, height: '16px', width: '90%', marginBottom: '0.5rem'}} />
              <div style={{...styles.skeleton, height: '16px', width: '60%'}} />
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          <motion.div
            style={styles.grid}
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
                  style={styles.card(hoveredCard === post.id)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  onHoverStart={() => setHoveredCard(post.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  {/* REMOVED the div that was using styles.cardTopBar here */}
                  <div style={styles.cardGradient(hoveredCard === post.id)} />
                  
                  <div style={styles.meta}>
                    <FiClock />
                    <time>{formatDate(post.created_at)}</time>
                  </div>
                  <h2 style={styles.postTitle}>{post.title}</h2>
                  
                  <p style={styles.excerpt}>
                    {post.content
                      ? post.content.substring(0, 150) + '...'
                      : 'No content available'}
                  </p>
                  <div style={styles.footer}>
                    <div style={styles.author}>
                      <FiUser />
                      <span>{post.author || 'Unknown'}</span>
                    </div>
                    
                    <Link 
                      to={`/blog/${post.id}`} 
                      style={styles.readMore}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span>Read more</span>
                      <FiArrowRight />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPosts.length > postsPerPage && (
            <motion.div
              style={styles.pagination}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
                <motion.button
                  key={i + 1}
                  style={styles.pageButton(currentPage === i + 1)}
                  onClick={() => paginate(i + 1)}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {i + 1}
                </motion.button>
              ))}
            </motion.div>
          )}
        </>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Blog;