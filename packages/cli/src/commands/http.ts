import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import { fetchManagementApi } from "../utils/index.js";

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
          console.error("Invalid JSON string from stdin: " + ed);
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
          console.error("Invalid JSON string or file path: " + body);
          process.exit(1);
        }
      }

      let result: any = await fetchManagementApi(
        apiPath +
          (opts.paginate
            ? apiPath.includes("?")
              ? "&size=1000"
              : "?size=1000"
            : ""),
        method.toUpperCase(),
        body,
      );

      let agg;
      if (opts.paginate) {
        const key = Object.keys(result).filter((k) => k !== "nextPageId")[0];
        agg = result[key];
        while (result.nextPageId) {
          result = await fetchManagementApi(
            apiPath + `?pageId=${result.nextPageId}`,
            method.toUpperCase(),
            body,
          );
          agg.push(...result[key]);
        }
      } else {
        agg = result;
      }

      console.log(JSON.stringify(agg, null, 2));
    },
  );
