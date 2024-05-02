import fs from "node:fs/promises";
import { exit } from "node:process";
import { createServer } from "vite";
import { dirname } from "node:path";
import { create } from "xmlbuilder2";
import type { XMLBuilder } from "xmlbuilder2/lib/interfaces";
// @ts-expect-error we need to build this before usage to ensure cache-busted assets are included, but building right now doesn't build .d.ts files
import { render as untypedRender } from "./dist/static/static-renderer.js";
const render: (url: string) => string = untypedRender;

/* this script statically renders the website, and generates a sitemap */

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

const { urls } = await server.ssrLoadModule("/src/routes.tsx");

const envFromFile = await (async (filename) => {
  try {
    return Object.fromEntries(
      (await fs.readFile(filename, "utf-8"))
        .split("\n")
        .map((line) => line.split("=")),
    );
  } catch (_) {
    return null;
  }
})(".env.local");

const algoliaAppId =
  process.env.VITE_ALGOLIA_APP_ID ?? envFromFile?.VITE_ALGOLIA_APP_ID;

if (process.env.CI === "true" && algoliaAppId == null) {
  throw new Error("expected env var VITE_ALGOLIA_APP_ID to be set");
}

// Cached production assets
const template = (
  (await fs.readFile("./dist/client/index.html", "utf-8")) as unknown as string
)
  .replace(
    "<!--algolia-preload-tag-->",
    `<link rel="preconnect" href="https://${algoliaAppId}-dsn.algolia.net" crossorigin />`,
  ) // should improve search performance, see https://docsearch.algolia.com/docs/DocSearch-v3#preconnect
  .replace("./", "/"); // use absolute instead of relative paths

await Promise.all(
  urls.map(async (url: string) => {
    await renderTo(url, `./dist/client${url}.html`);
  }),
);

await renderTo("/", "./dist/client/index.html");

async function renderTo(url: string, destination: string): Promise<void> {
  const rendered = render(url);

  const html = template.replace(`<!--app-html-->`, rendered ?? "");

  await fs.mkdir(dirname(destination), { recursive: true });
  await fs.writeFile(destination, html);
}

const sitemap = [...urls, "/"]
  .reduce<XMLBuilder>(
    (acc, url) => {
      return acc
        .ele("url")
        .ele("loc")
        .txt(`https://developers.nlx.ai${url}`)
        .up()
        .up();
    },
    create({ version: "1.0" }).ele("urlset", {
      xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
    }),
  )
  .doc()
  .end({ prettyPrint: true });

await fs.writeFile("./dist/client/sitemap.xml", sitemap);

exit(0);
