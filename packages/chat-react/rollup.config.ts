import rollupConfig from "rollup-config-nlx";
import pkg from "./package.json" with { type: "json" };

export default rollupConfig({
  pkg: pkg,
  externalDeps: ["preact/hooks", "ramda", "@nlxai/chat-core"],
  input: "src/index.ts",
});
