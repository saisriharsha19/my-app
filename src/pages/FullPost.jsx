// src/pages/FullPost.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft, FiUser, FiCalendar, FiShare2, FiHeart, FiBookOpen, FiArrowRight } from 'react-icons/fi';

const FullPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`https://backend-482511937770.europe-west1.run.app/blog/${postId}`);
        if (!response.ok) throw new Error(`Failed to fetch post: ${response.status}`);
        const data = await response.json();
        setPost(data);

        const allPostsRes = await fetch('https://backend-482511937770.europe-west1.run.app/blog');
        if (allPostsRes.ok) {
          const allPosts = await allPostsRes.json();
          const filtered = allPosts.filter(p => p.id !== parseInt(postId)).slice(0, 3);
          setRelatedPosts(filtered);
        }
      } catch (error) {
        console.error('Error fetching full post:', error);
        setError('Failed to load the post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    if (postId) fetchPost();
  }, [postId]);

  const handleGoBack = () => navigate('/blog');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.content?.substring(0, 100), url: window.location.href });
      } catch (err) { console.log('Share cancelled'); }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const readTime = post?.content ? Math.ceil(post.content.length / 1000) : 5;

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
        <motion.div style={{ fontSize: '64px', marginBottom: '16px' }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>😕</motion.div>
        <h2 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>Oops!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{error}</p>
        <button onClick={handleGoBack} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FiArrowLeft /> Go Back to Blog
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '128px', paddingBottom: '64px' }}>
        <div className="animate-pulse">
          <div style={{ height: '48px', background: 'var(--bg-secondary)', borderRadius: '12px', width: '75%', marginBottom: '32px' }} />
          <div style={{ height: '24px', background: 'var(--bg-secondary)', borderRadius: '8px', width: '33%', marginBottom: '48px' }} />
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ height: '16px', background: 'var(--bg-secondary)', borderRadius: '4px', width: `${90 - (i % 3) * 10}%`, marginBottom: '16px' }} />
          ))}
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <>
      {/* Reading Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${scrollProgress}%`,
        background: 'var(--accent-primary)',
        zIndex: 100
      }} />

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container"
        style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '120px', paddingBottom: '64px' }}
      >
        {/* Back Button */}
        <motion.button
          onClick={handleGoBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '12px',
            color: 'var(--accent-primary)',
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '40px',
            cursor: 'pointer'
          }}
        >
          <FiArrowLeft size={16} />
          <span>Back to Articles</span>
        </motion.button>

        {/* Article Header */}
        <motion.header initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '24px' }}>
            {post.title}
          </h1>

          {/* Meta Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
              <FiCalendar style={{ color: 'var(--accent-primary)' }} />
              <time>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
              <FiUser style={{ color: 'var(--accent-primary)' }} />
              <span>{post.author || 'Sai Sri Harsha Guddati'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
              <FiBookOpen style={{ color: 'var(--accent-primary)' }} />
              <span>{readTime} min read</span>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text-secondary)' }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 style={{ fontSize: '30px', fontWeight: '700', marginTop: '48px', marginBottom: '24px', color: 'var(--text-primary)' }}>{children}</h1>,
              h2: ({ children }) => <h2 style={{ fontSize: '24px', fontWeight: '700', marginTop: '40px', marginBottom: '20px', color: 'var(--text-primary)', paddingBottom: '12px', borderBottom: '2px solid var(--accent-primary)' }}>{children}</h2>,
              h3: ({ children }) => <h3 style={{ fontSize: '20px', fontWeight: '700', marginTop: '32px', marginBottom: '16px', color: 'var(--text-primary)' }}>{children}</h3>,
              p: ({ children }) => <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>{children}</p>,
              ul: ({ children }) => <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '24px' }}>{children}</ul>,
              ol: ({ children }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '24px', marginBottom: '24px' }}>{children}</ol>,
              li: ({ children }) => <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="glass-panel" style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '20px', margin: '32px 0', fontStyle: 'italic', padding: '20px 20px 20px 24px', borderRadius: '0 12px 12px 0' }}>
                  {children}
                </blockquote>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code style={{ background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '6px', color: 'var(--accent-primary)', fontFamily: 'monospace', fontSize: '14px' }}>{children}</code>
                ) : (
                  <div style={{ margin: '32px 0', padding: '24px', background: '#1e293b', borderRadius: '16px', border: '1px solid #334155', overflowX: 'auto' }}>
                    <code style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0' }}>{children}</code>
                  </div>
                ),
              strong: ({ children }) => <strong style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{children}</strong>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>{children}</a>
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--text-secondary)' }}
        >
          <button
            onClick={() => setLiked(!liked)}
            className="glass-panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              color: liked ? '#ef4444' : 'var(--text-secondary)',
              borderColor: liked ? '#ef4444' : undefined
            }}
          >
            <FiHeart style={{ fill: liked ? '#ef4444' : 'none' }} />
            <span>{liked ? 'Liked!' : 'Like this article'}</span>
          </button>

          <button onClick={handleShare} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
            <FiShare2 />
            <span>Share</span>
          </button>
        </motion.div>
      </motion.article>

      {/* Related Articles - Simple & Clean */}
      {relatedPosts.length > 0 && (
        <section style={{ padding: '60px 0 80px', borderTop: '1px solid var(--text-secondary)' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '32px' }}>
              More Articles
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {relatedPosts.map((article) => (
                <Link key={article.id} to={`/blog/${article.id}`} style={{ textDecoration: 'none' }}>
                  <motion.div
                    className="glass-panel"
                    style={{ padding: '20px 24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    whileHover={{ x: 8, borderColor: 'var(--accent-primary)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {article.title}
                      </h3>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <FiArrowRight style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  </motion.div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: '32px' }}>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
                View all articles <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FullPost;