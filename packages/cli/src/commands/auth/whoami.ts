import { Command } from "commander";
import { consola } from "consola";
import { ensureToken } from "./login.js";
import { fetchManagementApi } from "../../utils/index.js";

const WHOAMI_DESCRIPTION =
  "Show current team, role, and available applications count (requires login)";

function countBots(response: any): number {
  if (!response || !Array.isArray(response.bots)) return 0;
  return response.bots.length;
}

export async function runWhoami(): Promise<void> {
  const [team, bots] = await Promise.all([
    fetchManagementApi("team"),
    fetchManagementApi("bots"),
  ]);

  const teamName = (team as any)?.name ?? "Unknown";
  const applicationsCount = countBots(bots);

  consola.success("You are authenticated");
  consola.info(`Workspace: ${teamName}`);
  consola.info(`Role: ${(team as any)?.currentRole ?? "Unknown"}`);
  consola.info(`Applications: ${applicationsCount}`);
}

export const whoamiCommand = new Command("whoami")
  .description(WHOAMI_DESCRIPTION)
  .action(async () => {
    try {
      await runWhoami();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || String(err);
      consola.error(`whoami failed: ${message}`);
      process.exitCode = 1;
    }
  });
