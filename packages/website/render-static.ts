import fs from "node:fs/promises";
import { exit } from "node:process";
import { render } from "./dist/static/entry-server.js";
import { createServer } from "vite";
import { dirname } from "node:path";
import { PathLike } from "node:fs";

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
    await renderTo(url, `./dist/client${url}`);
  }),
);

await renderTo("/", "./dist/client/index.html");

async function renderTo(url: string, destination: string) {
  const rendered = await render(url);

  const html = template
    .replace(`<!--app-head-->`, rendered.head ?? "")
    .replace(`<!--app-html-->`, rendered.html ?? "");

  await fs.mkdir(dirname(destination), { recursive: true });
  return fs.writeFile(destination, html);
}

exit(0);
