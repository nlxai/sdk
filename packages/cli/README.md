# `@nlxai/cli`

> Tools for integrating with NLX apps

**Warning:** This is an alpha package and will likely not work for you. Keep an eye on this space for a more feature complete release later.

## Usage

```
> npm -g i cli

> nlx

Usage: nlx [options] [command]

Keep your Typescript types and NLX schema definitions in sync

Options:
  -h, --help            display help for command

Commands:
  login                 Authenticate with NLX
  modalities [options]  Fetch modalities and generate TypeScript interfaces
  help [command]        display help for command

> nlx login
Please visit https://nlxdev.us.auth0.com/activate?user_code=JCVM-MQHX and enter code: JCVM-MQHX
Login successful! Access token stored securely.

> nlx modalities
TypeScript interfaces written to /Users/jakub.hampl/Programming/nlx/sdk/packages/cli/modalities-types.d.ts

> nlx modalities --out types.ts
TypeScript interfaces written to /Users/jakub.hampl/Programming/nlx/sdk/packages/cli/types.ts
```
