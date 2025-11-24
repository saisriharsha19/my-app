// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiZap, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import profileImage from '../images/IMG_6153.jpeg';

const Home = () => {
  const typewriterTexts = useMemo(() => [
    "I'm a Software Development/AIML Engineer!!",
    "I build creative solutions. ✨",
    "I love coding innovative projects!!!"
  ], []);

  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    { icon: <FiCode />, text: "Full-Stack Dev" },
    { icon: <FiCpu />, text: "AI/ML Engineering" },
    { icon: <FiZap />, text: "Cloud Solutions" }
  ];

  return (
    <div className="home-page">
      {/* Animated Background */}
      <div className="background-animation">
        <motion.div
          className="floating-shape shape-1"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div
          className="floating-shape shape-2"
          animate={{
            x: mousePosition.x * -0.03,
            y: mousePosition.y * -0.03,
          }}
          transition={{ type: "spring", stiffness: 30 }}
        />
      </div>

      <div className="home-content-wrapper">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="home-content"
        >
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="greeting"
          >
            👋 Hey, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="name"
          >
            <span className="gradient-text">Sai Sri Harsha</span>
            <br />
            Guddati
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="typewriter"
          >
            {text}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="cursor"
            >
              |
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="skills-badges"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="skill-badge"
              >
                {skill.icon}
                <span>{skill.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="cta-buttons"
          >
            <Link to="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="primary-btn"
              >
                View My Work <FiArrowRight />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="secondary-btn"
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="home-image"
        >
          <div className="image-decoration">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="decoration-ring"
            />
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="decoration-ring ring-2"
            />
          </div>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={profileImage}
            alt="Sai Sri Harsha"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bio-section"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-divider"
        />

        <div className="bio-content">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About <span className="gradient-text">Me</span>
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
    </div>
  );
};

export default Home;