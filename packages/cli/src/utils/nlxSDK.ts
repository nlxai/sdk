import { consola } from 'consola';
import { ApiRequestBase, TeamResponse, RoleResponse, BotsListResponse } from './types/api';

const API_BASE_URL = process.env.NLX_API_BASE_URL || "https://api.dev.studio.nlx.ai/v1";
type HttpConfig = { headers?: Record<string, string> };

function logRequestError(context: string, err: any): void {
  const method = (err?.config?.method || '').toString().toUpperCase();
  const url = err?.config?.url || 'unknown-url';
  const status = err?.response?.status;
  const statusText = err?.response?.statusText;
  const message = err?.response?.data?.message || err?.message || String(err);
  const parts = [context, method, url, status ? String(status) : undefined, statusText, message].filter(Boolean);
  consola.warn(`Request failed: ${parts.join(' | ')}`);
}

const buildHeaders = (token: string, headers?: Record<string, string>) => ({
  ...headers,
  'Content-Type': 'application/json',
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
})

async function httpGet<T = unknown>(token: string, path: string, config?: HttpConfig) {
  const url = `${API_BASE_URL}${path}`;
  const headers = buildHeaders(token, config?.headers as any);
  try {
    const res = await fetch(url, { method: 'GET', headers });
    if (res.status >= 400) {
      const message = await res.text();
      throw new Error(message || `HTTP ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (err: any) {
    logRequestError(`GET ${path}`, err);
    throw err;
  }
}

async function httpPost<T = unknown>(token: string, path: string, body?: ApiRequestBase, config?: HttpConfig) {
  const url = `${API_BASE_URL}${path}`;
  const headers = buildHeaders(token, config?.headers as any);
  try {
    const res = await fetch(url, { method: 'POST', headers, body: body ? JSON.stringify(body) : undefined });
    if (res.status >= 400) {
      const message = await res.text();
      throw new Error(message || `HTTP ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (err: any) {
    logRequestError(`POST ${path}`, err);
    throw err;
  }
}

async function httpPut<T = unknown>(token: string, path: string, body?: ApiRequestBase, config?: HttpConfig) {
  const url = `${API_BASE_URL}${path}`;
  const headers = buildHeaders(token, config?.headers as any);
  try {
    const res = await fetch(url, { method: 'PUT', headers, body: body ? JSON.stringify(body) : undefined });
    if (res.status >= 400) {
      const message = await res.text();
      throw new Error(message || `HTTP ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (err: any) {
    logRequestError(`PUT ${path}`, err);
    throw err;
  }
}

async function httpDelete<T = unknown>(token: string, path: string, config?: HttpConfig) {
  const url = `${API_BASE_URL}${path}`;
  const headers = buildHeaders(token, config?.headers as any);
  try {
    const res = await fetch(url, { method: 'DELETE', headers });
    if (res.status >= 400) {
      const message = await res.text();
      throw new Error(message || `HTTP ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (err: any) {
    logRequestError(`DELETE ${path}`, err);
    throw err;
  }
}

export const http = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
} as const;

export const bots = {
  get: (token: string, params?: { botId?: string }): Promise<BotsListResponse> => {
    const path = params?.botId ? `/bots/${params.botId}` : '/bots';
    return httpGet<BotsListResponse>(token, path);
  },
  post: (token: string, { botId, bot }: { botId: string; bot: ApiRequestBase }) => {
    const enriched = { ...bot, botId };
    return httpPost(token, `/bots/${botId}`, enriched);
  },
  put: (token: string, { bot }: { bot: Record<string, unknown> }) => {
    const { botId, ...rest } = bot as ApiRequestBase & { botId?: string };
    return httpPut(token, '/bots', rest);
  },
  delete: (token: string, { botId }: { botId: string }) => httpDelete(token, `/bots/${botId}`),
} as const;

export const channels = {
  get: (token: string, { botId }: { botId: string }) => httpGet(token, `/bots/${botId}/channels`),
  put: (token: string, { botId, channel }: { botId: string; channel: ApiRequestBase }) => {
    const enriched = { ...channel, botId };
    return httpPut(token, `/bots/${botId}/channels`, enriched);
  },
} as const;

export const contextAttributes = {
  get: (token: string, params?: { contextAttributeId?: string }) => {
    const path = params?.contextAttributeId
      ? `/contextAttributes/${params.contextAttributeId}`
      : '/contextAttributes/';
    return httpGet(token, path);
  },
  post: (token: string, { contextAttributes }: { contextAttributes: ApiRequestBase }) =>
    httpPost(token, '/contextAttributes', contextAttributes),
} as const;

export const conversationTrees = {
  get: (token: string, { treeId, intentId }: { treeId?: string; intentId?: string }) => {
    const path = treeId ? `/conversationTrees/${treeId}` : `/conversationTrees?q=${intentId ?? ''}`;
    return httpGet(token, path);
  },
  put: (token: string, { conversationTree }: { conversationTree: ApiRequestBase }) =>
    httpPut(token, '/conversationTrees', conversationTree),
} as const;

export const intents = {
  get: (token: string, params?: { intentId?: string }) => {
    const path = params?.intentId ? `/intents/${params.intentId}` : '/intents';
    return httpGet(token, path);
  },
  put: (token: string, { intent }: { intent: ApiRequestBase }) => httpPut(token, '/intents', intent),
  delete: (token: string, { intentId }: { intentId: string }) => httpDelete(token, `/intents/${intentId}`),
} as const;

export const slots = {
  get: (token: string, { slotId }: { slotId: string }) => httpGet(token, `/slots/${slotId}`),
  put: (token: string, { slot }: { slot: ApiRequestBase }) => httpPut(token, '/slots', slot),
  delete: (token: string, { slotId }: { slotId: string }) => httpDelete(token, `/slots/${slotId}`),
} as const;

export const actions = {
  get: (token: string, params?: { actionId?: string }) => {
    const path = params?.actionId ? `/actions/${params.actionId}` : '/actions';
    return httpGet(token, path);
  },
  put: (token: string, { action }: { action: ApiRequestBase }) => httpPut(token, '/actions', action),
  delete: (token: string, { actionId }: { actionId: string }) => httpDelete(token, `/actions/${actionId}`),
} as const;

export const variables = {
  get: (token: string, params?: { variableId?: string }) => {
    const path = params?.variableId ? `/variables/${params.variableId}` : '/variables';
    return httpGet(token, path);
  },
  put: (token: string, { variable }: { variable: ApiRequestBase }) => httpPut(token, '/variables', variable),
  delete: (token: string, { variableId }: { variableId: string }) => httpDelete(token, `/variables/${variableId}`),
} as const;

export const team = {
  get: (token: string): Promise<TeamResponse> => httpGet<TeamResponse>(token, '/team'),
} as const;

export const role = {
  get: (token: string): Promise<RoleResponse> => httpGet<RoleResponse>(token, '/role'),
} as const;

export const tests = {
  post: (token: string, { botId, testId, test }: { botId: string; testId: string; test: ApiRequestBase }) =>
    httpPost(token, `/bots/${botId}/tests/${testId}`, test),
} as const;



