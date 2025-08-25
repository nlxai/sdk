import { Command } from "commander";
import { getAccessToken } from "./login";
import { compile } from "json-schema-to-typescript";
import fs from "fs";
import path from "path";

const API_BASE_URL =
  process.env.NLX_API_BASE_URL || "https://api.dev.studio.nlx.ai/v1";

export const modalitiesCommand = new Command("modalities")
  .description("Fetch modalities and generate TypeScript interfaces")
  .option("-o, --out <file>", "Output TypeScript file", "modalities-types.d.ts")
  .action(async (opts: { out: string }) => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error("Not authenticated. Please run 'login' first.");
      process.exit(1);
    }
    const res = await fetch(`${API_BASE_URL}/models`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      console.error(
        "Failed to fetch modalities:",
        res.status,
        await res.text(),
      );
      process.exit(1);
    }
    const data: any = await res.json();

    // Generate TypeScript interfaces for each modelId
    let output =
      "// Auto-generated from NLX\n// Please do not edit manually\n\n";
    for (const item of data.items) {
      const name = item.modelId.replace(/[^a-zA-Z0-9_]/g, "");
      const schema = item.schema;
      const ts = await compile(schema, name, {
        bannerComment: "",
        additionalProperties: false,
      });
      output += ts + "\n";
    }

    // Write to file specified by flag or default
    const outPath = path.resolve(process.cwd(), opts.out);
    fs.writeFileSync(outPath, output);
    console.log(`TypeScript interfaces written to ${outPath}`);
  });
