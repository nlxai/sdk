import {
  fetchManagementApi,
  fetchManagementApiPaginated,
} from "../../utils/index.js";
import { consola } from "consola";
import { checkbox } from "@inquirer/prompts";
import * as fs from "fs";
import * as path from "path";
import { pull } from "./pull.js";
import { Command } from "commander";

export default async function init() {
  consola.info("Fetching available flows...");
  const flows: any[] = await fetchManagementApiPaginated("conversationTrees");

  // Filter flows with code nodes
  const codeFlows = new Set<string>();
  for (const flow of flows) {
    if (
      flow.nodes &&
      Object.values(flow.nodes).some((node: any) => node.type === "code")
    ) {
      codeFlows.add(flow.intentId);
    }
  }
  if (codeFlows.size === 0) {
    consola.info("No flows with code nodes found.");
    return;
  }
  // Interactive selection
  const selected: string[] = await checkbox({
    message: "Select flows to initialize:",
    choices: Array.from(codeFlows).map((f) => ({ value: f, name: f })),
  });
  for (const flowId of selected) {
    if (fs.existsSync(flowId)) {
      consola.info(`Folder ${flowId} already exists. Skipping.`);
      continue;
    }
    fs.mkdirSync(flowId);
    consola.success(`Created folder ${flowId}`);
    // Run pull in new folder
    process.chdir(flowId);
    await pull({ flowId });
    process.chdir("..");
  }
}

export const initCommand = new Command("init")
  .description("Initialize local folders for flows with code nodes")
  .action(init);
