import { ensureToken } from "../commands/auth/login.js";
import { consola } from "consola";

const API_BASE_URL =
  process.env.NLX_API_BASE_URL || "https://api.dev.studio.nlx.ai/v1";

export const fetchManagementApi = async <T extends unknown>(
  path: string,
  method: string = "GET",
  body?: any,
): Promise<T> => {
  const accessToken = await ensureToken();
  consola.debug(`Fetch ${method} /${path} ${body ? JSON.stringify(body) : ""}`);
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    consola.error("Failed to fetch:", res.status, await res.text());
    process.exit(1);
  }
  const result = (await res.json()) as T;
  consola.debug("Response:", JSON.stringify(result));
  return result;
};

export const fetchManagementApiPaginated = async <T extends unknown>(
  path: string,
): Promise<T[]> => {
  let result: any = await fetchManagementApi(
    path + (path.includes("?") ? "&size=1000" : "?size=1000"),
  );

  let agg;

  const key = Object.keys(result).filter((k) => k !== "nextPageId")[0];
  agg = result[key];

  while (result.nextPageId) {
    result = await fetchManagementApi(path + `?page=${result.nextPageId}`);
    agg.push(...result[key]);
  }
  return agg;
};

export const singleton = <T>(fn: () => Promise<T>): (() => Promise<T>) => {
  let running: Promise<T> | null = null;
  return async () => {
    if (!running) {
      running = fn().finally(() => {
        running = null;
      });
    }
    return running!;
  };
};
