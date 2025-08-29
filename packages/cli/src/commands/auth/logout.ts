import { Command } from "commander";
import { consola } from "consola";
import { ACCOUNTS_PATH } from "./login.js";
import keytar from "keytar";
import * as fs from "fs";
import open from "open";
import * as os from "os";
import * as path from "path";

export const logoutCommand = new Command("logout")
  .description("Clear stored authentication tokens")
  .action(async () => {
    try {
      let accounts = { currentAccount: null, accounts: [] };

      if (fs.existsSync(ACCOUNTS_PATH)) {
        const data = fs.readFileSync(ACCOUNTS_PATH, "utf8");
        accounts = JSON.parse(data);
      }
      if (accounts.currentAccount) {
        await keytar.deletePassword("nlx-cli", accounts.currentAccount);
        accounts.accounts = accounts.accounts.filter(
          (acc: string) => acc !== accounts.currentAccount,
        );
        if (accounts.accounts.length > 0) {
          accounts.currentAccount = accounts.accounts[0];
          await fs.promises.writeFile(ACCOUNTS_PATH, JSON.stringify(accounts));
        } else {
          await fs.promises.unlink(ACCOUNTS_PATH);
        }
      }
      consola.success("Logged out. Tokens cleared from storage.");
    } catch (err: any) {
      consola.error(`Logout failed: ${err?.message || err}`);
      process.exitCode = 1;
    }
  });
