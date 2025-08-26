import { Command } from 'commander';
import { consola } from 'consola';
import { clearTokens } from '../commands/login';

const LOGOUT_SUCCESS_MESSAGE = 'Logged out. Tokens cleared from storage.';
const LOGOUT_DESCRIPTION = 'Clear stored authentication tokens';

export const logoutCommand = new Command('logout')
  .description(LOGOUT_DESCRIPTION)
  .action(async () => {
    try {
      await clearTokens();
      consola.success(LOGOUT_SUCCESS_MESSAGE);
    } catch (err: any) {
      consola.error(`Logout failed: ${err?.message || err}`);
      process.exitCode = 1;
    }
  });


