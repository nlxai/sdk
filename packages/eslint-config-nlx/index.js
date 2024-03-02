/** @type {import('eslint').Linter.Config } */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "prettier"],
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
  plugins: ["react"],
  ignorePatterns: ["dist", "node_modules", "vite-env.d.ts"],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
};
