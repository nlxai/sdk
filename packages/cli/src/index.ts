import { program } from "commander";
import { loginCommand } from "./commands/login.js";
import { modalitiesCommand } from "./commands/modalities.js";
import { dataRequestsCommand } from "./commands/data-requests/index.js";

program.description(
  "Keep your Typescript types and NLX schema definitions in sync",
);
program.addCommand(loginCommand);
program.addCommand(modalitiesCommand);
program.addCommand(dataRequestsCommand);

program.parse(process.argv);
