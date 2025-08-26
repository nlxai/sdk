import { Command } from 'commander';
import { consola } from 'consola';
import { team as teamApi, bots as botsApi } from '../utils/nlxSDK';
import type { BotsListResponse } from '../utils/types/api';
import { ensureToken } from '../commands/login';

const WHOAMI_DESCRIPTION = 'Show current team, role, and available bots count (requires login)';

function countBots(response: BotsListResponse | null): number {
  if (!response || !Array.isArray(response.bots)) return 0;
  return response.bots.length;
}

export async function runWhoami(): Promise<void> {
  const token = await ensureToken();
  if (!token) {
    throw new Error('Not authenticated. Please run: nlx login');
  }

  const [team, bots] = await Promise.all([
    teamApi.get(token),
    botsApi.get(token),
  ]);

  const teamName = (team as any)?.name ?? 'Unknown';
  const botsCount = countBots((bots as BotsListResponse) ?? null);

  consola.success('You are authenticated');
  consola.info(`Team: ${teamName}`);
  consola.info(`Applications: ${botsCount}`);
}

export const whoamiCommand = new Command('whoami')
  .description(WHOAMI_DESCRIPTION)
  .action(async () => {
    try {
      await runWhoami();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || String(err);
      consola.error(`whoami failed: ${message}`);
      process.exitCode = 1;
    }
  });


