import rollupConfig from "@nlxai/rollup-config";
import pkg from "./package.json" with { type: "json" };

export default rollupConfig({
  pkg: pkg,
  name: "nlxConnectChatAdapter",
  externalDeps: [],
  input: "src/index.ts",
});
