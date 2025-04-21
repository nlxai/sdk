import rollupConfig from "rollup-config-nlx";
import css from "rollup-plugin-import-css";

export default rollupConfig({
  pkg: {
    // This fields are copied over directly from package.json because importing it here was not working anymore in node@22
    main: "lib/index.cjs",
    module: "lib/index.esm.js",
    browser: "lib/index.umd.js",
  },
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
