import jsdoc from "eslint-plugin-jsdoc";

/** @type {import('eslint').Linter.Config[]} */
export default [
  jsdoc.configs["flat/recommended-typescript-error"],
  {
    plugins: {
      jsdoc,
    },
    rules: {
      "jsdoc/require-jsdoc": [
        "error",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
          publicOnly: true,
          contexts: [
            "TSTypeAliasDeclaration",
            "TSInterfaceDeclaration",
            "TSMethodSignature",
            "TSPropertySignature",
          ],
        },
      ],
      "jsdoc/check-tag-names": [
        "error",
        { definedTags: ["category", "hidden", "typeParam", "inline"] },
      ],
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/check-param-names": ["error", { checkDestructured: false }],
    },
  },
];
