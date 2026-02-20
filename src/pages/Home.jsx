// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiCpu, FiLayout, FiCloud, FiDatabase, FiLayers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import RevealingText from '../components/RevealingText';
import WebGLBackground from '../components/WebGLBackground';
import WebGLSkillsGlobe from '../components/WebGLSkillsGlobe';
import profileImage from '../images/IMG_6153.webp';

// --- Carousel Data ---
const expertiseItems = [
  {
    icon: <FiCpu />,
    title: "AI/ML Engineering",
    description: "Building intelligent systems with LLMs, RAG pipelines, and LangChain for production-ready AI applications.",
    tags: ["Python", "LangChain", "OpenAI", "Vector DBs"]
  },
  {
    icon: <FiCloud />,
    title: "Cloud Architecture",
    description: "Designing scalable cloud solutions on AWS and GCP with containerized microservices and CI/CD pipelines.",
    tags: ["AWS", "GCP", "Docker", "Kubernetes"]
  },
  {
    icon: <FiLayout />,
    title: "Frontend Development",
    description: "Crafting responsive, accessible interfaces with React, TypeScript, and modern CSS frameworks.",
    tags: ["React", "TypeScript", "Framer Motion", "CSS"]
  },
  {
    icon: <FiDatabase />,
    title: "Backend Systems",
    description: "Building robust APIs and data pipelines with FastAPI, Node.js, and efficient database architectures.",
    tags: ["FastAPI", "Node.js", "PostgreSQL", "Redis"]
  },
  {
    icon: <FiLayers />,
    title: "Full-Stack Integration",
    description: "End-to-end development connecting beautiful frontends with powerful backend services.",
    tags: ["REST APIs", "GraphQL", "WebSockets", "OAuth"]
  }
];



// --- Components ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="min-h-screen flex flex-col justify-start items-center relative overflow-hidden px-6 pb-20" style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)' }}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hero-bg-blob blob-1" />
        <div className="hero-bg-blob blob-2" />
      </div>
      {/* Background Dot Pattern (Fades on scroll) */}
      <motion.div style={{ opacity }} className="absolute inset-0 z-0">
        <WebGLBackground />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full text-center flex flex-col items-center gap-8 container"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center flex-wrap gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-secondary mb-2 h-auto text-center w-fit shadow-lg backdrop-blur-md"
        >
          <span className="rounded-full bg-green-500 w-2 h-2 inline-block animate-pulse shrink-0" />
          Available for new projects
        </motion.div>

        <div className="font-bold tracking-tighter drop-shadow-lg" style={{ lineHeight: 1.15 }}>
          <div className="text-4xl md:text-6xl lg:text-7xl mb-2">
            <RevealingText text="Building the future" delay={0.1} className="justify-center" />
          </div>
          <div className="text-4xl md:text-6xl lg:text-7xl">
            <RevealingText
              text="with meaningful code."
              delay={0.3}
              className="justify-center"
              childClassName="text-gradient drop-shadow-sm"
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-secondary text-center max-w-4xl mx-auto px-8 py-6 rounded-2xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 shadow-sm font-medium leading-relaxed drop-shadow-sm mt-8"
        >
          I'm Sai Sri Harsha, a multidisciplinary engineer
          <br className="block" />
          bridging the gap between
          <span className="text-primary font-semibold"> advanced AI systems</span> and
          <span className="text-primary font-semibold"> exceptional user experiences</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4 mt-8"
        >
          <Link to="/portfolio">
            <MagneticButton className="btn-primary shadow-lg hover:shadow-xl transition-shadow">
              View Work <FiArrowRight />
            </MagneticButton>
          </Link>
          <Link to="/contact">
            <MagneticButton className="btn-secondary glass-panel hover:bg-black/5 dark:hover:bg-white/10 shadow-md">
              Contact Me
            </MagneticButton>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Professional Expertise Carousel
const ExpertiseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % expertiseItems.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 })
  };

  return (
    <section style={{ padding: '80px 0' }} className="px-6 relative z-10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }} className="drop-shadow-sm">
            Areas of <span className="text-gradient">Expertise</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }} className="font-medium drop-shadow-sm">
            Specialized skills honed through real-world projects and continuous learning
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}
        >
          <div style={{ overflow: 'hidden', borderRadius: '24px' }} className="shadow-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    nextSlide();
                  } else if (swipe > 10000) {
                    setDirection(-1);
                    setActiveIndex((prev) => (prev - 1 + expertiseItems.length) % expertiseItems.length);
                  }
                }}
                className="glass-panel backdrop-blur-xl"
                style={{ padding: '48px', borderRadius: '24px', textAlign: 'center', cursor: 'grab' }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '32px',
                  color: 'white',
                  boxShadow: '0 10px 30px -10px var(--accent-primary)'
                }}>
                  {expertiseItems[activeIndex].icon}
                </div>

                <h3 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  {expertiseItems[activeIndex].title}
                </h3>

                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 24px' }}>
                  {expertiseItems[activeIndex].description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {expertiseItems[activeIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--accent-primary)',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: 'var(--accent-primary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {expertiseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                style={{
                  width: activeIndex === index ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '999px',
                  background: activeIndex === index ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: activeIndex === index ? 1 : 0.4
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};



const AboutSection = () => {
  return (
    <section style={{ marginTop: '0px', paddingTop: '80px', paddingBottom: '80px' }} className="px-6 relative z-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold drop-shadow-sm"
            >
              Engineering <span className="text-gradient">Integrity</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-secondary flex flex-col gap-6 leading-relaxed font-medium drop-shadow-sm"
            >
              <p>
                I'm currently mastering Computer Science at the University of Florida, but my passion extends far beyond the classroom. I operate at the intersection of <strong className="text-primary">backend architecture, AI infrastructure, and responsive design</strong>.
              </p>
              <p>
                At UF Information Technology, I'm building the next generation of intelligent assistants. Using Large Language Models (LLMs) and vector databases, I'm creating tools that don't just answer questions—they understand context, nuance, and intent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex gap-4 mt-2"
            >
              {[
                { icon: <FiGithub />, href: "https://github.com/saisriharsha19" },
                { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/" },
                { icon: <FiMail />, href: "mailto:saisriharshaguddati1@gmail.com" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-xl hover:text-white hover:bg-indigo-600 transition-all shadow-md"
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative flex justify-center order-1 md:order-2"
          >
            {/* Decorative Frame Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px'
            }}>
              {/* Gradient Border Frame */}
              <div style={{
                position: 'absolute',
                inset: '-4px',
                background: 'var(--gradient-primary)',
                borderRadius: '32px',
                zIndex: 0,
                filter: 'blur(2px)'
              }} />

              {/* Image Container with Mask */}
              <div style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                background: 'var(--bg-primary)',
                zIndex: 1,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)'
              }}>
                {/* Top Mask/Cutoff */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '60px',
                  background: 'linear-gradient(to bottom, var(--bg-primary), transparent)',
                  zIndex: 10
                }} />

                {/* Bottom Mask/Cutoff */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '80px',
                  background: 'linear-gradient(to top, var(--bg-primary), transparent)',
                  zIndex: 10
                }} />

                {/* Profile Image */}
                <img
                  src={profileImage}
                  alt="Sai Sri Harsha"
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block'
                  }}
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [15, 12, 15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '60px',
                  height: '60px',
                  background: 'var(--gradient-primary)',
                  borderRadius: '16px',
                  opacity: 0.8,
                  zIndex: 2,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
                }}
              />
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [-10, -13, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '-16px',
                  width: '40px',
                  height: '40px',
                  background: 'var(--accent-secondary)',
                  borderRadius: '10px',
                  opacity: 0.6,
                  zIndex: 2
                }}
              />
            </div>

            {/* Background Blur Elements */}
            <div style={{
              position: 'absolute',
              bottom: '-40px',
              right: '-40px',
              width: '150px',
              height: '150px',
              background: 'var(--accent-primary)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              opacity: 0.2,
              zIndex: 0
            }} />
            <div style={{
              position: 'absolute',
              top: '-40px',
              left: '-40px',
              width: '120px',
              height: '120px',
              background: 'var(--accent-secondary)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              opacity: 0.15,
              zIndex: 0
            }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="home-container min-h-screen">
      <HeroSection />

      <ExpertiseCarousel />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <WebGLSkillsGlobe />
      </motion.div>

      <AboutSection />
    </div>
  );
};

export default Home;