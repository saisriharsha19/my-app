import React from "react";
import { FaBriefcase } from "react-icons/fa";

const ExperiencePage = () => {
  const experiences = [
    {
      title: "AI Engineer Intern",
      company: "University of Florida Information Technology",
      duration: "Mar 2025 - Present",
      description: [
        "Built and deployed AI assistants using FastAPI, Redis, PostgreSQL, and OpenAI/Gemini APIs for university departments.",
        "Integrated self-hosted and API-based LLMs (Mistral, Claude, LLaMA) using LangChain, Semantic Kernel, and LangGraph.",
        "Designed prompt workflows, vector search (pgvector/FAISS), and RAG pipelines for real-time query handling.",
        "Developed backend architecture with authentication, caching, and scalable Celery-based background tasks."
      ],
      icon: <FaBriefcase />,
    },
    {
      title: "Research and Development Software Engineer",
      company: "Tata Consultancy Services (TCS) Ltd",
      duration: "Aug 2022 - Dec 2023",
      description: [
        "Developed AI-powered backend systems using Python (FastAPI, Flask) and React, improving automation and usability.",
        "Led projects integrating OpenAI, Pinecone, and OCR models for LLM-based programming analysis and image processing.",
        "Containerized apps with Docker and deployed via Kubernetes on Azure, improving scalability and latency by 20%.",
        "Designed REST APIs and built CI/CD pipelines; improved MSSQL/PostgreSQL query efficiency with indexing strategies.",
        "Implemented ML models for classification and regression using PyTorch and TensorFlow to automate business workflows."
      ],
      icon: <FaBriefcase />,
    },
    {
      title: "Cloud Engineer Intern",
      company: "Internshala",
      duration: "Jan 2021 - Sep 2021",
      description: [
        "Built a monitoring dashboard for live system performance using Python and JavaScript, enhancing observability.",
        "Conducted rigorous testing and debugging on cloud environments, reducing failure rates and downtime by 25%.",
        "Improved infrastructure reliability by optimizing deployment workflows and adding real-time analytics tracking."
      ],
      icon: <FaBriefcase />,
    },
  ];

  return (
    <div className="experience-page">
      <h1 className="experience-page-title">My Experience</h1>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-icon">{exp.icon}</div>
            <div className="experience-details">
              <h2>{exp.title}</h2>
              <h3>{exp.company}</h3>
              <p className="duration">{exp.duration}</p>
              <div className="experience-page-points-container">
                {exp.description.map((point, i) => (
                <p className="experience-page-points" key={i}>{point}</p>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
      <a href="/" className="return-btn">⬅️ Home</a>
      <a href="/resume" className="download-btn">View Resume</a>
      </div>
    </div>
  );
};

export default ExperiencePage;
