import { describe, it, expect, vi, beforeEach } from "vitest";
import { modalitiesCheckCommand } from "../../src/commands/modalities/check.js";
import * as fs from "fs";
import * as path from "path";
import { fetchManagementApi } from "../../src/utils.js";

vi.mock("../src/utils", () => ({
  fetchManagementApi: vi.fn(async (url: string, method: string, body: any) => {
    return {
      items: [
        {
          modelId: "TestModel",
          schema: {
            type: "object",
            properties: {
              foo: { type: "string" },
              bar: { type: "number" },
            },
            required: ["foo", "bar"],
          },
        },
      ],
    };
  }),
}));

describe("modalities check", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("passes when all server models are present and compatible", async () => {
    let exitCode: any = 0;
    const origExit = process.exit;
    // @ts-ignore
    process.exit = (code) => {
      exitCode = code;
      throw new Error("exit");
    };
    let output = "";
    const origLog = console.log;
    console.log = (msg) => {
      output += msg + "\n";
    };
    try {
      await modalitiesCheckCommand.parseAsync([
        "node",
        "check",
        path.resolve(__dirname, "../input-files/valid-types.d.ts"),
      ]);
    } catch {}
    process.exit = origExit;
    console.log = origLog;
    expect(exitCode).toBe(0);
    expect(output).toEqual(expect.stringContaining("Type check passed"));
  });

  it("passes when a local modality is missing", async () => {
    let exitCode: any = 0;
    const origExit = process.exit;
    // @ts-ignore
    process.exit = (code) => {
      exitCode = code;
      throw new Error("exit");
    };
    let output = "";
    const origLog = console.log;
    console.log = (msg) => {
      output += msg + "\n";
    };
    try {
      await modalitiesCheckCommand.parseAsync([
        "node",
        "check",
        path.resolve(__dirname, "../input-files/missing-types.d.ts"),
      ]);
    } catch {}
    process.exit = origExit;
    console.log = origLog;
    expect(exitCode).toBe(0);
    expect(output).toEqual(expect.stringContaining("Type check passed"));
  });

  it("fails when a remote model is missing", async () => {
    let exitCode: any = 0;
    const origExit = process.exit;
    // @ts-ignore
    process.exit = (code) => {
      exitCode = code;
      throw new Error("exit");
    };
    let output = "";
    const origError = console.error;
    console.error = (msg) => {
      output += msg + "\n";
    };
    try {
      await modalitiesCheckCommand.parseAsync([
        "node",
        "check",
        path.resolve(__dirname, "../input-files/extra-types.d.ts"),
      ]);
    } catch {}
    process.exit = origExit;
    console.error = origError;
    expect(exitCode).toBe(1);
    expect(output).toEqual(
      expect.stringContaining(
        "Type/interface 'Extra' does not correspond to any model on the server.",
      ),
    );
  });

  it("fails when a model's type is changed", async () => {
    let exitCode: any = 0;
    const origExit = process.exit;
    // @ts-ignore
    process.exit = (code) => {
      exitCode = code;
      throw new Error("exit");
    };
    let output = "";
    const origError = console.error;
    console.error = (msg) => {
      output += msg + "\n";
    };
    try {
      await modalitiesCheckCommand.parseAsync([
        "node",
        "check",
        path.resolve(__dirname, "../input-files/changed-types.d.ts"),
      ]);
    } catch {}
    process.exit = origExit;
    console.error = origError;
    expect(exitCode).toBe(1);
    expect(output).toEqual(
      expect.stringContaining(
        "NLX modality type for 'TestModel' is not assignable to local type",
      ),
    );
  });
});
