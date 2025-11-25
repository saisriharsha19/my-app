// src/pages/Portfolio.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiCode, FiZap } from 'react-icons/fi';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const itemsPerPage = 3;

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

  const projectColors = [
    { from: '#667eea', to: '#764ba2' },
    { from: '#3b82f6', to: '#06b6d4' },
    { from: '#10b981', to: '#059669' },
    { from: '#f59e0b', to: '#ef4444' },
    { from: '#a855f7', to: '#ec4899' },
    { from: '#14b8a6', to: '#06b6d4' }
  ];

  const styles = {
    container: {
      padding: '4rem 2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    headerIcon: {
      fontSize: '3rem',
      color: '#667eea',
      marginBottom: '1rem',
      display: 'inline-block'
    },
    title: {
      fontSize: '3rem',
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
      fontSize: '1.2rem',
      color: isDark ? '#94a3b8' : '#6b7280',
      marginTop: '1rem'
    },
    grid: {
      display: 'grid',
      gap: '2rem',
      marginBottom: '3rem'
    },
    card: (isHovered) => ({
      position: 'relative',
      background: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '24px',
      padding: '3rem',
      overflow: 'hidden',
      boxShadow: isHovered 
        ? '0 30px 60px rgba(102, 126, 234, 0.25)' 
        : isDark 
          ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
          : '0 20px 60px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
      border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.1)' : 'transparent'}`
    }),
    topBar: (color) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '5px',
      background: `linear-gradient(90deg, ${color.from}, ${color.to})`
    }),
    projectNumber: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      fontSize: '4rem',
      fontWeight: 700,
      opacity: 0.05,
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      pointerEvents: 'none'
    },
    iconContainer: (color) => ({
      width: '70px',
      height: '70px',
      background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      marginBottom: '2rem',
      boxShadow: `0 10px 30px ${color.from}40`
    }),
    projectTitle: {
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      lineHeight: 1.3
    },
    description: {
      fontSize: '1.05rem',
      lineHeight: 1.7,
      color: isDark ? '#cbd5e1' : '#6b7280',
      marginBottom: '2rem'
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '2rem',
      paddingTop: '2rem',
      borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
    },
    link: (color) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: `${color.from}15`,
      color: color.from,
      textDecoration: 'none',
      borderRadius: '12px',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      border: `2px solid ${color.from}30`
    }),
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.5rem 1rem',
      background: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: 600
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '3rem',
      flexWrap: 'wrap'
    },
    pageButton: (isActive) => ({
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      border: 'none',
      background: isActive 
        ? 'linear-gradient(135deg, #667eea, #764ba2)' 
        : isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
      color: isActive ? '#ffffff' : (isDark ? '#cbd5e1' : '#1a1a1a'),
      cursor: 'pointer',
      fontWeight: 700,
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      boxShadow: isActive ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none'
    }),
    skeleton: {
      background: isDark 
        ? 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)'
        : 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '12px'
    }
  };

  if (error) {
    return (
      <div style={styles.container}>
        <motion.div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            textAlign: 'center'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            style={{ fontSize: '4rem' }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            😕
          </motion.div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#1a1a1a' }}>
            Oops! Something went wrong
          </h2>
          <p style={{ fontSize: '1.1rem', color: isDark ? '#94a3b8' : '#6b7280' }}>
            {error}
          </p>
          <motion.button
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
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
        <motion.div
          style={styles.headerIcon}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <FiCode />
        </motion.div>
        <h1 style={styles.title}>
          Featured <span style={styles.gradientText}>Projects</span>
        </h1>
        <p style={styles.subtitle}>Innovative solutions I've crafted with passion</p>
      </motion.div>

      {isLoading ? (
        <div style={styles.grid}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              style={{...styles.card(false), padding: '3rem'}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{...styles.skeleton, height: '70px', width: '70px', marginBottom: '2rem'}} />
              <div style={{...styles.skeleton, height: '32px', width: '80%', marginBottom: '1rem'}} />
              <div style={{...styles.skeleton, height: '20px', width: '100%', marginBottom: '0.5rem'}} />
              <div style={{...styles.skeleton, height: '20px', width: '90%', marginBottom: '0.5rem'}} />
              <div style={{...styles.skeleton, height: '20px', width: '70%'}} />
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
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <AnimatePresence mode="wait">
              {currentItems.map((item, index) => {
                const color = projectColors[index % projectColors.length];
                const globalIndex = indexOfFirstItem + index;
                
                return (
                  <motion.div
                    key={item.id}
                    style={styles.card(hoveredItem === item.id)}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <div style={styles.topBar(color)} />
                    <div style={styles.projectNumber}>{String(globalIndex + 1).padStart(2, '0')}</div>

                    <motion.div
                      style={styles.iconContainer(color)}
                      animate={{
                        rotate: hoveredItem === item.id ? 360 : 0,
                        scale: hoveredItem === item.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <FiGithub />
                    </motion.div>

                    <h2 style={styles.projectTitle}>{item.title}</h2>
                    <p style={styles.description}>{item.description}</p>

                    <div style={styles.footer}>
                      <div style={styles.badge}>
                        <FiZap />
                        <span>Active Project</span>
                      </div>

                      <motion.a
                        href={item.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link(color)}
                        whileHover={{
                          scale: 1.05,
                          background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                          color: '#ffffff',
                          borderColor: 'transparent'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Project</span>
                        <FiExternalLink />
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {items.length > itemsPerPage && (
            <motion.div
              style={styles.pagination}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => (
                <motion.button
                  key={i + 1}
                  style={styles.pageButton(currentPage === i + 1)}
                  onClick={() => setCurrentPage(i + 1)}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
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
        @media (max-width: 768px) {
          h1 { font-size: 2rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;