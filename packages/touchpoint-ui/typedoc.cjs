/** @type { import('typedoc').TypeDocOptions & { hideInPageTOC?: boolean, hideBreadcrumbs?: boolean} } */
module.exports = {
  excludeExternals: true,
  entryPoints: ["./src/index.tsx"],
  hideBreadcrumbs: true,
  hideInPageTOC: true,
  out: "docs",
  plugin: ["typedoc-plugin-markdown"],
  readme: "none",
  sort: ["source-order", "kind", "instance-first", "alphabetical"],
  // TODO: figure out a way to sort out warnings and set the following two flags to 'true' again (consistent with the other packages)
  treatValidationWarningsAsErrors: false,
  treatWarningsAsErrors: false,
  validation: { notExported: true, invalidLink: true, notDocumented: true },
};
