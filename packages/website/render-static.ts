import fs from "node:fs/promises";
import { exit } from "node:process";
import { createServer } from "vite";
import { dirname } from "node:path";
// @ts-expect-error we need to build this before usage to ensure cache-busted assets are included, but building right now doesn't build .d.ts files
import { render as untypedRender } from "./dist/static/entry-server.js";
const render: (url: string) => string = untypedRender;

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

const { urls } = await server.ssrLoadModule("/src/routes.tsx");

// Cached production assets
const template = (
  (await fs.readFile("./dist/client/index.html", "utf-8")) as unknown as string
).replace("./", "/"); // use absolute instead of relative paths

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

exit(0);
