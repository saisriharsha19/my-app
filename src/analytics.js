import ReactGA from 'react-ga4';

const config = {
  measurementId: 'G-SBFHT4D8YE',
  debug: process.env.NODE_ENV === 'development'
};

export const initGA = () => {
  if (ReactGA.isInitialized) return;

  // Set default consent to granted to fix `pscdl=denied` and `gcs=G100` issue
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    'analytics_storage': 'granted',
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted'
  });

  ReactGA.initialize(config.measurementId);

  if (config.debug) {
    console.log('GA initialized:', config.measurementId);
  }
};

export const logPageView = () => {
  ReactGA.send({
    hitType: 'pageview',
    page_path: window.location.pathname,
    page_title: document.title
  });

  if (config.debug) {
    console.log('GA Pageview logged:', window.location.pathname);
  }
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label
  });

  if (config.debug) {
    console.log('GA Event logged:', { category, action, label });
  }
};
