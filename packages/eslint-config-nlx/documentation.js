/** @type {import('eslint').Linter.Config } */
module.exports = {
  extends: ["plugin:jsdoc/recommended-typescript-error"],
  plugins: ["eslint-plugin-tsdoc"],
  rules: {
    "jsdoc/check-tag-names": ["error", { definedTags: ["category", "hidden"] }],
    "jsdoc/require-param": ["error", { checkDestructured: false }],
    "jsdoc/check-param-names": ["error", { checkDestructured: false }],
    "tsdoc/syntax": "error",
  },
};
