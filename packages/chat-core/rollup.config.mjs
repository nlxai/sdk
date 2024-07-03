import rollupConfig from "rollup-config-nlx";
import pkg from "./package.json" assert { type: "json" };

export default rollupConfig(
  pkg,
  "nlxai.chatCore",
  ["isomorphic-fetch", "reconnecting-websocket", "uuid", "ramda"],
  true,
);
