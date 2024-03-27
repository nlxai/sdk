/** @type {import('eslint').Linter.Config } */
module.exports = {
  root: true,
  // appears that the preact eslint plugin isn't compatible with typescript
  extends: ["nlx"],
};
