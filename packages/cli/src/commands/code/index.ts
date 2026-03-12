import { Command } from "commander";
import { pullCommand } from "./pull.js";
import { pushCommand } from "./push.js";
import { initCommand } from "./init.js";

export const codeCommand = new Command("code")
  .description("Work with code nodes in NLX flows")
  .addCommand(initCommand)
  .addCommand(pullCommand)
  .addCommand(pushCommand);
