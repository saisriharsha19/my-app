import TagManager from 'react-gtm-module';

const config = {
  debug: process.env.NODE_ENV === 'development'
};

// No initialization needed here as GTM is initialized in App.js

// Page views are tracked via the PageTracker component in App.js,
// so explicit logPageView is likely redundant unless you have specific needs.
// We'll keep a dataLayer push version just in case, or you can remove it.
export const logPageView = (location) => {
  // Passively allow manual logging if needed, but App.js handles it.
  if (config.debug) {
    console.log('GTM Pageview (optional manual trigger):', location);
  }
};

export const logEvent = (category, action, label) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'custom_event', // Generic event name for GTM triggers
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    }
  });

  if (config.debug) {
    console.log('GTM Event logged:', { category, action, label });
  }
};
