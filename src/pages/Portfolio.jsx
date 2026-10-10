import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { projects } from '../data/profile';
import ProjectVisual from '../components/ProjectVisual';


export default function Portfolio() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = projects.filter(item => (category === 'All' || item.category === category) && (item.name + ' ' + item.description + ' ' + item.tags.join(' ') + ' ' + item.technical.summary + ' ' + item.technical.contracts.map(contract => contract.name).join(' ')).toLowerCase().includes(search.toLowerCase()));
  return <div className="interior-page page-wrap">
    <Helmet><title>Projects — Sai Sri Harsha Guddati</title><meta name="description" content="Explore IntentGuard, WebLMS, RAG Agent, and projects by Sai Sri Harsha Guddati across AI, distributed systems, and data engineering." /></Helmet>
    <header className="page-heading"><p className="eyebrow">THE ENGINEERING INDEX</p><h1>Systems,<br /><em>from the inside.</em></h1><p>Command analysis, local browser Q&A, Kafka ingestion, retrieval, and offline messaging. Explore the architecture, interfaces, and tradeoffs behind each implementation.</p></header>
    <div className="filter-bar"><div className="filter-buttons" aria-label="Filter projects">{['All', 'AI', 'Systems', 'Data'].map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><FiSearch /><span className="sr-only">Search projects</span><input placeholder="Find a project…" value={search} onChange={event => setSearch(event.target.value)} /></label></div>
    <p className="sr-only" role="status">{filtered.length} projects found</p>
    <div className="portfolio-grid">{filtered.map(item => <article className="portfolio-card" key={item.id}><ProjectVisual name={item.name} type={item.visual} /><p className="eyebrow">{item.category} / {item.kind}</p><a className="portfolio-title" href={item.project_url} target="_blank" rel="noreferrer"><h2>{item.name}</h2><FiArrowUpRight /></a><p>{item.description}</p><div className="tag-list">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><ol className="project-path" aria-label={'Component flow for ' + item.name}>{item.technical.flow.map(step => <li key={step}>{step}</li>)}</ol><div className="project-card-footer"><span className="project-status">{item.technical.status}</span><Link className="text-link" to={'/portfolio/' + item.technical.slug} aria-label={'Engineering notes for ' + item.name}>Engineering notes <FiArrowUpRight /></Link></div></article>)}</div>
    {!filtered.length && <div className="empty-state"><p>No projects match that search.</p><button className="text-link" onClick={() => { setSearch(''); setCategory('All'); }}>Reset filters</button></div>}
  </div>;
}
