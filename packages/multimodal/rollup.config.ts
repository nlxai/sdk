import rollupConfig from "rollup-config-nlx";
import pkg from "./package.json" assert { type: "json" };

export default rollupConfig({
  pkg: pkg,
  name: "nlxai.multimodal",
  externalDeps: ["isomorphic-fetch"],
  input: "src/index.ts",
});
