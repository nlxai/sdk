import { Command } from "commander";
import { compile } from "json-schema-to-typescript";
import * as fs from "fs";
import * as path from "path";
import { fetchManagementApi } from "../../utils/index.js";
import { consola } from "consola";

export const modalitiesGenerateCommand = new Command("generate")
  .description("Fetch modalities and generate TypeScript interfaces")
  .option("-o, --out <file>", "Output TypeScript file", "modalities-types.d.ts")
  .action(async (opts: { out: string }) => {
    const data: any = await fetchManagementApi(`models`);

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
    consola.success(`TypeScript interfaces written to ${outPath}`);
  });
