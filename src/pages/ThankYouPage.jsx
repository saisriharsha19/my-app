// src/pages/ThankYouPage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome, FiFolderPlus, FiMail } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const ThankYouPage = () => {
  const [confetti, setConfetti] = useState([]);
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
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      rotation: Math.random() * 360
    }));
    setConfetti(particles);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    },
    confettiContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 1
    },
    confetti: {
      position: 'absolute',
      width: '10px',
      height: '10px',
      borderRadius: '2px'
    },
    content: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      padding: '4rem',
      background: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '32px',
      boxShadow: isDark 
        ? '0 30px 80px rgba(0, 0, 0, 0.3)' 
        : '0 30px 80px rgba(0, 0, 0, 0.15)',
      maxWidth: '600px',
      width: '100%',
      border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.1)' : 'transparent'}`
    },
    iconWrapper: {
      position: 'relative',
      display: 'inline-block',
      marginBottom: '2rem'
    },
    icon: {
      fontSize: '6rem',
      color: '#10b981'
    },
    ripple: (delay) => ({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '120px',
      height: '120px',
      border: '3px solid #10b981',
      borderRadius: '50%',
      opacity: 0
    }),
    title: {
      fontSize: '2.5rem',
      fontWeight: 800,
      marginBottom: '1rem',
      color: isDark ? '#f1f5f9' : '#1a1a1a'
    },
    message: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
      color: isDark ? '#cbd5e1' : '#6b7280',
      marginBottom: '2rem'
    },
    emailIndicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      margin: '2rem 0',
      padding: '1rem 2rem',
      background: 'rgba(16, 185, 129, 0.1)',
      borderRadius: '12px',
      color: '#10b981',
      border: '2px solid rgba(16, 185, 129, 0.2)'
    },
    emailIcon: {
      fontSize: '1.5rem'
    },
    actions: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginTop: '2rem',
      flexWrap: 'wrap'
    },
    button: (isPrimary) => ({
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      background: isPrimary 
        ? 'linear-gradient(135deg, #667eea, #764ba2)' 
        : 'transparent',
      color: isPrimary ? '#ffffff' : '#667eea',
      border: isPrimary ? 'none' : '2px solid #667eea'
    }),
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      marginTop: '3rem',
      padding: '2rem',
      background: isDark ? 'rgba(102, 126, 234, 0.05)' : 'rgba(102, 126, 234, 0.05)',
      borderRadius: '16px'
    },
    feature: {
      textAlign: 'center'
    },
    featureIcon: {
      fontSize: '2rem',
      marginBottom: '0.5rem'
    },
    featureText: {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: isDark ? '#cbd5e1' : '#6b7280'
    }
  };

  const confettiColors = ['#667eea', '#764ba2', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div style={styles.container}>
      <div style={styles.confettiContainer}>
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            style={{
              ...styles.confetti,
              left: `${particle.x}%`,
              background: confettiColors[particle.id % confettiColors.length]
            }}
            initial={{ y: -100, rotate: 0, opacity: 1 }}
            animate={{ y: '100vh', rotate: particle.rotation, opacity: 0 }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <motion.div
        style={styles.content}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
      >
        <div style={styles.iconWrapper}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.3
            }}
          >
            <motion.div
              style={styles.icon}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 0.6,
                delay: 0.5
              }}
            >
              <FiCheckCircle />
            </motion.div>
          </motion.div>
          
          {[0, 0.2].map((delay, i) => (
            <motion.div
              key={i}
              style={styles.ripple(delay)}
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.4 + delay }}
            />
          ))}
        </div>

        <motion.h1
          style={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Thank You! 🎉
        </motion.h1>

        <motion.p
          style={styles.message}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Your message has been successfully received.
          <br />
          I'll get back to you as soon as possible!
        </motion.p>

        <motion.div
          style={styles.emailIndicator}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            style={styles.emailIcon}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatDelay: 1
            }}
          >
            <FiMail />
          </motion.div>
          <span style={{ fontWeight: 600 }}>Email sent successfully</span>
        </motion.div>
        
        <motion.div
          style={styles.actions}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link to="/">
            <motion.button
              style={styles.button(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHome /> Back to Home
            </motion.button>
          </Link>

          <Link to="/portfolio">
            <motion.button
              style={styles.button(false)}
              whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFolderPlus /> View My Work
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          style={styles.features}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { icon: '⚡', text: 'Quick Response' },
            { icon: '💼', text: 'Professional' },
            { icon: '✨', text: 'Quality Work' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              style={styles.feature}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div style={styles.featureIcon}>{feature.icon}</div>
              <div style={styles.featureText}>{feature.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .features { grid-template-columns: 1fr !important; }
          .actions { flex-direction: column; width: 100%; }
          .actions button { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage;