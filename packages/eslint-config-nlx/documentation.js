/** @type {import('eslint').Linter.Config } */
module.exports = {
  extends: ["plugin:jsdoc/recommended-typescript-error"],
  plugins: ["eslint-plugin-tsdoc"],
  rules: {
    "jsdoc/require-jsdoc": [
      "error",
      {
        publicOnly: true,
        // these ensure that documentation of various type script constructs is required. Will tweak as we go.
        contexts: ["TSTypeAliasDeclaration","TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"]
      }
    ],
    "jsdoc/check-tag-names": ["error", { definedTags: ["category", "hidden", "typeParam"] }],
    "jsdoc/require-param": ["error", { checkDestructured: false }],
    "jsdoc/check-param-names": ["error", { checkDestructured: false }],
    "tsdoc/syntax": "error",
  },
  overrides: [
    {
      files: ["*.cjs", "*.js"],
      rules: {
        "tsdoc/syntax": "off",
      }
    }
  ]
};
