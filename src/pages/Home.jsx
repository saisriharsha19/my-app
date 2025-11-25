// src/pages/Home.jsx - Modern Design with Rich Animations
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiZap, FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import profileImage from '../images/IMG_6153.jpeg';

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);

  const typewriterTexts = useMemo(() => [
    "I'm a Software Development/AIML Engineer!!",
    "I build creative solutions. ✨",
    "I love coding innovative projects!!!"
  ], []);

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
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (isTyping) {
        if (charIndex < typewriterTexts[index].length) {
          setText(prevText => prevText + typewriterTexts[index].charAt(charIndex));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsTyping(false), 1500);
        }
      } else {
        if (charIndex > 0) {
          setText(prevText => prevText.slice(0, -1));
          setCharIndex(charIndex - 1);
        } else {
          setIsTyping(true);
          setIndex((index + 1) % typewriterTexts.length);
        }
      }
    }, isTyping ? 100 : 50);
    return () => clearTimeout(interval);
  }, [text, isTyping, charIndex, index, typewriterTexts]);

  const skills = [
    { icon: <FiCode />, text: "Full-Stack Dev", color: '#667eea' },
    { icon: <FiCpu />, text: "AI/ML Engineering", color: '#10b981' },
    { icon: <FiZap />, text: "Cloud Solutions", color: '#f59e0b' }
  ];

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/saisriharsha19', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/', label: 'LinkedIn' },
    { icon: <FiMail />, url: 'mailto:saisriharshaguddati1@gmail.com', label: 'Email' }
  ];

  // Generate floating particles
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    })), []
  );

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0
    },
    animatedBackground: {
      position: 'absolute',
      inset: 0,
      background: isDark 
        ? 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)'
        : 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)',
      animation: 'backgroundPulse 8s ease-in-out infinite'
    },
    shape: (index) => ({
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(80px)',
      opacity: 0.3,
      ...(index === 0 && {
        width: 'clamp(200px, 40vw, 400px)',
        height: 'clamp(200px, 40vw, 400px)',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        top: '10%',
        left: '10%'
      }),
      ...(index === 1 && {
        width: 'clamp(150px, 30vw, 300px)',
        height: 'clamp(150px, 30vw, 300px)',
        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
        bottom: '20%',
        right: '15%'
      })
    }),
    particle: (particle) => ({
      position: 'absolute',
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      borderRadius: '50%',
      background: isDark 
        ? 'rgba(102, 126, 234, 0.4)' 
        : 'rgba(102, 126, 234, 0.3)',
      boxShadow: `0 0 ${particle.size * 2}px rgba(102, 126, 234, 0.6)`
    }),
    gridPattern: {
      position: 'absolute',
      inset: 0,
      backgroundImage: isDark
        ? 'linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px)'
        : 'linear-gradient(rgba(102, 126, 234, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.02) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
      opacity: 0.5
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '3rem',
      alignItems: 'center',
      minHeight: '80vh'
    },
    content: {
      padding: '1rem 0',
      textAlign: 'center'
    },
    greeting: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
      color: '#667eea',
      marginBottom: '0.5rem',
      fontWeight: 600
    },
    name: {
      fontSize: 'clamp(2rem, 6vw, 4rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      marginBottom: '1.5rem',
      color: isDark ? '#f1f5f9' : '#1a1a1a'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    typewriter: {
      fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
      minHeight: '2.5rem',
      color: isDark ? '#cbd5e1' : '#6b7280',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    cursor: {
      display: 'inline-block',
      marginLeft: '2px'
    },
    skillsBadges: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      margin: '2rem 0',
      justifyContent: 'center'
    },
    skillBadge: (color) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.25rem',
      background: isDark ? 'rgba(102, 126, 234, 0.1)' : '#ffffff',
      borderRadius: '50px',
      boxShadow: isDark 
        ? '0 4px 15px rgba(0, 0, 0, 0.2)' 
        : '0 4px 15px rgba(0, 0, 0, 0.1)',
      fontWeight: 600,
      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      border: `2px solid ${color}15`,
      transition: 'all 0.3s ease'
    }),
    skillIcon: (color) => ({
      color: color,
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      flexShrink: 0
    }),
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    button: (isPrimary) => ({
      padding: '0.875rem 1.75rem',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      background: isPrimary 
        ? 'linear-gradient(135deg, #667eea, #764ba2)' 
        : 'transparent',
      color: isPrimary ? '#ffffff' : '#667eea',
      border: isPrimary ? 'none' : '2px solid #667eea',
      boxShadow: isPrimary ? '0 10px 30px rgba(102, 126, 234, 0.4)' : 'none',
      whiteSpace: 'nowrap'
    }),
    imageContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      order: -1,
      padding: '2rem'
    },
    imageWrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: 'min(450px, 85vw)',
      aspectRatio: '1 / 1'
    },
    blobContainer: {
      position: 'absolute',
      inset: '-20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    blob: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
      filter: 'blur(30px)',
      opacity: 0.4,
      animation: 'blobMorph 8s ease-in-out infinite',
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
    },
    imageFrame: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
      overflow: 'hidden',
      background: isDark ? '#1e293b' : '#ffffff',
      boxShadow: '0 40px 80px rgba(0, 0, 0, 0.3)',
      border: `3px solid ${isDark ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'}`,
      animation: 'shapeMorph 10s ease-in-out infinite'
    },
    glassOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
      backdropFilter: 'blur(10px)',
      pointerEvents: 'none'
    },
    profileImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    },
    floatingElements: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none'
    },
    floatingRing: (index) => ({
      position: 'absolute',
      borderRadius: '50%',
      border: '2px solid rgba(102, 126, 234, 0.2)',
      ...(index === 0 && {
        width: '120%',
        height: '120%',
        top: '-10%',
        left: '-10%'
      }),
      ...(index === 1 && {
        width: '140%',
        height: '140%',
        top: '-20%',
        left: '-20%'
      })
    }),
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      justifyContent: 'center'
    },
    socialLink: {
      width: '45px',
      height: '45px',
      borderRadius: '12px',
      background: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#667eea',
      fontSize: '1.3rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: `2px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`
    },
    bioSection: {
      maxWidth: '900px',
      margin: '4rem auto 3rem',
      padding: '0 1rem',
      position: 'relative',
      zIndex: 10
    },
    divider: {
      height: '3px',
      background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
      marginBottom: '2rem'
    },
    bioContent: {
      lineHeight: 1.8
    },
    bioTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      marginBottom: '1.5rem',
      textAlign: 'center',
      color: isDark ? '#f1f5f9' : '#1a1a1a'
    },
    bioParagraph: {
      marginBottom: '1.5rem',
      color: isDark ? '#cbd5e1' : '#6b7280',
      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
      textAlign: 'left'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        {/* Animated gradient background */}
        <div style={styles.animatedBackground} />
        
        {/* Grid pattern */}
        <div style={styles.gridPattern} />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            style={styles.particle(particle)}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient blobs */}
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            style={styles.shape(i)}
            animate={{
              x: mousePosition.x * (i === 0 ? 0.02 : -0.03),
              y: mousePosition.y * (i === 0 ? 0.02 : -0.03),
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              x: { type: "spring", stiffness: 50 },
              y: { type: "spring", stiffness: 50 },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </div>

      <div style={styles.contentWrapper}>
        <motion.div
          style={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            style={styles.imageWrapper}
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Morphing blob background */}
            <div style={styles.blobContainer}>
              <div style={styles.blob} />
            </div>

            {/* Floating rings */}
            <div style={styles.floatingElements}>
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  style={styles.floatingRing(i)}
                  animate={{
                    rotate: i === 0 ? 360 : -360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    rotate: {
                      duration: 20 + i * 10,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
              ))}
            </div>

            {/* Image frame with morphing shape */}
            <div style={styles.imageFrame}>
              <motion.img
                style={styles.profileImage}
                src={profileImage}
                alt="Sai Sri Harsha"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div style={styles.glassOverlay} />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={styles.content}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            style={styles.greeting}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            👋 Hey, I'm
          </motion.p>

          <motion.h1
            style={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span style={styles.gradientText}>Sai Sri Harsha</span>
            <br />
            Guddati
          </motion.h1>

          <motion.p
            style={styles.typewriter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {text}
            <motion.span
              style={styles.cursor}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              |
            </motion.span>
          </motion.p>

          <motion.div
            style={styles.skillsBadges}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                style={styles.skillBadge(skill.color)}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  boxShadow: `0 8px 25px ${skill.color}40`
                }}
              >
                <span style={styles.skillIcon(skill.color)}>{skill.icon}</span>
                <span>{skill.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            style={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Link to="/portfolio">
              <motion.button
                style={styles.button(true)}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work <FiArrowRight />
              </motion.button>
            </Link>

            <Link to="/contact">
              <motion.button
                style={styles.button(false)}
                whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            style={styles.socialLinks}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: '#ffffff',
                  borderColor: 'transparent'
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={styles.bioSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <motion.div
          style={styles.divider}
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        <div style={styles.bioContent}>
          <motion.h3
            style={styles.bioTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About <span style={styles.gradientText}>Me</span>
          </motion.h3>

          {[
            "I'm a software engineer and AI enthusiast, currently pursuing my Master's in Computer Science at the University of Florida. My work lies at the intersection of backend systems, AI infrastructure, and real-world problem-solving—turning cutting-edge ideas into scalable, production-grade tools.",
            "At UF Information Technology, I work as an AI Engineer Intern, developing intelligent assistants powered by LLMs, integrating NeMo Guardrails, Redis, FastAPI, and PostgreSQL. Previously, at Tata Consultancy Services, I led the development of cloud-based AI platforms using Python, Flask, and Azure.",
            "My projects span across areas like prompt optimization systems, RAG pipelines, browser privacy extensions, web scrapers, and even sentiment-aware social platforms. I'm passionate about building with purpose—whether it's deploying secure AI workflows, visualizing real-time data, or engineering privacy-first tools using OCR, LLMs, and DOM parsing.",
            "Outside of work, I enjoy shipping side projects, experimenting with streaming LLM APIs, and refining AI evaluation systems. I'm a strong believer in thoughtful design, clean code, and pushing the limits of what tech can do—always with a human-first mindset.",
            "Thanks for stopping by! If you're building something meaningful—or just want to jam on ideas—I'd love to connect."
          ].map((paragraph, index) => (
            <motion.p
              key={index}
              style={styles.bioParagraph}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes blobMorph {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
          }
          75% {
            border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%;
          }
        }

        @keyframes shapeMorph {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
          }
          75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
          }
        }

        @keyframes backgroundPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @media (min-width: 768px) {
          .home-content-wrapper { 
            grid-template-columns: 1.2fr 1fr !important; 
            text-align: left !important;
          }
          .home-content {
            text-align: left !important;
          }
          .home-greeting {
            text-align: left !important;
          }
          .home-typewriter {
            justify-content: flex-start !important;
          }
          .skills-badges {
            justify-content: flex-start !important;
          }
          .cta-buttons {
            justify-content: flex-start !important;
          }
          .social-links {
            justify-content: flex-start !important;
          }
          .image-container {
            order: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;