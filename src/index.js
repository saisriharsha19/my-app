import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from './ThemeContext';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import favicon from "./icons/favicon.ico"; // Import the favicon

const favicons = [
  { rel: "icon", href: favicon, sizes: "32x32" },
  { rel: "apple-touch-icon", href: favicon, sizes: "180x180" }, // iOS devices
  { rel: "shortcut icon", href: favicon } // General fallback
];

favicons.forEach((icon) => {
  const link = document.createElement("link");
  link.rel = icon.rel;
  link.href = icon.href;
  link.sizes = icon.sizes || "";
  document.head.appendChild(link);
});

// Set document title
document.title = "Sai Sri Harsha Guddati Portfolio";

// SEO Meta Tags
const metaTags = [
  { name: "description", content: "Portfolio of Sai Sri Harsha Guddati - Software Engineer skilled in Python, React, and Cloud Technologies." },
  { name: "keywords", content: "Sai Sri Harsha Guddati, Software Engineer, Portfolio, React, Python, Cloud, AI, ML" },
  { name: "author", content: "Sai Sri Harsha Guddati" },
  { name: "robots", content: "index, follow" }
];

// Open Graph Meta Tags (for social sharing)
const openGraphTags = [
  { property: "og:title", content: "Sai Sri Harsha Guddati Portfolio" },
  { property: "og:description", content: "Software Engineer skilled in Python, React, Cloud, and AI/ML." },
  { property: "og:image", content: "/images/portfolio-thumbnail.jpg" }, // Replace with an actual image URL
  { property: "og:url", content: "https://your-portfolio-url.com" }, // Replace with your actual portfolio URL
  { property: "og:type", content: "website" }
];

// Twitter Card Meta Tags
const twitterTags = [
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Sai Sri Harsha Guddati Portfolio" },
  { name: "twitter:description", content: "Software Engineer skilled in Python, React, Cloud, and AI/ML." },
  { name: "twitter:image", content: "/images/portfolio-thumbnail.jpg" } // Replace with an actual image URL
];

// Append all meta tags to the document head
[...metaTags, ...openGraphTags, ...twitterTags].forEach(tag => {
  const meta = document.createElement("meta");
  Object.keys(tag).forEach(key => meta.setAttribute(key, tag[key]));
  document.head.appendChild(meta);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
