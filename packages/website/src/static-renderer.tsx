import ReactDOMServer from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";
import { StrictMode } from "react";

/*
 * this file is run through the vite build system, doing
 * bundling, transpiling, minification, etc.
 *
 * After it's bundled, it's loaded by `render-static.ts`
 * and used to pre-render the website.
 */

export function render(url: string): { head: string; body: string } {
  return {
    body: ReactDOMServer.renderToString(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
    ),
    head: "", // TODO RENDER DYNAMICALLY GENERATED HEAD HERE
  };
}
