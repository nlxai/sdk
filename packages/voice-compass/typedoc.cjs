/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  sort: ["source-order", "kind", "instance-first", "alphabetical"],
  entryPoints: ["./src/index.ts"],
  out: "docs",
  validation: { notExported: true, invalidLink: true, notDocumented: true },
  treatWarningsAsErrors: true,
  treatValidationWarningsAsErrors: true,
  categoryOrder: ["Setup", "Client"],
};
