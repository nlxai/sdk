import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { enforce: "pre", ...mdx({ remarkPlugins: [remarkGfm] }) },
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
    commonjsOptions: {
      include: [/node_modules/, /chat-core/, /chat-react/, /chat-widget/],
    },
  },
});
