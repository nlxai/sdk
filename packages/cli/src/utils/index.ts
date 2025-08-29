import { ensureToken } from "../commands/login.js";
import { consola } from "consola";

const API_BASE_URL =
  process.env.NLX_API_BASE_URL || "https://api.dev.studio.nlx.ai/v1";

export const fetchManagementApi = async (
  path: string,
  method: string = "GET",
  body?: any,
) => {
  const accessToken = await ensureToken();
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
  return await res.json();
};
