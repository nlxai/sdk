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
    include: ["@nlxai/chat-core", "@nlxai/chat-react", "@nlxai/chat-widget"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /chat-core/, /chat-react/, /chat-widget/],
    },
  },
});
