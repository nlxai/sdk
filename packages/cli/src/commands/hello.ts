import { Command } from 'commander';
import { consola } from 'consola';

const HELLO_DESCRIPTION = 'Display a hello world message';

export const helloCommand = new Command('hello')
  .description(HELLO_DESCRIPTION)
  .option('-n, --name <name>', 'name to greet', 'World')
  .action((options) => {
    consola.success('🚀 Hello from the NLX CLI!');
    consola.info(`Hello, ${options.name}!`);
  });