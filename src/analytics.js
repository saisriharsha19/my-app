import ReactGA from 'react-ga4';

const config = {
  measurementId: 'G-SBFHT4D8YE',
  debug: process.env.NODE_ENV === 'development'
};

export const initGA = () => {
  if (ReactGA.isInitialized) return;

  ReactGA.initialize(config.measurementId);

  // Explicitly update consent state again after ReactGA initializes
  // just in case GTM or other configs override the default.
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
  }

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
