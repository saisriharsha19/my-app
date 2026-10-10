import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { fetchWithCache } from '../utils/apiCache';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(false);
    fetchWithCache('https://backend-482511937770.europe-west1.run.app/blog/', { signal: controller.signal }).then(data => { if (!Array.isArray(data)) throw new Error('Invalid articles'); setPosts(data); }).catch(error => { if (error.name !== 'AbortError') setError(true); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);
  const filtered = posts.filter(post => (post.title + ' ' + (post.content || '')).toLowerCase().includes(search.toLowerCase()));
  return <div className="interior-page page-wrap">
    <Helmet><title>Journal — Sai Sri Harsha Guddati</title><meta name="description" content="Engineering notes, ideas, and lessons from Sai Sri Harsha Guddati. Writing on software, systems, AI, and building." /></Helmet>
    <header className="page-heading"><p className="eyebrow">NOTES FROM THE PROCESS</p><h1>Thinking,<br /><em>out loud.</em></h1><p>A space for ideas that don’t fit in a repository. Notes on engineering, learning, and making sense of things.</p></header>
    <div className="filter-bar"><p className="eyebrow" aria-live="polite">{loading ? 'FETCHING THE JOURNAL' : filtered.length + ' ARTICLES'}</p><label className="search-field"><FiSearch /><span className="sr-only">Search articles</span><input value={search} placeholder="Search the journal…" onChange={event => { setSearch(event.target.value); setPage(1); }} /></label></div>
    {loading ? <p className="empty-state" role="status">Opening the journal…</p> : error ? <div className="empty-state" role="alert"><p>The journal is temporarily unavailable.</p><button className="text-link" onClick={() => setAttempt(attempt + 1)}>Try again <FiArrowUpRight /></button></div> : <><div className="journal-list">{filtered.slice((page - 1) * 6, page * 6).map(post => <Link className="journal-card" to={'/blog/' + post.id} key={post.id}><time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time><div><h2>{post.title}</h2><p>{post.content?.replace(/[#*`>]/g, '').slice(0, 180)}{post.content?.length > 180 ? '…' : ''}</p><span className="journal-meta">{Math.max(1, Math.ceil((post.content || '').split(/\s+/).length / 220))} MIN READ · {post.author || 'Sai Sri Harsha'}</span></div><FiArrowUpRight /></Link>)}</div>{!filtered.length && <div className="empty-state"><p>{search ? 'No articles match that search.' : 'New notes will appear here when published.'}</p>{search && <button className="text-link" onClick={() => setSearch('')}>Clear search</button>}</div>}<nav className="pagination" aria-label="Journal pages">{Array.from({ length: Math.ceil(filtered.length / 6) }, (_, i) => <button key={i} aria-current={page === i + 1 ? 'page' : undefined} onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'instant' }); }}>{i + 1}</button>)}</nav></>}
  </div>;
}
