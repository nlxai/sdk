import { program } from "commander";
import { authCommand } from "./commands/auth/index.js";
import { modalitiesCommand } from "./commands/modalities/index.js";
import { dataRequestsCommand } from "./commands/data-requests/index.js";
import { httpCommand } from "./commands/http.js";
import { testCommand } from "./commands/test.js";

program.description(
  "Keep your Typescript types and NLX schema definitions in sync",
);
program.addCommand(authCommand);
program.addCommand(modalitiesCommand);
program.addCommand(dataRequestsCommand);
program.addCommand(httpCommand);
program.addCommand(testCommand);

program.parse(process.argv);
