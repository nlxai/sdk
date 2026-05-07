import baseConfig from "@nlxai/eslint-config";
import documentation from "@nlxai/eslint-config/documentation";

/** @type {import('eslint').Linter.Config[]} */
export default [...baseConfig, ...documentation];
