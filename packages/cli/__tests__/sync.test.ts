import { syncCommand } from "../src/commands/data-requests/sync";
import { Command } from "commander";

jest.mock("../src/utils", () => ({
  fetchManagementApi: jest.fn(async (url, method, body) => {
    if (url === "/variables?size=1000") {
      return { variables: [] };
    }
    return { status: "ok", url, method, body };
  }),
}));

describe("syncCommand", () => {
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
    const { fetchManagementApi } = require("../src/utils");
    fetchManagementApi.mockClear();
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
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
    // Should not fire any PUT/POST requests
    const calls = fetchManagementApi.mock.calls.filter(
      (call: [string, string, any]) => call[1] === "PUT" || call[1] === "POST",
    );
    expect(calls.length).toBe(0);
  });

  it("should skip deprecated operations", async () => {
    const { fetchManagementApi } = require("../src/utils");
    fetchManagementApi.mockClear();
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(
      ["sync", "__tests__/deprecated-openapi.yaml", "--dry-run"],
      {
        from: "user",
      },
    );
    // Should not fire any PUT/POST requests
    const calls = fetchManagementApi.mock.calls.filter(
      (call: [string, string, any]) => call[1] === "PUT" || call[1] === "POST",
    );
    expect(calls.length).toBe(0);
  });

  it("should skip non-JSON content types", async () => {
    const { fetchManagementApi } = require("../src/utils");
    fetchManagementApi.mockClear();
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    await cmd.parseAsync(["sync", "__tests__/xml-openapi.yaml"], {
      from: "user",
    });
    // Should not fire any PUT/POST requests
    const calls = fetchManagementApi.mock.calls.filter(
      (call: [string, string, any]) => call[1] === "PUT" || call[1] === "POST",
    );
    expect(calls.length).toBe(0);
  });

  it("should warn and skip query/cookie parameters", async () => {
    const { fetchManagementApi } = require("../src/utils");
    fetchManagementApi.mockClear();
    const cmd = new Command();
    cmd.addCommand(syncCommand);
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
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
    const calls = fetchManagementApi.mock.calls.filter(
      (call: [string, string, any]) => call[1] === "PUT" || call[1] === "POST",
    );
    expect(calls.length).toBeGreaterThan(0);
  });
});

it("should fire correct PUT/POST requests for a real OpenAPI spec", async () => {
  const { fetchManagementApi } = require("../src/utils");
  fetchManagementApi.mockClear();
  const cmd = new Command();
  cmd.addCommand(syncCommand);
  await cmd.parseAsync(["sync", "__tests__/sample-openapi.yaml"], {
    from: "user",
  });
  // Find calls to fetchManagementApi for PUT/POST
  const calls = fetchManagementApi.mock.calls.filter(
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
});
