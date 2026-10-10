import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { projects } from '../data/profile';
import ProjectVisual from '../components/ProjectVisual';
import { fetchWithCache } from '../utils/apiCache';

function categorize(item) {
  const text = item.title + ' ' + item.description;
  if (/AI|LLM|RAG|prompt|NLP|resume|redaction/i.test(text)) return 'AI';
  if (/data|stream|scrap|visualiz|ETL/i.test(text)) return 'Data';
  return 'Systems';
}
export default function Portfolio() {
  const [items, setItems] = useState(projects);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetchWithCache('https://backend-482511937770.europe-west1.run.app/portfolio/', { signal: controller.signal }).then(data => {
      if (!Array.isArray(data)) throw new Error('Invalid project list');
      // The curated work remains present if the remote collection is empty.
      if (data.length) setItems([...projects.filter(project => !data.some(item => item.id === project.id)), ...data.map(item => {
        const curated = projects.find(project => project.id === item.id);
        return curated ? { ...item, ...curated } : { ...item, name: item.title.split(':')[0], kind: item.title.split(':')[1]?.trim() || 'Engineering project', category: categorize(item), visual: /AI|LLM|RAG/i.test(item.title) ? 'retrieval' : 'api', tags: [] };
      })]);
    }).catch(error => { if (error.name !== 'AbortError') setNotice('Showing selected work. The full project archive is temporarily unavailable.'); });
    return () => controller.abort();
  }, []);
  const filtered = items.filter(item => (category === 'All' || item.category === category) && (item.name + ' ' + item.description + ' ' + item.tags.join(' ')).toLowerCase().includes(search.toLowerCase()));
  return <div className="interior-page page-wrap">
    <Helmet><title>Projects — Sai Sri Harsha Guddati</title><meta name="description" content="Explore IntentGuard, WebLMS, RAG Agent, and projects by Sai Sri Harsha Guddati across AI, distributed systems, and data engineering." /></Helmet>
    <header className="page-heading"><p className="eyebrow">THE PROJECT INDEX</p><h1>Curiosity,<br /><em>in production.</em></h1><p>AI copilots, retrieval agents, streaming pipelines, and the systems underneath. A collection of things I’ve built and explored.</p></header>
    <div className="filter-bar"><div className="filter-buttons" aria-label="Filter projects">{['All', 'AI', 'Systems', 'Data'].map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><FiSearch /><span className="sr-only">Search projects</span><input placeholder="Find a project…" value={search} onChange={event => setSearch(event.target.value)} /></label></div>
    {notice && <p className="content-notice" role="status">{notice}</p>}
    <p className="sr-only" role="status">{filtered.length} projects found</p>
    <div className="portfolio-grid">{filtered.map(item => <article className="portfolio-card" key={item.id}><ProjectVisual name={item.name} type={item.visual} /><p className="eyebrow">{item.category} / {item.kind}</p><a className="portfolio-title" href={item.project_url} target="_blank" rel="noreferrer"><h2>{item.name}</h2><FiArrowUpRight /></a><p>{item.description}</p><div className="tag-list">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
    {!filtered.length && <div className="empty-state"><p>No projects match that search.</p><button className="text-link" onClick={() => { setSearch(''); setCategory('All'); }}>Reset filters</button></div>}
  </div>;
}
