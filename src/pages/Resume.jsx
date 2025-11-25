// src/pages/Resume.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiHome, FiMail, FiPhone, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import pdf from "../images/resume.pdf";

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const lastOrientation = useRef(
    window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape'
  );

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
    const handleOrientationChange = () => {
      const newOrientation = window.matchMedia("(orientation: portrait)").matches
        ? 'portrait'
        : 'landscape';
      if (newOrientation !== lastOrientation.current) {
        lastOrientation.current = newOrientation;
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdf;
    link.download = 'SaiSriHarsha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1.5rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      margin: 0
    },
    gradientText: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    actions: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    button: (isPrimary) => ({
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      background: isPrimary 
        ? 'linear-gradient(135deg, #667eea, #764ba2)' 
        : isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
      color: isPrimary ? '#ffffff' : '#667eea',
      border: isPrimary ? 'none' : '2px solid #667eea'
    }),
    viewer: {
      position: 'relative',
      background: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: isDark 
        ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
        : '0 20px 60px rgba(0, 0, 0, 0.08)',
      marginBottom: '2rem',
      minHeight: '600px',
      overflow: 'hidden'
    },
    loading: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      zIndex: 10
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '4px solid rgba(102, 126, 234, 0.2)',
      borderTopColor: '#667eea',
      borderRadius: '50%',
      margin: '0 auto 1rem',
      animation: 'spin 0.8s linear infinite'
    },
    loadingText: {
      color: isDark ? '#cbd5e1' : '#6b7280',
      fontSize: '1rem',
      fontWeight: 600
    },
    pdfContainer: {
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'white'
    },
    contact: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      padding: '2rem',
      background: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '16px',
      boxShadow: isDark 
        ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
        : '0 10px 30px rgba(0, 0, 0, 0.08)'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      background: isDark ? 'rgba(102, 126, 234, 0.05)' : 'rgba(102, 126, 234, 0.05)',
      borderRadius: '12px',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    contactIcon: {
      width: '45px',
      height: '45px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem',
      flexShrink: 0
    },
    contactText: {
      fontSize: '0.95rem',
      fontWeight: 600,
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      wordBreak: 'break-word'
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={styles.title}>
          My <span style={styles.gradientText}>Resume</span>
        </h1>
        <div style={styles.actions}>
          <motion.button
            style={styles.button(true)}
            onClick={handleDownload}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload /> Download PDF
          </motion.button>
          
          <Link to="/">
            <motion.button
              style={styles.button(false)}
              whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHome /> Home
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        style={styles.viewer}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div
              style={styles.loading}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div style={styles.spinner} />
              <p style={styles.loadingText}>Loading Resume...</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div style={styles.pdfContainer}>
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
            <Viewer
              fileUrl={pdf}
              onDocumentLoad={() => setIsLoading(false)}
            />
          </Worker>
        </div>
      </motion.div>

      <motion.div
        style={styles.contact}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {[
          { icon: <FiMail />, text: 'Email Me', href: 'mailto:saisriharshaguddati1@gmail.com' },
          { icon: <FiPhone />, text: 'Call Me', href: 'tel:+13526658709' },
          { icon: <FiLinkedin />, text: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/' }
        ].map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={styles.contactItem}
            whileHover={{ 
              y: -5, 
              background: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.1)',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div style={styles.contactIcon}>{item.icon}</div>
            <span style={styles.contactText}>{item.text}</span>
          </motion.a>
        ))}
      </motion.div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .resume-header { flex-direction: column; align-items: flex-start; }
          .resume-actions { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Resume;