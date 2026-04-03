import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

/**
 * Adjust the JS entry point if the app is run in prototype or review modes
 */
const designSystemEntryPoint = (): PluginOption => {
  return {
    name: "html-transform",
    transformIndexHtml: {
      order: "pre",
      handler: () => {
        return {
          html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Design System</title>
</head>
<body>
  <main></main>
  <script type="module">
    import { renderDesignSystem } from "./src/design-system/index.tsx";

    renderDesignSystem(document.querySelector("main"));
  </script>
</body>
</html>
`,
          tags: [],
        };
      },
    },
  };
};

const sharedPlugins = (command: "serve" | "build"): PluginOption[] => [
  react(),
  tailwindcss(),
  replace(
    command === "serve"
      ? {}
      : {
          "process.env.NODE_ENV": JSON.stringify("production"),
        },
  ),
  dts(),
];

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) =>
  mode === "design-system"
    ? {
        plugins: [designSystemEntryPoint(), ...sharedPlugins(command)],
        build: {
          outDir: "build",
        },
      }
    : {
        plugins: sharedPlugins(command),
        resolve: {},
        build: {
          outDir: "lib",
          lib: {
            entry: resolve(__dirname, "./src/index.tsx"),
            type: ["umd", "es"],
            name: "nlxai.touchpointUi",
            fileName: (format) =>
              format === "umd" ? "index.umd.js" : "index.js",
          },
        },
      },
);
