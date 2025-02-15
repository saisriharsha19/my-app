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
document.title = "Sai Sri Harsha Guddati Portfolio";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
