// src/pages/ExperiencePage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaDownload, FaHome } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const ExperiencePage = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "University of Florida Information Technology",
      duration: "Mar 2025 - Present",
      color: "from-blue-500 to-cyan-600",
      description: [
        "Architected and deployed a distributed full-stack AI platform using FastAPI, Next.js, Celery, and Redis, serving 30,000+ users with 99.9% uptime.",
        "Built and maintained 15+ production microservices on Docker and Kubernetes handling 100,000+ daily requests for AI chat applications.",
        "Unified 6+ LLMs behind a load-balanced API gateway, reducing latency by 40% and supporting 55,000+ monthly active users.",
        "Implemented comprehensive monitoring with Prometheus and Grafana to maintain sub-second response times and optimize system performance."
      ],
      icon: <FaBriefcase className="w-6 h-6" />,
    },
    {
      title: "Software Development Engineer",
      company: "Tata Consultancy Services (TCS)",
      duration: "Aug 2022 - Dec 2023",
      color: "from-purple-500 to-indigo-600",
      description: [
        "Designed and shipped enterprise-scale backend systems using Python (Flask) and React, deployed on Azure Kubernetes Service (AKS).",
        "Optimized PostgreSQL and MSSQL clusters managing 10M+ records, utilizing advanced indexing to reduce query latency by 50%.",
        "Engineered CI/CD pipelines with Terraform and Azure DevOps, reducing deployment time by 40% and achieving zero production incidents.",
        "Delivered RAG systems using Pinecone and LLMs to automate code refactoring and legacy data modernization for Fortune 500 clients."
      ],
      icon: <FaBriefcase className="w-6 h-6" />,
    },
    {
      title: "Software Development Engineer Intern",
      company: "Internshala",
      duration: "May 2021 - Aug 2021",
      color: "from-orange-500 to-red-500",
      description: [
        "Developed high-throughput Java Spring Boot microservices for real-time transaction processing, handling over 10,000 transactions per second.",
        "Implemented an event-driven architecture using Apache Kafka to process 500,000+ events per day with exactly-once semantics.",
        "Optimized API latency by 30% through thread pool management and efficient connection pooling strategies."
      ],
      icon: <FaBriefcase className="w-6 h-6" />,
    },
  ];

  return (
    <div className="experience-page">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="experience-header"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
        >
          <HiSparkles className="header-icon" />
        </motion.div>
        <h1 className="experience-page-title">
          My <span className="gradient-text">Journey</span>
        </h1>
        <p className="experience-subtitle">Building the future, one line at a time</p>
      </motion.div>

      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`experience-card ${expandedCard === index ? 'expanded' : ''}`}
            onMouseEnter={() => setExpandedCard(index)}
            onMouseLeave={() => setExpandedCard(null)}
          >
            <div className={`experience-gradient bg-gradient-to-br ${exp.color}`}></div>
            
            <motion.div 
              className="experience-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {exp.icon}
            </motion.div>

            <div className="experience-details">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {exp.title}
              </motion.h2>
              
              <h3>{exp.company}</h3>
              
              <motion.p 
                className="duration"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                📅 {exp.duration}
              </motion.p>

              <motion.div 
                className="experience-points-container"
                initial="collapsed"
                animate={expandedCard === index ? "expanded" : "collapsed"}
                variants={{
                  expanded: { height: "auto", opacity: 1 },
                  collapsed: { height: "100px", opacity: 0.7 }
                }}
              >
                {exp.description.map((point, i) => (
                  <motion.p
                    key={i}
                    className="experience-point"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="bullet">▸</span> {point}
                  </motion.p>
                ))}
              </motion.div>
            </div>

            <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="button-container"
      >
        <motion.a
          href="/"
          className="action-btn home-btn"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHome /> Home
        </motion.a>
        
        <motion.a
          href="/resume"
          className="action-btn resume-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload /> View Resume
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ExperiencePage;