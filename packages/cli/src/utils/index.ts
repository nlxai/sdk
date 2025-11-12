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
