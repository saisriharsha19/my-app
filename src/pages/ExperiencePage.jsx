// src/pages/ExperiencePage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiHome, FiFileText, FiMapPin, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

const ExperiencePage = () => {
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

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "University of Florida Information Technology",
      location: "Gainesville, FL",
      duration: "May 2025 - Present",
      color: { from: '#667eea', to: '#764ba2' },
      description: [
        "Architected and deployed a distributed full-stack AI platform using FastAPI, Next.js, Celery, and Redis, serving 30,000+ users with 99.9% uptime.",
        "Built and maintained 15+ production microservices on Docker and Kubernetes handling 100,000+ daily requests for AI chat applications.",
        "Unified 6+ LLMs behind a load-balanced API gateway, reducing latency by 40% and supporting 55,000+ monthly active users.",
        "Implemented comprehensive monitoring with Prometheus and Grafana to maintain sub-second response times and optimize system performance."
      ],
    },
    {
      title: "Software Development Engineer",
      company: "Tata Consultancy Services (TCS)",
      location: "Hyderabad, India",
      duration: "Aug 2022 - Dec 2023",
      color: { from: '#10b981', to: '#059669' },
      description: [
        "Designed and shipped enterprise-scale backend systems using Python (Flask) and React, deployed on Azure Kubernetes Service (AKS).",
        "Optimized PostgreSQL and MSSQL clusters managing 10M+ records, utilizing advanced indexing to reduce query latency by 50%.",
        "Engineered CI/CD pipelines with Terraform and Azure DevOps, reducing deployment time by 40% and achieving zero production incidents.",
        "Delivered RAG systems using Pinecone and LLMs to automate code refactoring and legacy data modernization for Fortune 500 clients."
      ],
    },
    {
      title: "Software Development Engineer Intern",
      company: "Internshala",
      location: "Remote",
      duration: "May 2021 - Aug 2021",
      color: { from: '#f59e0b', to: '#ef4444' },
      description: [
        "Developed high-throughput Java Spring Boot microservices for real-time transaction processing, handling over 10,000 transactions per second.",
        "Implemented an event-driven architecture using Apache Kafka to process 500,000+ events per day with exactly-once semantics.",
        "Optimized API latency by 30% through thread pool management and efficient connection pooling strategies."
      ],
    },
  ];

  const styles = {
    container: {
      padding: '2rem 1rem',
      maxWidth: '1200px',
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
    timeline: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      position: 'relative',
      paddingLeft: '0'
    },
    timelineLine: {
      position: 'absolute',
      left: '15px',
      top: '40px',
      bottom: '40px',
      width: '2px',
      background: `linear-gradient(180deg, ${isDark ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'}, transparent)`,
      display: 'none'
    },
    card: (color) => ({
      position: 'relative',
      background: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '20px',
      padding: '2rem',
      marginLeft: '0',
      boxShadow: isDark 
        ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
        : '0 10px 40px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.1)' : 'transparent'}`,
      borderLeft: `4px solid ${color.from}`
    }),
    timelineDot: (color) => ({
      position: 'absolute',
      left: '-2.5rem',
      top: '2.5rem',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
      border: `3px solid ${isDark ? '#1e293b' : '#ffffff'}`,
      boxShadow: `0 0 0 4px ${color.from}20, 0 0 20px ${color.from}40`,
      zIndex: 2,
      display: 'none'
    }),
    cardHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    icon: (color) => ({
      width: '50px',
      height: '50px',
      background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.5rem',
      flexShrink: 0,
      boxShadow: `0 8px 24px ${color.from}40`
    }),
    content: {
      flex: 1,
      minWidth: 0
    },
    jobTitle: {
      fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
      fontWeight: 700,
      marginBottom: '0.5rem',
      color: isDark ? '#f1f5f9' : '#1a1a1a',
      lineHeight: 1.3
    },
    company: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      fontWeight: 600,
      color: '#667eea',
      marginBottom: '0.75rem'
    },
    meta: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '1.5rem'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
      color: isDark ? '#94a3b8' : '#6b7280'
    },
    metaIcon: {
      color: '#667eea',
      flexShrink: 0
    },
    description: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    point: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      lineHeight: 1.7,
      color: isDark ? '#cbd5e1' : '#6b7280'
    },
    bullet: {
      color: '#667eea',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      flexShrink: 0,
      marginTop: '0.1rem'
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '3rem',
      flexWrap: 'wrap',
      padding: '0 1rem'
    },
    button: (isPrimary) => ({
      padding: '0.875rem 1.75rem',
      borderRadius: '12px',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
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
      border: isPrimary ? 'none' : '2px solid #667eea',
      whiteSpace: 'nowrap'
    })
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={styles.title}>
          My <span style={styles.gradientText}>Journey</span>
        </h1>
        <p style={styles.subtitle}>Building the future, one experience at a time</p>
      </motion.div>

      <div style={styles.timeline}>
        <div style={styles.timelineLine} />
        
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            style={{ position: 'relative' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div style={styles.timelineDot(exp.color)} />
            
            <motion.div
              style={styles.card(exp.color)}
              whileHover={{ 
                y: -5,
                boxShadow: isDark 
                  ? '0 20px 50px rgba(0, 0, 0, 0.4)' 
                  : '0 20px 50px rgba(0, 0, 0, 0.12)'
              }}
            >
              <div style={styles.cardHeader}>
                <motion.div
                  style={styles.icon(exp.color)}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiBriefcase />
                </motion.div>
                <div style={styles.content}>
                  <h2 style={styles.jobTitle}>{exp.title}</h2>
                  <h3 style={styles.company}>{exp.company}</h3>
                  
                  <div style={styles.meta}>
                    <div style={styles.metaItem}>
                      <FiCalendar style={styles.metaIcon} />
                      <span>{exp.duration}</span>
                    </div>
                    <div style={styles.metaItem}>
                      <FiMapPin style={styles.metaIcon} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul style={styles.description}>
                {exp.description.map((point, i) => (
                  <motion.li
                    key={i}
                    style={styles.point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span style={styles.bullet}>▸</span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        style={styles.actions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link to="/">
          <motion.button
            style={styles.button(false)}
            whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.15)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FiHome /> Back Home
          </motion.button>
        </Link>
        
        <Link to="/resume">
          <motion.button
            style={styles.button(true)}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FiFileText /> View Resume
          </motion.button>
        </Link>
      </motion.div>

      <style>{`
        @media (min-width: 768px) {
          .timeline { 
            padding-left: 2rem !important; 
          }
          .timeline-line {
            display: block !important;
          }
          .timeline-dot {
            display: flex !important;
          }
          .timeline-card { 
            margin-left: 2rem !important; 
          }
          .card-header {
            gap: 1.5rem !important;
          }
          .icon {
            width: 70px !important;
            height: 70px !important;
            font-size: 2rem !important;
          }
          .experience-card {
            padding: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ExperiencePage;