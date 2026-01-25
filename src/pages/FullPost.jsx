// src/pages/FullPost.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft, FiUser, FiCalendar, FiShare2, FiHeart, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import CatLoader from '../components/CatLoader';

const FullPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWakingUp, setIsWakingUp] = useState(false);

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

        const allPostsRes = await fetch('https://backend-482511937770.europe-west1.run.app/blog/');
        if (allPostsRes.ok) {
          const allPosts = await allPostsRes.json();
          const filtered = allPosts.filter(p => p.id !== parseInt(postId)).slice(0, 3);
          setRelatedPosts(filtered);
        }
      } catch (error) {
        console.error('Error fetching full post:', error);
        setError('Failed to load the post. Please try again later.');
      } finally {
        // Start wake up sequence instead of just stopping loading
        setIsWakingUp(true);
        setTimeout(() => {
          setIsWakingUp(false);
          setIsLoading(false);
        }, 2500); // 2.5s for wake up animation
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
      <div className="container min-h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          className="text-5xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          😕
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-secondary mb-6">{error}</p>
        <button onClick={handleGoBack} className="btn-primary">
          <FiArrowLeft className="mr-2" /> Go Back to Blog
        </button>
      </div>
    );
  }

  if (isLoading || isWakingUp) {
    return <CatLoader isWakingUp={isWakingUp} />;
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
        style={{ maxWidth: '900px', margin: '0 auto', paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '80px' }}
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={handleGoBack}
            className="glass-panel inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-secondary hover:text-primary transition-colors"
            style={{ cursor: 'pointer' }}
          >
            <FiArrowLeft />
            <span>Back to Articles</span>
          </button>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.3' }}>
            <span className="text-gradient">{post.title}</span>
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-secondary">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-indigo-500" />
              <time>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
            <div className="flex items-center gap-2">
              <FiUser className="text-indigo-500" />
              <span>{post.author || 'Sai Sri Harsha Guddati'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiBookOpen className="text-indigo-500" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.0625rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 style={{ fontSize: '2rem', fontWeight: '700', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{children}</h1>,
              h2: ({ children }) => <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{children}</h2>,
              h3: ({ children }) => <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{children}</h3>,
              p: ({ children }) => <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>{children}</p>,
              ul: ({ children }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>{children}</ul>,
              ol: ({ children }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>{children}</ol>,
              li: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="glass-panel" style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem', margin: '2rem 0', fontStyle: 'italic', borderRadius: '0 0.75rem 0.75rem 0' }}>
                  {children}
                </blockquote>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code style={{ background: 'var(--bg-secondary)', padding: '0.125rem 0.5rem', borderRadius: '0.375rem', color: 'var(--accent-primary)', fontFamily: 'monospace', fontSize: '0.875rem' }}>{children}</code>
                ) : (
                  <div style={{ margin: '2rem 0', borderRadius: '0.75rem', overflow: 'hidden', background: '#1e293b' }}>
                    <div style={{ background: '#1e293b', padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                      <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.8)' }} />
                      <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.8)' }} />
                      <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.8)' }} />
                    </div>
                    <div style={{ background: '#1e293b', padding: '1.5rem', overflowX: 'auto' }}>
                      <code style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#e2e8f0', display: 'block' }}>{children}</code>
                    </div>
                  </div>
                ),
              strong: ({ children }) => <strong style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{children}</strong>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>{children}</a>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} style={{ borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', margin: '2rem 0', width: '100%' }} />
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
          className="flex flex-wrap gap-4 mt-12"
        >
          <motion.button
            onClick={() => setLiked(!liked)}
            className="btn-secondary glass-panel hover:bg-white/10"
            style={{
              color: liked ? '#ef4444' : 'var(--text-primary)',
              borderColor: liked ? '#ef4444' : undefined,
              backgroundColor: liked ? 'rgba(239, 68, 68, 0.1)' : undefined,
              transition: 'all 0.3s ease'
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: liked ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                scale: liked ? [1, 1.3, 1] : 1,
                rotate: liked ? [0, -10, 10, -10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <FiHeart style={{ fill: liked ? '#ef4444' : 'none', transition: 'fill 0.3s ease' }} />
            </motion.div>
            {liked ? 'Liked!' : 'Like this article'}
          </motion.button>

          <button
            onClick={handleShare}
            className="btn-secondary glass-panel hover:bg-white/10"
          >
            <FiShare2 />
            Share Article
          </button>
        </motion.div>
      </motion.article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 border-t border-gray-100 dark:border-white/5">
          <div className="container mx-auto px-6" style={{ maxWidth: '900px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: '700', marginBottom: '3rem' }}>
              <span className="text-gradient">More Articles</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((article, index) => (
                <Link key={article.id} to={`/blog/${article.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel h-full p-6 rounded-3xl group cursor-pointer"
                    whileHover={{ y: -8 }}
                  >
                    <div className="text-xs font-semibold text-indigo-500 mb-3">
                      {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-secondary line-clamp-3 mb-4">
                      {article.content?.substring(0, 120).replace(/[#*`]/g, '')}...
                    </p>
                    <div className="flex items-center text-indigo-500 text-sm font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article <FiArrowRight />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/blog">
                <button className="btn-secondary glass-panel hover:bg-white/5">
                  View all articles <FiArrowRight className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FullPost;