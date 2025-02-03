// src/pages/Blog.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/blog/', {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching blog posts:', error);
          setError('Failed to load blog posts. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    return () => abortController.abort();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    if (isNaN(formattedDate)) {
      return "Invalid Date";
    } else {
      return formattedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  if (error) {
    return (
      <div className="blog-page error-container">
        <div className="error-message">
          <h2>⚠️ Oops!</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <h1 className="page-title">Latest Articles</h1>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading fresh content...</p>
        </div>
      ) : (
        <>
          <div className="posts-grid">
            {currentPosts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-meta">
                  <time className="post-date">
                    {formatDate(post.created_at)}
                  </time>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">
                  {post.content
                    ? post.content.substring(0, 150) + '...'
                    : 'No content available'}
                  <Link to={`/blog/${post.id}`} className="read-more">
                    Read more →
                  </Link>
                </p>
                <div className="post-author">
                  <strong>Author: </strong>{post.author || 'Unknown'}
                </div>
              </article>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
