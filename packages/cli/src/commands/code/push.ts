import { fetchManagementApi } from "../../utils/index.js";
import { consola } from "consola";
import * as fs from "fs";
import * as path from "path";

function getCurrentFolderName() {
  return path.basename(process.cwd());
}

export async function push({ flowId }: { flowId?: string } = {}) {
  const id = flowId || getCurrentFolderName();
  const endpoint = `conversationTrees/${id}-Omni`;
  const flow: any = await fetchManagementApi(endpoint);
  if (!flow.nodes) {
    consola.error("No nodes found in flow.");
    process.exit(1);
  }
  let updated = 0;
  for (const nodeId in flow.nodes) {
    const node = flow.nodes[nodeId];
    if (node.type === "code" && node.metadata?.code?.code) {
      const fileName = `${nodeId}.js`;
      if (!fs.existsSync(fileName)) {
        consola.warn(`File ${fileName} does not exist. Skipping.`);
        continue;
      }
      let localCode = fs.readFileSync(fileName, "utf8");
      // Remove leading comment if present and matches node name
      const lines = localCode.split("\n");
      if (
        node.metadata?.name &&
        lines[0].trim() === `// ${node.metadata.name}`
      ) {
        localCode = lines.slice(1).join("\n");
      }
      if (localCode.trim() === node.metadata.code.code.trim()) {
        consola.info(`Code for ${nodeId} is already up to date.`);
        continue;
      }
      // Update node code
      node.metadata.code.code = localCode;
      updated++;
      consola.success(`Updated code for node ${nodeId}`);
    }
  }
  if (updated > 0) {
    // Push updated flow
    await fetchManagementApi(endpoint, "POST", flow);
    consola.success(`Pushed ${updated} code node(s) to flow.`);
  } else {
    consola.info("No code changes to push.");
  }
}

import { Command } from "commander";
export const pushCommand = new Command("push")
  .description("Push local code node files to NLX flow")
  .option("--flow <flowId>", "Specify flow ID (default: current folder name)")
  .action(push);
