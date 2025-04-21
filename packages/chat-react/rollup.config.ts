import rollupConfig from "rollup-config-nlx";

export default rollupConfig({
  pkg: {
    // This fields are copied over directly from package.json because importing it here was not working anymore in node@22
    main: "lib/index.cjs",
    module: "lib/index.esm.js",
  },
  externalDeps: ["preact/hooks", "ramda", "@nlxai/chat-core"],
  input: "src/index.ts",
});
