import fs from "node:fs/promises";
import { exit } from "node:process";
import { createServer } from "vite";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  base,
});

const templateIndex = await fs.readFile("./index.html", "utf-8");
const render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
const urls = (await vite.ssrLoadModule("/src/routes.tsx")).urls;
urls.push("/");

urls.forEach(async (url: string) => {
  const template = await vite.transformIndexHtml(url, templateIndex);

  const rendered = await render(url);

  const html = template
    .replace(`<!--app-head-->`, rendered.head ?? "")
    .replace(`<!--app-html-->`, rendered.html ?? "");

  const dir = `./static${url}`;
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(`${dir}/index.html`, html);
});

exit(0);
