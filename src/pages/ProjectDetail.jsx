import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import { findProject, projects } from '../data/profile';
import ProjectVisual from '../components/ProjectVisual';

export default function ProjectDetail({ projectSlug: selectedSlug } = {}) {
  const { projectSlug } = useParams();
  const project = findProject(selectedSlug || projectSlug);
  if (!project) return <div className="interior-page page-wrap"><Helmet><title>Project not found — Sai Sri Harsha Guddati</title><meta name="robots" content="noindex,follow" /></Helmet><header className="page-heading"><h1>Project not found.</h1><Link className="text-link" to="/portfolio">Browse the projects <FiArrowUpRight /></Link></header></div>;
  const technical = project.technical;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <div className="interior-page page-wrap project-case">
    <Helmet><title>{project.name} — Engineering Notes — Sai Sri Harsha Guddati</title><meta name="description" content={technical.summary} /></Helmet>
    <Link className="text-link case-back" to="/portfolio"><FiArrowLeft /> Back to projects</Link>
    <header className="case-hero"><div className="page-heading"><p className="eyebrow">{project.category} / {technical.status}</p><h1>{project.name}</h1><p>{technical.summary}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="text-link" href={project.project_url} target="_blank" rel="noreferrer">View repository <FiArrowUpRight /></a></div><ProjectVisual type={project.visual} name={project.name} /></header>
    <section className="case-section" aria-labelledby="architecture-title"><div className="case-section-heading"><p className="eyebrow">01 / COMPONENTS & DATA FLOW</p><h2 id="architecture-title">Inside the system.</h2></div><ol className="architecture-flow">{technical.flow.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol><div className="architecture-details">{technical.architecture.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div></section>
    <section className="case-section case-implementation" aria-labelledby="implementation-title"><div><div className="case-section-heading"><p className="eyebrow">02 / IMPLEMENTATION DECISIONS</p><h2 id="implementation-title">Why it works this way.</h2></div>{technical.decisions.map(item => <div className="case-decision" key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div><aside className="case-contracts"><p className="eyebrow">INTERFACES & DATA CONTRACTS</p>{technical.contracts.map(item => <div key={item.name}><code>{item.name}</code><p>{item.detail}</p></div>)}</aside></section>
    <section className="case-scope" aria-labelledby="scope-title"><p className="eyebrow">03 / SCOPE & TRADEOFFS</p><h2 id="scope-title">The implementation boundary.</h2><p>{technical.scope}</p></section>
    <section className="case-section" aria-labelledby="source-title"><div className="case-section-heading"><p className="eyebrow">04 / READ THE IMPLEMENTATION</p><h2 id="source-title">Follow it into the code.</h2></div><nav className="case-sources" aria-label="Implementation source files">{technical.sources.map(source => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><code>{source.label}</code><FiArrowUpRight /></a>)}</nav></section>
    <div className="case-next"><Link className="text-link" to="/portfolio">All engineering projects <FiArrowUpRight /></Link><Link className="text-link" to={'/portfolio/' + next.technical.slug}>Next: {next.name} <FiArrowUpRight /></Link></div>
  </div>;
}
