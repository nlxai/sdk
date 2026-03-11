import { Command } from "commander";
import { pullCommand } from "./pull.js";

export const codeCommand = new Command("code")
  .description("Work with code nodes in NLX flows")
  .addCommand(pullCommand);
