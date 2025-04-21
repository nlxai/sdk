import rollupConfig from "rollup-config-nlx";

export default rollupConfig({
  pkg: {
    // This fields are copied over directly from package.json because importing it here was not working anymore in node@22
    main: "lib/index.cjs",
    module: "lib/index.esm.js",
    browser: "lib/index.umd.js",
  },
  name: "nlxai.chatWidget",
  externalDeps: [
    "react/jsx-runtime",
    "marked",
    "react",
    "react-dom/client",
    "@emotion/react",
    "@nlxai/chat-react",
    "ramda",
    "react-dom",
    "@emotion/styled",
    "tinycolor2",
  ],
  input: "src/index.tsx",
});
