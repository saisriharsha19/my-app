// src/pages/FullPost.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft, FiClock, FiUser, FiBookOpen, FiShare2, FiHeart } from 'react-icons/fi';

const FullPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isDark, setIsDark] = useState(false);

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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setReadingProgress(Math.min(Math.max(progress, 0), 100));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`https://backend-482511937770.europe-west1.run.app/blog/${postId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }
        
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching full post:', error);
        setError('Failed to load the post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleGoBack = () => {
    navigate('/blog');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content?.substring(0, 100),
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const styles = {
    progressBar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '3px',
      width: `${readingProgress}%`,
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      transition: 'width 0.1s ease-out',
      zIndex: 9999,
      pointerEvents: 'none'
    },
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '4rem 2rem'
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: 'transparent',
      color: '#667eea',
      border: '2px solid #667eea',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      marginBottom: '2rem',
      transition: 'all 0.3s ease'
    },
    header: {
      marginBottom: '3rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.3,
      margin: '1rem 0',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    meta: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
      marginTop: '1.5rem',
      padding: '1.5rem',
      background: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      boxShadow: isDark 
        ? '0 4px 15px rgba(0, 0, 0, 0.3)' 
        : '0 4px 15px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.1)' : 'transparent'}`
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: isDark ? '#94a3b8' : '#6b7280',
      fontSize: '0.95rem'
    },
    metaIcon: {
      color: '#667eea'
    },
    content: {
      margin: '3rem 0'
    },
    contentWrapper: {
      lineHeight: 1.8,
      fontSize: '1.1rem',
      color: isDark ? '#cbd5e1' : '#374151'
    },
    actions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      paddingTop: '2rem',
      borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      flexWrap: 'wrap'
    },
    actionButton: (isActive) => ({
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontSize: '0.95rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      background: isActive 
        ? 'linear-gradient(135deg, #667eea, #764ba2)' 
        : isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
      color: isActive ? '#ffffff' : '#667eea',
      border: isActive ? 'none' : `2px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`
    }),
    footer: {
      marginTop: '4rem',
      paddingTop: '2rem',
      borderTop: `2px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
      textAlign: 'center'
    },
    footerButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      textDecoration: 'none',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem'
    },
    skeleton: {
      background: isDark 
        ? 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)'
        : 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '8px'
    },
    error: {
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      textAlign: 'center'
    }
  };

  if (error) {
    return (
      <div style={styles.container}>
        <motion.div
          style={styles.error}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            style={{ fontSize: '4rem' }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            😕
          </motion.div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#1a1a1a' }}>
            Oops!
          </h2>
          <p style={{ fontSize: '1.1rem', color: isDark ? '#94a3b8' : '#6b7280' }}>
            {error}
          </p>
          <motion.button
            style={styles.footerButton}
            onClick={handleGoBack}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft /> Go Back to Blog
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div style={{...styles.skeleton, height: '60px', width: '80%', marginBottom: '2rem'}} />
          <div style={{...styles.skeleton, height: '20px', width: '40%', marginBottom: '3rem'}} />
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{...styles.skeleton, height: '20px', width: `${90 - i * 5}%`, marginBottom: '1rem'}} />
          ))}
        </motion.div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={styles.container}>
        <motion.div
          style={styles.error}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p style={{ fontSize: '1.1rem', color: isDark ? '#94a3b8' : '#6b7280' }}>
            Post not found
          </p>
          <motion.button
            style={styles.footerButton}
            onClick={handleGoBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft /> Go Back to Blog
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <div style={styles.progressBar} />

      <motion.button
        style={styles.backButton}
        onClick={handleGoBack}
        whileHover={{ scale: 1.05, x: -5, background: 'rgba(102, 126, 234, 0.1)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FiArrowLeft />
        <span>Back to Articles</span>
      </motion.button>

      <motion.div
        style={styles.header}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1
          style={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {post.title}
        </motion.h1>

        <motion.div
          style={styles.meta}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div style={styles.metaItem}>
            <FiClock style={styles.metaIcon} />
            <time>{new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
          </div>
          <div style={styles.metaItem}>
            <FiUser style={styles.metaIcon} />
            <span>{post.author || 'Anonymous'}</span>
          </div>
          <div style={styles.metaItem}>
            <FiBookOpen style={styles.metaIcon} />
            <span>{Math.ceil(post.content?.length / 1000) || 5} min read</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={styles.content}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div style={styles.contentWrapper}>
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 700, 
                  margin: '2rem 0 1rem',
                  color: isDark ? '#f1f5f9' : '#1a1a1a'
                }}>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  margin: '1.5rem 0 1rem',
                  color: isDark ? '#f1f5f9' : '#1a1a1a'
                }}>
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p style={{ 
                  marginBottom: '1.5rem',
                  color: isDark ? '#cbd5e1' : '#374151'
                }}>
                  {children}
                </p>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code style={{ 
                    background: isDark ? '#0f172a' : '#f3f4f6',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.9em',
                    color: '#667eea'
                  }}>
                    {children}
                  </code>
                ) : (
                  <pre style={{ 
                    background: isDark ? '#0f172a' : '#f3f4f6',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    overflow: 'auto',
                    margin: '1.5rem 0'
                  }}>
                    <code>{children}</code>
                  </pre>
                )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div style={styles.actions}>
          <motion.button
            style={styles.actionButton(liked)}
            onClick={() => setLiked(!liked)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiHeart style={{ fill: liked ? 'currentColor' : 'none' }} />
            <span>{liked ? 'Liked!' : 'Like'}</span>
          </motion.button>

          <motion.button
            style={styles.actionButton(false)}
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShare2 />
            <span>Share</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        style={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          style={styles.footerButton}
          onClick={handleGoBack}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Back to all articles
        </motion.button>
      </motion.div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default FullPost;