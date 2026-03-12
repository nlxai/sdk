import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import {
  fetchManagementApi,
  fetchManagementApiPaginated,
} from "../utils/index.js";
import { consola } from "consola";

export const httpCommand = new Command("http")
  .description("Perform an authenticated request to the management API")
  .argument("<method>", "HTTP method (GET, POST, PUT, DELETE, etc.)")
  .argument("<path>", "API path (e.g. /models)")
  .argument(
    "[body]",
    "Request body as JSON string, name of a JSON file or -- for Standard Input",
  )
  .option("-p, --paginate", "Enable pagination", false)
  .action(
    async (
      method: string,
      apiPath: string,
      body: string | undefined,
      opts: { paginate: boolean },
    ) => {
      if (body === "--") {
        // Read from stdin
        body = "";
        process.stdin.setEncoding("utf8");
        for await (const chunk of process.stdin) body += chunk;
        try {
          body = JSON.parse(body);
        } catch (ed) {
          consola.error("Invalid JSON string from stdin: " + ed);
          process.exit(1);
        }
      } else if (body != null) {
        // Try to parse as file path or JSON string
        try {
          if (fs.existsSync(body)) {
            body = JSON.parse(fs.readFileSync(body, "utf8"));
          } else {
            body = JSON.parse(body);
          }
        } catch {
          consola.error("Invalid JSON string or file path: " + body);
          process.exit(1);
        }
      }
      let result: any;
      if (opts.paginate) {
        result = await fetchManagementApiPaginated(apiPath);
      } else {
        result = await fetchManagementApi(apiPath, method.toUpperCase(), body);
      }

      console.log(JSON.stringify(result, null, 2));
    },
  );
