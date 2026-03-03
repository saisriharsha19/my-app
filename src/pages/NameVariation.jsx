import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiHome, FiArrowRight } from 'react-icons/fi';
import '../NameVariation.css';
import RevealingText from '../components/RevealingText';
import MagneticButton from '../components/MagneticButton';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
      
      <div className="container relative z-10">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="nv-hero text-center mb-16"
        >
          <div className="nv-hero-content flex flex-col items-center">
             <motion.div variants={itemVariants} className="mb-4">
                <RevealingText 
                  text={`${config.name}: Distributed Systems`} 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold justify-center" 
                  childClassName="text-primary drop-shadow-sm"
                />
                <RevealingText 
                  text="Engineering Portfolio" 
                  delay={0.3} 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold justify-center mt-2" 
                />
             </motion.div>
             
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-secondary font-medium mt-6 mb-12 max-w-2xl mx-auto drop-shadow-sm">
              Architecting High-Throughput <span className="text-gradient font-bold">Distributed Systems</span> & <span className="text-gradient font-bold">AI Pipelines</span>
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 w-full">
              <div className="nv-metric-card glass-panel rounded-2xl p-8 flex-1 drop-shadow-sm">
                <h3 className="text-4xl md:text-5xl font-bold">100K+</h3>
                <p className="text-sm text-secondary uppercase tracking-widest font-semibold mt-2">Requests/Day</p>
              </div>
              <div className="nv-metric-card glass-panel rounded-2xl p-8 flex-1 drop-shadow-sm">
                <h3 className="text-4xl md:text-5xl font-bold">40%</h3>
                <p className="text-sm text-secondary uppercase tracking-widest font-semibold mt-2">P95 Latency Reduction</p>
              </div>
              <div className="nv-metric-card glass-panel rounded-2xl p-8 flex-1 drop-shadow-sm">
                <h3 className="text-4xl md:text-5xl font-bold">Zero</h3>
                <p className="text-sm text-secondary uppercase tracking-widest font-semibold mt-2">Downtime Migrations</p>
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="nv-content w-full max-w-4xl mx-auto"
        >
          <div className="nv-text-block glass-panel rounded-3xl p-8 md:p-12 mb-16 shadow-lg relative overflow-hidden">
            {/* Decorative blurs matching AboutSection */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-[60px] opacity-20 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-[60px] opacity-20 pointer-events-none" />

            <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-sm relative z-10">
              Engineering <span className="text-gradient">Philosophy</span>
            </h2>
            <div className="text-lg relative z-10">
              <p>
                Hello, you've reached the engineering portfolio of <strong>{config.name}</strong> (Sai Sri Harsha Guddati).
                I design and scale distributed systems, build production-grade backend platforms, and deliver full-stack
                applications end to end. My work spans microservices architectures, asynchronous pipelines with Kafka
                and Redis, and high-performance APIs built with FastAPI and Spring Boot. I care deeply about reliability,
                operability, and performance engineering.
              </p>

              <p>
                At the University of Florida, I've operated systems supporting 30,000+ active users and 100K+ requests per day.
                I reduced API P95 latency from 800ms to 480ms under sustained load by tracing request lifecycles across API,
                worker, and database layers, tuning PostgreSQL connection pools, and introducing layered caching strategies.
                I've migrated stateful services to Azure Kubernetes Service with zero downtime, implemented blue-green
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
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="nv-stack text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 drop-shadow-sm">Core Infrastructure <span className="text-gradient">Stack</span></h2>
            <div className="nv-badges">
              <span>Kubernetes</span>
              <span>FastAPI</span>
              <span>Apache Kafka</span>
              <span>Redis</span>
              <span>Terraform</span>
              <span>PostgreSQL</span>
              <span>OIDC/OAuth2</span>
              <span>Azure</span>
              <span>React</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12"
          >
            <Link to="/">
              <button className="btn-secondary glass-panel flex items-center gap-2 px-6 py-3 shadow-md hover:bg-black/5 dark:hover:bg-white/10">
                <FiHome /> Back Home
              </button>
            </Link>
            <Link to="/portfolio">
              <button className="btn-primary shadow-lg flex items-center gap-2 px-6 py-3 hover:shadow-xl transition-shadow">
                View Portfolio <FiArrowRight />
              </button>
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default NameVariation;
