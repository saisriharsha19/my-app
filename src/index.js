import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import favicon from "./icons/favicon.ico"; // Import the favicon

// Dynamically add favicon to head
const link = document.createElement("link");
link.rel = "icon";
link.href = favicon;
document.head.appendChild(link);
document.title = "Sai Sri Harsha Guddati Portfolio";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
