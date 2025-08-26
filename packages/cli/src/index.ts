import { program } from "commander";
import { loginCommand } from "./commands/login";
import { modalitiesCommand } from "./commands/modalities";
import { dataRequestsCommand } from "./commands/data-requests";

program.description(
  "Keep your Typescript types and NLX schema definitions in sync",
);
program.addCommand(loginCommand);
program.addCommand(modalitiesCommand);
program.addCommand(dataRequestsCommand);

program.parse(process.argv);
