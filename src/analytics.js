import ReactGA from 'react-ga4';

const config = {
  measurementId: 'G-SBFHT4D8YE',
  debug: process.env.NODE_ENV === 'development'
};

const STORED_PARAMS_KEY = 'ga_stored_params';

// GA4 natively uses 'campaign_source', 'campaign_medium', 'campaign_name' for manual attribution overrides.
const UTM_TO_GA4_MAP = {
  'utm_source': 'campaign_source',
  'utm_medium': 'campaign_medium',
  'utm_campaign': 'campaign_name',
  'source': 'campaign_source',
  'medium': 'campaign_medium',
  'campaign': 'campaign_name'
};

export const getAndStoreUrlParams = () => {
  if (typeof window === 'undefined') return {};
  
  const searchParams = new URLSearchParams(window.location.search);
  const newParams = {};
  let hasNewParams = false;

  for (const [key, value] of searchParams.entries()) {
    // Check if it's a known mapped parameter
    if (UTM_TO_GA4_MAP[key]) {
      newParams[UTM_TO_GA4_MAP[key]] = value;
      hasNewParams = true;
    } 
    // Otherwise just pass through other utm_ or tracking markers (like gclid)
    else if (key.startsWith('utm_') || ['ref', 'gclid', 'fbclid'].includes(key)) {
      newParams[key] = value;
      hasNewParams = true;
    }
  }

  // Load existing params from session storage
  let storedParams = {};
  try {
    const stored = sessionStorage.getItem(STORED_PARAMS_KEY);
    if (stored) {
      storedParams = JSON.parse(stored);
    }
  } catch (e) {
    if (config.debug) console.error('Error reading session storage setup', e);
  }

  // If we have new parameters in the URL, overwrite/merge the stored ones
  if (hasNewParams) {
    const combinedParams = { ...storedParams, ...newParams };
    try {
      sessionStorage.setItem(STORED_PARAMS_KEY, JSON.stringify(combinedParams));
    } catch (e) {
      if (config.debug) console.error('Error saving to session storage', e);
    }
    return combinedParams;
  }

  return storedParams;
};

export const initGA = () => {
  if (ReactGA.isInitialized) return;

  ReactGA.initialize(config.measurementId, {
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  });

  const urlParams = getAndStoreUrlParams();

  // Explicitly update consent state again after ReactGA initializes
  // just in case GTM or other configs override the default.
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });

    // Extract maximum user context and set tracked parameters globally
    window.gtag('set', {
      ...urlParams, // This explicitly sets UTM/custom parameters for all subsequent hits
      user_properties: {
        browser_language: navigator.language || navigator.userLanguage,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        user_agent: navigator.userAgent
      }
    });
  }

  if (config.debug) {
    console.log('GA initialized:', config.measurementId, 'with params:', urlParams);
  }
};

export const logPageView = () => {
  const urlParams = getAndStoreUrlParams();
  
  ReactGA.send({
    hitType: 'pageview',
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
    ...urlParams
  });

  if (config.debug) {
    console.log('GA Pageview logged:', window.location.pathname, 'with params:', urlParams);
  }
};

export const logEvent = (category, action, label, extraParams = {}) => {
  const urlParams = getAndStoreUrlParams();
  
  ReactGA.event({
    category,
    action,
    label,
    ...urlParams,
    ...extraParams
  });

  if (config.debug) {
    console.log('GA Event logged:', { category, action, label, ...urlParams, ...extraParams });
  }
};
