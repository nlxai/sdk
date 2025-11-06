import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

/**
 * Adjust the JS entry point if the app is run in prototype or review modes
 */
const adjustJsEntryPoint = ({ mode }: { mode: string }): any => {
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

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    replace(
      command === "serve"
        ? {}
        : {
            "process.env.NODE_ENV": JSON.stringify("production"),
          },
    ),
    adjustJsEntryPoint({ mode }),
    dts(),
  ],
  resolve: {},
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "./src/index.tsx"),
      type: ["umd", "es"],
      name: "nlxai.touchpointUi",
      fileName: (format) => (format === "umd" ? "index.umd.js" : "index.js"),
    },
  },
}));
