import fetch from "isomorphic-fetch";
import ReconnectingWebSocket from "reconnecting-websocket";
import { equals, adjust } from "ramda";
import { v4 as uuid } from "uuid";
import packageJson from "../package.json";

/**
 * [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
 */
export type Context = Record<string, any>;

/**
 * Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).
 *
 * An array of `SlotValue` objects is equivalent to a {@link SlotsRecord}.
 */
export interface SlotValue {
  /**
   * The attached slot's name
   */
  slotId: string;
  /**
   * Usually this will be a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
   * for custom slots, this can optionally be the value's ID.
   */
  value: any;
}

/**
 * Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).
 *
 * `SlotRecord` Keys are the attached slot's name
 *
 * `SlotRecord` Values are usually a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
 * for custom slots, this can optionally be the value's ID.
 *
 * A `SlotsRecord` is equivalent to an array of {@link SlotValue} objects.
 */
export type SlotsRecord = Record<string, any>;

/**
 * Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).
 *
 * Supports either a {@link SlotsRecord} or an array of {@link SlotValue} objects
 */
export type SlotsRecordOrArray = SlotsRecord | SlotValue[];

/**
 * A message from the bot
 *
 * See also:
 * - {@link UserResponse}
 * - {@link FailureMessage}
 * - {@link Response}
 */
export interface BotResponse {
  /**
   * The type of the response is `"bot"` for bot and `"user"` for user, and "failure" for failure.
   */
  type: "bot";
  /**
   * When the response was received
   */
  receivedAt: Time;
  /**
   * The payload of the response
   */
  payload: BotResponsePayload;
}

/**
 * The payload of the bot response
 */
export interface BotResponsePayload {
  /**
   * If there isn't some interaction by this time, the conversation will expire.
   */
  expirationTimestamp?: number;
  /**
   * The active conversation ID. If not set, a new conversation will be started.
   */
  conversationId?: string;
  /**
   * Any messages from the bot.
   */
  messages: BotMessage[];
  /**
   * Global state about the current conversation
   * as well as whether the client should poll for more bot responses.
   */
  metadata?: BotResponseMetadata;
  /**
   * If configured, the [node's payload.](See: https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/advanced-messaging-+-functionality#add-functionality)
   */
  payload?: string;
  /**
   * If configured, the node's modalities and their payloads.
   */
  modalities?: Record<string, any>;
  /**
   * If the node is set to send context, the whole context associated with the conversation.
   */
  context?: Context;
}

/**
 * Global state about the current conversation
 * as well as whether the client should poll for more bot responses.
 */
export interface BotResponseMetadata {
  /**
   * The conversation's intent
   */
  intentId?: string;
  /**
   * Whether the current conversation has been marked as incomprehension.
   */
  escalation?: boolean;
  /**
   * Whether the current conversation has been marked frustrated
   */
  frustration?: boolean;
  /**
   * Whether the current conversation has been marked as incomprehension.
   */
  incomprehension?: boolean;
  /**
   * Whether the client should poll for more bot responses.
   */
  hasPendingDataRequest?: boolean;
}

/**
 * A message from the bot, as well as any choices the user can make.
 */
export interface BotMessage {
  /**
   * A unique identifier for the message.
   */
  messageId?: string;
  /**
   * The node id that this message is associated with.
   * This is must be sent with a choice when the user is changing a previously sent choice.
   */
  nodeId?: string;
  /**
   * The body of the message. Show this to the user.
   */
  text: string;
  /**
   * A selection of choices to show to the user. They may choose one of them.
   */
  choices: Choice[];
  /**
   * After a choice has been made by the user, this will be updated locally to the selected choice id.
   * This field is set locally and does not come from the bot.
   */
  selectedChoiceId?: string;
}

/**
 * A choices to show to the user.
 */
export interface Choice {
  /**
   * `choiceId` is used by `sendChoice` to let the user choose this choice.
   */
  choiceId: string;
  /**
   * The text of the choice
   */
  choiceText: string;
  /**
   * An optional, schemaless payload for the choice.
   */
  choicePayload?: any;
}

/**
 * A message from the user
 *
 * See also:
 * - {@link BotResponse}
 * - {@link FailureMessage}
 * - {@link Response}
 *
 */
export interface UserResponse {
  /**
   * The type of the response is `"bot"` for bot and `"user"` for user, and "failure" for failure.
   */
  type: "user";
  /**
   * When the response was received
   */
  receivedAt: Time;
  /**
   * The payload of the response
   */
  payload: UserResponsePayload;
}

/**
 * The payload of the user response
 */
export type UserResponsePayload =
  | {
      /**
       * Set when `sendText` is called.
       */
      type: "text";
      /**
       * The user's message
       */
      text: string;
      /**
       * [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
       */
      context?: Context;
    }
  | {
      /**
       * Set when `sendChoice` is called.
       */
      type: "choice";
      /**
       * The `choiceId` passed to `sendChoice`
       * Correlates to a `choiceId` in the {@link BotResponse}'s `.payload.messages[].choices[].choiceId` fields
       */
      choiceId: string;
      /**
       * [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
       */
      context?: Context;
    }
  | ({
      /**
       * Set when `sendStructured` is called.
       */
      type: "structured";
      /**
       * [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
       */
      context?: Context;
    } & StructuredRequest);

// Failure message

/**
 * A failure message is received when the NLX api is unreachable, or sends an unparsable response.
 */
export interface FailureMessage {
  /**
   * The type of the response is `"bot"` for bot and `"user"` for user.
   */
  type: "failure";
  /**
   * The payload only includes an error message.
   */
  payload: {
    /**
     * The error message is either the default, or the `failureMessage` set in the {@link Config}.
     */
    text: string;
  };
  /**
   * When the failure occurred.
   */
  receivedAt: Time;
}

/**
 * A response from the bot or the user.
 */
export type Response = BotResponse | UserResponse | FailureMessage;

/**
 * The time value in milliseconds since midnight, January 1, 1970 UTC.
 */
export type Time = number;

// Config and state

/**
 * @hidden
 */
export type Environment = "production" | "development";

/**
 * The config to create a conversation.
 * `botUrl` and
 */
export interface Config {
  /**
   * Fetch this from the bot's Deployment page.
   */
  botUrl: string;
  /**
   * Headers to forward to the NLX API.
   */
  headers: Record<string, string> & {
    /**
     * The `nlx-api-key` is required. Fetch this from the bot's Deployment page.
     */
    "nlx-api-key": string;
  };

  /**
   * Set `conversationId` to continue an existing conversation. If not set, a new conversation will be started.
   */
  conversationId?: string;
  /**
   * Setting the `userID` allows it to be searchable in bot history, as well as usable via `{System.userId}` in the intent.
   */
  userId?: string;
  /**
   * When `responses` is set, initialize the chatHandler with historical messages.
   */
  responses?: Response[];
  /**
   * When set, this overrides the default failure message ("We encountered an issue. Please try again soon.").
   */
  failureMessage?: string;
  /**
   * The language code to use for the bot. In the browser this can be fetched with `navigator.language`.
   * If you don't have translations, hard-code this to the language code you support.
   */
  languageCode: string;
  /**
   * @hidden
   * this should only be used for NLX internal testing.
   */
  environment?: Environment;
  /**
   * Experimental settings
   */
  experimental?: {
    /**
     * Simulate alternative channel types
     */
    channelType?: string;
    /**
     * Prevent the `languageCode` parameter to be appended to the bot URL - used in special deployment environments such as the sandbox chat inside Dialog Studio
     */
    completeBotUrl?: boolean;
  };
}

const welcomeIntent = "NLX.Welcome";

const defaultFailureMessage = "We encountered an issue. Please try again soon.";

const normalizeSlots = (
  slotsRecordOrArray: SlotsRecordOrArray,
): SlotValue[] => {
  if (Array.isArray(slotsRecordOrArray)) {
    return slotsRecordOrArray;
  }
  return Object.entries(slotsRecordOrArray).map(([key, value]) => ({
    slotId: key,
    value,
  }));
};

/**
 * The body of `sendStructured`
 * Includes a combination of choice, slots, and intent in one request.
 */
export interface StructuredRequest {
  /**
   * The `choiceId` is in the {@link BotResponse}'s `.payload.messages[].choices[].choiceId` fields
   */
  choiceId?: string;
  /**
   * Required if you want to change a choice that's already been sent.
   * The `nodeId` can be found in the corresponding {@link BotMessage}.
   */
  nodeId?: string;
  /**
   * The intent to trigger. The `intentId` is the name under the Bot's _Intents_.
   */
  intentId?: string;
  /**
   * The slots to populate
   */
  slots?: SlotsRecordOrArray;
  /**
   * @hidden
   * This is used internally to indicate that the client is polling the bot for more data.
   */
  poll?: boolean;
}

interface BotRequest {
  conversationId?: string;
  userId?: string;
  context?: Context;
  request: {
    unstructured?: {
      text: string;
    };
    structured?: StructuredRequest & { slots?: SlotValue[] };
  };
}

/**
 * Helps link the choice to the specific message in the conversation.
 */
export interface ChoiceRequestMetadata {
  /**
   * The index of the {@link Response} associated with this choice.
   * Setting this ensures that local state's `selectedChoiceId` on the corresponding {@link BotResponse} is set.
   * It is not sent to the bot.
   */
  responseIndex?: number;
  /**
   * The index of the {@link BotMessage} associated with this choice.
   * Setting this ensures that local state's `selectedChoiceId` on the corresponding {@link BotResponse} is set.
   * It is not sent to the bot.
   */
  messageIndex?: number;
  /**
   * Required if you want to change a choice that's already been sent.
   * The `nodeId` can be found in the corresponding {@link BotMessage}.
   */
  nodeId?: string;
}

/**
 * A bundle of functions to interact with a conversation, created by {@link createConversation}.
 */
export interface ConversationHandler {
  /**
   * Send user's message
   * @param text - the user's message
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   */
  sendText: (text: string, context?: Context) => void;
  /**
   * Send [slots](https://docs.studio.nlx.ai/workspacesettings/introduction-to-settings) to the bot.
   * @param slots - The slots to populate
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   */
  sendSlots: (slots: SlotsRecordOrArray, context?: Context) => void;
  /**
   * Respond to [a choice](https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/nodes#user-choice) from the bot.
   * @param choidId - The `choiceId` is in the {@link BotResponse}'s `.payload.messages[].choices[].choiceId` fields
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   * @param metadata - links the choice to the specific message and node in the conversation.
   */
  sendChoice: (
    choiceId: string,
    context?: Context,
    metadata?: ChoiceRequestMetadata,
  ) => void;

  /**
   * Trigger the welcome [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents). This should be done when the user starts interacting with the chat.
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   */
  sendWelcomeIntent: (context?: Context) => void;

  /**
   * Trigger a specific [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents).
   * @param intentId - the intent to trigger. The id is the name under the Bot's _Intents_.
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   */
  sendIntent: (intentId: string, context?: Context) => void;

  /**
   * Send a combination of choice, slots, and intent in one request.
   * @param request -
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   */
  sendStructured: (request: StructuredRequest, context?: Context) => void;
  /**
   * Subscribe a callback to the conversation. On subscribe, the subscriber will receive all of the Responses that the conversation has already received.
   * @param subscriber - The callback to subscribe
   */
  subscribe: (subscriber: Subscriber) => () => void;
  /**
   * Unsubscribe a callback from the conversation.
   * @param subscriber - The callback to unsubscribe
   */
  unsubscribe: (subscriber: Subscriber) => void;
  /**
   * Unsubscribe all callback from the conversation.
   */
  unsubscribeAll: () => void;
  /**
   * Get the current conversation ID if it's set, or undefined if there is no conversation.
   */
  currentConversationId: () => string | undefined;
  /**
   * Forces a new conversation. If `clearResponses` is set to true, will also clear historical responses passed to subscribers.
   * Retains all existing subscribers.
   */
  reset: (options?: {
    /**
     * If set to true, will clear historical responses passed to subscribers.
     */
    clearResponses?: boolean;
  }) => void;
  /**
   * Removes all subscribers and, if using websockets, closes the connection.
   */
  destroy: () => void;
}

interface InternalState {
  responses: Response[];
  conversationId: string;
  userId?: string;
}

const fromInternal = (internalState: InternalState): Response[] =>
  internalState.responses;

const safeJsonParse = (val: string): any => {
  try {
    const json = JSON.parse(val);
    return json;
  } catch (_err) {
    return null;
  }
};

/**
 * The callback function for listening to all responses.
 */
export type Subscriber = (response: Response[], newResponse?: Response) => void;

/**
 * Helper method to decide when a new {@link Config} requires creating a new {@link ConversationHandler} or whether the old `Config`'s
 * `ConversationHandler` can be used.
 *
 * The order of configs doesn't matter.
 * @param config1 -
 * @param config2 -
 * @returns true if `createConversation` should be called again
 */
export const shouldReinitialize = (
  config1: Config,
  config2: Config,
): boolean => {
  return !equals(config1, config2);
};

/**
 * Call this to create a conversation handler.
 * @param config -
 * @returns The {@link ConversationHandler} is a bundle of functions to interact with the conversation.
 */
export default function createConversation(
  config: Config,
): ConversationHandler {
  let socket: ReconnectingWebSocket | undefined;

  // Check if the bot URL has a language code appended to it
  if (/[-|_][a-z]{2,}[-|_][A-Z]{2,}$/.test(config.botUrl)) {
    console.warn(
      "Since v1.0.0, the language code is no longer added at the end of the bot URL. Please remove the modifier (e.g. '-en-US') from the URL, and specify it in the `languageCode` parameter instead.",
    );
  }

  const initialConversationId = config.conversationId ?? uuid();

  let state: InternalState = {
    responses: config.responses ?? [],
    userId: config.userId,
    conversationId: initialConversationId,
  };

  const setState = (
    change: Partial<InternalState>,
    // Optionally send the response that causes the current state change, to be sent to subscribers
    newResponse?: Response,
  ): void => {
    state = {
      ...state,
      ...change,
    };
    subscribers.forEach((subscriber) => {
      subscriber(fromInternal(state), newResponse);
    });
  };

  const failureHandler = (): void => {
    const newResponse: Response = {
      type: "failure",
      receivedAt: new Date().getTime(),
      payload: {
        text: config.failureMessage ?? defaultFailureMessage,
      },
    };
    setState(
      {
        responses: [...state.responses, newResponse],
      },
      newResponse,
    );
  };

  const messageResponseHandler = (response: any): void => {
    if (response?.messages.length > 0) {
      const newResponse: Response = {
        type: "bot",
        receivedAt: new Date().getTime(),
        payload: {
          ...response,
          messages: response.messages.map((message: any) => ({
            nodeId: message.nodeId,
            messageId: message.messageId,
            text: message.text,
            choices: message.choices ?? [],
          })),
        },
      };
      setState(
        {
          responses: [...state.responses, newResponse],
        },
        newResponse,
      );
      if (response.metadata.hasPendingDataRequest as boolean) {
        appendStructuredUserResponse({ poll: true });
        setTimeout(() => {
          void sendToBot({
            request: {
              structured: {
                poll: true,
              },
            },
          });
        }, 1500);
      }
    } else {
      console.warn(
        "Invalid message structure, expected object with field 'messages'.",
      );
      failureHandler();
    }
  };

  let socketMessageQueue: BotRequest[] = [];

  let socketMessageQueueCheckInterval: ReturnType<typeof setInterval> | null =
    null;

  const sendToBot = async (body: BotRequest): Promise<void> => {
    const bodyWithContext = {
      userId: state.userId,
      conversationId: state.conversationId,
      ...body,
      languageCode: config.languageCode,
      channelType: config.experimental?.channelType,
      environment: config.environment,
    };
    if (isUsingWebSockets()) {
      if (socket?.readyState === 1) {
        socket.send(JSON.stringify(bodyWithContext));
      } else {
        socketMessageQueue = [...socketMessageQueue, bodyWithContext];
      }
    } else {
      await fetch(
        `${config.botUrl}${
          config.experimental?.completeBotUrl === true
            ? ""
            : `-${config.languageCode}`
        }`,
        {
          method: "POST",
          headers: {
            ...(config.headers ?? {}),
            Accept: "application/json",
            "Content-Type": "application/json",
            "nlx-sdk-version": packageJson.version,
          },
          body: JSON.stringify(bodyWithContext),
        },
      )
        .then(async (res) => {
          return await res.json();
        })
        .then(messageResponseHandler)
        .catch((err) => {
          console.warn(err);
          failureHandler();
        });
    }
  };

  const isUsingWebSockets = (): boolean => {
    return config.botUrl.indexOf("wss://") === 0;
  };

  let subscribers: Subscriber[] = [];

  const checkQueue = async (): Promise<void> => {
    if (socket?.readyState === 1 && socketMessageQueue[0] != null) {
      await sendToBot(socketMessageQueue[0]);
      socketMessageQueue = socketMessageQueue.slice(1);
    }
  };

  const setupWebsocket = (): void => {
    const url = new URL(config.botUrl);
    if (config.experimental?.completeBotUrl !== true) {
      url.searchParams.set("languageCode", config.languageCode);
      url.searchParams.set(
        "channelKey",
        `${url.searchParams.get("channelKey") ?? ""}-${config.languageCode}`,
      );
    }
    url.searchParams.set("conversationId", state.conversationId);
    socket = new ReconnectingWebSocket(url.href);
    socketMessageQueueCheckInterval = setInterval(() => {
      void checkQueue;
    }, 500);
    socket.onmessage = function (e) {
      if (typeof e?.data === "string") {
        messageResponseHandler(safeJsonParse(e.data));
      }
    };
  };

  const teardownWebsocket = (): void => {
    if (socketMessageQueueCheckInterval != null) {
      clearInterval(socketMessageQueueCheckInterval);
    }
    if (socket != null) {
      socket.onmessage = null;
      socket.close();
      socket = undefined;
    }
  };

  if (isUsingWebSockets()) {
    setupWebsocket();
  }

  const appendStructuredUserResponse = (
    structured: StructuredRequest,
    context?: Context,
  ): void => {
    const newResponse: Response = {
      type: "user",
      receivedAt: new Date().getTime(),
      payload: {
        type: "structured",
        ...structured,
        context,
      },
    };
    setState(
      {
        responses: [...state.responses, newResponse],
      },
      newResponse,
    );
  };

  const sendIntent = (intentId: string, context?: Context): void => {
    appendStructuredUserResponse({ intentId }, context);
    void sendToBot({
      context,
      request: {
        structured: {
          intentId,
        },
      },
    });
  };

  const sendText = (text: string, context?: Context): void => {
    const newResponse: Response = {
      type: "user",
      receivedAt: new Date().getTime(),
      payload: {
        type: "text",
        text,
        context,
      },
    };
    setState(
      {
        responses: [...state.responses, newResponse],
      },
      newResponse,
    );
    void sendToBot({
      context,
      request: {
        unstructured: {
          text,
        },
      },
    });
  };

  const unsubscribe = (subscriber: Subscriber): void => {
    subscribers = subscribers.filter((fn) => fn !== subscriber);
  };

  const subscribe = (subscriber: Subscriber): (() => void) => {
    subscribers = [...subscribers, subscriber];
    subscriber(fromInternal(state));
    return () => {
      unsubscribe(subscriber);
    };
  };

  return {
    sendText,
    sendStructured: (structured: StructuredRequest, context) => {
      appendStructuredUserResponse(structured, context);
      void sendToBot({
        context,
        request: {
          structured: {
            ...structured,
            slots: normalizeSlots(structured.slots ?? []),
          },
        },
      });
    },
    sendSlots: (slots, context) => {
      appendStructuredUserResponse({ slots }, context);
      void sendToBot({
        context,
        request: {
          structured: {
            slots: normalizeSlots(slots),
          },
        },
      });
    },
    sendIntent,
    sendWelcomeIntent: (context) => {
      sendIntent(welcomeIntent, context);
    },
    sendChoice: (choiceId, context, metadata) => {
      let newResponses: Response[] = [...state.responses];

      const choiceResponse: Response = {
        type: "user",
        receivedAt: new Date().getTime(),
        payload: {
          type: "choice",
          choiceId,
        },
      };

      const responseIndex = metadata?.responseIndex ?? -1;
      const messageIndex = metadata?.messageIndex ?? -1;

      if (responseIndex > -1 && messageIndex > -1) {
        newResponses = adjust(
          responseIndex,
          (response) =>
            response.type === "bot"
              ? {
                  ...response,
                  payload: {
                    ...response.payload,
                    messages: adjust(
                      messageIndex,
                      (message) => ({ ...message, selectedChoiceId: choiceId }),
                      response.payload.messages,
                    ),
                  },
                }
              : response,
          newResponses,
        );
      }

      newResponses = [...newResponses, choiceResponse];

      setState(
        {
          responses: newResponses,
        },
        choiceResponse,
      );

      void sendToBot({
        context,
        request: {
          structured: {
            nodeId: metadata?.nodeId,
            choiceId,
          },
        },
      });
    },
    currentConversationId: () => {
      return state.conversationId;
    },
    subscribe,
    unsubscribe,
    unsubscribeAll: () => {
      subscribers = [];
    },
    reset: (options) => {
      setState({
        conversationId: uuid(),
        responses: options?.clearResponses === true ? [] : state.responses,
      });
      if (isUsingWebSockets()) {
        teardownWebsocket();
        setupWebsocket();
      }
    },
    destroy: () => {
      subscribers = [];
      if (isUsingWebSockets()) {
        teardownWebsocket();
      }
    },
  };
}

/**
 * This package is intentionally designed with a subscription-based API as opposed to a promise-based one where each message corresponds to a single bot response, available asynchronously.
 *
 * If you need a promise-based wrapper, you can use the `promisify` helper available in the package:
 * @example
 * ```typescript
 * import { createConversation, promisify } from "@nlxai/chat-core";
 *
 * const convo = createConversation(config);
 *
 * const sendTextWrapped = promisify(convo.sendText, convo);
 *
 * sendTextWrapped("Hello").then((response) => {
 *   console.log(response);
 * });
 * ```
 * @typeParam T - the type of the function's params, e.g. for `sendText` it's `text: string, context?: Context`
 * @param fn - the function to wrap (e.g. `convo.sendText`, `convo.sendChoice`, etc.)
 * @param convo - the `ConversationHandler` (from {@link createConversation})
 * @param timeout - the timeout in milliseconds
 * @returns A wrapped version of the function that returns a promise that resolves to the Conversation's next response.
 */
export function promisify<T>(
  fn: (payload: T) => void,
  convo: ConversationHandler,
  timeout = 10000,
): (payload: T) => Promise<Response | null> {
  return async (payload: T) => {
    return await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("The request timed out."));
        convo.unsubscribe(subscription);
      }, timeout);
      const subscription = (
        _responses: Response[],
        newResponse: Response | undefined,
      ): void => {
        if (newResponse?.type === "bot") {
          clearTimeout(timeoutId);
          convo.unsubscribe(subscription);
          resolve(newResponse);
        }
      };
      convo.subscribe(subscription);
      fn(payload);
    });
  };
}
