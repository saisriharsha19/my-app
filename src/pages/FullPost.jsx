// src/pages/FullPost.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft, FiClock, FiUser, FiBookOpen } from 'react-icons/fi';

const FullPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
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
        setError(null);
        const response = await fetch(`https://backend-482511937770.europe-west1.run.app/blog/${postId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }
        
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching full post:', error);
        setError('Failed to load the post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate('/blog');
  };

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
        <h2>Oops!</h2>
        <p>{error}</p>
        <motion.button
          onClick={handleGoBack}
          className="go-back-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Go Back to Blog
        </motion.button>
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

  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="error-container"
      >
        <p>Post not found</p>
        <motion.button
          onClick={handleGoBack}
          className="go-back-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Go Back to Blog
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="full-post-container"
    >
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
        <button onClick={handleGoBack} className="back-link-button">
          <motion.div
            whileHover={{ x: -5 }}
            className="back-icon"
          >
            <FiArrowLeft />
          </motion.div>
          <span>Back to Articles</span>
        </button>

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
              h1: ({ node, ...props }) => <h1 {...props} />,
              h2: ({ node, ...props }) => <h2 {...props} />,
              p: ({ node, ...props }) => <p {...props} />,
              code: ({ node, inline, ...props }) => 
                inline ? <code {...props} /> : <code {...props} />
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
        <motion.button
          onClick={handleGoBack}
          className="go-back"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Back to all articles
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FullPost;
