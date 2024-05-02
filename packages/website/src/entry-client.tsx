import "./index.css";
import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const contents = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.env.DEV) {
  createRoot(document.getElementById("app") as Element).render(contents);
} else {
  ReactDOM.hydrateRoot(document.getElementById("app") as Element, contents);
}
