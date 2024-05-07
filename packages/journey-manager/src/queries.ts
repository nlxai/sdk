import {
  type QueryArgs,
  getSuggestedQuery,
  queries as queryFns,
} from "@testing-library/dom";

/**
 * Query
 */
export interface Query {
  /**
   * Query name
   */
  queryName: Method;
  /**
   * Query arguments
   */
  queryArgs: [string | RegExp, Record<string, RegExp | boolean>?];
  /**
   *
   */
  parent?: Query;
}

/**
 *
 */
export interface EncodedQuery {
  /**
   *
   */
  name: Method;
  /**
   *
   */
  target: string | { regexp: string; flags: string };
  /**
   *
   */
  options: Record<string, { regexp: string; flags: string } | boolean> | null;
  /**
   *
   */
  parent: EncodedQuery | null;
}

function encodeTarget<T>(
  val: T | RegExp,
): T | { regexp: string; flags: string } {
  if (val instanceof RegExp) {
    return { regexp: val.source, flags: val.flags };
  }
  return val;
}

/**
 * Encode query
 * @param q - Query
 * @returns encoded query
 */
export function encode(q: Query): EncodedQuery {
  return {
    name: q.queryName,
    target: encodeTarget(q.queryArgs[0]),
    options:
      q.queryArgs[1] != null
        ? Object.fromEntries(
            Object.entries(q.queryArgs[1]).map(([k, v]) => [
              k,
              encodeTarget(v),
            ]),
          )
        : null,
    parent: q.parent != null ? encode(q.parent) : null,
  };
}

/**
 * Decode query
 * @param q - Encoded query
 * @returns query
 */
export function decode(q: EncodedQuery): Query {
  return {
    queryName: q.name,
    queryArgs: [
      decodeTarget(q.target),
      q.options != null
        ? Object.fromEntries(
            Object.entries(q.options).map(([k, v]) => [k, decodeTarget(v)]),
          )
        : undefined,
    ],
    parent: q.parent != null ? decode(q.parent) : undefined,
  };
}

function decodeTarget<T>(
  val: { regexp: string; flags: string } | T,
): RegExp | T {
  if (typeof val === "object") {
    const valAsRecord = val as Record<string, string>;
    if (valAsRecord.regexp != null && valAsRecord.flags != null) {
      return new RegExp(valAsRecord.regexp, valAsRecord.flags);
    }
  }
  return val as T;
}

/**
 * Evaluate query
 * @param q - Query
 * @returns promise of whether the query matches
 */
export async function evaluate(q: Query): Promise<boolean> {
  try {
    await find(q);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 *
 * @param q - Query
 * @returns promise of a HTML element
 */
export async function find(q: Query): Promise<HTMLElement> {
  const container = q.parent != null ? await find(q.parent) : document.body;

  const methodName: keyof typeof queryFns = `findBy${q.queryName}`;

  // eslint-disable-next-line @typescript-eslint/return-await --  initial eslint integration: disable all existing eslint errors
  return await queryFns[methodName](container, ...(q.queryArgs as QueryArgs));
}

/**
 *
 */
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

/**
 * Get query
 * @param rootNode - Root node
 * @param element - Element
 * @returns query
 */
export function getQuery(
  rootNode: HTMLElement,
  element: HTMLElement,
): Query | undefined {
  for (const method of queryMethods) {
    const suggestion = getSuggestedQuery(element, "get", method);

    if (suggestion != null) {
      const uniqueSuggestion = makeUnique(
        rootNode,
        element,
        suggestion as Query,
      );
      if (uniqueSuggestion != null) {
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
 * @param rootNode - Root node
 * @param viewQuery - View query
 * @param elementQuery - Element query
 * @returns whether it matches a single element in view
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
): Query | undefined {
  // query the element on `screen`, if it results in a single element
  if (matchesSingleElement(rootNode, elementQuery)) {
    return elementQuery;
  }

  // turns out, there are multiple matches. We're going to try to scope
  // the query by using the `within` helper method.
  let node: ParentNode | null = element;
  while (node != null && node !== rootNode) {
    if (node instanceof HTMLElement) {
      const view = getSuggestedQuery(node, "get") as Query | undefined;

      if (
        view != null &&
        matchesSingleElementInView(rootNode, view, elementQuery)
      ) {
        return { ...elementQuery, parent: view };
      }
    }
    node = node.parentNode;
  }
}
