const atPropertyRe = /@property\s+[^{]+\{[^}]*\}/g;

/**
 * Extracts all `@property` declarations from a CSS string, returning only
 * those rules joined as a single stylesheet string. Returns `null` when the
 * input contains no `@property` rules.
 */
export const extractPropertyCSS = (css: string): string | null => {
  const matches = css.match(atPropertyRe);
  if (matches == null || matches.length === 0) return null;
  return matches.join("\n");
};

let adopted = false;

/**
 * Extracts `@property` declarations from a CSS string and adopts them into the
 * document so they are registered at the top level.
 *
 * `@property` rules are silently ignored inside shadow roots. By adopting a
 * stylesheet containing **only** `@property` declarations at the document level,
 * we register custom properties (e.g. Tailwind v4's `--tw-translate-x`) without
 * leaking utility classes or other styles into the host page.
 *
 * Idempotent — subsequent calls are a no-op.
 */
export const adoptPropertyDeclarations = (css: string): void => {
  if (adopted) return;
  adopted = true;

  const propertyCSS = extractPropertyCSS(css);
  if (propertyCSS == null) return;

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(propertyCSS);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
};
