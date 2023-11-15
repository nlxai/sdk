// This file is mostly identical to that of other bundled packages, except for the bundled input path and output name
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

export default [
  // Bundler/Node-friendly CommonJS and ESM builds
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [typescript(), json()],
  },
];
