import rollupConfig from "rollup-config-nlx";
import pkg from "./package.json" with { type: "json" };

export default rollupConfig({
  pkg: pkg,
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
