import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft, FiArrowUpRight, FiShare2 } from 'react-icons/fi';
import { fetchWithCache } from '../utils/apiCache';

export default function FullPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [shared, setShared] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setPost(null); setError(false); setShared('');
    fetchWithCache('https://backend-482511937770.europe-west1.run.app/blog/' + postId, { signal: controller.signal }).then(data => { if (!data?.title) throw new Error('Invalid article'); setPost(data); }).catch(error => { if (error.name !== 'AbortError') setError(true); });
    return () => controller.abort();
  }, [postId]);
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title: post.title, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setShared('Link copied to clipboard.'); }
    } catch (error) { if (error.name !== 'AbortError') setShared('You can copy the article URL from your address bar.'); }
  }
  return <div className="interior-page page-wrap article-wrap"><div className="article-back"><Link className="text-link" to="/blog"><FiArrowLeft /> Back to the journal</Link></div>{error ? <div className="empty-state" role="alert"><p>This article could not be loaded.</p><Link className="text-link" to="/blog">Browse the journal <FiArrowUpRight /></Link></div> : !post ? <p className="empty-state" role="status">Opening the article…</p> : <><Helmet><title>{post.title} — Sai Sri Harsha Guddati</title><meta name="description" content={post.content?.replace(/[#*`>]/g, '').slice(0, 155)} /><meta property="og:title" content={post.title + ' — Sai Sri Harsha Guddati'} /><meta property="og:description" content={post.content?.replace(/[#*`>]/g, '').slice(0, 155)} /><meta name="twitter:title" content={post.title + ' — Sai Sri Harsha Guddati'} /></Helmet><article><header className="page-heading"><p className="eyebrow">THE JOURNAL / {Math.max(1, Math.ceil((post.content || '').split(/\s+/).length / 220))} MIN READ</p><h1>{post.title}</h1><p>{post.author || 'Sai Sri Harsha Guddati'} · <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time></p></header><div className="article-body"><ReactMarkdown>{post.content}</ReactMarkdown></div></article><div className="article-bottom"><button className="text-link" onClick={share}>Share article <FiShare2 /></button><p role="status">{shared}</p><Link className="text-link" to="/blog">More from the journal <FiArrowUpRight /></Link></div></>}</div>;
}
