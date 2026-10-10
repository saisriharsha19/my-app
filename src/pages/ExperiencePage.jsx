import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { education, experiences, impact, profile } from '../data/profile';

export default function ExperiencePage() {
  return <div className="interior-page experience-page page-wrap">
    <Helmet><title>Experience — Sai Sri Harsha Guddati</title><meta name="description" content={profile.summary} /></Helmet>
    <header className="page-heading"><p className="eyebrow">EXPERIENCE / PLATFORM, PRODUCT, PRODUCTION</p><h1>Infrastructure.<br /><em>Real-world scale.</em></h1><p>{profile.role} at UF IT. Building the gateways, real-time services, and AI products people rely on.</p></header>
    <section className="experience-impact" aria-label="Platform impact">{impact.map(item => <div key={item.value}><strong>{item.value}</strong><span>{item.unit}</span><p>{item.label}</p></div>)}</section>
    <div className="journey-list">{experiences.map((experience, i) => <article className="journey-entry" key={experience.company}><div className="journey-meta"><p className="eyebrow">0{i + 1} / {experience.date}</p><h2>{experience.company}</h2><p>{experience.team}</p><strong className="career-role">{experience.role}</strong><span>{experience.location}</span>{i === 0 && <span className="current-role">CURRENT ROLE</span>}</div><div className="journey-detail"><h3>{experience.intro}</h3><p>{experience.description}</p><div className="career-highlights">{experience.highlights.map(highlight => <section className="career-highlight" key={highlight.title}><p className="eyebrow">{highlight.label}</p><h4>{highlight.title}</h4><p>{highlight.text}</p></section>)}</div><div className="tag-list">{experience.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
    <section className="education-section" aria-labelledby="education-title"><p className="eyebrow">EDUCATION</p><h2 id="education-title">The academic foundation.</h2>{education.map(item => <div className="education-entry" key={item.school}><div><h3>{item.degree}</h3><p>{item.school}</p></div><div><p>{item.date}</p><span>{item.location}</span></div></div>)}<Link className="text-link" to="/resume">View the current resume <FiArrowUpRight /></Link></section>
  </div>;
}
