import { Command } from "commander";
import { fetchManagementApi } from "../utils/index.js";
import { consola } from "consola";
import {
  type ConversationHandler,
  createConversation,
  type UserResponsePayload,
  type Config,
  type Response,
  type StructuredRequest,
  ApplicationResponse,
  ApplicationResponsePayload,
} from "@nlxai/core";
import { ensureToken } from "./auth/login.js";
import { flatten, uniq } from "ramda";
import chalk from "chalk";
import boxen from "boxen";

export const testCommand = new Command("test")
  .description("Run conversation tests for a given application ID")
  .argument("<applicationId>", "Application ID to fetch tests for")
  .option("--env <environment>", "Specify the environment", "production")
  .option("--language <language>", "Specify the language code", "en-US")
  .option("--channel <channel>", "Specify the channel type", "API")
  .option(
    "--applications-url-base-override <url>",
    "Override the base URL for applications",
  )
  .option("--enterprise-region <region>", "Specify the enterprise region")
  .action(async (applicationId, opts) => {
    try {
      const { tests } = (await fetchManagementApi(
        `bots/${applicationId}/conversationTests`,
        "GET",
      )) as { tests: any };
      consola.log("Fetched %i tests. Running...", tests.length);
      const baseUrl = getBaseUrl(
        opts.enterpriseRegion == null,
        opts.applicationsUrlBaseOverride ?? "",
        opts.enterpriseRegion ?? "US",
      );
      const applicationUrl = `${baseUrl}/c/${applicationId}/sandbox`;
      consola.debug("Application URL:", applicationUrl);
      const accessToken = await ensureToken();
      const handlerConfig = {
        applicationUrl,
        headers: {
          "nlx-api-key": accessToken,
          Authorization: `Bearer ${accessToken}`,
        },
        environment: opts.env,
        languageCode: opts.language,
        experimental: {
          channelType: opts.channel,
          completeApplicationUrl: true,
        },
      };
      const failures = [];
      for await (const test of tests) {
        const result = await runTest(test, handlerConfig, applicationId);
        if (result.met.length === result.total.length) {
          consola.success(test.name);
        } else {
          failures.push({
            name: test.name,
            met: result.met.length,
            total: result.total.length,
            responses: result.responses,
            intentId: test.steps[0]?.raw?.intentId,
          });
          consola.error(
            `${test.name} failed: ${result.met.length}/${result.total.length}`,
          );
        }
      }
      if (failures.length > 0) {
        consola.log("--------------------------------");
        consola.log("%i tests failed", failures.length);
        failures.forEach((failure) => {
          consola.error("Test: %s", failure.name);
          consola.log("Assertions met: %i/%i", failure.met, failure.total);
          console.log("Transcript:");

          failure.responses.forEach((response, index) => {
            if (response.type === "user") {
              consola.log(
                `  %i. ${chalk.blue("User")}: %s`,
                index + 1,
                response.payload.type === "structured"
                  ? `${chalk.underline(response.payload.intentId)}`
                  : response.payload.type == "choice"
                    ? `➡️ ${response.payload.choiceId}`
                    : response.payload.text,
              );
            } else if (response.type === "bot") {
              consola.log(`  %i. ${chalk.yellow("Bot")}:`, index + 1);
              consola.log(
                response.payload.messages
                  .map((msg) =>
                    boxen(msg.text, { margin: { left: 4, bottom: 1 } }),
                  )
                  .join("\n"),
              );
            }
          });

          consola.log(
            "Debug at: ",
            chalk.underline(
              `https://dev.platform.nlx.ai/flows/${failure.intentId}`,
            ),
          );
        });
        process.exit(1);
      } else {
        consola.success("All tests passed!");
      }
    } catch (err) {
      consola.error("Failed to fetch tests:", err);
      process.exit(1);
    }
  });

interface Step {
  raw: UserResponsePayload;
  structured?: StructuredRequest;
}

export interface Assertion {
  nodeId?: string;
}

interface ApplicationResponsePayloadWithDebugEvents
  extends ApplicationResponsePayload {
  debugEvents?: DebugEvent[];
}
interface DebugEvent {
  eventType: string;
  [key: string]: any;
}

const runTest = async (
  test: { steps: Step[]; assertions: Assertion[] },
  config: Config,
  applicationId: string,
) => {
  const handler = createConversation(config);
  const responses = await replayConversation({
    steps: test.steps,
    conversationHandler: handler,
  });

  const { total, met } = assertionsSummary(responses, test.assertions);
  handler.destroy();
  await fetchReset(applicationId);
  return { total, met, responses };
};

const fetchReset = async (applicationId: string): Promise<unknown> => {
  return await fetchManagementApi(
    `bots/${applicationId}/sandbox/reset`,
    "POST",
  );
};

const replayConversation = async ({
  steps,
  conversationHandler,
}: {
  steps: Step[];
  conversationHandler: ConversationHandler;
  context?: Record<string, any>;
}): Promise<Response[]> => {
  if (steps.length === 0) {
    return [];
  }

  const [firstStep, ...restSteps] = steps;

  if (firstStep.raw.type === "structured" && (firstStep.raw.poll ?? false)) {
    return replayConversation({
      steps: restSteps,
      conversationHandler,
    });
  }

  return await new Promise((resolve) => {
    const handleResponse = (
      responses: Response[],
      newResponse?: Response,
    ): void => {
      if (newResponse == null) {
        return;
      }
      if (
        newResponse.type === "bot" &&
        !(newResponse.payload.metadata?.hasPendingDataRequest ?? false)
      ) {
        setTimeout(() => {
          conversationHandler.unsubscribe(handleResponse);
          if (restSteps.length === 0) {
            resolve(responses);
          } else {
            resolve(
              replayConversation({
                steps: restSteps,
                conversationHandler,
              }),
            );
          }
        }, 250);
      } else if (isTestCompleted(responses, steps)) {
        resolve(responses);
      }
    };

    conversationHandler.subscribe(handleResponse);

    if (firstStep.raw.type === "text") {
      conversationHandler.sendText(firstStep.raw.text, firstStep.raw.context);
    } else if (firstStep.raw.type === "choice") {
      // TODO: add response and message indices to fix button click states
      conversationHandler.sendChoice(
        firstStep.raw.choiceId,
        firstStep.raw.context,
      );
    } else if (firstStep.raw.type === "structured") {
      conversationHandler.sendStructured(
        {
          // eslint-disable-next-line deprecation/deprecation
          intentId: firstStep.raw.intentId,
          choiceId: firstStep.raw.choiceId,
          slots: firstStep.raw.slots,
        },
        firstStep.raw.context,
      );
    }
  });
};

const isTestCompleted = (responses: Response[], steps: Step[]): boolean => {
  let pendingTestStepIndex = 0;
  let index = 0;
  for (const response of responses) {
    if (response.type === "user") {
      pendingTestStepIndex++;
    }
    // If all test steps have been triggered and there is a subsequent application response available, the test is considered complete
    if (pendingTestStepIndex === steps.length + 1 && response.type === "bot") {
      return true;
    }
    index++;
  }
  return false;
};

export const assertionsSummary = (
  responses: Response[],
  assertions: Assertion[],
): { total: string[]; met: string[] } => {
  const assertionNodes = getAssertionNodes(assertions);
  const applicationResponses: ApplicationResponse[] = responses.filter(
    (res): res is ApplicationResponse => res.type === "bot",
  );
  const payloads: ApplicationResponsePayloadWithDebugEvents[] =
    applicationResponses.map((res) => res.payload);
  const nodesHit = applicationResponseTraversedNodeIds(payloads);
  return {
    met: nodesHit.filter((nodeId) => assertionNodes.includes(nodeId)),
    total: assertionNodes,
  };
};

const applicationResponseTraversedNodeIds = (
  application: ApplicationResponsePayloadWithDebugEvents[],
): string[] =>
  uniq(
    flatten(
      application.map((payload) => traversalNodeIds(payload.debugEvents ?? [])),
    ),
  );

const traversalNodeIds = (events: DebugEvent[]): string[] => {
  const nodeIds: string[] = [];
  events.forEach((event: DebugEvent) => {
    if (
      event.eventType === "NodeTraversal" &&
      typeof event.nodeId === "string"
    ) {
      nodeIds.push(event.nodeId);
    }
  });
  return nodeIds;
};

const getAssertionNodes = (assertions: Assertion[]): string[] => {
  return uniq(
    assertions
      .map(({ nodeId }) => nodeId)
      .filter((nodeId): nodeId is string => nodeId != null),
  );
};

const getBaseUrl = (
  isGa: boolean,
  applicationsUrlBaseOverride: string,
  region: string,
): string => {
  const httpsBaseUrl = isGa
    ? `https://dev.apps.nlx.ai`
    : `https://bots.dev.studio.nlx.ai`;
  const baseUrl: string =
    applicationsUrlBaseOverride.length > 0
      ? applicationsUrlBaseOverride
      : region === "EU"
        ? httpsBaseUrl.replace("//", "//eu-central-1.")
        : httpsBaseUrl;
  return baseUrl;
};
