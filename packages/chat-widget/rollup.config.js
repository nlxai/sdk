// This file is mostly identical to that of other bundled packages, except for the bundled input path and output name
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-node-polyfills";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

export default [
  // Browser-friendly UMD build
  {
    input: "src/index.tsx",
    output: {
      name: "nlxai.chatWidget",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      typescript(),
      json(),
      resolve(),
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
    input: "src/index.tsx",
    output: [
      { file: pkg.commonjs, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [typescript(), json()],
  },
];
