// import fetch from "isomorphic-fetch";
import ReconnectingWebSocket from "reconnecting-websocket";
import { equals, findLastIndex, update } from "ramda";
import { v4 as uuid } from "uuid";

// Bot response

export type Context = Record<string, any>;

export type Slots = Record<string, any>;

// Legacy format
export interface SlotValue {
  slotId: string;
  value: any;
}

export interface BotResponse {
  type: "bot";
  receivedAt: Time;
  payload: BotResponsePayload;
}

export interface BotResponsePayload {
  expirationTimestamp?: number;
  conversationId?: string;
  messages: BotMessage[];
  metadata?: BotResponseMetadata;
  payload?: string;
  modalities?: Record<string, any>;
  context?: Context;
}

export interface BotResponseMetadata {
  intentId?: string;
  escalation?: boolean;
  frustration?: boolean;
  incomprehension?: boolean;
}

export interface BotMessage {
  messageId?: string;
  text: string;
  choices: Choice[];
  selectedChoiceId?: string;
}

export interface Choice {
  choiceId: string;
  choiceText: string;
  choicePayload?: string;
}

// User message

export interface UserResponse {
  type: "user";
  receivedAt: Time;
  payload: UserResponsePayload;
}

export type UserResponsePayload =
  | {
      type: "text";
      text: string;
      context?: Context;
    }
  | {
      type: "choice";
      choiceId: string;
      context?: Context;
    }
  | ({
      type: "structured";
      context?: Context;
    } & StructuredRequest);

// Failure message

export interface FailureMessage {
  type: "failure";
  payload: {
    text: string;
  };
  receivedAt: Time;
}

export type Response = BotResponse | UserResponse | FailureMessage;

export type Time = number;

// Config and state

export type Environment = "production" | "development";

export interface Config {
  botUrl: string;
  conversationId?: string;
  userId?: string;
  responses?: Response[];
  failureMessage?: string;
  environment?: Environment;
  headers?: {
    [key: string]: string;
  };
  languageCode: string;
  // Experimental settings
  experimental?: {
    // Simulate alternative channel types
    channelType?: string;
    // Prevent the `languageCode` parameter to be appended to the bot URL - used in special deployment environments such as the sandbox chat inside Dialog Studio
    completeBotUrl?: boolean;
  };
}

const welcomeIntent = "NLX.Welcome";

const defaultFailureMessage = "We encountered an issue. Please try again soon.";

export type State = Response[];

const normalizeSlots = (slotsWithLegacy: Slots | SlotValue[]): Slots => {
  let slots: Slots = {};
  if (Array.isArray(slotsWithLegacy)) {
    console.warn(
      `The legacy slot format is deprecated. Instead of '[{ slotId: "MySlot", value: "my-value" }]', use '{ MySlot: "my-value" }'`,
    );
    slotsWithLegacy.forEach((slot) => {
      slots[slot.slotId] = slot.value;
    });
  }
  return slots;
};

export interface StructuredRequest {
  choiceId?: string;
  intentId?: string;
  slots?: Slots | SlotValue[];
}

interface BotRequest {
  conversationId?: string;
  userId?: string;
  context?: Context;
  request: {
    unstructured?: {
      text: string;
    };
    structured?: StructuredRequest;
  };
}

export interface ConversationHandler {
  sendText: (text: string, context?: Context) => void;
  sendSlots: (slots: Slots | SlotValue[], context?: Context) => void;
  sendChoice: (choiceId: string, context?: Context) => void;
  sendWelcomeIntent: (context?: Context) => void;
  sendIntent: (intentId: string, context?: Context) => void;
  sendStructured: (request: StructuredRequest, context?: Context) => void;
  subscribe: (subscriber: Subscriber) => void;
  unsubscribe: (subscriber: Subscriber) => void;
  unsubscribeAll: () => void;
  currentConversationId: () => string | undefined;
  reset: (options?: { clearResponses?: boolean }) => void;
  destroy: () => void;
}

interface InternalState {
  responses: Response[];
  conversationId: string;
  userId?: string;
}

const fromInternal = (internalState: InternalState): State =>
  internalState.responses;

const safeJsonParse = (val: string) => {
  try {
    const json = JSON.parse(val);
    return json;
  } catch (_err) {
    return null;
  }
};

type Subscriber = (response: Array<Response>, newResponse?: Response) => void;

export const shouldReinitialize = (
  config1: Config,
  config2: Config,
): boolean => {
  return (
    !equals(config1.botUrl, config2.botUrl) ||
    !equals(config1.userId, config2.userId) ||
    !equals(config1.conversationId, config2.conversationId) ||
    !equals(config1.languageCode, config2.languageCode) ||
    !equals(
      config1.experimental?.channelType,
      config2.experimental?.channelType,
    ) ||
    !equals(
      config1.experimental?.completeBotUrl,
      config2.experimental?.completeBotUrl,
    ) ||
    !equals(config1.headers, config2.headers) ||
    !equals(config1.responses, config2.responses) ||
    !equals(config1.environment, config2.environment)
  );
};

export const createConversation = (config: Config): ConversationHandler => {
  let socket: ReconnectingWebSocket | undefined;

  // Check if the bot URL has a language code appended to it
  if (/[-|_][a-z]{2,}[-|_][A-Z]{2,}$/.test(config.botUrl)) {
    console.warn(
      "Since v1.0.0, the language code is no longer added at the end of the bot URL. Please remove the modifier (e.g. '-en-US') from the URL, and specify it in the `languageCode` parameter instead.",
    );
  }

  const initialConversationId = config.conversationId || uuid();

  let state: InternalState = {
    responses: config.responses || [],
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
    subscribers.forEach((subscriber) =>
      subscriber(fromInternal(state), newResponse),
    );
  };

  const failureHandler = () => {
    const newResponse: Response = {
      type: "failure",
      receivedAt: new Date().getTime(),
      payload: {
        text: config.failureMessage || defaultFailureMessage,
      },
    };
    setState(
      {
        responses: [...state.responses, newResponse],
      },
      newResponse,
    );
  };

  const messageResponseHandler = (response: any) => {
    if (response && response.messages) {
      const newResponse: Response = {
        type: "bot",
        receivedAt: new Date().getTime(),
        payload: {
          ...response,
          messages: response.messages.map((message: any) => ({
            messageId: message.messageId,
            text: message.text,
            choices: message.choices || [],
          })),
        },
      };
      setState(
        {
          responses: [...state.responses, newResponse],
        },
        newResponse,
      );
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

  const sendToBot = (body: BotRequest) => {
    const bodyWithContext = {
      userId: state.userId,
      conversationId: state.conversationId,
      ...body,
      languageCode: config.languageCode,
      channelType: config.experimental?.channelType,
      environment: config.environment,
    };
    if (isUsingWebSockets()) {
      if (socket && socket.readyState === 1) {
        socket.send(JSON.stringify(bodyWithContext));
      } else {
        socketMessageQueue = [...socketMessageQueue, bodyWithContext];
      }
    } else {
      return fetch(
        `${config.botUrl}${
          config.experimental?.completeBotUrl ? "" : `-${config.languageCode}`
        }`,
        {
          method: "POST",
          headers: {
            ...(config.headers || {}),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyWithContext),
        },
      )
        .then((res: any) => {
          // Temporary log
          console.log(res);
          return res.json();
        })
        .then(messageResponseHandler)
        .catch((err) => {
          console.warn(err);
          failureHandler();
        });
    }
  };

  const isUsingWebSockets = () => {
    return config.botUrl && config.botUrl.indexOf("wss://") === 0;
  };

  let subscribers: Subscriber[] = [];

  const checkQueue = () => {
    if (socket?.readyState === 1 && socketMessageQueue[0]) {
      sendToBot(socketMessageQueue[0]);
      socketMessageQueue = socketMessageQueue.slice(1);
    }
  };

  const setupWebsocket = () => {
    const url = new URL(config.botUrl);
    if (!config.experimental?.completeBotUrl) {
      url.searchParams.set("languageCode", config.languageCode);
      url.searchParams.set(
        "channelKey",
        `${url.searchParams.get("channelKey") || ""}-${config.languageCode}`,
      );
    }
    url.searchParams.set("conversationId", state.conversationId);
    socket = new ReconnectingWebSocket(url.href);
    socketMessageQueueCheckInterval = setInterval(checkQueue, 500);
    socket.onmessage = function (e) {
      if (typeof e?.data === "string") {
        messageResponseHandler(safeJsonParse(e.data));
      }
    };
  };

  const teardownWebsocket = () => {
    if (socketMessageQueueCheckInterval) {
      clearInterval(socketMessageQueueCheckInterval);
    }
    if (socket) {
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
  ) => {
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

  const sendIntent = (intentId: string, context?: Context) => {
    appendStructuredUserResponse({ intentId }, context);
    sendToBot({
      context,
      request: {
        structured: {
          intentId,
        },
      },
    });
  };

  const unsubscribe = (subscriber: Subscriber) => {
    subscribers = subscribers.filter((fn) => fn !== subscriber);
  };

  const subscribe = (subscriber: Subscriber) => {
    subscribers = [...subscribers, subscriber];
    subscriber(fromInternal(state));
    return () => {
      unsubscribe(subscriber);
    };
  };

  return {
    sendText: (text, context) => {
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
      sendToBot({
        context,
        request: {
          unstructured: {
            text,
          },
        },
      });
    },
    sendStructured: (structured: StructuredRequest, context) => {
      appendStructuredUserResponse(structured, context);
      sendToBot({
        context,
        request: {
          structured,
        },
      });
    },
    sendSlots: (slotsWithLegacy, context) => {
      const slots = normalizeSlots(slotsWithLegacy);
      appendStructuredUserResponse({ slots }, context);
      sendToBot({
        context,
        request: {
          structured: {
            slots,
          },
        },
      });
    },
    sendIntent,
    sendWelcomeIntent: (context) => {
      appendStructuredUserResponse({ intentId: welcomeIntent }, context);
      sendIntent(welcomeIntent, context);
    },
    sendChoice: (choiceId, context) => {
      const containsChoice = (botMessage: BotMessage) =>
        (botMessage.choices || [])
          .map((choice) => choice.choiceId)
          .indexOf(choiceId) > -1;

      const lastBotResponseIndex = findLastIndex(
        (response) =>
          response.type === "bot" &&
          Boolean(response.payload.messages.find(containsChoice)),
        state.responses,
      );

      let newResponses: Response[] = [...state.responses];

      const choiceResponse: Response = {
        type: "user",
        receivedAt: new Date().getTime(),
        payload: {
          type: "choice",
          choiceId,
        },
      };

      if (lastBotResponseIndex > -1) {
        const lastBotResponse = state.responses[
          lastBotResponseIndex
        ] as BotResponse;

        const updatedBotResponse = {
          ...lastBotResponse,
          payload: {
            ...lastBotResponse.payload,
            messages: lastBotResponse.payload.messages.map((botMessage) => ({
              ...botMessage,
              selectedChoiceId: containsChoice(botMessage)
                ? choiceId
                : botMessage.selectedChoiceId,
            })),
          },
        };

        newResponses = update(
          lastBotResponseIndex,
          updatedBotResponse,
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

      sendToBot({
        context,
        request: {
          structured: {
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
        responses: options?.clearResponses ? [] : state.responses,
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
};

export function promisify<T>(
  fn: (payload: T) => void,
  convo: ConversationHandler,
  timeout = 10000,
): (payload: T) => Promise<Response | null> {
  return (payload: T) => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject("The request timed out.");
      }, timeout);
      const subscription = (
        _responses: Response[],
        newResponse: Response | undefined,
      ) => {
        if (newResponse && newResponse.type === "bot") {
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

export default createConversation;
