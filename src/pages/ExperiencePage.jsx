// src/pages/ExperiencePage.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { FiBriefcase, FiHome, FiFileText, FiMapPin, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

const ExperiencePage = () => {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "University of Florida Information Technology",
      location: "Gainesville, FL",
      duration: "May 2025 - Present",
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
      description: [
        "Developed high-throughput Java Spring Boot microservices for real-time transaction processing, handling over 10,000 transactions per second.",
        "Implemented an event-driven architecture using Apache Kafka to process 500,000+ events per day with exactly-once semantics.",
        "Optimized API latency by 30% through thread pool management and efficient connection pooling strategies."
      ],
    },
  ];

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      <Helmet>
        <title>Experience | Sai Sri Harsha Guddati</title>
        <meta name="description" content="Professional experience and work history of Sai Sri Harsha Guddati." />
      </Helmet>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          My <span className="text-gradient">Journey</span>
        </h1>
        <p className="text-lg text-secondary">
          Building the future, one experience at a time
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto pl-4 md:pl-0">
        {/* Timeline Line - Desktop */}
        <div className="absolute hidden md:block"
          style={{
            left: '50%',
            top: '0',
            bottom: '0',
            width: '2px',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
            opacity: 0.5
          }} />

        {/* Timeline Line - Mobile */}
        <div className="absolute md:hidden"
          style={{
            left: '24px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
            opacity: 0.5
          }} />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`relative mb-12 md:mb-20 flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Timeline Dot */}
            <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-500 transform -translate-x-1/2 z-10 shadow-glow"
              style={{
                background: 'var(--accent-primary)'
              }} />

            {/* Content Card */}
            <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
              }`}>
              <div className="glass-panel p-6 md:p-8 rounded-3xl relative transition-transform hover:-translate-y-2 group">
                <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg text-xl"
                    style={{ background: 'var(--gradient-primary)' }}>
                    <FiBriefcase />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{exp.title}</h2>
                    <h3 className="text-primary font-semibold text-sm">{exp.company}</h3>
                  </div>
                </div>

                <div className={`flex gap-4 text-xs text-secondary mb-6 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}>
                  <span className="flex items-center gap-1"><FiCalendar /> {exp.duration}</span>
                  <span className="flex items-center gap-1"><FiMapPin /> {exp.location}</span>
                </div>

                <ul className="space-y-3">
                  {exp.description.map((point, i) => (
                    <li key={i} className={`text-sm text-secondary leading-relaxed flex gap-2 ${index % 2 === 0 ? "md:flex-row-reverse md:text-right" : "md:flex-row md:text-left"
                      }`}>
                      <span className="text-primary mt-1">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-center gap-4 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link to="/">
          <button className="btn-secondary flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5">
            <FiHome /> Back Home
          </button>
        </Link>
        <Link to="/resume">
          <button className="btn-primary flex items-center gap-2">
            <FiFileText /> View Resume
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ExperiencePage;