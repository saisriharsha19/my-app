import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowDown, FiArrowUpRight, FiArrowRight, FiGithub } from 'react-icons/fi';
import { impact, profile, projects } from '../data/profile';
import ProjectVisual from '../components/ProjectVisual';

export default function Home() {
  return (
    <div className="home-editorial">
      <Helmet>
        <title>Sai Sri Harsha Guddati — Software & AI Engineer</title>
        <meta name="description" content="Meet Sai Sri Harsha Guddati: software and AI engineer and Infrastructure Platform Engineer IV at UF IT, with previous experience at TCS. Explore systems, AI projects, and the story behind the work." />
      </Helmet>
      <section className="editorial-hero page-wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> {profile.role.toUpperCase()} · UF IT</p>
          <h1 id="hero-title">Curiosity.<br />Code.<br /><em>Real-world<br className="hero-break" /> impact.</em></h1>
          <p className="hero-description">I’m Sai Sri Harsha, an Infrastructure Platform Engineer IV at UF IT. I build and operate AI gateways, real-time services, and the products connected to them.</p>
          <div className="hero-actions"><a className="solid-link" href="#selected-work">Explore my work <FiArrowDown /></a><Link className="text-link" to="/contact">Let’s talk <FiArrowUpRight /></Link></div>
          <div className="hero-footnote"><span>BASED IN THE WORLD OF</span><p>Backend engineering. AI infrastructure.<br />Thoughtful interfaces.</p></div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-topline"><span>THE PERSON BEHIND THE CODE</span><span>01 / INTRO</span></div>
          <div className="portrait-image"><img src="/profile.webp" alt="Sai Sri Harsha Guddati" fetchpriority="high" width="864" height="1065" /><div className="portrait-stamp" aria-hidden="true">HELLO<br />WORLD<span>↗</span></div></div>
          <div className="portrait-caption"><div><strong>Harsha.</strong><span>Engineer. Builder. Always learning.</span></div><a href={profile.github} target="_blank" rel="noreferrer" aria-label="Visit Harsha’s GitHub"><FiGithub /></a></div>
        </div>
      </section>
      <div className="context-strip"><div className="page-wrap"><span>A LITTLE CONTEXT</span><strong>University of Florida</strong><span className="strip-cross">✳</span><strong>Tata Consultancy Services</strong><span className="strip-cross">✳</span><strong>From backend to AI</strong></div></div>
      <section className="proof-strip page-wrap" aria-label="Engineering experience highlights">{impact.map(item => <div key={item.value}><strong>{item.value}</strong><span className="impact-unit">{item.unit}</span><p>{item.label}</p></div>)}<Link to="/experience" className="proof-source">The work behind<br />the numbers <FiArrowUpRight /></Link></section>
      <section className="selected-work page-wrap section-space" id="selected-work" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">Ideas, made <em>real.</em></h2></div><Link className="text-link" to="/portfolio">All projects <FiArrowUpRight /></Link></div>
        <p className="section-intro">A few projects that connect the dots between intelligent software, useful tools, and dependable systems.</p>
        <div className="featured-projects">{projects.slice(0, 3).map((project, index) => <article className="featured-project" key={project.id}><ProjectVisual type={project.visual} name={project.name} /><a className="project-caption" href={project.project_url} target="_blank" rel="noreferrer"><span className="project-number">0{index + 1}</span><div><p className="eyebrow">{project.kind}</p><h3>{project.name}</h3><p>{project.description}</p></div><FiArrowUpRight className="project-arrow" /></a></article>)}</div>
      </section>
      <section className="about-band" id="about" aria-labelledby="about-title"><div className="page-wrap about-layout"><div><p className="eyebrow">02 / A LITTLE MORE HUMAN</p><h2 id="about-title">More than<br />a <em>tech stack.</em></h2><div className="about-monogram" aria-hidden="true">h<span>✳</span></div></div><div className="about-story"><p className="large-copy">My work sits at the intersection of backend architecture, AI infrastructure, and the people who use them.</p><p>I’m based in Gainesville, Florida, with an M.S. in Computer Science from the University of Florida. Before UF IT, I built enterprise services at TCS in Hyderabad.</p><p>At UF IT, I maintain and extend the LiteLLM gateway on a shared platform processing 9B+ tokens a day. My work also spans NaviGator Prompt Builder, document retrieval, model evaluation, and a departmental Data Science Agent.</p><div className="personal-facts"><div><span>ACADEMIC BACKGROUND</span><strong>M.S. Computer Science<br />University of Florida · 2025</strong></div><div><span>ENGINEERING THREAD</span><strong>Hyderabad, India<br />Gainesville, Florida</strong></div></div><Link className="text-link" to="/experience">The full journey <FiArrowUpRight /></Link></div></div></section>
      <section className="page-wrap section-space approach-section" aria-labelledby="approach-title"><div className="section-heading"><div><p className="eyebrow">03 / HOW THE WORK CONNECTS</p><h2 id="approach-title">From the inside, <em>out.</em></h2></div><p className="heading-aside">Three layers.<br />One complete experience.</p></div><div className="approach-list">{[
        ['01', 'The foundation', 'Backend & distributed systems', 'APIs, microservices, event processing, and databases. The infrastructure that makes the rest possible.', 'Python / FastAPI / Java / PostgreSQL'],
        ['02', 'The intelligence', 'AI & retrieval', 'Language models, embeddings, and semantic search. Connecting the right context to a useful answer.', 'LLMs / RAG / Vector databases'],
        ['03', 'The experience', 'Full-stack development', 'Clear interfaces connected to capable services. Making the power underneath usable.', 'React / Next.js / TypeScript'],
      ].map(([number, label, title, description, tools]) => <div className="approach-row" key={number}><span className="row-number">{number}</span><div><p className="eyebrow">{label}</p><h3>{title}</h3></div><div><p>{description}</p><span className="tool-line">{tools}</span></div><FiArrowUpRight aria-hidden="true" /></div>)}</div></section>
      <section className="notes-section page-wrap"><div><p className="eyebrow">04 / NOTES & THINKING</p><h2>A place for<br /><em>the thinking, too.</em></h2><p>Projects show what I build. The blog is where I share the ideas, discoveries, and lessons along the way.</p><Link className="text-link" to="/blog">Read the journal <FiArrowUpRight /></Link></div><div className="notes-art" aria-hidden="true"><span>FIELD NOTES</span><div className="note-lines"><i /><i /><i /></div><strong>Stay<br />curious<span>✳</span></strong><small>ENGINEERING / LEARNING / EXPLORING</small></div></section>
      <section className="principles-section page-wrap"><p className="eyebrow">A FEW THINGS I BELIEVE IN</p><div><h2>Measure before<br /><em>optimizing.</em></h2><p>Reliability over cleverness. Simple systems scale better. Infrastructure as code, and documentation as a first-class feature. Principles that keep the work grounded when the technology gets complicated.</p></div></section>
      <section className="contact-banner page-wrap"><p className="eyebrow">HAVE SOMETHING IN MIND?</p><Link to="/contact"><h2>Let’s build<br /><em>something useful.</em></h2><span className="contact-round"><FiArrowRight /></span></Link><p>AI, software, or an interesting problem. I’d love to hear about it.</p></section>
    </div>
  );
}
