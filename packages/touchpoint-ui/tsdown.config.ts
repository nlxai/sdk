import { defineConfig } from "tsdown";

import pkg from "./package.json";

const basicOpts = {
  entry: "./src/index.tsx",
  outDir: "./lib",
  loader: { css: "text" },
  platform: "browser",
  fixedExtension: true,
} as const;

export default defineConfig([
  { ...basicOpts, format: "es" },
  {
    ...basicOpts,
    format: "umd",
    outputOptions: { name: "nlxai.touchpointUi" },
    noExternal: Object.keys(pkg.dependencies || {})
      .concat(Object.keys(pkg.peerDependencies || {}))
      .filter((n) => n != "react"),
    // external: [],
    // minify: true,
    fixedExtension: true,
  },
]);
