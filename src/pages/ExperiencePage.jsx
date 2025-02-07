import React from "react";
import { FaBriefcase } from "react-icons/fa";

const ExperiencePage = () => {
  const experiences = [
    {
      title: "Graduate Student Researcher",
      company: "University of Florida",
      duration: "Sep 2024 - Present",
      description: [
        "Conducting research on deep learning applications in healthcare, focusing on detecting children's eye diseases using CNNs and RNNs.",
        "Developing and fine-tuning machine learning models with PyTorch and TensorFlow for medical image analysis.",
        "Exploring data-driven solutions for improved early detection and diagnosis.",
        "Collaborating with interdisciplinary teams to advance AI-driven healthcare innovations."
      ],
      icon: <FaBriefcase />,
    },
    {
      title: "Research and Development Software Engineer",
      company: "Tata Consultancy Services (TCS) Ltd",
      duration: "Aug 2022 - Dec 2023",
      description: [
        "Designed and deployed cloud-based backend systems using Python (Flask, FastAPI) and built frontend applications with React, improving processing efficiency by 35%.",
        "Led AI-powered projects integrating Large Language Models (LLMs) with Pinecone, Flask, and the OpenAI API for tasks like programming language conversion, image analysis, and text recognition.",
        "Containerized applications with Docker and orchestrated deployments using Kubernetes on Azure, reducing latency by 20%.",
        "Developed REST APIs and web interfaces for scalable cloud-based AI solutions.",
        "Worked with PostgreSQL and MSSQL, optimizing database performance through advanced indexing, cutting query execution times by 50%.",
        "Automated workflows using ML algorithms (classification, clustering, regression) with TensorFlow and PyTorch, boosting efficiency by 35%."
      ],
      icon: <FaBriefcase />,
    },
    {
      title: "Cloud Engineer Intern",
      company: "Internshala",
      duration: "Jan 2021 - Sep 2021",
      description: [
        "Developed a web application to monitor application load and usage in real-time, improving response time to performance issues by 30%.",
        "Conducted extensive system testing, identified and resolved critical bugs, reducing downtime by 25%.",
        "Enhanced reliability by optimizing cloud infrastructure and implementing performance tracking analytics, improving user experience and system stability."
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
