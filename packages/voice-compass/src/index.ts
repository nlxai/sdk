import fetch from "isomorphic-fetch";

/**
 * The starting point of the package. Call create to create a `VoiceCompass` client.
 *
 * @example
 * ```typescript
 *  const client = nlxai.voiceCompass.create({
 *  // hard-coded params
 *  apiKey: "REPLACE_WITH_API_KEY",
 *  workspaceId: "REPLACE_WITH_WORKSPACE_ID",
 *  journeyId: "REPLACE_WITH_JOURNEY_ID",
 *  // dynamic params
 *  conversationId: "REPLACE_WITH_CONVERSATION_ID",
 *  languageCode: "en-US",
 * });
 *
 * client.sendStep("REPLACE_WITH_STEP_ID");
 * ```
 *
 * @category Setup
 *
 * @param options - the configuration object
 *
 * @returns a Voice Compass client
 */
export const create = ({
  apiKey,
  workspaceId,
  conversationId,
  journeyId,
  languageCode,
  debug = false,
  dev = false,
}: Config): Client => {
  if (!conversationId) {
    console.warn(
      'No conversation ID provided. Please call the Voice Compass client `create` method with a `conversationId` field extracted from the URL. Example code: `new URLSearchParams(window.location.search).get("cid")`',
    );
  }
  const sendStep = (stepId: string, context?: Context) => {
    if (!stepIdRegex.test(stepId)) {
      throw new Error("Invalid stepId. It should be formatted as a UUID.");
    }

    const payload = {
      stepId,
      context,
      conversationId,
      journeyId,
      languageCode,
    };

    return fetch(`https://${dev ? "dev." : ""}mm.nlx.ai/v1/track`, {
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
          console.info(`✓ step: ${stepId}`, payload);
        }
      })
      .catch((err: Error) => {
        if (debug) {
          console.error(`× step: ${stepId}`, err, payload);
        }
        throw err;
      });
  };

  return { sendStep };
};

/**
 * The VoiceCompass client
 * @category Client
 */
export interface Client {
  /**
   * sends a step to the voice bot
   * @param stepId - the next step to transition to.
   *
   *
   *   _Note: Must be a valid UUID_
   *
   * @param context -  context to send back to the voice bot, for usage later in the intent.
   */
  sendStep: (stepId: string, context?: Context) => Promise<void>;
}

/**
 * context to send back to the voice bot, for usage later in the intent.
 * @category Client
 */
export type Context = Record<string, any>;

/**
 * Initial configuration used when creating a journey manager
 * @category Setup
 */
export interface Config {
  /** * the API key generated for the journey.  **/
  apiKey: string;
  /** the ID of the journey.  */
  journeyId: string;

  /** your workspace id */
  workspaceId: string;

  /** the conversation id, passed from the active voice bot.
   *
   * _Note: This must be dynamically set by the voice bot._
   * */
  conversationId: string;

  /** the user's language code.
   *
   * In the browser may be fetched from `navigator.language`, or if the journey doesn't support multiple languages, can be hardcoded.
   * */
  languageCode: string;

  /** set to true to help debug issues or errors. Defaults to false */
  debug?: boolean;

  /** used for library testing @internal @hidden */
  dev?: boolean;
}

/**
 * @internal @hidden
 * this is exported so we can test it. Should be equivalent to a UUID v4 regex.
 */
export const stepIdRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
