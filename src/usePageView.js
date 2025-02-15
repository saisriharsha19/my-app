// usePageView.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.search;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page: pagePath,
    });
  }, [location]);
};

export default usePageView;
