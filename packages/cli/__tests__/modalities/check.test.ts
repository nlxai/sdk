import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { modalitiesCheckCommand } from "../../src/commands/modalities/check.js";
import * as fs from "fs";
import * as path from "path";
import { fetchManagementApi } from "../../src/utils.js";
import { consola } from "consola";

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

const origExit = process.exit;

describe("modalities check", () => {
  beforeAll(() => {
    consola.wrapAll();
  });
  beforeEach(() => {
    vi.resetAllMocks();
    consola.mockTypes(() => vi.fn());
    process.exit = vi.fn() as any;
  });

  afterEach(() => {
    process.exit = origExit;
  });

  it("passes when all server models are present and compatible", async () => {
    await modalitiesCheckCommand.parseAsync([
      "node",
      "check",
      path.resolve(__dirname, "../input-files/valid-types.d.ts"),
    ]);

    expect(process.exit).toHaveBeenCalledWith(0);
    expect(consola.success).toHaveBeenCalledWith(
      expect.stringContaining("Type check passed"),
    );
  });

  it("passes when a local modality is missing", async () => {
    await modalitiesCheckCommand.parseAsync([
      "node",
      "check",
      path.resolve(__dirname, "../input-files/missing-types.d.ts"),
    ]);

    expect(process.exit).toHaveBeenCalledWith(0);
    expect(consola.success).toHaveBeenCalledWith(
      expect.stringContaining("Type check passed"),
    );
  });

  it("fails when a remote model is missing", async () => {
    await modalitiesCheckCommand.parseAsync([
      "node",
      "check",
      path.resolve(__dirname, "../input-files/extra-types.d.ts"),
    ]);

    expect(process.exit).toHaveBeenCalledWith(1);
    expect(consola.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "Type/interface 'Extra' does not correspond to any model on the server.",
      ),
    );
  });

  it("fails when a model's type is changed", async () => {
    await modalitiesCheckCommand.parseAsync([
      "node",
      "check",
      path.resolve(__dirname, "../input-files/changed-types.d.ts"),
    ]);

    expect(process.exit).toHaveBeenCalledWith(1);
    expect(consola.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "NLX modality type for 'TestModel' is not assignable to local type",
      ),
    );
  });
});
