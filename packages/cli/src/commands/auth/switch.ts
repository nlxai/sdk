import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { consola } from "consola";

const ACCOUNTS_PATH = path.join(os.homedir(), ".nlx-cli-auth.json");

export const authSwitchCommand = new Command("switch")
  .description("Switch to the next saved NLX account")
  .action(async () => {
    if (!fs.existsSync(ACCOUNTS_PATH)) {
      consola.error("No accounts file found. Please login first.");
      process.exit(1);
    }
    const data = fs.readFileSync(ACCOUNTS_PATH, "utf8");
    const accounts = JSON.parse(data);
    if (!accounts.accounts || accounts.accounts.length === 0) {
      consola.error("No saved accounts found.");
      process.exit(1);
    }
    if (!accounts.currentAccount) {
      accounts.currentAccount = accounts.accounts[0];
    } else {
      const idx = accounts.accounts.indexOf(accounts.currentAccount);
      const nextIdx = (idx + 1) % accounts.accounts.length;
      accounts.currentAccount = accounts.accounts[nextIdx];
    }
    fs.writeFileSync(ACCOUNTS_PATH, JSON.stringify(accounts, null, 2));
    consola.success(`Switched to account: ${accounts.currentAccount}`);
  });
