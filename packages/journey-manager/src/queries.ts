import {
  type QueryArgs,
  queries as queryFns,
  waitFor,
} from "@testing-library/dom";

/**
 * Matching method
 */
export type Method =
  | "AltText"
  | "DisplayValue"
  | "LabelText"
  | "PlaceholderText"
  | "Role"
  | "TestId"
  | "Text"
  | "Title"
  | "QuerySelector";

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
   * Parent query
   */
  parent?: Query;
}

/**
 * Serialized regex
 */
export interface SerializedRegex {
  /**
   * Regex body
   */
  regexp: string;
  /**
   * Regex flags
   */
  flags: string;
}

/**
 * Encoded query
 */
export interface EncodedQuery {
  /**
   * Query name
   */
  name: Method;
  /**
   * Query target
   */
  target: string | SerializedRegex;
  /**
   * Query options
   */
  options: Record<string, SerializedRegex | boolean> | null;
  /**
   * Query parent
   */
  parent: EncodedQuery | null;
}

function encodeTarget<T>(val: T | RegExp): T | SerializedRegex {
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

function decodeTarget<T>(val: SerializedRegex | T): RegExp | T {
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
 * Finds elements on the page. Waits and retries for up to 1s if no elements are found.
 * @throws if no elements are found
 * @param q - Query
 * @returns promise of a HTML element
 */
export async function find(q: Query): Promise<HTMLElement[]> {
  const containers = q.parent != null ? await find(q.parent) : [document.body];

  let results: HTMLElement[][] = [];

  if (q.queryName === "QuerySelector") {
    results = await Promise.all(
      containers.map(
        async (container) =>
          await waitFor(
            () => {
              const els = [
                ...container.querySelectorAll<HTMLElement>(
                  q.queryArgs[0] as string,
                ),
              ];
              if (els.length === 0) {
                throw new Error("No elements found");
              }
              return els;
            },
            { container },
          ),
      ),
    );
  } else {
    const methodName: keyof typeof queryFns = `findAllBy${q.queryName}`;
    results = await Promise.all(
      containers.map(
        async (container) =>
          await queryFns[methodName](container, ...(q.queryArgs as QueryArgs)),
      ),
    );
  }
  return results.flat();
}

/**
 * Get all elements inside rootNode that match the query. Returns immediately and does not throw if no elements are found.
 * @param q - Query
 * @param rootNode - Root node (default to `document.body`)
 * @returns array of HTML elements
 */
export function getAll(
  { queryName, queryArgs, parent }: Query,
  rootNode: HTMLElement = document.body,
): HTMLElement[] {
  let rootNodes = [rootNode];
  if (parent != null) {
    rootNodes = getAll(parent, rootNode);
  }
  if (queryName === "QuerySelector") {
    return rootNodes.flatMap(
      (n) => [...n.querySelectorAll(queryArgs[0] as string)] as HTMLElement[],
    );
  } else {
    return rootNodes.flatMap((n) =>
      queryFns[`queryAllBy${queryName}`](n, ...(queryArgs as QueryArgs)),
    );
  }
}
