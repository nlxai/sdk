import "./index.css";

import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

const contents = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (import.meta.env.DEV) {
  createRoot(document.getElementById("app") as Element).render(contents);
} else {
  ReactDOM.hydrateRoot(document.getElementById("app") as Element, contents);
}
