/** @type {import('eslint').Linter.Config } */
module.exports = {
  root: true,
  extends: ["nlx", "plugin:jsdoc/recommended-typescript-error"],
  rules: {
    "jsdoc/check-tag-names": ["error", { definedTags: ["category", "hidden"] }],
    "jsdoc/require-param": ["error", { checkDestructured: false }],
    "jsdoc/check-param-names": ["error", { checkDestructured: false }],
  },
};
