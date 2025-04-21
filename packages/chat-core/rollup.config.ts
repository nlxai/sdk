import rollupConfig from "rollup-config-nlx";

export default rollupConfig({
  pkg: {
    // This fields are copied over directly from package.json because importing it here was not working anymore in node@22
    main: "lib/index.cjs",
    module: "lib/index.esm.js",
    browser: "lib/index.umd.js",
  },
  name: "nlxai.chatCore",
  externalDeps: ["isomorphic-fetch", "reconnecting-websocket", "uuid", "ramda"],
  input: "src/index.ts",
});
