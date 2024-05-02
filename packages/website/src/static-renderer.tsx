import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";

/*
 * this file is run through the vite build system, doing
 * bundling, transpiling, minification, etc.
 *
 * After it's bundled, it's loaded by `render-static.ts`
 * and used to pre-render the website.
 */

export function render(url: string): string {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
  );
}
