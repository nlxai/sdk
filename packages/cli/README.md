# `@nlxai/cli`

Tools for automating certain development tasks for integrating with NLX:

- Syncing OpenAPI/Swagger/Postman API specifications as collections of Data requests inside NLX. This can speed up exposing an internal API to conversation builders as well as keep the data requests inside NLX in sync as your API evolves.

- Keeping **Modality** definitions in sync between a custom modality implementation in your front-end and what builders see inside NLX.

- Running conversation tests for an application.

and more.

> [!WARNING]
> This is an pre-release package and will likely not work for your use case. Keep an eye on this space for a more feature complete release later.

## Usage

```
> npm -g i @nlxai/cli

> nlx

Usage: nlx [options] [command]

Intereact with NLX from the command line

Options:
  -h, --help                             display help for command
  -v, --verbose                          enable verbose logging
  -V, --version                          show program version

Commands:
  auth                                   Authentication and user management
  auth login                             Authenticate with NLX
  auth logout                            Clear stored authentication tokens
  auth switch                            Switch to the next saved NLX account
  auth whoami                            Show current team, role, and available applications count (requires login)
  modalities                             Work with NLX modalities
  modalities generate [options]          Fetch modalities and generate TypeScript interfaces
  modalities check [file]                Type check local TypeScript definitions against server schemas
  data-requests                          Data Requests
  data-requests sync [opts] <input>      Sync Data Requests from an OpenAPI Specification or Swagger
  test [options] <applicationId>         Run conversation tests for a given application ID
  http [options] <method> <path> [body]  Perform an authenticated request to the management API
  help [command]                         display help for command

> nlx auth login
Please visit https://nlxdev.us.auth0.com/activate?user_code=JCVM-MQHX and enter code: JCVM-MQHX
Login successful! Access token stored securely.

> nlx modalities generate
✔ TypeScript interfaces written to /Users/jakub.hampl/Programming/nlx/sdk/packages/cli/modalities-types.d.ts

> nlx modalities check
✔ Type check passed: all remote types are assignable to local types.

> echo "export interface Foo { bar: string; }" >> modalities-types.d.ts

> nlx modalities check

 ERROR  Type check failed:
  - Type/interface 'Foo' does not correspond to any model on the server.

> bin/nlx data-requests sync __tests__/input-files/sample-openapi.yaml --dry-run  --folder OpenAPI
ℹ Would create new data request CreateTest POST https://api.example.com/test, but skipping because --dry-run.

> bin/nlx data-requests sync __tests__/input-files/sample-openapi.yaml --interactive  --folder OpenAPI
# Interactive session where individual requests can be created or updated starts

> bin/nlx test 9bf7404f-8636-4cc6-a33f-cb72ba6a062d --enterprise-region EU
Fetched 3 tests. Running...

 ERROR  BadTest failed: 0/1

✔ SimpleDataRequest 01
✔ SimpleCarousel 02
--------------------------------
1 tests failed

 ERROR  Test: BadTest

Assertions met: 0/1
Transcript:
  1. User: SimpleCarousel
  2. Bot:
    ┌─────────────────────────────────────┐
    │Which invoice would you like to view?│
    └─────────────────────────────────────┘

  3. User: ➡️ Invoice 001
  4. Bot:
    ┌───────┐
    │Success│
    └───────┘

Debug at:  https://dev.platform.nlx.ai/flows/SimpleCarousel
```

## Running in CI

Many of the tasks outline above can be quite profitably run on CI servers during development as an additional check to make sure that developers of custom software components stay compatible with what builders are doing inside NLX (as often these can be separate teams).

For example:

- API endpoint developers may wish to sync their API description to NLX as part of their deployment process
- Front-end developers will want their CI server to typecheck their modality typescript definitions against the source of truth inside NLX.
- Backend systems may wish to run conversations tests that rely on said systems as part of their regression testing.

To run securely on CI, a CI only user should be created in NLX with only the appropriate permissions set up. Then running `nlx auth login --print-token` and following the instructions will result in a token. This token should be setup as an secret environment variable named `NLX_ACCESS_TOKEN`.

For instance in Github Actions, one can configure repository secrets, and then in the job will do:

```yaml
- name: Run example conversation test
  env:
    NLX_ACCESS_TOKEN: ${{ secrets.NLX_ACCESS_TOKEN }}
  # For example:
  run: nlx test 9bf7404f-8636-4cf6-a33f-cb72b36a062d
```
