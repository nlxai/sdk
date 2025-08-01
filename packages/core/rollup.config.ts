import rollupConfig from "rollup-config-nlx";
import pkg from "./package.json" with { type: "json" };

export default rollupConfig({
  pkg: pkg,
  name: "nlx",
  externalDeps: ["isomorphic-fetch", "reconnecting-websocket", "uuid", "ramda"],
  input: "src/index.ts",
});
