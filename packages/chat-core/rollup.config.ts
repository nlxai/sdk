import rollupConfig from "../rollup-config-nlx/index.ts";
import pkg from "./package.json" assert { type: "json" };

export default rollupConfig({
  pkg: pkg,
  name: "nlxai.chatCore",
  externalDeps: ["isomorphic-fetch", "reconnecting-websocket", "uuid", "ramda"],
  buildBrowser: true,
});
