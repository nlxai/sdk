import { program } from "commander";
import { authCommand } from "./commands/auth/index.js";
import { modalitiesCommand } from "./commands/modalities/index.js";
import { dataRequestsCommand } from "./commands/data-requests/index.js";
import { httpCommand } from "./commands/http.js";
import { testCommand } from "./commands/test.js";
import { consola } from "consola";

program.description("Intereact with NLX from the command line");
program
  .option("-v, --verbose", "Enable verbose logging")
  .hook("preAction", (thisCommand) => {
    if (thisCommand.opts().verbose) {
      consola.level = 4; // Debug level
    }
  });
program.configureHelp({ showGlobalOptions: true });
program.addCommand(authCommand);
program.addCommand(modalitiesCommand);
program.addCommand(dataRequestsCommand);
program.addCommand(testCommand);
program.addCommand(httpCommand);

program.parse(process.argv);
