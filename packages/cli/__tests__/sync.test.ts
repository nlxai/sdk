import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MockInstance } from "vitest";
import { syncCommand } from "../src/commands/data-requests/sync";
import { Command } from "commander";
import * as utils from "../src/utils";

vi.mock("../src/utils", () => ({
  fetchManagementApi: vi.fn(async (url: string, method: string, body: any) => {
    if (url === "/variables?size=1000") {
      return { variables: [] };
    }
    return { status: "ok", url, method, body };
  }),
}));

describe("syncCommand", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should sync a simple OpenAPI spec", async () => {
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(
      ["sync", "__tests__/sample-openapi.yaml", "--dry-run"],
      {
        from: "user",
      },
    );
    // If no error is thrown, the test passes
  });

  it("should skip unsupported security schemes", async () => {
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    await cmd.parseAsync(
      ["sync", "__tests__/secure-openapi.yaml", "--dry-run"],
      {
        from: "user",
      },
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("unsupported security schemes"),
    );
    warnSpy.mockRestore();

    expect(utils.fetchManagementApi).not.toHaveBeenCalledWith(
      expect.stringContaining("variables"),
      expect.stringMatching(/^(POST|PUT)$/),
      expect.anything(),
    );
  });

  it("should skip deprecated operations", async () => {
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(
      ["sync", "__tests__/deprecated-openapi.yaml", "--dry-run"],
      {
        from: "user",
      },
    );
    // Should not fire any PUT/POST requests

    expect(utils.fetchManagementApi).not.toHaveBeenCalledWith(
      expect.stringContaining("variables"),
      expect.stringMatching(/^(POST|PUT)$/),
      expect.anything(),
    );
  });

  it("should skip non-JSON content types", async () => {
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(["sync", "__tests__/xml-openapi.yaml"], {
      from: "user",
    });
    // Should not fire any PUT/POST requests

    expect(utils.fetchManagementApi).not.toHaveBeenCalledWith(
      expect.stringContaining("variables"),
      expect.stringMatching(/^(POST|PUT)$/),
      expect.anything(),
    );
  });

  it("should warn and skip query/cookie parameters", async () => {
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    await cmd.parseAsync(["sync", "__tests__/params-openapi.yaml"], {
      from: "user",
    });
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("param q not supported"),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("param c not supported"),
    );
    warnSpy.mockRestore();
    // Should still fire a PUT/POST for the valid operation

    expect(utils.fetchManagementApi).toHaveBeenCalledWith(
      expect.stringContaining("variables"),
      expect.stringMatching(/^(POST|PUT)$/),
      expect.objectContaining({
        variableId: "PostParams",
        description: "Params summary",
        requestSchema: expect.objectContaining({
          properties: {
            name: {
              type: "string",
            },
          },
          type: "object",
        }),
        responseSchema: expect.objectContaining({
          properties: {
            result: {
              type: "string",
            },
          },
          type: "object",
        }),
        webhook: {
          environments: expect.objectContaining({
            production: expect.objectContaining({
              url: "https://api.example.com/params",
            }),
          }),
          implementation: "external",
          method: "POST",
          sendContext: false,
          version: "v3",
        },
      }),
    );
  });

  it("should fire correct PUT/POST requests for a real OpenAPI spec", async () => {
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(["sync", "__tests__/sample-openapi.yaml"], {
      from: "user",
    });
    // Find calls to fetchManagementApi for PUT/POST
    const calls = (
      utils.fetchManagementApi as unknown as MockInstance
    ).mock.calls.filter(
      (call: [string, string, any]) => call[1] === "PUT" || call[1] === "POST",
    );
    expect(calls.length).toBeGreaterThan(0);
    // Check that the correct variableId and method are present in the body
    const putCall = calls.find(
      (call: [string, string, any]) => call[1] === "PUT",
    );
    expect(putCall).toBeDefined();
    const body = putCall[2];
    expect(body.variableId).toBe("CreateTest");
    expect(body.webhook.method).toBe("POST");
    expect(body.webhook.environments.production.url).toContain("/test");
    expect(utils.fetchManagementApi).toHaveBeenCalledWith(
      expect.stringContaining("variables"),
      expect.stringMatching(/^(POST|PUT)$/),
      expect.objectContaining({
        variableId: "CreateTest",
        description: "Create a test resource",
        requestSchema: expect.objectContaining({
          properties: {
            name: {
              type: "string",
            },
          },
          type: "object",
        }),
        responseSchema: expect.objectContaining({
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
          },
          type: "object",
        }),
        webhook: {
          environments: expect.objectContaining({
            production: expect.objectContaining({
              url: "https://api.example.com/test",
            }),
          }),
          implementation: "external",
          method: "POST",
          sendContext: false,
          version: "v3",
        },
      }),
    );
  });
});
