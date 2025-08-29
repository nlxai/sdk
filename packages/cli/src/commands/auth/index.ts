import { Command } from "commander";
import { loginCommand } from "./login.js";
import { logoutCommand } from "./logout.js";
import { authSwitchCommand } from "./switch.js";

export const authCommand = new Command("auth")
  .description("Authentication and user management")
  .addCommand(loginCommand)
  .addCommand(logoutCommand)
  .addCommand(authSwitchCommand);
