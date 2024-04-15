import fetch from "isomorphic-fetch";
import ReconnectingWebSocket from "reconnecting-websocket";
import { equals, adjust, omit } from "ramda";
import { v4 as uuid } from "uuid";
import packageJson from "../package.json";

/**
 * Call this to create a conversation handler.
 *
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
 *
 */
export interface ConversationHandler {
  /**
   *
   */
  sendText: (text: string, context?: Context) => void;
  /**
   *
   */
  sendSlots: (slots: SlotsRecordOrArray, context?: Context) => void;
  /**
   *
   */
  sendChoice: (
    choiceId: string,
    context?: Context,
    metadata?: ChoiceRequestMetadata,
  ) => void;
  /**
   *
   */
  sendWelcomeIntent: (context?: Context) => void;
  /**
   *
   */
  sendIntent: (intentId: string, context?: Context) => void;
  /**
   *
   */
  sendStructured: (request: StructuredRequest, context?: Context) => void;
  /**
   *
   */
  subscribe: (subscriber: Subscriber) => () => void;
  /**
   *
   */
  unsubscribe: (subscriber: Subscriber) => void;
  /**
   *
   */
  unsubscribeAll: () => void;
  /**
   *
   */
  currentConversationId: () => string | undefined;
  /**
   *
   */
  reset: (options?: {
    /**
     *
     */
    clearResponses?: boolean;
  }) => void;
  /**
   *
   */
  destroy: () => void;
}

/**
 * Context to send back to the bot, for usage later in the intent.
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
   * The type of the response is `"bot"` for bot and `"user"` for user.
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
 * The response when the bot sends a message.
 */
export interface BotResponsePayload {
  /**
   * If there isn't some interaction by this time, the conversation will expire.
   */
  expirationTimestamp?: number;
  /**
   * The active conversation ID. If this is null, a new conversation will be started.
   */
  conversationId?: string;
  /**
   *
   */
  messages: BotMessage[];
  /**
   *
   */
  metadata?: BotResponseMetadata;
  /**
   *
   */
  payload?: string;
  /**
   *
   */
  modalities?: Record<string, any>;
  /**
   * Any context the bot knows about the current conversation.
   */
  context?: Context;
}

/**
 *
 */
export interface BotResponseMetadata {
  /**
   *
   */
  intentId?: string;
  /**
   *
   */
  escalation?: boolean;
  /**
   *
   */
  frustration?: boolean;
  /**
   *
   */
  incomprehension?: boolean;
  /**
   *
   */
  hasPendingDataRequest?: boolean;
}

/**
 *
 */
export interface BotMessage {
  /**
   *
   */
  messageId?: string;
  /**
   *
   */
  nodeId?: string;
  /**
   *
   */
  text: string;
  /**
   *
   */
  choices: Choice[];
  /**
   *
   */
  selectedChoiceId?: string;
}

/**
 *
 */
export interface Choice {
  /**
   *
   */
  choiceId: string;
  /**
   *
   */
  choiceText: string;
  /**
   *
   */
  choicePayload?: string;
}

// User message

/**
 *
 */
export interface UserResponse {
  /**
   * The type of the response is `"bot"` for bot and `"user"` for user.
   */
  type: "user";
  /**
   *
   */
  receivedAt: Time;
  /**
   *
   */
  payload: UserResponsePayload;
}

/**
 *
 */
export type UserResponsePayload =
  | {
      /**
       *
       */
      type: "text";
      /**
       *
       */
      text: string;
      /**
       *
       */
      context?: Context;
    }
  | {
      /**
       *
       */
      type: "choice";
      /**
       *
       */
      choiceId: string;
      /**
       *
       */
      context?: Context;
    }
  | ({
      /**
       *
       */
      type: "structured";
      /**
       *
       */
      context?: Context;
    } & StructuredRequest);

// Failure message

/**
 *
 */
export interface FailureMessage {
  /**
   *
   */
  type: "failure";
  /**
   *
   */
  payload: {
    /**
     *
     */
    text: string;
  };
  /**
   *
   */
  receivedAt: Time;
}

/**
 *
 */
export type Response = BotResponse | UserResponse | FailureMessage;

/**
 *
 */
export type Time = number;

// Config and state

/**
 *
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
   *
   */
  conversationId?: string;
  /**
   *
   */
  userId?: string;
  /**
   *
   */
  responses?: Response[];
  /**
   *
   */
  failureMessage?: string;
  /**
   *
   */
  environment?: Environment;
  /**
   *
   */
  headers: Record<string, string> & { "nlx-api-key": string };
  /**
   *
   */
  languageCode: string;
  // Experimental settings
  /**
   *
   */
  experimental?: {
    // Simulate alternative channel types
    /**
     *
     */
    channelType?: string;
    // Prevent the `languageCode` parameter to be appended to the bot URL - used in special deployment environments such as the sandbox chat inside Dialog Studio
    /**
     *
     */
    completeBotUrl?: boolean;
  };
}

const welcomeIntent = "NLX.Welcome";

const defaultFailureMessage = "We encountered an issue. Please try again soon.";

/**
 *
 */
export type State = Response[];

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
 *
 */
export interface StructuredRequest {
  /**
   *
   */
  choiceId?: string;
  /**
   *
   */
  intentId?: string;
  /**
   *
   */
  nodeId?: string;
  /**
   *
   */
  slots?: SlotsRecordOrArray;
  /**
   *
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
 *
 */
export interface ChoiceRequestMetadata {
  /**
   *
   */
  responseIndex?: number;
  /**
   *
   */
  messageIndex?: number;
  /**
   *
   */
  nodeId?: string;
}

interface InternalState {
  responses: Response[];
  conversationId: string;
  userId?: string;
}

const fromInternal = (internalState: InternalState): State =>
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
 *
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
  return !equals(
    omit(["failureMessage"], config1),
    omit(["failureMessage"], config2),
  );
};

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
        // TODO should this unsubscribe?
        reject(new Error("The request timed out."));
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
