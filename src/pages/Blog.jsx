import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { journals, readingMinutes, formatJournalDate } from '../data/journals';

export default function Blog() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const filtered = journals.filter(post => (post.title + ' ' + (post.category || '') + ' ' + (post.content || '')).toLowerCase().includes(search.toLowerCase()));
  return <div className="interior-page page-wrap">
    <Helmet><title>Journal — Sai Sri Harsha Guddati</title><meta name="description" content="Engineering notes, ideas, and lessons from Sai Sri Harsha Guddati. Writing on software, systems, AI, and building." /></Helmet>
    <header className="page-heading"><p className="eyebrow">NOTES FROM THE PROCESS</p><h1>Thinking,<br /><em>out loud.</em></h1><p>A space for ideas that don’t fit in a repository. Notes on engineering, learning, and making sense of things.</p></header>
    <div className="filter-bar"><p className="eyebrow" aria-live="polite">{filtered.length} ARTICLES</p><label className="search-field"><FiSearch /><span className="sr-only">Search articles</span><input value={search} placeholder="Search topics or articles…" onChange={event => { setSearch(event.target.value); setPage(1); }} /></label></div>
    <div className="journal-list">{filtered.slice((page - 1) * 6, page * 6).map(post => <Link className="journal-card" to={'/blog/' + post.id} key={post.id}>
      <time dateTime={post.created_at}>{formatJournalDate(post.created_at)}</time>
      <div>{post.category && <span className="eyebrow">{post.category}</span>}<h2>{post.title}</h2><p>{post.summary || post.content?.replace(/[#*`>]/g, '').slice(0, 180)}</p><span className="journal-meta">{readingMinutes(post.content)} MIN READ · {post.author || 'Sai Sri Harsha'}</span></div><FiArrowUpRight />
    </Link>)}</div>
    {!filtered.length && <div className="empty-state"><p>{search ? 'No articles match that search.' : 'New notes will appear here when published.'}</p>{search && <button className="text-link" onClick={() => setSearch('')}>Clear search</button>}</div>}
    <nav className="pagination" aria-label="Journal pages">{Array.from({ length: Math.ceil(filtered.length / 6) }, (_, i) => <button key={i} aria-current={page === i + 1 ? 'page' : undefined} onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'instant' }); }}>{i + 1}</button>)}</nav>
  </div>;
}
