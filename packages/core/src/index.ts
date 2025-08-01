import fetch from "isomorphic-fetch";
import { adjust, equals } from "ramda";
import ReconnectingWebSocket from "reconnecting-websocket";
import { v4 as uuid } from "uuid";
import packageJson from "../package.json";

/**
 * Package version
 */
export const version: string = packageJson.version;

// use a custom Console to indicate we really want to log to the console and it's not incidental. `console.log` causes an eslint error
const Console = console;

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
 * Response type
 */
export enum ResponseType {
  /**
   * Response from the application
   */
  Application = "bot",
  /**
   * Response from the user
   */
  User = "user",
  /**
   * Generic failure (cannot be attributed to the application)
   */
  Failure = "failure",
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
 * A message from the application
 *
 * See also:
 * - {@link UserResponse}
 * - {@link FailureMessage}
 * - {@link Response}
 */
export interface ApplicationResponse {
  /**
   * The application response type
   */
  type: ResponseType.Application;
  /**
   * When the response was received
   */
  receivedAt: Time;
  /**
   * The payload of the response
   */
  payload: ApplicationResponsePayload;
}

/**
 * The payload of the application response
 */
export interface ApplicationResponsePayload {
  /**
   * If there isn't some interaction by this time, the conversation will expire.
   */
  expirationTimestamp?: number;
  /**
   * The active conversation ID. If not set, a new conversation will be started.
   */
  conversationId?: string;
  /**
   * Any messages from the application.
   */
  messages: ApplicationMessage[];
  /**
   * Global state about the current conversation
   * as well as whether the client should poll for more application responses.
   */
  metadata?: ApplicationResponseMetadata;
  /**
   * If configured, the [node's payload.](See: https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/advanced-messaging-+-functionality#add-functionality)
   */
  payload?: string;
  /**
   * If configured, the node's modalities and their payloads.
   */
  modalities?: ModalityPayloads;
  /**
   * If the node is set to send context, the whole context associated with the conversation.
   */
  context?: Context;
}

/**
 * Payloads for modalities as a key-value pair by modality name
 */
export type ModalityPayloads = Record<string, any>;

/**
 * Global state about the current conversation
 * as well as whether the client should poll for more application responses.
 */
export interface ApplicationResponseMetadata {
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
   * Upload URL's
   */
  uploadUrls: UploadUrl[];
  /**
   * Whether the client should poll for more application responses.
   */
  hasPendingDataRequest?: boolean;
  /**
   * Knowledge base sources
   */
  sources?: KnowledgeBaseResponseSource[];
}

/**
 * Response for knowlege base sources
 */
export interface KnowledgeBaseResponseSource {
  /**
   * File name
   */
  fileName?: string;
  /**
   * Page number
   */
  pageNumber?: number;
  /**
   * Content
   */
  content?: string;
  /**
   * Metadata
   */
  metadata?: Record<string, unknown>;
  /**
   * Presigned URL for direct retrieval
   */
  presignedUrl?: string;
}

/**
 * Metadata for the individual application message
 * as well as whether the client should poll for more application responses.
 */
export interface ApplicationMessageMetadata {
  /**
   * The message node's intent
   */
  intentId?: string;
}

/**
 * A message from the application, as well as any choices the user can make.
 */
export interface ApplicationMessage {
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
   * Metadata
   */
  metadata?: ApplicationMessageMetadata;
  /**
   * After a choice has been made by the user, this will be updated locally to the selected choice id.
   * This field is set locally and does not come from the application.
   */
  selectedChoiceId?: string;
}

/**
 * The upload destination for handling conversing with files
 */
export interface UploadUrl {
  /**
   * The URL of the upload
   */
  url: string;
  /**
   * The ID of the upload
   */
  uploadId: string;
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
 * - {@link ApplicationResponse}
 * - {@link FailureMessage}
 * - {@link Response}
 *
 */
export interface UserResponse {
  /**
   * The user response type
   */
  type: ResponseType.User;
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
       * Correlates to a `choiceId` in the {@link ApplicationResponse}'s `.payload.messages[].choices[].choiceId` fields
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
   * The failure response type
   */
  type: ResponseType.Failure;
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
 * A response from the application or the user.
 */
export type Response = ApplicationResponse | UserResponse | FailureMessage;

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
 * The configuration to create a conversation.
 */
export interface Config {
  /**
   * Fetch this from the application's Deployment page.
   */
  applicationUrl?: string;
  /**
   * Headers to forward to the NLX API.
   */
  headers: Record<string, string> & {
    /**
     * The `nlx-api-key` is required. Fetch this from the application's Deployment page.
     */
    "nlx-api-key": string;
  };

  /**
   * Set `conversationId` to continue an existing conversation. If not set, a new conversation will be started.
   */
  conversationId?: string;
  /**
   * Setting the `userID` allows it to be searchable in application history, as well as usable via `{System.userId}` in the intent.
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
   * The language code to use for the application. In the browser this can be fetched with `navigator.language`.
   * If you don't have translations, hard-code this to the language code you support.
   */
  languageCode: LanguageCode;
  /**
   * @hidden
   * this should only be used for NLX internal testing.
   */
  environment?: Environment;
  /**
   * Specifies whether the conversation is bidirectional
   */
  bidirectional?: boolean;
  /**
   * Experimental settings
   */
  experimental?: {
    /**
     * Simulate alternative channel types
     */
    channelType?: string;
    /**
     * Prevent the `languageCode` parameter to be appended to the application URL - used in special deployment environments such as the sandbox chat inside Dialog Studio
     */
    completeApplicationUrl?: boolean;
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

const normalizeStructuredRequest = (
  structured: StructuredRequest,
): NormalizedStructuredRequest => ({
  ...structured,
  intentId: structured.flowId ?? structured.intentId,
  slots:
    structured.slots != null
      ? normalizeSlots(structured.slots)
      : structured.slots,
});

/**
 * The body of `sendStructured`
 * Includes a combination of choice, slots, and intent in one request.
 */
export interface StructuredRequest {
  /**
   * The `choiceId` is in the {@link ApplicationResponse}'s `.payload.messages[].choices[].choiceId` fields
   */
  choiceId?: string;
  /**
   * Required if you want to change a choice that's already been sent.
   * The `nodeId` can be found in the corresponding {@link ApplicationMessage}.
   */
  nodeId?: string;
  /**
   * The intent to trigger. The `intentId` is the name under the application's _Intents_.
   * @deprecated use `flowId` instead.
   */
  intentId?: string;
  /**
   * The flow to trigger. The `flowId` is the name under the application's _Flows_.
   */
  flowId?: string;
  /**
   * The slots to populate
   */
  slots?: SlotsRecordOrArray;
  /**
   * Upload ID
   */
  uploadIds?: string[];
  /**
   * Upload utterance
   */
  utterance?: string;
  /**
   * @hidden
   * This is used internally to indicate that the client is polling the application for more data.
   */
  poll?: boolean;
}

/**
 * Normalized structured request with a single way to represent slots
 */
export type NormalizedStructuredRequest = StructuredRequest & {
  /**
   * Only array-form slots are allowed for the purposes of sending to the backend
   */
  slots?: SlotValue[];
};

/**
 * The request data actually sent to the application, slightly different from {@link UserResponsePayload}, which includes some UI-specific information
 */
export interface ApplicationRequest {
  /**
   * The current conversation ID
   */
  conversationId?: string;
  /**
   * The current user ID
   */
  userId?: string;
  /**
   * Request context, if applicable
   */
  context?: Context;
  /**
   * Main request
   */
  request: {
    /**
     * Unstructured request
     */
    unstructured?: {
      /**
       * Request body text
       */
      text: string;
    };
    /**
     * Structured request
     */
    structured?: StructuredRequest & {
      /**
       * Only array-form slots are allowed for the purposes of sending to the backend
       */
      slots?: SlotValue[];
    };
  };
}

/**
 * Credentials to connect to a Voice channel
 */
export interface VoiceCredentials {
  /**
   * Voice Connection URL
   */
  url: string;
  /**
   * Voice room name
   */
  roomName: string;
  /**
   * Voice token
   */
  token: string;
  /**
   * Voice participant name
   */
  participantName: string;
}

/**
 * Helps link the choice to the specific message in the conversation.
 */
export interface ChoiceRequestMetadata {
  /**
   * The index of the {@link Response} associated with this choice.
   * Setting this ensures that local state's `selectedChoiceId` on the corresponding {@link ApplicationResponse} is set.
   * It is not sent to the application.
   */
  responseIndex?: number;
  /**
   * The index of the {@link ApplicationMessage} associated with this choice.
   * Setting this ensures that local state's `selectedChoiceId` on the corresponding {@link ApplicationResponse} is set.
   * It is not sent to the application.
   */
  messageIndex?: number;
  /**
   * Required if you want to change a choice that's already been sent.
   * The `nodeId` can be found in the corresponding {@link ApplicationMessage}.
   */
  nodeId?: string;
  /**
   * Intent ID, used for sending to the NLU to allow it to double-check
   */
  intentId?: string;
}

/**
 * Language code named for clarity, may restrict it to a finite list
 */
export type LanguageCode = string;

/**
 * Instead of sending a request to the application, handle it in a custom fashion
 * @param applicationRequest - The {@link ApplicationRequest} that is being overridden
 * @param appendResponse - A method to append the {@link ApplicationResponsePayload} to the message history
 */
export type RequestOverride = (
  applicationRequest: ApplicationRequest,
  appendResponse: (res: ApplicationResponsePayload) => void,
) => void;

/**
 * Voice+ context, type to be defined
 */
export type VoicePlusContext = any;

/**
 * Messages sent to the Voice+ socket
 */
export interface VoicePlusMessage {
  /**
   * Voice+ context
   */
  context: VoicePlusContext;
}

/**
 * Handler events
 */
export type ConversationHandlerEvent = "voicePlusCommand";

/**
 * Dictionary of handler methods per event
 */
export interface EventHandlers {
  /**
   * Voice+ command event handler
   */
  voicePlusCommand: (payload: any) => void;
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
   * Send [slots](https://docs.studio.nlx.ai/workspacesettings/introduction-to-settings) to the application.
   * @param slots - The slots to populate
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   */
  sendSlots: (slots: SlotsRecordOrArray, context?: Context) => void;
  /**
   * Respond to [a choice](https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/nodes#user-choice) from the application.
   * @param choidId - The `choiceId` is in the {@link ApplicationResponse}'s `.payload.messages[].choices[].choiceId` fields
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   * @param metadata - links the choice to the specific message and node in the conversation.
   */
  sendChoice: (
    choiceId: string,
    context?: Context,
    metadata?: ChoiceRequestMetadata,
  ) => void;

  /**
   * Trigger the welcome flow. This should be done when the user starts interacting with the chat.
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   */
  sendWelcomeFlow: (context?: Context) => void;

  /**
   * Trigger the welcome [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents). This should be done when the user starts interacting with the chat.
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   * @deprecated use `sendWelcomeFlow` instead
   */
  sendWelcomeIntent: (context?: Context) => void;

  /**
   * Trigger a specific flow.
   * @param flowId - the flow to trigger. The id is the name under the application's _Intents_.
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   */
  sendFlow: (flowId: string, context?: Context) => void;

  /**
   * Trigger a specific [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents).
   * @param intentId - the intent to trigger. The id is the name under the application's _Intents_.
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   * @deprecated use `sendFlow` instead
   */
  sendIntent: (intentId: string, context?: Context) => void;

  /**
   * Send context without sending a message
   * @param context - [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.
   */
  sendContext: (context: Context) => Promise<void>;

  /**
   * Obtain Voice credentials to run the experience in voice.
   * @internal
   * @returns Voice credentials in promise form
   */
  getVoiceCredentials: (context?: Context) => Promise<VoiceCredentials>;

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
   * Get the current language code
   */
  currentLanguageCode: () => LanguageCode;
  /**
   * Set the language code
   */
  setLanguageCode: (languageCode: LanguageCode) => void;
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

  /**
   * Optional {@link RequestOverride} function used to bypass the application request and handle them in a custom fashion
   */
  setRequestOverride: (override: RequestOverride | undefined) => void;
  /**
   * Add a listener to one of the handler's custom events
   */
  addEventListener: (
    event: ConversationHandlerEvent,
    handler: EventHandlers[ConversationHandlerEvent],
  ) => void;
  /**
   * Remove a listener to one of the handler's custom events
   */
  removeEventListener: (
    event: ConversationHandlerEvent,
    handler: EventHandlers[ConversationHandlerEvent],
  ) => void;
  /**
   * Send voicePlus message
   */
  sendVoicePlusContext: (context: VoicePlusContext) => void;
}

interface InternalState {
  responses: Response[];
  languageCode: string;
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

const getBaseDomain = (url: string): string =>
  url.match(
    /(bots\.dev\.studio\.nlx\.ai|bots\.studio\.nlx\.ai|apps\.nlx\.ai|dev\.apps\.nlx\.ai)/g,
  )?.[0] ?? "apps.nlx.ai";

/**
 * When a HTTP URL is provided, deduce the websocket URL. Otherwise, return the argument.
 * @param applicationUrl - the websocket URL
 * @returns httpUrl - the HTTP URL
 */
const normalizeToWebsocket = (applicationUrl: string): string => {
  if (isWebsocketUrl(applicationUrl)) {
    return applicationUrl;
  }
  const base = getBaseDomain(applicationUrl);
  const url = new URL(applicationUrl);
  const pathChunks = url.pathname.split("/");
  const deploymentKey = pathChunks[2];
  const channelKey = pathChunks[3];
  return `wss://us-east-1-ws.${base}?deploymentKey=${deploymentKey}&channelKey=${channelKey}`;
};

/**
 * When a websocket URL is provided, deduce the HTTP URL. Otherwise, return the argument.
 * @param applicationUrl - the websocket URL
 * @returns httpUrl - the HTTP URL
 */
const normalizeToHttp = (applicationUrl: string): string => {
  if (!isWebsocketUrl(applicationUrl)) {
    return applicationUrl;
  }
  const base = getBaseDomain(applicationUrl);
  const url = new URL(applicationUrl);
  const params = new URLSearchParams(url.search);
  const channelKey = params.get("channelKey");
  const deploymentKey = params.get("deploymentKey");
  return `https://${base}/c/${deploymentKey}/${channelKey}`;
};

const isWebsocketUrl = (url: string): boolean => {
  return url.indexOf("wss://") === 0;
};

/**
 * Check whether a configuration is value.
 * @param config - Chat configuration
 * @returns isValid - Whether the configuration is valid
 */
export const isConfigValid = (config: Config): boolean => {
  const applicationUrl = config.applicationUrl ?? "";
  return applicationUrl.length > 0;
};

type Timer = ReturnType<typeof setInterval>;

/**
 * Call this to create a conversation handler.
 * @param config -
 * @returns The {@link ConversationHandler} is a bundle of functions to interact with the conversation.
 */
export function createConversation(config: Config): ConversationHandler {
  let socket: ReconnectingWebSocket | undefined;
  let socketMessageQueue: ApplicationRequest[] = [];
  let socketMessageQueueCheckInterval: Timer | null = null;

  let voicePlusSocket: ReconnectingWebSocket | undefined;
  let voicePlusSocketMessageQueue: VoicePlusMessage[] = [];
  let voicePlusSocketMessageQueueCheckInterval: Timer | null = null;

  const applicationUrl = config.applicationUrl ?? "";

  // Check if the application URL has a language code appended to it
  if (/[-|_][a-z]{2,}[-|_][A-Z]{2,}$/.test(applicationUrl)) {
    Console.warn(
      "Since v1.0.0, the language code is no longer added at the end of the application URL. Please remove the modifier (e.g. '-en-US') from the URL, and specify it in the `languageCode` parameter instead.",
    );
  }

  const eventListeners: Record<
    ConversationHandlerEvent,
    Array<EventHandlers[ConversationHandlerEvent]>
  > = { voicePlusCommand: [] };

  const initialConversationId = config.conversationId ?? uuid();

  let state: InternalState = {
    responses: config.responses ?? [],
    languageCode: config.languageCode,
    userId: config.userId,
    conversationId: initialConversationId,
  };

  const fullApplicationHttpUrl = (): string =>
    `${normalizeToHttp(applicationUrl)}${
      config.experimental?.completeApplicationUrl === true
        ? ""
        : `-${state.languageCode}`
    }`;

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
      type: ResponseType.Failure,
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
        type: ResponseType.Application,
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
          void sendToApplication({
            request: {
              structured: {
                poll: true,
              },
            },
          });
        }, 1500);
      }
    } else {
      Console.warn(
        "Invalid message structure, expected object with field 'messages'.",
      );
      failureHandler();
    }
  };

  let requestOverride: RequestOverride | undefined;

  const sendVoicePlusMessage = (message: any): void => {
    if (voicePlusSocket?.readyState === 1) {
      voicePlusSocket.send(JSON.stringify(message));
    } else {
      voicePlusSocketMessageQueue = [...voicePlusSocketMessageQueue, message];
    }
  };

  const sendToApplication = async (
    body: ApplicationRequest,
  ): Promise<unknown> => {
    if (requestOverride != null) {
      requestOverride(body, (payload) => {
        const newResponse: Response = {
          type: ResponseType.Application,
          receivedAt: new Date().getTime(),
          payload,
        };
        setState(
          {
            responses: [...state.responses, newResponse],
          },
          newResponse,
        );
      });
      return;
    }
    const bodyWithContext = {
      userId: state.userId,
      conversationId: state.conversationId,
      ...body,
      languageCode: state.languageCode,
      channelType: config.experimental?.channelType,
      environment: config.environment,
    };
    if (isWebsocketUrl(applicationUrl)) {
      if (socket?.readyState === 1) {
        socket.send(JSON.stringify(bodyWithContext));
      } else {
        socketMessageQueue = [...socketMessageQueue, bodyWithContext];
      }
    } else {
      try {
        const res = await fetch(fullApplicationHttpUrl(), {
          method: "POST",
          headers: {
            ...(config.headers ?? {}),
            Accept: "application/json",
            "Content-Type": "application/json",
            "nlx-sdk-version": packageJson.version,
          },
          body: JSON.stringify(bodyWithContext),
        });
        if (res.status >= 400) {
          throw new Error(`Responded with ${res.status}`);
        }
        const json = await res.json();
        messageResponseHandler(json);
      } catch (err) {
        Console.warn(err);
        failureHandler();
      }
    }
  };

  let subscribers: Subscriber[] = [];

  const checkSocketQueue = async (): Promise<void> => {
    if (socket?.readyState === 1 && socketMessageQueue[0] != null) {
      await sendToApplication(socketMessageQueue[0]);
      socketMessageQueue = socketMessageQueue.slice(1);
    }
  };

  const checkVoicePlusSocketQueue = (): void => {
    if (
      voicePlusSocket?.readyState === 1 &&
      voicePlusSocketMessageQueue[0] != null
    ) {
      sendVoicePlusMessage(voicePlusSocketMessageQueue[0]);
      voicePlusSocketMessageQueue = voicePlusSocketMessageQueue.slice(1);
    }
  };

  const setupWebsocket = (): void => {
    // If the socket is already set up, tear it down first
    teardownWebsocket();
    const url = new URL(applicationUrl);
    if (config.experimental?.completeApplicationUrl !== true) {
      url.searchParams.set("languageCode", state.languageCode);
      url.searchParams.set(
        "channelKey",
        `${url.searchParams.get("channelKey") ?? ""}-${state.languageCode}`,
      );
    }
    url.searchParams.set("conversationId", state.conversationId);
    socket = new ReconnectingWebSocket(url.href);
    socketMessageQueueCheckInterval = setInterval(() => {
      void checkSocketQueue();
    }, 500);
    socket.onmessage = function (e) {
      if (typeof e?.data === "string") {
        messageResponseHandler(safeJsonParse(e.data));
      }
    };
    url.searchParams.set("voice-plus", "true");
    voicePlusSocket = new ReconnectingWebSocket(url.href);
    voicePlusSocketMessageQueueCheckInterval = setInterval(() => {
      checkVoicePlusSocketQueue();
    }, 500);
    voicePlusSocket.onmessage = (e) => {
      if (typeof e?.data === "string") {
        const command = safeJsonParse(e.data);
        if (command != null) {
          eventListeners.voicePlusCommand.forEach((listener) => {
            listener(command);
          });
        }
      }
    };
  };

  const setupCommandWebsocket = (): void => {
    // If the socket is already set up, tear it down first
    teardownCommandWebsocket();
    if (config.bidirectional !== true) {
      return;
    }
    const url = new URL(normalizeToWebsocket(applicationUrl));
    if (config.experimental?.completeApplicationUrl !== true) {
      url.searchParams.set("languageCode", state.languageCode);
      url.searchParams.set(
        "channelKey",
        `${url.searchParams.get("channelKey") ?? ""}-${state.languageCode}`,
      );
    }
    url.searchParams.set("conversationId", state.conversationId);
    url.searchParams.set("type", "voice-plus");
    const apiKey = config.headers["nlx-api-key"];
    if (!isWebsocketUrl(applicationUrl) && apiKey != null) {
      url.searchParams.set("apiKey", apiKey);
    }
    voicePlusSocket = new ReconnectingWebSocket(url.href);
    voicePlusSocketMessageQueueCheckInterval = setInterval(() => {
      checkVoicePlusSocketQueue();
    }, 500);
    voicePlusSocket.onmessage = (e) => {
      if (typeof e?.data === "string") {
        const command = safeJsonParse(e.data);
        if (command != null) {
          eventListeners.voicePlusCommand.forEach((listener) => {
            listener(command);
          });
        }
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

  const teardownCommandWebsocket = (): void => {
    if (voicePlusSocketMessageQueueCheckInterval != null) {
      clearInterval(voicePlusSocketMessageQueueCheckInterval);
    }
    if (voicePlusSocket != null) {
      voicePlusSocket.onmessage = null;
      voicePlusSocket.close();
      voicePlusSocket = undefined;
    }
  };

  if (isWebsocketUrl(applicationUrl)) {
    setupWebsocket();
  }

  setupCommandWebsocket();

  const appendStructuredUserResponse = (
    structured: StructuredRequest,
    context?: Context,
  ): void => {
    const newResponse: Response = {
      type: ResponseType.User,
      receivedAt: new Date().getTime(),
      payload: {
        type: "structured",
        ...normalizeStructuredRequest(structured),
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

  const sendFlow = (intentId: string, context?: Context): void => {
    appendStructuredUserResponse({ intentId }, context);
    void sendToApplication({
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
      type: ResponseType.User,
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
    void sendToApplication({
      context,
      request: {
        unstructured: {
          text,
        },
      },
    });
  };

  const sendChoice = (
    choiceId: string,
    context?: Context,
    metadata?: ChoiceRequestMetadata,
  ): void => {
    let newResponses: Response[] = [...state.responses];

    const choiceResponse: Response = {
      type: ResponseType.User,
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
          response.type === ResponseType.Application
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

    void sendToApplication({
      context,
      request: {
        structured: {
          nodeId: metadata?.nodeId,
          intentId: metadata?.intentId,
          choiceId,
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
    sendContext: async (context: Context) => {
      const res = await fetch(`${fullApplicationHttpUrl()}/context`, {
        method: "POST",
        headers: {
          ...(config.headers ?? {}),
          Accept: "application/json",
          "Content-Type": "application/json",
          "nlx-conversation-id": state.conversationId,
          "nlx-sdk-version": packageJson.version,
        },
        body: JSON.stringify({
          languageCode: state.languageCode,
          conversationId: state.conversationId,
          userId: state.userId,
          context,
        }),
      });
      if (res.status >= 400) {
        throw new Error(`Responded with ${res.status}`);
      }
    },
    sendStructured: (structured: StructuredRequest, context) => {
      appendStructuredUserResponse(structured, context);
      void sendToApplication({
        context,
        request: {
          structured: normalizeStructuredRequest(structured),
        },
      });
    },
    sendSlots: (slots, context) => {
      appendStructuredUserResponse({ slots }, context);
      void sendToApplication({
        context,
        request: {
          structured: {
            slots: normalizeSlots(slots),
          },
        },
      });
    },
    sendFlow,
    sendIntent: (intentId, context) => {
      Console.warn(
        "Calling `sendIntent` is deprecated and will be removed in a future version of the SDK. Use `sendFlow` instead.",
      );
      sendFlow(intentId, context);
    },
    sendWelcomeFlow: (context) => {
      sendFlow(welcomeIntent, context);
    },
    sendWelcomeIntent: (context) => {
      Console.warn(
        "Calling `sendWelcomeIntent` is deprecated and will be removed in a future version of the SDK. Use `sendWelcomeFlow` instead.",
      );
      sendFlow(welcomeIntent, context);
    },
    sendChoice,
    currentConversationId: () => {
      return state.conversationId;
    },
    setLanguageCode: (languageCode: string) => {
      if (languageCode === state.languageCode) {
        Console.warn(
          "Attempted to set language code to the one already active.",
        );
        return;
      }
      if (isWebsocketUrl(applicationUrl)) {
        setupWebsocket();
      }
      setupCommandWebsocket();
      setState({ languageCode });
    },
    currentLanguageCode: () => {
      return state.languageCode;
    },
    getVoiceCredentials: async (context?: Context) => {
      const url = normalizeToHttp(applicationUrl);
      const res = await fetch(`${url}-${state.languageCode}/requestToken`, {
        method: "POST",
        headers: {
          ...(config.headers ?? {}),
          Accept: "application/json",
          "Content-Type": "application/json",
          "nlx-conversation-id": state.conversationId,
          "nlx-sdk-version": packageJson.version,
        },
        body: JSON.stringify({
          languageCode: state.languageCode,
          conversationId: state.conversationId,
          userId: state.userId,
          requestToken: true,
          context,
        }),
      });
      if (res.status >= 400) {
        throw new Error(`Responded with ${res.status}`);
      }
      const data = await res.json();
      if (data?.url == null) {
        throw new Error("Invalid response");
      }
      return data;
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
      if (isWebsocketUrl(applicationUrl)) {
        setupWebsocket();
      }
      setupCommandWebsocket();
    },
    destroy: () => {
      subscribers = [];
      if (isWebsocketUrl(applicationUrl)) {
        teardownWebsocket();
      }
      teardownCommandWebsocket();
    },
    setRequestOverride: (val: RequestOverride | undefined) => {
      requestOverride = val;
    },
    addEventListener: (event, listener) => {
      eventListeners[event] = [...eventListeners[event], listener];
    },
    removeEventListener: (event, listener) => {
      eventListeners[event] = eventListeners[event].filter(
        (l) => l !== listener,
      );
    },
    sendVoicePlusContext: (context) => {
      sendVoicePlusMessage({ context });
    },
  };
}

/**
 * Get current expiration timestamp from the current list of reponses
 * @param responses - the current list of user and application responses (first argument in the subscribe callback)
 * @returns an expiration timestamp in Unix Epoch (`new Date().getTime()`), or `null` if this is not known (typically occurs if the application has not responded yet)
 */
export const getCurrentExpirationTimestamp = (
  responses: Response[],
): number | null => {
  let expirationTimestamp: number | null = null;
  responses.forEach((response) => {
    if (
      response.type === ResponseType.Application &&
      response.payload.expirationTimestamp != null
    ) {
      expirationTimestamp = response.payload.expirationTimestamp;
    }
  });
  return expirationTimestamp;
};

/**
 * This package is intentionally designed with a subscription-based API as opposed to a promise-based one where each message corresponds to a single application response, available asynchronously.
 *
 * If you need a promise-based wrapper, you can use the `promisify` helper available in the package:
 * @example
 * ```typescript
 * import { createConversation, promisify } from "@nlxai/core";
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
 * @returns A promise-wrapped version of the function. The function, when called, returns a promise that resolves to the Conversation's next response.
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
        if (
          newResponse?.type === ResponseType.Application ||
          newResponse?.type === ResponseType.Failure
        ) {
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
