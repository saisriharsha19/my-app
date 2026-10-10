import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { experiences } from '../data/profile';
export default function ExperiencePage() {
  return <div className="interior-page page-wrap">
    <Helmet><title>Experience — Sai Sri Harsha Guddati</title><meta name="description" content="The engineering journey of Sai Sri Harsha Guddati: University of Florida IT, Tata Consultancy Services, and Internshala." /></Helmet>
    <header className="page-heading"><p className="eyebrow">THE PATH BEHIND THE WORK</p><h1>A journey in<br /><em>building things.</em></h1><p>From enterprise backends in Hyderabad to AI platform work in Gainesville. Each chapter adds another layer to how I approach software.</p></header>
    <div className="journey-list">{experiences.map((experience, i) => <article className="journey-entry" key={experience.company}><div className="journey-meta"><p className="eyebrow">0{i + 1} / {experience.date}{i === 0 ? ' · STARTED' : ''}</p><h2>{experience.company}</h2><p>{experience.team}<br />{experience.role}</p><span>{experience.location}</span></div><div className="journey-detail"><h3>{experience.intro}</h3><p>{experience.description}</p><ul>{experience.details.map(detail => <li key={detail}>{detail}</li>)}</ul><div className="tag-list">{experience.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
    <aside className="education-note"><div><p className="eyebrow">THE ACADEMIC THREAD</p><h2>M.S. Computer Science, University of Florida</h2><p>GPA 3.9 · A foundation for the work across systems, infrastructure, and intelligent applications.</p></div><Link className="text-link" to="/resume">View resume <FiArrowUpRight /></Link></aside>
  </div>;
}
