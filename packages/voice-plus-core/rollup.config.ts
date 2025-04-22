import rollupConfig from "rollup-config-nlx";
import pkg from "./package.json" with { type: "json" };

export default rollupConfig({
  pkg: pkg,
  name: "nlxai.voicePlusCore",
  externalDeps: ["isomorphic-fetch"],
  input: "src/index.ts",
});
