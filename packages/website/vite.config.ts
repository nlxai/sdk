import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {},
  server: {
    port: 3010,
  },
  base: "./",
  optimizeDeps: {
    include: ["@nlxai/core"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /core/],
    },
  },
  ssr: {
    // the way algolia bundles its code, without setting `type:module` breaks the SSR build.
    // bundling this (as is done in the client) resolves the issue.
    // this works around https://github.com/algolia/docsearch/pull/2117
    noExternal: [/docsearch/, /algolia/],
  },
});
