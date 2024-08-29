import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { Plugin, RollupOptions } from "rollup";

interface CommonConfig {
  externalDeps: string[];
  input: string;
  plugins?: Plugin[];
}

interface CommonPackageJsonFields {
  main: string;
  module: string;
}

export interface PackageJsonWithBrowser extends CommonPackageJsonFields {
  browser: string;
}

export interface PackageJsonWithoutBrowser extends CommonPackageJsonFields {
  browser?: never;
}

interface WithBrowserConfig {
  pkg: PackageJsonWithBrowser;
  name: string;
}

interface WithoutBrowserConfig {
  pkg: PackageJsonWithoutBrowser;
  name?: never;
}

export type Config = (WithBrowserConfig | WithoutBrowserConfig) & CommonConfig;

export default function rollupConfig({
  pkg,
  name,
  externalDeps,
  input,
  plugins = [],
}: Config): RollupOptions[] {
  const config: RollupOptions[] = [
    // Bundler/Node-friendly CommonJS and ESM builds
    // this version doesn't need to package node_modules because we assume they'll be installed as dependencies of this package
    {
      input: input,
      output: [
        { file: pkg.main, format: "cjs" },
        { file: pkg.module, format: "es" },
      ],
      external: externalDeps,
      plugins: [typescript(), json(), ...plugins],
    },
  ];

  if (pkg.browser) {
    // Browser-friendly UMD build. This version is used with unpkg.com to be directly included in a script tag.
    config.push({
      input: input,
      output: {
        name: name,
        file: pkg.browser,
        format: "umd",
      },
      plugins: [
        commonjs(), // needed to bundle node modules that use cjs
        json(), // needed to fetch package version from package.json
        nodeResolve({ browser: true }), // bundles packages from node_modules
        nodePolyfills(),
        terser(),
        replace({
          preventAssignment: true,
          // this is used by some libraries and polyfills
          "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        typescript(),
        ...plugins,
      ],
    });
  }

  return config;
}
