import { Command } from "commander";
import { modalitiesGenerateCommand } from "./generate.js";

export const modalitiesCommand = new Command("modalities")
  .description("Work with NLX modalities")
  .addCommand(modalitiesGenerateCommand);
