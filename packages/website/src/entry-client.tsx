import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.hydrateRoot(
  document.getElementById("app") as Element,
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
  </React.StrictMode>,
);
