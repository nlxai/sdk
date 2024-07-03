import rollupConfig from "rollup-config-nlx";
import pkg from "./package.json" assert { type: "json" };

export default rollupConfig({
  pkg: pkg,
  name: "nlxai.journeyManager",
  externalDeps: [
    "@nlxai/multimodal",
    "@testing-library/dom",
    "preact/jsx-runtime",
    "@floating-ui/dom",
    "preact",
    "preact/hooks",
  ],
  input: "src/index.ts",
});
