import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft, FiArrowUpRight, FiShare2 } from 'react-icons/fi';
import { fetchWithCache } from '../utils/apiCache';
import { findJournal, journals, readingMinutes, formatJournalDate } from '../data/journals';

export default function FullPost({ postId: selectedPostId } = {}) {
  const { postId: routePostId } = useParams();
  const postId = selectedPostId || routePostId;
  const localPost = findJournal(postId);
  const [remotePost, setPost] = useState(null);
  const post = localPost || (remotePost?.requestedId === postId ? remotePost : null);
  const [error, setError] = useState(false);
  const [shared, setShared] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setPost(null); setError(false); setShared('');
    if (!localPost) {
      fetchWithCache('https://backend-482511937770.europe-west1.run.app/blog/' + encodeURIComponent(postId), { signal: controller.signal })
        .then(data => { if (!data?.title) throw new Error('Invalid article'); setPost({ ...data, requestedId: postId }); })
        .catch(error => { if (error.name !== 'AbortError') setError(true); });
    }
    return () => controller.abort();
  }, [postId, localPost]);
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title: post.title, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setShared('Link copied to clipboard.'); }
    } catch (error) { if (error.name !== 'AbortError') setShared('You can copy the article URL from your address bar.'); }
  }
  const description = post?.summary || post?.content?.replace(/[#*`>]/g, '').slice(0, 155);
  const related = post ? [...journals.filter(item => item.category === post.category), ...journals.filter(item => item.category !== post.category)].filter(item => item.id !== post.id).slice(0, 3) : [];
  return <div className="interior-page page-wrap article-wrap">
    <div className="article-back"><Link className="text-link" to="/blog"><FiArrowLeft /> Back to the journal</Link></div>
    {error && !localPost ? <div className="empty-state" role="alert"><p>This article could not be loaded.</p><Link className="text-link" to="/blog">Browse the journal <FiArrowUpRight /></Link></div> : !post ? <p className="empty-state" role="status">Opening the article…</p> : <>
      <Helmet><title>{post.title} — Sai Sri Harsha Guddati</title><meta name="description" content={description} /><meta property="og:title" content={post.title + ' — Sai Sri Harsha Guddati'} /><meta property="og:description" content={description} /><meta name="twitter:title" content={post.title + ' — Sai Sri Harsha Guddati'} /><meta name="twitter:description" content={description} /><meta property="article:published_time" content={post.created_at} /></Helmet>
      <article><header className="page-heading"><p className="eyebrow">{post.category || 'THE JOURNAL'} / {readingMinutes(post.content)} MIN READ</p><h1>{post.title}</h1>{post.summary && <p>{post.summary}</p>}<p>{post.author || 'Sai Sri Harsha Guddati'} · Published <time dateTime={post.created_at}>{formatJournalDate(post.created_at, 'long')}</time></p></header>
      <div className="article-body"><ReactMarkdown>{post.content}</ReactMarkdown></div></article>
      <div className="article-bottom"><button className="text-link" onClick={share}>Share article <FiShare2 /></button><p role="status">{shared}</p><Link className="text-link" to="/blog">More from the journal <FiArrowUpRight /></Link></div>
      <nav className="related-journals" aria-label="Keep reading"><p className="eyebrow">KEEP READING</p>{related.map(item => <Link className="text-link" to={'/blog/' + item.id} key={item.id}>{item.title} <FiArrowUpRight /></Link>)}</nav>
    </>}
  </div>;
}
