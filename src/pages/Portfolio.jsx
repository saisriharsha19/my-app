// src/pages/Portfolio.jsx
import { useEffect, useState } from 'react';

const Portfolio = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://personalwebsitebackend-gthafrgadzc2argc.eastus2-01.azurewebsites.net/portfolio/');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="portfolio-page">
      <h1>Portfolio</h1>
      <div className="portfolio-items">
        {items.map(item => (
          <div key={item.id} className="portfolio-item">
            <h2>{item.title}</h2>
            <img src={item.image_url} alt={item.title} />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
