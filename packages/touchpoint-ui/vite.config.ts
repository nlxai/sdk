import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
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
