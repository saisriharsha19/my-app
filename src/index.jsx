import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from './ThemeContext';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initGA } from "./analytics";

initGA(); // Initialize Google Analytics before the App renders

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