// src/pages/ThankYouPage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome, FiMail } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const ThankYouPage = () => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      rotation: Math.random() * 360
    }));
    setConfetti(particles);
  }, []);

  return (
    <div className="thank-you-page">
      {/* Animated Confetti */}
      <div className="confetti-container">
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            className="confetti-particle"
            initial={{
              y: -100,
              x: `${particle.x}vw`,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              y: '100vh',
              rotate: particle.rotation,
              opacity: 0
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
        className="thank-you-content"
      >
        {/* Success Icon with Animation */}
        <motion.div
          className="success-icon-wrapper"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            delay: 0.3
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 0.6,
              delay: 0.5
            }}
          >
            <FiCheckCircle className="success-icon" />
          </motion.div>
          
          {/* Ripple effect */}
          <motion.div
            className="ripple"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.div
            className="ripple"
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Thank You! 🎉
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="thank-you-message"
        >
          Your message has been successfully received.
          <br />
          I'll get back to you as soon as possible!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="email-sent-indicator"
        >
          <motion.div
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatDelay: 1
            }}
          >
            <FiMail className="email-icon" />
          </motion.div>
          <span>Email sent successfully</span>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="action-buttons"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="return-btn"
            >
              <FiHome /> Back to Home
            </motion.button>
          </Link>

          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="portfolio-btn"
            >
              View My Work
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="thank-you-decoration"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </div>
  );
};

export default ThankYouPage;