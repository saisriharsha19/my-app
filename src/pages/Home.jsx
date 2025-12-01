// src/pages/Home.jsx - Performance Optimized Version
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiZap, FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import profileImage from '../images/IMG_6153.webp';

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const typewriterTexts = useMemo(() => [
    "I'm a Software Development/AIML Engineer!!",
    "I build creative solutions. ✨",
    "I love coding innovative projects!!!"
  ], []);

  // Optimized theme detection with cleanup
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

  // Optimized typewriter with useCallback
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

  const skills = useMemo(() => [
    { icon: <FiCode />, text: "Full-Stack Dev", color: '#667eea' },
    { icon: <FiCpu />, text: "AI/ML Engineering", color: '#10b981' },
    { icon: <FiZap />, text: "Cloud Solutions", color: '#f59e0b' }
  ], []);

  const socialLinks = useMemo(() => [
    { icon: <FiGithub />, url: 'https://github.com/saisriharsha19', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/', label: 'LinkedIn' },
    { icon: <FiMail />, url: 'mailto:saisriharshaguddati1@gmail.com', label: 'Email' }
  ], []);

  // Reduced particles from 15 to 8 for performance
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 5
    })), []
  );

  // Memoized bio paragraphs
  const bioParagraphs = useMemo(() => [
    "I'm a software engineer and AI enthusiast, currently pursuing my Master's in Computer Science at the University of Florida. My work lies at the intersection of backend systems, AI infrastructure, and real-world problem-solving—turning cutting-edge ideas into scalable, production-grade tools.",
    "At UF Information Technology, I work as an AI Engineer Intern, developing intelligent assistants powered by LLMs, integrating NeMo Guardrails, Redis, FastAPI, and PostgreSQL. Previously, at Tata Consultancy Services, I led the development of cloud-based AI platforms using Python, Flask, and Azure.",
    "My projects span across areas like prompt optimization systems, RAG pipelines, browser privacy extensions, web scrapers, and even sentiment-aware social platforms. I'm passionate about building with purpose—whether it's deploying secure AI workflows, visualizing real-time data, or engineering privacy-first tools using OCR, LLMs, and DOM parsing.",
    "Outside of work, I enjoy shipping side projects, experimenting with streaming LLM APIs, and refining AI evaluation systems. I'm a strong believer in thoughtful design, clean code, and pushing the limits of what tech can do—always with a human-first mindset.",
    "Thanks for stopping by! If you're building something meaningful—or just want to jam on ideas—I'd love to connect."
  ], []);

  return (
    <div className="home-container">
      <div className="home-background">
        {/* Optimized animated gradient background */}
        <motion.div 
          className="animated-background"
          animate={{
            background: isDark 
              ? [
                  'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(118, 75, 162, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%)'
                ]
              : [
                  'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.08) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(118, 75, 162, 0.08) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.08) 0%, transparent 50%)'
                ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid pattern */}
        <motion.div 
          className={`grid-pattern ${isDark ? 'dark' : 'light'}`}
          animate={{ 
            backgroundPosition: ['0px 0px', '60px 60px']
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />

        {/* Optimized floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`particle ${isDark ? 'dark' : 'light'}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: ['0vh', '-100vh'],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear"
            }}
          />
        ))}

        {/* Optimized gradient blobs - reduced to 2 for performance */}
        <motion.div
          className="shape shape-1"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="shape shape-2"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="home-content-wrapper">
        <motion.div
          className="image-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="image-wrapper"
            animate={{ 
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="blob-background"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="floating-rings">
              <motion.div
                className="floating-ring ring-1"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: {
                    duration: 20,
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
              <motion.div
                className="floating-ring ring-2"
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: {
                    duration: 30,
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
            </div>

            <motion.div 
              className={`image-frame ${isDark ? 'dark' : 'light'}`}
              animate={{
                borderRadius: [
                  '30% 70% 70% 30% / 30% 30% 70% 70%',
                  '60% 40% 30% 70% / 60% 70% 30% 40%',
                  '40% 60% 60% 40% / 50% 40% 60% 50%',
                  '30% 70% 70% 30% / 30% 30% 70% 70%'
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                className="profile-image"
                src={profileImage}
                alt="Sai Sri Harsha"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="home-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="home-greeting"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            👋 Hey, I'm
          </motion.p>

          <motion.h1
            className={`home-name ${isDark ? 'dark' : 'light'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="gradient-text">Sai Sri Harsha</span>
            <br />
            Guddati
          </motion.h1>

          <motion.p
            className={`home-typewriter ${isDark ? 'dark' : 'light'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {text}
            <motion.span
              className="cursor"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >|
            </motion.span>
          </motion.p>

          <motion.div
            className="skills-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                className={`skill-badge ${isDark ? 'dark' : 'light'}`}
                style={{ 
                  borderColor: `${skill.color}15`,
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: `0 8px 25px ${skill.color}40`
                }}
              >
                <span className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </span>
                <span>{skill.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Link to="/portfolio">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work <FiArrowRight />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="social-links"
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
                className={`social-link ${isDark ? 'dark' : 'light'}`}
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
        className="bio-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <motion.div
          className="divider"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <div className="bio-content">
          <motion.h3
            className={`bio-title ${isDark ? 'dark' : 'light'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h3>
          {bioParagraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className={`bio-paragraph ${isDark ? 'dark' : 'light'}`}
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
        /* Performance optimized with CSS classes */
        .home-container {
          min-height: 100vh;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .home-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .animated-background {
          position: absolute;
          inset: 0;
          will-change: background;
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-size: 60px 60px;
          opacity: 0.4;
          will-change: background-position;
        }

        .grid-pattern.dark {
          background-image: linear-gradient(rgba(102, 126, 234, 0.05) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(102, 126, 234, 0.05) 1px, transparent 1px);
        }

        .grid-pattern.light {
          background-image: linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px);
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          will-change: transform, opacity;
        }

        .particle.dark {
          background: rgba(102, 126, 234, 0.6);
          box-shadow: 0 0 15px rgba(102, 126, 234, 0.8);
        }

        .particle.light {
          background: rgba(102, 126, 234, 0.4);
          box-shadow: 0 0 15px rgba(102, 126, 234, 0.8);
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          will-change: transform;
        }

        .shape-1 {
          width: clamp(250px, 45vw, 500px);
          height: clamp(250px, 45vw, 500px);
          background: linear-gradient(135deg, #667eea, #764ba2);
          top: 5%;
          left: 5%;
        }

        .shape-2 {
          width: clamp(200px, 35vw, 400px);
          height: clamp(200px, 35vw, 400px);
          background: linear-gradient(135deg, #f093fb, #f5576c);
          bottom: 10%;
          right: 10%;
        }

        .home-content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          min-height: 80vh;
        }

        .home-content {
          padding: 1rem 0;
          text-align: center;
        }

        .home-greeting {
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: #667eea;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .home-name {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .home-name.dark { color: #f1f5f9; }
        .home-name.light { color: #1a1a1a; }

        .gradient-text {
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .home-typewriter {
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          min-height: 2.5rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .home-typewriter.dark { color: #cbd5e1; }
        .home-typewriter.light { color: #6b7280; }
        
        .cursor {
          display: inline-block;
          margin-left: 2px;
        }

        .skills-badges {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin: 2rem 0;
          justify-content: center;
        }

        .skill-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: clamp(0.8rem, 1.5vw, 0.9rem);
          border: 2px solid;
          transition: all 0.3s ease;
          will-change: transform;
        }

        .skill-badge.dark {
          background: rgba(102, 126, 234, 0.1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          color: #f1f5f9;
        }

        .skill-badge.light {
          background: #ffffff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          color: #1a1a1a;
        }

        .skill-icon {
          font-size: clamp(1rem, 2vw, 1.2rem);
          flex-shrink: 0;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 0.875rem 1.75rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: clamp(0.9rem, 2vw, 1rem);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          text-decoration: none;
          white-space: nowrap;
          will-change: transform;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #ffffff;
          border: none;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: center;
        }

        .social-link {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
          font-size: 1.3rem;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid;
          will-change: transform;
        }

        .social-link.dark {
          background: rgba(102, 126, 234, 0.1);
          border-color: rgba(102, 126, 234, 0.2);
        }

        .social-link.light {
          background: rgba(102, 126, 234, 0.05);
          border-color: rgba(102, 126, 234, 0.15);
        }

        .image-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          order: -1;
          padding: 2rem;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          max-width: min(450px, 85vw);
          aspect-ratio: 1 / 1;
          will-change: transform;
        }

        .blob-background {
          position: absolute;
          inset: -30px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          filter: blur(40px);
          opacity: 0.3;
          z-index: 1;
          border-radius: 50%;
          will-change: transform;
        }

        .floating-rings {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .floating-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(102, 126, 234, 0.15);
          will-change: transform;
        }

        .ring-1 {
          width: 115%;
          height: 115%;
          top: -7.5%;
          left: -7.5%;
        }

        .ring-2 {
          width: 130%;
          height: 130%;
          top: -15%;
          left: -15%;
        }

        .image-frame {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          z-index: 2;
          will-change: border-radius;
        }

        .image-frame.dark {
          background: #1e293b;
          border: 3px solid rgba(102, 126, 234, 0.3);
        }

        .image-frame.light {
          background: #ffffff;
          border: 3px solid rgba(102, 126, 234, 0.2);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .bio-section {
          max-width: 900px;
          margin: 4rem auto 3rem;
          padding: 0 1rem;
          position: relative;
          z-index: 10;
        }

        .divider {
          height: 3px;
          background: linear-gradient(90deg, transparent, #667eea, transparent);
          margin-bottom: 2rem;
        }

        .bio-content {
          line-height: 1.8;
        }

        .bio-title {
          font-size: clamp(1.5rem, 4vw, 2rem);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .bio-title.dark { color: #f1f5f9; }
        .bio-title.light { color: #1a1a1a; }

        .bio-paragraph {
          margin-bottom: 1.5rem;
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          text-align: left;
        }

        .bio-paragraph.dark { color: #cbd5e1; }
        .bio-paragraph.light { color: #6b7280; }

        @media (min-width: 768px) {
          .home-content-wrapper { 
            grid-template-columns: 1.2fr 1fr !important; 
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

        /* Performance optimization: Reduce animations on low-end devices */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;