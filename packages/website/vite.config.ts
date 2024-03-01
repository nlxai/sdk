import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkGfm],
        providerImportSource: "@mdx-js/react",
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  define: {},
  server: {
    port: 3010,
  },
  base: "./",
  optimizeDeps: {
    include: ["@nlxai/chat-core", "@nlxai/chat-react", "@nlxai/chat-widget"],
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/, /chat-core/, /chat-react/, /chat-widget/],
    },
  },
});
