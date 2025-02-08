// src/pages/Portfolio.jsx
import { useEffect, useState } from 'react';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const abortController = new AbortController();

    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://personalwebsitebackend-gthafrgadzc2argc.eastus2-01.azurewebsites.net/portfolio/', {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
        setError(null);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching portfolio items:', error);
          setError('Failed to load portfolio items. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();

    return () => abortController.abort();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return (
      <div className="portfolio-page error-container">
        <div className="error-message">
          <h2>⚠️ Oops!</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <h1 className="portfolio-heading">Projects</h1>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      ) : (
        <>
          <div className="portfolio-items">
            {currentItems.map(item => (
              <div key={item.id} className="portfolio-item">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <h3>Project URL - <a href={item.project_url}>{item.project_url}</a></h3>
              </div>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => (
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

export default Portfolio;