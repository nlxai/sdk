import { Command } from "commander";
import { modalitiesGenerateCommand } from "./generate.js";
import { modalitiesCheckCommand } from "./check.js";

export const modalitiesCommand = new Command("modalities")
  .description("Work with NLX modalities")
  .addCommand(modalitiesGenerateCommand)
  .addCommand(modalitiesCheckCommand);
