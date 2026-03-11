import { Command } from "commander";
import { fetchManagementApi } from "../../utils/index.js";
import { consola } from "consola";
import * as fs from "fs";
import * as path from "path";

// Helper: get current folder name
function getCurrentFolderName() {
  return path.basename(process.cwd());
}

type PullOptions = { flowId?: string };
async function pull({ flowId }: PullOptions = {}) {
  const id = flowId || getCurrentFolderName();
  const endpoint = `conversationTrees/${id}-Omni`;
  consola.info(`Fetching flow from ${endpoint}`);
  const flow: any = await fetchManagementApi(endpoint);
  if (!flow.nodes) {
    consola.error("No nodes found in flow.");
    process.exit(1);
  }
  let codeNodeCount = 0;
  for (const nodeId in flow.nodes) {
    const node = flow.nodes[nodeId];
    if (node.type === "code" && node.metadata?.code?.code) {
      codeNodeCount++;
      const fileName = `${nodeId}.js`;
      if (fs.existsSync(fileName)) {
        consola.error(`File ${fileName} already exists. Skipping.`);
        continue;
      }
      let content = "";
      if (node.metadata?.name) {
        content += `// ${node.metadata.name}\n`;
      }
      content += node.metadata.code.code;
      fs.writeFileSync(fileName, content);
      consola.success(`Created ${fileName}`);
    }
  }
  if (codeNodeCount === 0) {
    consola.info("No code nodes found.");
  }
}

export const pullCommand = new Command("pull")
  .description("Pull code nodes from a flow")
  .option(
    "-f, --flow <flowId>",
    "Specify flow ID (default: current folder name)",
  )
  .action(async (opts) => {
    await pull({ flowId: opts.flow });
  });
