import rollupConfig from "rollup-config-nlx";
import pkg from "./package.json" assert { type: "json" };
import css from "rollup-plugin-import-css";

export default rollupConfig({
  pkg: pkg,
  name: "nlxai.voicePlusWeb",
  externalDeps: [
    "@nlxai/voice-plus-core",
    "@testing-library/dom",
    "preact/jsx-runtime",
    "@floating-ui/dom",
    "preact",
    "preact/hooks",
  ],
  input: "src/index.ts",
  plugins: [css({ minify: true })],
});
