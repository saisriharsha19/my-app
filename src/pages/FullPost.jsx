// src/pages/FullPost.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const FullPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/blog/${postId}`);
        console.log('API Response:', response);
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
      <div className="error-container">
        <p>{error}</p>
        <Link to="/blog" className="go-back">Go Back</Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading full post...</p>
      </div>
    );
  }

  return (
    <div className="full-post-container">
      <h1 className="full-post-title">{post.title}</h1>
      <time className="full-post-date">{new Date(post.created_at).toLocaleDateString()}</time>
      <div className="full-post-content">{post.content}</div>
      <Link to="/blog" className="go-back">Go Back</Link>
    </div>
  );
};

export default FullPost;
