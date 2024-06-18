/** @type {import('eslint').Linter.Config } */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "love",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier" // note: order matters. prettier being last overrides standard-with-typescript formatting
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react"
  ],
  ignorePatterns: ["dist", "node_modules", "vite-env.d.ts"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-console": "error",
    "@typescript-eslint/strict-boolean-expressions": ["error", { allowNullableBoolean: true, }],
  },
  reportUnusedDisableDirectives: true
};
