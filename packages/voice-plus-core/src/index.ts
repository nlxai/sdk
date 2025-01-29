import fetch from "isomorphic-fetch";

// use a custom Console to indicate we really want to log to the console and it's not incidental. `console.log` causes an eslint error
const Console = console;

/**
 * The starting point of the package. Call create to create a Voice+ client.
 * @example
 * ```typescript
 *  const client = nlxai.voicePlus.create({
 *  // hard-coded params
 *  apiKey: "REPLACE_WITH_API_KEY",
 *  workspaceId: "REPLACE_WITH_WORKSPACE_ID",
 *  scriptId: "REPLACE_WITH_SCRIPT_ID",
 *  // dynamic params
 *  conversationId: "REPLACE_WITH_CONVERSATION_ID",
 *  languageCode: "en-US",
 * });
 *
 * client.sendStep("REPLACE_WITH_STEP_ID");
 * ```
 * @category Setup
 * @param options - configuration options for the client
 * @returns a Voice+ client
 */
export const create = ({
  apiKey,
  workspaceId,
  conversationId,
  journeyId,
  scriptId,
  languageCode,
  debug = false,
  dev = false,
}: Config): Client => {
  if (journeyId != null && scriptId == null) {
    Console.warn("The 'journeyId' field is deprecated, use 'scriptId' instead");
  }
  const resolvedJourneyId = scriptId ?? journeyId;
  if (resolvedJourneyId == null) {
    Console.warn("You must provide a 'scriptId' parameter");
  }
  if (typeof conversationId !== "string" || conversationId.length === 0) {
    Console.warn(
      'No conversation ID provided. Please call the Voice+ client `create` method with a `conversationId` field extracted from the URL. Example code: `new URLSearchParams(window.location.search).get("cid")`',
    );
  }
  return {
    sendStep: async (step: StepInfo, context?: Context) => {
      const [stepId, stepTriggerDescription]: [string, string | undefined] =
        typeof step === "string"
          ? [step, undefined]
          : [step.stepId, step.stepTriggerDescription];

      if (!stepIdRegex.test(stepId)) {
        throw new Error("Invalid stepId. It should be formatted as a UUID.");
      }

      const payload = {
        stepId,
        context,
        conversationId,
        journeyId: resolvedJourneyId,
        languageCode,
        stepTriggerDescription,
      };

      await fetch(`https://${dev ? "dev." : ""}mm.nlx.ai/v1/track`, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "x-nlx-id": workspaceId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(() => {
          if (debug) {
            Console.info(`✓ step: ${stepId}`, payload);
          }
        })
        .catch((err: Error) => {
          if (debug) {
            Console.error(`× step: ${stepId}`, err, payload);
          }
          throw err;
        });
    },
  };
};

/**
 * Step information, either a step ID as a single string or an object
 */
export type StepInfo =
  | string
  | { stepId: string; stepTriggerDescription?: string };

/**
 * The Voice+ client
 * @category Client
 */
export interface Client {
  /**
   *
   * @example
   * ```typescript
   *  const client = nlxai.voicePlus.create({
   *  // hard-coded params
   *  apiKey: "REPLACE_WITH_API_KEY",
   *  workspaceId: "REPLACE_WITH_WORKSPACE_ID",
   *  scriptId: "REPLACE_WITH_SCRIPT_ID",
   *  // dynamic params
   *  conversationId: "REPLACE_WITH_CONVERSATION_ID",
   *  languageCode: "en-US",
   * });
   *
   * client.sendStep("REPLACE_WITH_STEP_ID", {selectedSeat: "4a"});
   * ```
   * sends a step to the voice bot
   * @param step - the next step to transition to, either a UUID as string or an object containing stepId.
   *
   *
   *   _Note: The step ID must be a valid UUID_
   * @param context - [context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) to send back to the voice bot, for usage later in the intent.
   */
  sendStep: (step: StepInfo, context?: Context) => Promise<void>;
}

/**
 * [context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) to send back to the voice bot, for usage later in the intent.
 * @category Client
 */
export type Context = Record<string, any>;

/**
 * Initial configuration used when creating a journey manager
 * @category Setup
 */
export interface Config {
  /** * the API key generated for the journey.  */
  apiKey: string;
  /**
   * The ID of the journey.
   *  @deprecated use `scriptId` instead
   */
  journeyId?: string;
  /** the ID of the script.  */
  scriptId?: string;

  /** your workspace id */
  workspaceId: string;

  /**
   * the conversation id, passed from the active voice bot.
   *
   * _Note: This must be dynamically set by the voice bot._
   */
  conversationId: string;

  /**
   * the user's language code, consistent with the language codes defined on the journey.
   */
  languageCode: string;

  /** set to true to help debug issues or errors. Defaults to false */
  debug?: boolean;

  /** used for library testing @internal @hidden */
  dev?: boolean;
}

/**
 * @internal
 * @hidden
 * this is exported so we can test it. Should be equivalent to a UUID v4 regex.
 */
export const stepIdRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
