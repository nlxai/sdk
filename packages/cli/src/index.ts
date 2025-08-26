import { program } from "commander";
import { loginCommand } from "./commands/login";
import { modalitiesCommand } from "./commands/modalities";
import { dataRequestsCommand } from "./commands/data-requests";
import { whoamiCommand } from "./commands/whoami";
import { logoutCommand } from "./commands/logout";
import { helloCommand } from "./commands/hello";

program.description(
  "Keep your Typescript types and NLX schema definitions in sync",
);
program.addCommand(loginCommand);
program.addCommand(modalitiesCommand);
program.addCommand(dataRequestsCommand);
program.addCommand(whoamiCommand);
program.addCommand(logoutCommand);
program.addCommand(helloCommand);

program.parse(process.argv);
