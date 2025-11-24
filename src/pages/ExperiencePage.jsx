// src/pages/ExperiencePage.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiHome, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

const ExperiencePage = () => {
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
    },
  ];
  return (
    <div className="experience-page-simple">
      {/* Header */}
      <motion.div
        className="experience-header-simple"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Work Experience</h1>
        <p>My professional journey in software development and AI</p>
      </motion.div>

      {/* Experience Cards */}
      <div className="experience-list-simple">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-card-simple"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="exp-header">
              <div className="exp-icon">
                <FiBriefcase />
              </div>
              <div className="exp-info">
                <h2>{exp.title}</h2>
                <h3>{exp.company}</h3>
                <p className="exp-duration">{exp.duration}</p>
              </div>
            </div>

            <ul className="exp-description">
              {exp.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div
        className="experience-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            <FiHome /> Home
          </motion.button>
        </Link>
        
        <Link to="/resume">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            <FiFileText /> View Resume
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ExperiencePage;
