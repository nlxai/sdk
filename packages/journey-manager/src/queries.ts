import {
  QueryArgs,
  getSuggestedQuery,
  queries as queryFns,
} from "@testing-library/dom";

export type Query = {
  queryName: Method;
  queryArgs: [
    string | RegExp,
    {
      [key: string]: RegExp | boolean;
    }?,
  ];
  parent?: Query;
};

export type EncodedQuery = {
  name: Method;
  target: string | { regexp: string; flags: string };
  options: {
    [key: string]: { regexp: string; flags: string } | boolean;
  } | null;
  parent: EncodedQuery | null;
};

function encodeTarget<T>(
  val: T | RegExp,
): T | { regexp: string; flags: string } {
  if (val instanceof RegExp) {
    return { regexp: val.source, flags: val.flags };
  }
  return val;
}

export function encode(q: Query): EncodedQuery {
  return {
    name: q.queryName,
    target: encodeTarget(q.queryArgs[0]),
    options: q.queryArgs[1]
      ? Object.fromEntries(
          Object.entries(q.queryArgs[1]).map(([k, v]) => [k, encodeTarget(v)]),
        )
      : null,
    parent: q.parent ? encode(q.parent) : null,
  };
}

export function decode(q: EncodedQuery): Query {
  return {
    queryName: q.name,
    queryArgs: [
      decodeTarget(q.target),
      q.options
        ? Object.fromEntries(
            Object.entries(q.options).map(([k, v]) => [k, decodeTarget(v)]),
          )
        : undefined,
    ],
    parent: q.parent ? decode(q.parent) : undefined,
  };
}

function decodeTarget<T>(
  val: { regexp: string; flags: string } | T,
): RegExp | T {
  if (typeof val === "object") {
    const valAsRecord = val as Record<string, string>;
    if (valAsRecord.regexp && valAsRecord.flags) {
      return new RegExp(valAsRecord.regexp, valAsRecord.flags);
    }
  }
  return val as T;
}

export async function evaluate(q: Query): Promise<boolean> {
  try {
    await find(q);
    return true;
  } catch (e) {
    return false;
  }
}

export async function find(q: Query): Promise<HTMLElement> {
  const container = q.parent ? await find(q.parent) : document.body;

  const methodName = `findBy${q.queryName}` as `findBy${Method}`;

  return await queryFns[methodName](container, ...(q.queryArgs as QueryArgs));
}

export type Method =
  | "AltText"
  | "DisplayValue"
  | "LabelText"
  | "PlaceholderText"
  | "Role"
  | "TestId"
  | "Text"
  | "Title";

// Code based on @testing-library/testing-plaground/src/lib/queryAdvise.js
// MIT license - Copyright (c) 2020 Stephan Meijer

const queryMethods: Method[] = [
  "Role",
  "LabelText",
  "PlaceholderText",
  "Text",
  "DisplayValue",
  "AltText",
  "Title",
  "TestId",
];

export function getQuery(
  rootNode: HTMLElement,
  element: HTMLElement,
): Query | void {
  for (const method of queryMethods) {
    const suggestion = getSuggestedQuery(element, "get", method);

    if (suggestion) {
      const uniqueSuggestion = makeUnique(
        rootNode,
        element,
        suggestion as Query,
      );
      if (uniqueSuggestion) {
        return uniqueSuggestion;
      }
    }
  }
}

function getAll(
  rootNode: HTMLElement,
  { queryName, queryArgs }: Query,
): HTMLElement[] {
  // use queryBy here, we don't want to throw on no-results-found
  return queryFns[`queryAllBy${queryName}`](
    rootNode,
    ...(queryArgs as QueryArgs),
  );
}

function matchesSingleElement(rootNode: HTMLElement, query: Query): boolean {
  return getAll(rootNode, query)?.length === 1;
}

/**
 * Check if the viewQuery only matches a single element within the rootNode
 * and if the elementQuery only matches a single element within the view
 *
 * @param rootNode HTMLElement
 * @param viewQuery QuerySuggestion
 * @param elementQuery QuerySuggestion
 * @returns {boolean}
 */
function matchesSingleElementInView(
  rootNode: HTMLElement,
  viewQuery: Query,
  elementQuery: Query,
): boolean {
  const elements = getAll(rootNode, viewQuery);

  if (elements.length !== 1) {
    return false;
  }

  return getAll(elements[0], elementQuery).length === 1;
}

function makeUnique(
  rootNode: HTMLElement,
  element: HTMLElement,
  elementQuery: Query,
): Query | void {
  // query the element on `screen`, if it results in a single element
  if (matchesSingleElement(rootNode, elementQuery)) {
    return elementQuery;
  }

  // turns out, there are multiple matches. We're going to try to scope
  // the query by using the `within` helper method.
  let node: ParentNode | null = element;
  while (node && node !== rootNode) {
    if (node instanceof HTMLElement) {
      const view = getSuggestedQuery(node, "get") as Query | undefined;

      if (view && matchesSingleElementInView(rootNode, view, elementQuery)) {
        return { ...elementQuery, parent: view };
      }
    }
    node = node.parentNode;
  }
}
