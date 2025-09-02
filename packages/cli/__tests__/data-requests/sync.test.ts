import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import type { MockInstance } from "vitest";
import { syncCommand } from "../../src/commands/data-requests/sync.js";
import { Command } from "commander";
import * as utils from "../../src/utils/index.js";
import { select, expand, editor } from "@inquirer/prompts";
import { consola } from "consola";

vi.mock("../src/utils", () => ({
  fetchManagementApi: vi.fn(async (url: string, method: string, body: any) => {
    if (url === "variables?size=1000") {
      return { variables: [] };
    }
    return body;
  }),
}));

describe("syncCommand", () => {
  beforeAll(() => {
    consola.wrapAll();
  });
  beforeEach(() => {
    vi.resetAllMocks();
    consola.mockTypes(() => vi.fn());
    process.exit = vi.fn() as any;
  });

  it("should sync a simple OpenAPI spec", async () => {
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(
      ["sync", "__tests__/input-files/sample-openapi.yaml", "--dry-run"],
      {
        from: "user",
      },
    );
    // If no error is thrown, the test passes
  });

  it("should skip unsupported security schemes", async () => {
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(
      ["sync", "__tests__/input-files/secure-openapi.yaml", "--dry-run"],
      {
        from: "user",
      },
    );
    expect(consola.warn).toHaveBeenCalledWith(
      expect.stringContaining("unsupported security schemes"),
    );

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
      ["sync", "__tests__/input-files/deprecated-openapi.yaml", "--dry-run"],
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
    await cmd.parseAsync(["sync", "__tests__/input-files/xml-openapi.yaml"], {
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
    await cmd.parseAsync(
      ["sync", "__tests__/input-files/params-openapi.yaml"],
      {
        from: "user",
      },
    );
    expect(consola.warn).toHaveBeenCalledWith(
      expect.stringContaining("param q not supported"),
    );
    expect(consola.warn).toHaveBeenCalledWith(
      expect.stringContaining("param c not supported"),
    );
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
    await cmd.parseAsync(
      ["sync", "__tests__/input-files/sample-openapi.yaml"],
      {
        from: "user",
      },
    );

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

vi.mock("@inquirer/prompts", () => ({
  expand: vi.fn(),
  editor: vi.fn(),
  select: vi.fn(),
}));

describe("syncCommand interactive mode", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should prompt and sync when user chooses 'sync'", async () => {
    if (vi.isMockFunction(expand)) expand.mockResolvedValue("sync");

    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(
      [
        "sync",
        "__tests__/input-files/sample-openapi.yaml",
        "--interactive",
        "--dry-run",
      ],
      { from: "user" },
    );
    expect(expand).toHaveBeenCalled();
    expect(utils.fetchManagementApi).not.toHaveBeenCalledWith(
      expect.stringContaining("variables"),
      expect.stringMatching(/^(POST|PUT)$/),
      expect.anything(),
    ); // dry-run, so no actual sync
  });

  it("should prompt and skip when user chooses 'skip'", async () => {
    if (vi.isMockFunction(expand)) expand.mockResolvedValue("skip");
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(
      [
        "sync",
        "__tests__/input-files/sample-openapi.yaml",
        "--interactive",
        "--dry-run",
      ],
      { from: "user" },
    );
    expect(expand).toHaveBeenCalled();
    expect(utils.fetchManagementApi).not.toHaveBeenCalledWith(
      expect.stringContaining("variables"),
      expect.stringMatching(/^(POST|PUT)$/),
      expect.anything(),
    );
  });

  it("should allow editing the data request when user chooses 'edit'", async () => {
    if (vi.isMockFunction(expand)) expand.mockResolvedValue("edit");
    if (vi.isMockFunction(editor))
      editor.mockResolvedValue(
        JSON.stringify({
          variableId: "EditedId",
          webhook: {
            method: "POST",
            environments: { production: { url: "https://edited.com" } },
          },
        }),
      );

    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(
      [
        "sync",
        "__tests__/input-files/sample-openapi.yaml",
        "--interactive",
        "--dry-run",
      ],
      { from: "user" },
    );
    expect(expand).toHaveBeenCalled();
    expect(editor).toHaveBeenCalled();
  });

  it("should prompt for server selection if multiple servers exist", async () => {
    if (vi.isMockFunction(select)) select.mockResolvedValue(0);
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(
      [
        "sync",
        "__tests__/input-files/multi-server-openapi.yaml",
        "--interactive",
        "--dry-run",
      ],
      { from: "user" },
    );
    expect(select).toHaveBeenCalled();
  });
});
