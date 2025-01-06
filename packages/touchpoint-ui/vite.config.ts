import { resolve } from "path";
import fs from "fs";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import { defineConfig } from "vite";

/**
 * Adjust the JS entry point if the app is run in prototype or review modes
 */
const adjustJsEntryPoint = ({ mode }: any): any => {
  return {
    name: "html-transform",
    order: "pre",
    transformIndexHtml: (html: string) => {
      const entryPoint = "/src/index.tsx";
      if (mode === "design-system") {
        return html.replace(entryPoint, "/src/design-system.tsx");
      }
      return html;
    },
  };
};

/**
 * Load assets as base64-encoded string
 */
const base64Loader = {
  name: "base64-loader",
  transform(_: any, id: string) {
    const [path, query] = id.split("?");
    if (query != "base64") return null;

    const data = fs.readFileSync(path);
    const base64 = data.toString("base64");

    return `export default '${base64}';`;
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  plugins: [
    react(),
    replace(
      command === "serve"
        ? {}
        : {
            "process.env.NODE_ENV": JSON.stringify("production"),
          },
    ),
    adjustJsEntryPoint({ mode }),
    base64Loader,
  ],
  resolve: {},
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "./src/index.tsx"),
      name: "touchpointUi",
      fileName: "index",
    },
  },
}));
