// This file is mostly identical to that of other bundled packages, except for the bundled input path and output name
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-node-polyfills";
import replace from "@rollup/plugin-replace";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

export default [
  // Browser-friendly UMD build
  {
    input: "src/index.ts",
    output: {
      name: "nlxai.journeyManager",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      json(),
      typescript(),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      nodePolyfills({
        include: "../**/node_modules/**/*.js",
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      terser(),
    ],
  },
  // Bundler/Node-friendly CommonJS and ESM builds
  {
    input: "src/index.ts",
    output: [
      { file: pkg.commonjs, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [typescript(), json()],
  },
];
