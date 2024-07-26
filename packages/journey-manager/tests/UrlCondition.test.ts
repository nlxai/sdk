import { matchesUrlCondition, UrlCondition } from "../src/UrlCondition";

describe("matchesUrlCondition", () => {
  test.each([
    { operator: "contains", value: "example", url: "https://example.com" },
    {
      operator: "contains",
      value: "example",
      url: "https://example.com/example/?43",
    },
    {
      operator: "matches_regex",
      value: "https?://e...ple\\.com/?",
      url: "http://example.com/",
    },
    { operator: "smart_match", value: "/foo", url: "https://example.com/foo" },
    {
      operator: "smart_match",
      value: "/foo",
      url: "https://example.com/foo?bar=baz",
    },
    {
      operator: "smart_match",
      value: "/foo/*",
      url: "https://example.com/foo/32#bar",
    },
    {
      operator: "smart_match",
      value: "/foo/*?bar=baz",
      url: "https://example.com/foo/32?bar=baz",
    },
    {
      operator: "smart_match",
      value: "/foo/*?bar=baz",
      url: "https://example.com/foo/32?bar=baz&bar=foo&ads=fer",
    },
    {
      operator: "smart_match",
      value: "https://example.com/foo/*?bar=*#h1",
      url: "https://example.com/foo/32?bar=baz&bar=foo&ads=fer#h1",
    },
  ])('$url $operator "$value"', ({ operator, value, url }) => {
    const urlCondition: UrlCondition = {
      operator: operator as UrlCondition["operator"],
      value,
    };
    const location = new URL(url);
    expect(matchesUrlCondition(location, urlCondition)).toBe(true);
  });

  test.each([
    {
      operator: "contains",
      value: "exmple",
      url: "https://example.com/example/?43",
    },
    {
      operator: "matches_regex",
      value: "https?://e..ple\\.com/?",
      url: "http://example.com/",
    },
    { operator: "smart_match", value: "/bar", url: "https://example.com/foo" },
    {
      operator: "smart_match",
      value: "/",
      url: "https://example.com/foo?bar=baz",
    },
    {
      operator: "smart_match",
      value: "/*",
      url: "https://example.com/foo/32#bar",
    },
    {
      operator: "smart_match",
      value: "/foo/*?bar=bat",
      url: "https://example.com/foo/32?bar=baz",
    },
    {
      operator: "smart_match",
      value: "/foo/*?bar=bazt",
      url: "https://example.com/foo/32?bar=baz&bar=foo&ads=fer",
    },
    {
      operator: "smart_match",
      value: "https://example.com/foo/*?bar=*#h1",
      url: "http://example.com/foo/32?bar=baz&bar=foo&ads=fer#h1",
    },
    {
      operator: "smart_match",
      value: "https://example.com/foo/*?bar=*#h1",
      url: "https://example.co/foo/32?bar=baz&bar=foo&ads=fer#h1",
    },
    {
      operator: "smart_match",
      value: "https://example.com/foo/*?bar=*#h2",
      url: "http://example.com/foo/32?bar=baz&bar=foo&ads=fer#h1",
    },
  ])('$url does not $operator "$value"', ({ operator, value, url }) => {
    const urlCondition: UrlCondition = {
      operator: operator as UrlCondition["operator"],
      value,
    };
    const location = new URL(url);
    expect(matchesUrlCondition(location, urlCondition)).toBe(false);
  });
});
