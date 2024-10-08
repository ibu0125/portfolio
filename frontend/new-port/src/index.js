import React from "react";
import ReactDom from "react-dom/client";
import "./components/pages/Header";
import App from "./App";
// import "bootstrap/dist/css/bootsrap.min.css";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
