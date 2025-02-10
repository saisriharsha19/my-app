// analytics.js
import ReactGA from 'react-ga4';

const config = {
  measurementId: 'G-SBFHT4D8YE',
  streamId: '10246799672',
  debug: process.env.NODE_ENV === 'development'
};

export const initGA = () => {
  ReactGA.initialize(config.measurementId, {
    gaOptions: {
      debug: config.debug
    }
  });
  
  // Log initialization in development
  if (config.debug) {
    console.log('GA initialized for stream:', config.streamId);
  }
};

export const logPageView = () => {
  const page = window.location.pathname;
  ReactGA.send({
    hitType: "pageview",
    page,
    title: document.title,
    location: window.location.href
  });
  
  // Log pageview in development
  if (config.debug) {
    console.log('Pageview logged:', {
      page,
      title: document.title,
      location: window.location.href
    });
  }
};

// Optional: Custom event tracking function
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label
  });
  
  // Log event in development
  if (config.debug) {
    console.log('Event logged:', { category, action, label });
  }
};