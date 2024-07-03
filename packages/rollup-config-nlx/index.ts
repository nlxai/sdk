import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default function buildconfig({ pkg, name, externalDeps, buildBrowser }) {
  const config = [
    // Bundler/Node-friendly CommonJS and ESM builds
    // this version doesn't need to package node_modules because we assume they'll be installed as dependencies of this package
    {
      input: "src/index.ts",
      output: [
        { file: pkg.main, format: "cjs" },
        { file: pkg.module, format: "es" },
      ],
      external: externalDeps,
      plugins: [typescript(), json()],
    },
  ];

  if (buildBrowser) {
    // Browser-friendly UMD build. This version is used with unpkg.com to be directly included in a script tag.
    config.push({
      input: "src/index.ts",
      output: {
        name: name,
        file: pkg.browser,
        format: "umd",
      },
      plugins: [
        commonjs(), // needed to bundle node modules that use cjs
        json(), // needed to fetch package version from package.json
        nodePolyfills(),
        nodeResolve({ browser: true }), // bundles packages from node_modules
        terser(),
        typescript(),
      ],
    });
  }

  return config;
}
