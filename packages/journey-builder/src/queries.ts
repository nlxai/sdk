import {
  QueryArgs,
  getSuggestedQuery,
  queries as queryFns,
} from "@testing-library/dom";

export type Query = {
  queryName: Method;
  queryArgs: QueryArgs;
  parent?: Query;
};

export function toJson(q: Query): string {
  return JSON.stringify(
    {
      name: q.queryName,
      target: q.queryArgs[0],
      options: q.queryArgs[1],
      parent: q.parent,
    },
    (key: string, val: unknown) => {
      if (val instanceof RegExp) {
        return { regexp: val.source, flags: val.flags };
      }
      return val;
    },
  );
}

export function fromJson(json: string): Query {
  const done = JSON.parse(json, (key, val) => {
    if (val["regexp"] && val["flags"]) {
      return new RegExp(val.regexp, val.flags);
    }
    return val;
  });
  return {
    queryName: done.name,
    queryArgs: [done.target, done.options],
    parent: done.parent,
  };
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

  return await queryFns[methodName](container, ...(q.queryArgs as any));
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
): Query | undefined {
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
  return queryFns[`queryAllBy${queryName}`](rootNode, ...(queryArgs as any));
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
): Query | undefined {
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
