import { Command } from "commander";
import { compile } from "json-schema-to-typescript";
import fs from "fs";
import path from "path";
import { fetchManagementApi } from "../../utils";
import OASNormalize from "oas-normalize";
import Oas from "oas";
import { consola } from "consola";

const categorizeServers = (spec: Oas) => {
  const { servers } = spec.getDefinition();
  if (servers == null)
    throw new Error("No servers defined in the specification");
  if (servers.length === 1) return { production: 0 };

  return servers.reduce(
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
  .option(
    "--folder <folder>",
    "Folder where the data requests will be organized",
  )
  .option("--dry-run", "Simulate the sync process without making any changes")
  .optionsGroup("Security mechanism:")
  .option(
    "--api-key-secret <secret>",
    "Name of the NLX Secret containing the secret to use for the API key security mechanism",
  )
  .option(
    "--bearer-secret <secret>",
    "Name of the NLX Secret containing the secret to use for the Bearer token security mechanism",
  )
  .action(
    async (
      inputSpec: string,
      options: {
        folder?: string;
        dryRun: boolean;
        apiKeySecret?: string;
        bearerSecret?: string;
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
        consola.error("Failed to validate OpenAPI Specification:", error);
        process.exit(1);
      }
      const spec = Oas.init((await oas.convert()) as any);

      await spec.dereference();
      const serverIndices = categorizeServers(spec);

      const newData = Object.entries(spec.getPaths()).flatMap(
        ([path, methods]) => {
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
                consola.warn(
                  `Skipping operation ${operation.getOperationId()} due to unsupported security schemes: ${keys.join(", ")}`,
                );
                return false;
              }
            })
            .map((operation) => {
              const codes = operation
                .getResponseStatusCodes()
                .map(parseInt)
                .filter((r) => r >= 200 && r < 300)[0];

              operation
                .getParameters()
                .filter((op) => ["cookie", "query"].includes(op.in))
                .forEach((param) => {
                  consola.warn(
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
                variableId: capitalize(
                  operation
                    .getOperationId()
                    .replace(/[^a-zA-Z0-9]+([a-zA-Z0-9]|$)/g, (_, v) => {
                      return v.toUpperCase();
                    }),
                ),
                path: options.folder,
                type: "text",
                description:
                  operation.getSummary() || operation.getDescription(),
                requestSchema:
                  operation.getRequestBody("application/json") || undefined,
                responseSchema: codes
                  ? operation.getResponseAsJSONSchema(codes)
                  : undefined,
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
        },
      );

      for (const dataRequest of newData) {
        const existing: any = currentData.get(dataRequest.variableId);
        if (existing) {
          if (
            !Object.entries(dataRequest).every(([key, value]) => {
              return eq(value, existing[key]);
            })
          ) {
            consola.info(
              `Updating data request ${dataRequest.variableId} ${dataRequest.webhook.method} ${dataRequest.webhook.environments.production.url}`,
            );
            if (!options.dryRun)
              await fetchManagementApi(
                `variables/${dataRequest.variableId}`,
                "POST",
                dataRequest,
              );
          }
        } else {
          consola.info(
            `Creating new data request ${dataRequest.variableId} ${dataRequest.webhook.method} ${dataRequest.webhook.environments.production.url}`,
          );
          if (!options.dryRun)
            await fetchManagementApi("variables", "PUT", dataRequest);
        }
      }
    },
  );

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
