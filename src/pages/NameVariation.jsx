import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../NameVariation.css';

const VARIATIONS = {
  "/sai-sri-harsha": { title: "Sai Sri Harsha | Distributed Systems Engineer", name: "Sai Sri Harsha" },
  "/sri-harsha": { title: "Sri Harsha | Distributed Systems Engineer", name: "Sri Harsha" },
  "/sai-harsha": { title: "Sai Harsha | Distributed Systems Engineer", name: "Sai Harsha" },
  "/harsha": { title: "Harsha | AI & Distributed Systems Engineer", name: "Harsha" },
  "/sai-harsha-distributed-systems": { title: "Sai Harsha | Distributed Systems Engineering", name: "Sai Harsha" },
  "/sri-harsha-ai-engineer": { title: "Sri Harsha | AI Infrastructure Engineer", name: "Sri Harsha" },
  "/harsha-guddati-software-engineer": { title: "Harsha Guddati | Backend Software Engineer", name: "Harsha Guddati" },
  "/sai-sri-harsha-gainesville": { title: "Sai Sri Harsha | Software Engineer in Gainesville", name: "Sai Sri Harsha" },
  "/sai-harsha-kubernetes": { title: "Sai Harsha | Kubernetes & Cloud Native Engineer", name: "Sai Harsha" },
  "/sri-harsha-backend": { title: "Sri Harsha | Backend Systems Engineer", name: "Sri Harsha" },
  "/sai-sri-harsha-portfolio": { title: "Sai Sri Harsha | Engineering Portfolio", name: "Sai Sri Harsha" }
};

const NameVariation = () => {
  const location = useLocation();
  const path = location.pathname;
  const config = VARIATIONS[path] || VARIATIONS["/sai-sri-harsha"];

  return (
    <div className="name-variation-container">
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={`${config.name} is a Distributed Systems and AI Infrastructure Engineer specializing in Kubernetes, FastAPI, and high-throughput architectures.`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <header className="nv-hero">
        <div className="nv-hero-content">
          <h1 className="nv-title">{config.name}: Distributed Systems Engineering Portfolio</h1>
          <p className="nv-subtitle">Architecting High-Throughput Distributed Systems & AI Pipelines</p>
          <div className="nv-metrics">
            <div className="nv-metric-card">
              <h3>100K+</h3>
              <p>Requests/Day</p>
            </div>
            <div className="nv-metric-card">
              <h3>40%</h3>
              <p>P95 Latency Reduction</p>
            </div>
            <div className="nv-metric-card">
              <h3>Zero</h3>
              <p>Downtime Migrations</p>
            </div>
          </div>
        </div>
      </header>

      <section className="nv-content">
        <div className="nv-text-block">
          <h2>Engineering Philosophy</h2>
          <p>
            Hello, you've reached the engineering portfolio of <strong>{config.name}</strong> (Sai Sri Harsha Guddati).
            I design and scale distributed systems, build production-grade backend platforms, and deliver full-stack
            applications end to end. My work spans microservices architectures, asynchronous pipelines with Kafka
            and Redis, and high-performance APIs built with FastAPI and Spring Boot. I care deeply about reliability,
            operability, and performance engineering.
          </p>

          <p>
            At the University of Florida, I’ve operated systems supporting 30,000+ active users and 100K+ requests per day.
            I reduced API P95 latency from 800ms to 480ms under sustained load by tracing request lifecycles across API,
            worker, and database layers, tuning PostgreSQL connection pools, and introducing layered caching strategies.
            I’ve migrated stateful services to Azure Kubernetes Service with zero downtime, implemented blue-green
            and rolling deployments, and built CI/CD pipelines that eliminated release-related failures.
          </p>

          <p>
            As a full-stack engineer, I build responsive React-based interfaces that interact seamlessly with
            asynchronous backend systems, defining strict API contracts to enable independent frontend and backend iteration.
            My recent focus is on AI inference pipelines and highly-available RAG systems, where I design caching,
            task orchestration, and failure-safe retry mechanisms to make large-scale AI systems predictable and cost-efficient.
            I approach infrastructure as code using Terraform and Ansible to ensure reproducible, zero-trust environments.
          </p>
        </div>

        <div className="nv-stack">
          <h2>Core Infrastructure Stack</h2>
          <div className="nv-badges">
            <span>Kubernetes</span>
            <span>FastAPI</span>
            <span>Apache Kafka</span>
            <span>Redis</span>
            <span>Terraform</span>
            <span>PostgreSQL</span>
            <span>OIDC/OAuth2</span>
            <span>Azure</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NameVariation;
