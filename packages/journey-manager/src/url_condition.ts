/**
 * URL match condition
 */
export interface UrlCondition {
  /**
   * Condition operator
   */
  operator: "contains" | "matches_regex" | "smart_match";
  /**
   * Condition value
   */
  value: string;
}
/**
 * Matches the URL condition.
 * @param location - The location object to match.
 * @param urlCondition - The URL condition to match againt.
 * @returns True if the URL matches the condition, false otherwise.
 */
export const matchesUrlCondition = (
  location: Location | URL,
  urlCondition: UrlCondition,
): boolean => {
  const url = location.href;

  if (urlCondition.operator === "contains") {
    return url.includes(urlCondition.value);
  }
  if (urlCondition.operator === "matches_regex") {
    return !!url.match(new RegExp(urlCondition.value));
  }
  if (urlCondition.operator === "smart_match") {
    try {
      const parsed = new URL(urlCondition.value, location.origin);

      if (parsed.protocol !== location.protocol) {
        return false;
      }

      if (parsed.host !== location.host) {
        return false;
      }

      const pathUrl = normalizePathname(location);
      const pathQuery = normalizePathname(parsed);

      if (pathUrl.length !== pathQuery.length) {
        return false;
      }
      for (let i = 0; i < pathUrl.length; i++) {
        if (pathUrl[i] !== pathQuery[i] && pathQuery[i] !== "*") {
          return false;
        }
      }
      const params = new URLSearchParams(location.search);
      for (const [key, value] of parsed.searchParams) {
        if (!params.getAll(key).includes(value) && value !== "*") {
          return false;
        }
      }
      if (parsed.hash !== "" && parsed.hash !== location.hash) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};

const normalizePathname = (url: URL | Location): string[] =>
  url.pathname
    .split("/")
    .filter(Boolean)
    .map((str) => str.toLowerCase());
