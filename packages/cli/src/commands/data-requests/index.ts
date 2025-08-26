import { Command } from "commander";
import { syncCommand } from "./sync";

export const dataRequestsCommand = new Command("data-requests")
  .description("Data Requests")
  .addCommand(syncCommand);
