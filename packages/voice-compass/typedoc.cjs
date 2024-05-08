/** @type { import('typedoc').TypeDocOptions & { hideInPageTOC?: boolean, hideBreadcrumbs?: boolean} } */
module.exports = {
  categoryOrder: ["Setup", "Client"],
  entryPoints: ["./src/index.ts"],
  hideBreadcrumbs: true,
  hideInPageTOC: true,
  out: "docs",
  plugin: ["typedoc-plugin-markdown"],
  readme: "none",
  sort: ["source-order", "kind", "instance-first", "alphabetical"],
  treatValidationWarningsAsErrors: true,
  treatWarningsAsErrors: true,
  validation: { notExported: true, invalidLink: true, notDocumented: true },
};
