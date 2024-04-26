import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";

export function render(url: string) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
      ,
    </React.StrictMode>,
  );
  return { html };
}
