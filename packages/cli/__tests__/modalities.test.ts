import { describe, it, expect, vi, beforeEach } from "vitest";
import { modalitiesCommand } from "../src/commands/modalities";
import { Command } from "commander";
import fs from "fs";
import path from "path";
import * as login from "../src/commands/login";

describe("modalitiesCommand", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should be defined and have correct name", () => {
    expect(modalitiesCommand).toBeDefined();
    expect(modalitiesCommand.name()).toBe("modalities");
  });

  it("should generate TypeScript file from models", async () => {
    vi.spyOn(login, "ensureToken").mockResolvedValue("test-token");
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<{ items: Array<{ modelId: string; schema: any }> }> => ({
        items: [
          {
            modelId: "TestModel",
            schema: { type: "object", properties: { foo: { type: "string" } } },
          },
        ],
      }),
    }) as any;

    const outFile = path.resolve(__dirname, "test-modalities-types.d.ts");
    if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
    await modalitiesCommand.parseAsync([
      "node",
      "modalities",
      "--out",
      outFile,
    ]);
    expect(fs.existsSync(outFile)).toBe(true);
    const content = fs.readFileSync(outFile, "utf8");
    expect(content).toContain("interface TestModel");
    fs.unlinkSync(outFile);
  });
});
