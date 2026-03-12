import { Command } from "commander";
import { fetchManagementApi } from "../../utils/index.js";
import { consola } from "consola";
import * as fs from "fs";
import * as path from "path";
import { tmpdir } from "os";
import { execSync } from "child_process";

// Helper: get current folder name
function getCurrentFolderName() {
  return path.basename(process.cwd());
}

type PullOptions = { flowId?: string; force?: boolean; interactive?: boolean };

export async function pull({ flowId, force, interactive }: PullOptions = {}) {
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
        const existing = fs.readFileSync(fileName, "utf8");
        if (existing.trim() === node.metadata.code.code.trim()) {
          consola.info(`File ${fileName} already up to date.`);
          continue;
        }
        if (interactive) {
          // Write remote code to temp file
          const tempFile = path.join(tmpdir(), `${nodeId}-remote.js`);
          let content = "";
          if (node.metadata?.name) {
            content += `// ${node.metadata.name}\n`;
          }
          content += node.metadata.code.code;
          if (existing.trim() === content.trim()) {
            consola.info(`File ${fileName} already up to date.`);
            continue;
          }
          fs.writeFileSync(tempFile, content);
          const mergeTool = process.env.NLX_CODE_MERGE_TOOL || "vimdiff";
          consola.info(
            `Launching merge tool (${mergeTool}) for ${fileName}...`,
          );
          try {
            execSync(`${mergeTool} ${fileName} ${tempFile}`, {
              stdio: "inherit",
            });
            consola.success(`Merge completed for ${fileName}`);
          } catch (err) {
            consola.error(`Merge tool failed for ${fileName}:`, err);
          }
          fs.unlinkSync(tempFile);
          continue;
        } else if (force) {
          consola.warn(`Overwriting ${fileName} without prompting.`);
        } else {
          consola.error(`File ${fileName} already exists. Skipping.`);
          continue;
        }
      }
      let content = "";
      if (node.metadata?.name) {
        content += `// ${node.metadata.name}\n`;
      }
      content += node.metadata.code.code;
      fs.writeFileSync(fileName, content);
      consola.success(`Created/Updated ${fileName}`);
    }
  }
  if (codeNodeCount === 0) {
    consola.info("No code nodes found.");
  }
}

export const pullCommand = new Command("pull")
  .description("Pull code nodes from a flow")
  .option("--flow <flowId>", "Specify flow ID (default: current folder name)")
  .option("-f, --force", "Overwrite existing files without prompting", false)
  .option("-i, --interactive", "Use git mergetool for interactive merge", false)
  .action(pull);
