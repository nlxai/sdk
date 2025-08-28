import { editor, expand, select } from "@inquirer/prompts";
import boxen from "boxen";
import chalk from "chalk";
import { Command } from "commander";
import { fetchManagementApi } from "../../utils/index.js";
import OASNormalize from "oas-normalize";
import Oas from "oas";
import { MediaTypeObject, SchemaObject } from "oas/types";
import open from "open";

const categorizeServers = async (spec: Oas, interactive: boolean) => {
  const { servers } = spec.getDefinition();
  if (servers == null)
    throw new Error("No servers defined in the specification");
  if (servers.length === 1) return { production: 0 };
  const guess = servers.reduce(
    (
      acc: Record<string, number>,
      server: { description?: string },
      idx: number,
    ) => {
      if (
        server.description != null &&
        server.description.match(/prod(uction)?/i)
      )
        acc.production = idx;
      else if (
        server.description != null &&
        server.description.match(/dev(elopment)?|staging/i)
      )
        acc.development = idx;

      return acc;
    },
    {},
  );
  if (interactive) {
    const servers = spec.getDefinition().servers;
    if (servers && servers.length > 1) {
      const serverChoices = servers.map((srv, idx) => ({
        name: `${srv.url}`,
        value: idx as number | undefined,
        description: srv.description,
      }));
      const prodIdx = await select({
        message: "Select production server:",
        choices: serverChoices,
        default: guess.production,
      });
      const devIdx: number | undefined = await select({
        message: "Select development server:",
        choices: serverChoices.concat([
          {
            name: "No development server",
            value: undefined,
            description: undefined,
          },
        ]),
        default: guess.development,
      });
      return { production: prodIdx, development: devIdx };
    }
  }
  return guess;
};

const resolveAmbiguity = <T>(
  arr: Array<T>,
  interactive: boolean | undefined,
  id: string,
  label: string,
): Promise<T | undefined> => {
  if (arr.length === 0) return Promise.resolve(undefined);
  if (arr.length === 1) return Promise.resolve(arr[0]);
  if (interactive) {
    return select({
      message: `Select ${label} in ${id}:`,
      choices: arr.map((item, index) => ({
        name: JSON.stringify(item, null, 2),
        value: item,
      })),
    });
  }
  return Promise.resolve(arr[0]);
};

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const syncCommand = new Command("sync")
  .summary("Sync Data Requests from an OpenAPI Specification or Swagger")
  .description(
    `Takes an OpenAPI Specification or Swagger file and creates or updates data requests in your NLX account to match the API definition.

Supports OpenAPI 2.0, 3.0, 3.1, Swagger in JSON and YAML formats. Also experimentally supports Postman collections.

NLX Data Requests only support a subset of HTTP functionality described in the OpenAPI Specification. 
Operations that don't meet the following will be skipped:

  - Request and response bodies must be in JSON format.
  - Endpoints must either be unsecured or use API key or Bearer token authentication.
  - Operations must not be marked deprecated.

The following features are not supported and will be silently ignored:

  - Query parameters.
  - Cookies.
  - Fancier JSON Schema features outside the NLX data model.
  - Multiple response schemas (only the first 2xx response is used).
`,
  )
  .argument("<input-spec>", "Path to the OpenAPI Specification or Swagger file")
  .requiredOption(
    "--folder <folder>",
    "Folder where the data requests will be organized",
  )

  .optionsGroup("Security mechanism:")
  .option(
    "--api-key-secret <secret>",
    "Name of the NLX Secret containing the secret to use for the API key security mechanism",
  )
  .option(
    "--bearer-secret <secret>",
    "Name of the NLX Secret containing the secret to use for the Bearer token security mechanism",
  )
  .optionsGroup("Run modes:")
  .option("--dry-run", "Simulate the sync process without making any changes")
  .option(
    "--interactive",
    "Prompt for each operation before syncing, allowing user to approve, skip, or resolve ambiguities",
  )

  .action(
    async (
      inputSpec: string,
      options: {
        folder?: string;
        dryRun: boolean;
        apiKeySecret?: string;
        bearerSecret?: string;
        interactive?: boolean;
      },
    ) => {
      const currentData = new Map(
        (
          (await fetchManagementApi("/variables?size=1000")) as any
        ).variables.map((variable: any) => [variable.variableId, variable]),
      );

      let oas = new OASNormalize(inputSpec, { enablePaths: true });
      try {
        await oas.validate();
      } catch (error) {
        console.error("Failed to validate OpenAPI Specification:", error);
        process.exit(1);
      }
      const spec = Oas.init((await oas.convert()) as any);

      await spec.dereference();
      const serverIndices = await categorizeServers(
        spec,
        options.interactive ?? false,
      );

      const newData = await Promise.all(
        Object.entries(spec.getPaths()).flatMap(([path, methods]) => {
          return Object.values(methods)
            .filter((operation) => {
              return (
                operation.getContentType() === "application/json" &&
                !operation.isDeprecated() &&
                !operation.isWebhook()
              );
            })
            .filter((operation) => {
              const keys = Object.keys(operation.prepareSecurity());
              if (
                keys.length === 0 ||
                keys.includes("Header") ||
                keys.includes("Bearer")
              ) {
                return true;
              } else {
                console.warn(
                  `Skipping operation ${operation.getOperationId()} due to unsupported security schemes: ${keys.join(", ")}`,
                );
                return false;
              }
            })
            .map(async (operation) => {
              const variableId = capitalize(
                operation
                  .getOperationId()
                  .replace(/[^a-zA-Z0-9]+([a-zA-Z0-9]|$)/g, (_, v) => {
                    return v.toUpperCase();
                  }),
              );
              const codes = await resolveAmbiguity(
                operation
                  .getResponseStatusCodes()
                  .map(parseInt)
                  .filter((r) => r >= 200 && r < 300),
                options.interactive,
                variableId,
                "response status codes",
              );

              operation
                .getParameters()
                .filter((op) => ["cookie", "query"].includes(op.in))
                .forEach((param) => {
                  console.warn(
                    `${param.in} param ${param.name} not supported, skipping.`,
                  );
                });

              let headers = operation.getHeaders().request.map((header) => ({
                key: header,
                value: "",
                dynamic: true,
                required: false,
              }));

              const security = operation.prepareSecurity();

              if (
                security.Header &&
                security.Header.length === 1 &&
                options.apiKeySecret &&
                security.Header[0].type === "apiKey"
              ) {
                if (options.apiKeySecret) {
                  const apiSecretSecurity = security.Header.filter(
                    (h) => h.type === "apiKey",
                  );
                  if (
                    apiSecretSecurity.length === 1 &&
                    apiSecretSecurity[0].type === "apiKey" &&
                    apiSecretSecurity[0].in === "header"
                  ) {
                    const name = apiSecretSecurity[0].name;
                    headers = [
                      ...headers.filter((h) => h.key !== name),
                      {
                        key: name,
                        value: `{${options.apiKeySecret}:NLX.Secret}`,
                        dynamic: false,
                        required: true,
                      },
                    ];
                  }
                }
              }
              if (options.bearerSecret) {
                const bearerSecurity =
                  security.Bearer?.filter(
                    (h) => h.type === "http" && h.scheme === "bearer",
                  ) ?? [];

                if (bearerSecurity.length === 1) {
                  headers = [
                    ...headers.filter((h) => h.key !== "Authorization"),
                    {
                      key: "Authorization",
                      value: `Bearer {${options.bearerSecret}:NLX.Secret}`,
                      dynamic: false,
                      required: true,
                    },
                  ];
                }
              }

              return {
                variableId,
                path: options.folder,
                type: "text",
                description:
                  operation.getSummary() || operation.getDescription(),
                requestSchema: await extractSchema(
                  operation.getRequestBody("application/json") || undefined,
                  options.interactive,
                  variableId,
                  "request schema",
                ),
                responseSchema: await extractSchema(
                  codes ? operation.getResponseAsJSONSchema(codes) : undefined,
                  options.interactive,
                  variableId,
                  "response schema",
                ),
                webhook: {
                  implementation: "external",
                  method: operation.method.toUpperCase(),
                  sendContext: false,
                  version: "v3",
                  environments: {
                    production: {
                      url: spec.url(serverIndices.production) + operation.path,
                      headers,
                    },
                    development:
                      serverIndices.development == null
                        ? undefined
                        : {
                            url:
                              spec.url(serverIndices.development) +
                              operation.path,
                            headers,
                          },
                  },
                },
              };
            });
        }),
      );

      for (const dataRequest of newData) {
        let proceed = true;
        let resolvedRequest = { ...dataRequest };
        let action;
        if (options.interactive) {
          const preview = [
            chalk.bold(
              dataRequest.webhook.method +
                " " +
                chalk.underline(
                  dataRequest.webhook.environments.production.url,
                ),
            ),
            chalk.dim(dataRequest.description),
            "",
            chalk.bold.magenta(`Request Schema:`),
            chalk.white(JSON.stringify(dataRequest.requestSchema, null, 2)),
            "",
            chalk.bold.magenta(`Response Schema:`),
            chalk.white(JSON.stringify(dataRequest.responseSchema, null, 2)),
          ].join("\n");
          console.log(
            boxen(preview, {
              padding: 1,
              margin: 1,
              borderStyle: "round",
              borderColor: "cyan",
              backgroundColor: "black",
              title: dataRequest.variableId,
            }),
          );
          action = await expand({
            message: "Sync this operation?",
            choices: [
              { key: "y", name: "Sync", value: "sync" },
              { key: "n", name: "Skip", value: "skip" },
              { key: "e", name: "Edit in your $EDITOR", value: "edit" },
              { key: "u", name: "Sync then edit in UI", value: "edit-ui" },
            ],
            default: "y",
          });
          if (action === "skip") {
            proceed = false;
          } else if (action === "edit") {
            const res = await editor({
              message: "Open JSON in your editor",
              default: JSON.stringify(dataRequest, null, 2),
              postfix: ".json",
              waitForUseInput: false,
              validate: (text) => {
                try {
                  JSON.parse(text);
                  return true;
                } catch {
                  return "Invalid JSON";
                }
              },
            });
            resolvedRequest = JSON.parse(res);
          }
        }
        if (!proceed) continue;
        const existing: any = currentData.get(resolvedRequest.variableId);
        if (existing) {
          if (
            !Object.entries(resolvedRequest).every(([key, value]) => {
              return eq(value, existing[key]);
            })
          ) {
            console.log(
              `Updating data request ${resolvedRequest.variableId} ${resolvedRequest.webhook.method} ${resolvedRequest.webhook.environments.production.url}`,
            );
            if (!options.dryRun)
              await fetchManagementApi(
                `variables/${resolvedRequest.variableId}`,
                "POST",
                resolvedRequest,
              );
            if (action === "edit-ui") {
              open(
                `https://dev.platform.nlx.ai/data-requests/${resolvedRequest.variableId}`,
              );
            }
          }
        } else {
          console.log(
            `Creating new data request ${resolvedRequest.variableId} ${resolvedRequest.webhook.method} ${resolvedRequest.webhook.environments.production.url}`,
          );
          if (!options.dryRun) {
            await fetchManagementApi("variables", "PUT", resolvedRequest);
            if (action === "edit-ui") {
              open(
                `https://dev.platform.nlx.ai/data-requests/${resolvedRequest.variableId}`,
              );
            }
          }
        }
      }
    },
  );

const extractSchema = async (
  schema: SchemaObject | MediaTypeObject | undefined,
  interactive: boolean | undefined,
  id: string,
  label: string,
) => {
  if (schema == null) return undefined;

  if (Array.isArray(schema) && schema.length > 0) {
    schema = await resolveAmbiguity(schema, interactive, id, label);
  }
  if (schema != null && "schema" in schema) {
    schema = schema.schema;
  }
  return schema;
};

const eq = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (a == null && b == null) return true;
  if (typeof a == "object" && typeof b == "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    return aKeys.every((key) => eq(a[key], b[key]));
  }
  return false;
};
