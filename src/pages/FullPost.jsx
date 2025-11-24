// src/pages/FullPost.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft, FiClock, FiUser, FiBookOpen } from 'react-icons/fi';

const FullPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://backend-482511937770.europe-west1.run.app/blog/${postId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching full post:', error);
        setError('Failed to load the post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="error-container"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          😕
        </motion.div>
        <p>{error}</p>
        <Link to="/blog" className="go-back-btn">
          <FiArrowLeft /> Go Back to Blog
        </Link>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="full-post-loading">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="loading-skeleton"
        >
          <div className="skeleton-header-large"></div>
          <div className="skeleton-meta"></div>
          <div className="skeleton-content">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton-line"></div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="full-post-container"
    >
      {/* Reading Progress Bar */}
      <motion.div
        className="reading-progress-bar"
        style={{ scaleX: readingProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="post-header"
      >
        <Link to="/blog" className="back-link">
          <motion.div
            whileHover={{ x: -5 }}
            className="back-icon"
          >
            <FiArrowLeft />
          </motion.div>
          <span>Back to Articles</span>
        </Link>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="full-post-title"
        >
          {post.title}
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="post-meta-info"
        >
          <div className="meta-item">
            <FiClock />
            <time>{new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
          </div>
          <div className="meta-item">
            <FiUser />
            <span>{post.author || 'Anonymous'}</span>
          </div>
          <div className="meta-item">
            <FiBookOpen />
            <span>{Math.ceil(post.content?.length / 1000) || 5} min read</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="full-post-content"
      >
        <div className="content-wrapper">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <motion.h1 initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} {...props} />,
              h2: ({ node, ...props }) => <motion.h2 initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} {...props} />,
              p: ({ node, ...props }) => <motion.p initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} {...props} />,
              code: ({ node, inline, ...props }) => 
                inline ? <code {...props} /> : <motion.code initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} {...props} />
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="post-footer"
      >
        <Link to="/blog" className="go-back">
          <FiArrowLeft /> Back to all articles
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default FullPost;
