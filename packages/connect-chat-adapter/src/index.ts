import type {
  ConversationHandler,
  Response,
  Subscriber,
  Context,
  SlotsRecordOrArray,
  StructuredRequest,
  ChoiceRequestMetadata,
  RequestOverride,
  ConversationHandlerEvent,
  EventHandlers,
  VoicePlusContext,
  VoiceCredentials,
  LanguageCode,
} from "@nlxai/core";
import { ResponseType } from "@nlxai/core";
import "amazon-connect-chatjs";

/**
 * Configuration for the Amazon Connect Chat adapter.
 *
 * No AWS access keys or secret keys are required client-side. Authentication
 * is handled via the participant token returned by the StartChatContact API.
 *
 * Chat details are obtained via the `fetchChatDetails` call.
 */
export interface ConnectChatConfig {
  /** Pre-obtained chat details from a prior StartChatContact call. */
  details: ChatDetails | (() => Promise<ChatDetails>);
  /** AWS region (e.g., "us-east-1"). Defaults to "us-west-2". */
  region?: string;
  /** Language code for the conversation */
  languageCode?: LanguageCode;
  /**
   * Optional global config to pass to `connect.ChatSession.setGlobalConfig()`.
   * See the AmazonConnectChatJS documentation for available options.
   */
  globalConfig?: Record<string, unknown>;
}

/**
 * Chat details
 */
export interface ChatDetails {
  /** The contact ID */
  contactId: string;
  /** The participant ID */
  participantId: string;
  /** The participant token used for authentication */
  participantToken: string;
}

/**
 * Parameters to pass when calling the `startChatEndpoint`.
 */
export interface DetailsParams {
  /** Connect instance ID */
  instanceId?: string;
  /** Contact flow ID to use */
  contactFlowId?: string;
  /** Customer display name */
  participantDisplayName?: string;
  /** Contact attributes passed to the contact flow */
  contactAttributes?: Record<string, string>;
  /**
   * Content types the chat participant supports receiving.
   * Defaults to text/plain, text/markdown, application/json, and interactive messages.
   */
  supportedMessagingContentTypes?: string[];
}

/**
 * Fetch chat details via API Gateway endpoint
 */
export const fetchChatDetails = async (
  endpoint: string,
  params: DetailsParams,
): Promise<ChatDetails> => {
  const body: Record<string, unknown> = {
    InstanceId: params.instanceId,
    ContactFlowId: params.contactFlowId,
    ParticipantDetails: {
      DisplayName: params.participantDisplayName,
    },
    Attributes: params.contactAttributes,
    SupportedMessagingContentTypes: params.supportedMessagingContentTypes ?? [
      "text/plain",
      "text/markdown",
      "application/json",
      "application/vnd.amazonaws.connect.message.interactive",
    ],
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`StartChatContact endpoint returned ${res.status}`);
  }

  const data = await res.json();
  // The CloudFormation-deployed Lambda returns: { data: { startChatResult: { ContactId, ParticipantId, ParticipantToken } } }
  const startChatResult = data?.data?.startChatResult;
  return {
    contactId: startChatResult.ContactId ?? startChatResult.contactId,
    participantId:
      startChatResult.ParticipantId ?? startChatResult.participantId,
    participantToken:
      startChatResult.ParticipantToken ?? startChatResult.participantToken,
  };
};

const warnMethod = (methodName: string): void => {
  // eslint-disable-next-line no-console
  console.warn(
    `Message not sent: the '${methodName}' method is not supported by the Amazon Connect Chat Interface integration.`,
  );
};

type ConversationHandlerEventListeners = Record<
  ConversationHandlerEvent,
  Array<EventHandlers[ConversationHandlerEvent]>
>;

const copy = {
  thinking: "Thinking...",
  typing: "Typing...",
  connecting: "Connecting...",
  connectionLost: "Connection lost. Please try again.",
};

/**
 * Creates a ConversationHandler backed by Amazon Connect Chat via amazon-connect-chatjs.
 * @params config - configuration
 * This adapter conforms to the same interface used by \@nlxai/core's `createConversation`,
 * so it can be passed directly to Touchpoint UI via the `conversationHandler` prop.
 * @example
 * ```typescript
 * import { createConnectChatConversation } from "@nlxai/connect-chat-adapter";
 * import { create } from "@nlxai/touchpoint-ui";
 *
 * const touchpoint = await create({
 *   conversationHandler: createConnectChatConversation({
 *     details: {
 *       contactId: "abc-123",
 *       participantId: "def-456",
 *       participantToken: "token-xyz",
 *     },
 *     region: "us-east-1",
 *   }),
 *   theme: { accent: "#0972d3" },
 * });
 * ```
 */
export const createConnectChatConversation = (
  config: ConnectChatConfig,
): ConversationHandler => {
  const connect = (window as any).connect;

  let subscribers: Subscriber[] = [];
  let responses: Response[] = [];
  let languageCode: LanguageCode = config.languageCode ?? "en-US";
  let requestOverride: RequestOverride | undefined;
  let chatSession: Record<string, any> | null = null;
  let connected: boolean = false;
  let currentInterimMessage: string | undefined = undefined;
  // TODO: keep track of when the conversation is escalated, stop triggering a typing interim message if true
  let escalated: boolean = false;

  const eventListeners: ConversationHandlerEventListeners = {
    interimMessage: [],
    voicePlusCommand: [],
  };

  const setInterimMessage = (message?: string): void => {
    currentInterimMessage = message;
    eventListeners.interimMessage.forEach((listener) => listener(message));
  };

  const notify = (newResponse?: Response): void => {
    subscribers.forEach((subscriber) => {
      subscriber([...responses], newResponse);
    });
  };

  const appendResponse = (response: Response): void => {
    responses = [...responses, response];
    notify(response);
  };

  let resolvedContactId: string | undefined;

  const initSession = async (): Promise<void> => {
    setInterimMessage(copy.connecting);

    const details: ChatDetails = await (typeof config.details === "function"
      ? config.details()
      : Promise.resolve(config.details));

    setInterimMessage(copy.thinking);

    resolvedContactId = details.contactId;

    connect.ChatSession.setGlobalConfig({
      region: config.region ?? "us-west-2",
      ...(config.globalConfig ?? {}),
    });

    chatSession = connect.ChatSession.create({
      chatDetails: details,
      type: connect.ChatSession.SessionTypes.CUSTOMER,
    }) as Record<string, any>;

    chatSession.onMessage((event: any) => {
      const data = event.data;
      if (data == null) return;

      const participantRole = data.ParticipantRole;
      if (participantRole === "CUSTOMER") return;

      setInterimMessage(undefined);

      const contentType: string = data.ContentType ?? "";

      if (contentType === "text/plain" || contentType === "text/markdown") {
        const text: string = data.Content ?? "";
        if (text.startsWith("{") && text.includes('"modalities"')) {
          handleJsonMessage(text);
        } else {
          const newResponse: Response = {
            type: ResponseType.Application,
            receivedAt: Date.now(),
            payload: {
              conversationId: resolvedContactId,
              messages: [{ text, choices: [] }],
              metadata: { uploadUrls: [] },
            },
          };
          appendResponse(newResponse);
        }
      } else if (contentType === "application/json") {
        handleJsonMessage(data.Content);
      } else if (
        contentType === "application/vnd.amazonaws.connect.message.interactive"
      ) {
        handleInteractiveMessage(data.Content);
      }
    });

    chatSession.onConnectionEstablished(() => {
      connected = true;
    });

    chatSession.onConnectionBroken(() => {
      connected = false;
      appendResponse({
        type: ResponseType.Failure,
        receivedAt: Date.now(),
        payload: { text: copy.connectionLost },
      });
    });

    chatSession.onTyping?.(() => {
      setInterimMessage(copy.typing);
    });

    chatSession.onEnded(() => {
      connected = false;
    });

    await chatSession.connect();
  };

  const handleJsonMessage = (content: string | undefined): void => {
    if (content == null) return;
    try {
      const parsed = JSON.parse(content);

      const messages: Array<{
        text: string;
        choices: Array<{ choiceId: string; choiceText: string }>;
      }> = [];

      if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        for (const msg of parsed.messages) {
          const choices = Array.isArray(msg.choices)
            ? msg.choices.map((c: any, i: number) => ({
                choiceId: c.choiceId ?? c.id ?? `choice-${i}`,
                choiceText:
                  c.choiceText ?? c.text ?? c.label ?? `Option ${i + 1}`,
              }))
            : [];
          messages.push({ text: msg.text ?? "", choices });
        }
      } else if (typeof parsed.text === "string") {
        messages.push({ text: parsed.text, choices: [] });
      } else {
        messages.push({ text: "", choices: [] });
      }

      const modalities =
        parsed.modalities != null && typeof parsed.modalities === "object"
          ? parsed.modalities
          : undefined;

      const newResponse: Response = {
        type: ResponseType.Application,
        receivedAt: Date.now(),
        payload: {
          conversationId: resolvedContactId,
          messages,
          metadata: { uploadUrls: [] },
          ...(modalities != null ? { modalities } : {}),
        },
      };

      appendResponse(newResponse);
    } catch (_err) {
      appendResponse({
        type: ResponseType.Application,
        receivedAt: Date.now(),
        payload: {
          conversationId: resolvedContactId,
          messages: [{ text: content, choices: [] }],
          metadata: { uploadUrls: [] },
        },
      });
    }
  };

  const handleInteractiveMessage = (content: string | undefined): void => {
    if (content == null) return;
    try {
      const interactive = JSON.parse(content);
      const templateType = interactive.templateType;

      if (templateType === "QuickReply" || templateType === "ListPicker") {
        const title =
          interactive.data?.content?.title ??
          interactive.data?.content?.subtitle ??
          "";
        const elements =
          interactive.data?.content?.elements ??
          interactive.data?.content?.replies ??
          [];

        const choices = elements.map((el: any, index: number) => ({
          choiceId: el.title ?? `choice-${index}`,
          choiceText: el.title ?? `Option ${index + 1}`,
        }));

        const newResponse: Response = {
          type: ResponseType.Application,
          receivedAt: Date.now(),
          payload: {
            conversationId: resolvedContactId,
            messages: [{ text: title, choices }],
            metadata: { uploadUrls: [] },
          },
        };
        appendResponse(newResponse);
      } else {
        const text = interactive.data?.content?.title ?? content;
        appendResponse({
          type: ResponseType.Application,
          receivedAt: Date.now(),
          payload: {
            conversationId: resolvedContactId,
            messages: [{ text, choices: [] }],
            metadata: { uploadUrls: [] },
          },
        });
      }
    } catch (_err) {
      appendResponse({
        type: ResponseType.Application,
        receivedAt: Date.now(),
        payload: {
          conversationId: resolvedContactId,
          messages: [{ text: content, choices: [] }],
          metadata: { uploadUrls: [] },
        },
      });
    }
  };

  // Initialize — stores promise for queueing sends until connection is ready
  let connectionReady = initSession().catch((err) => {
    appendResponse({
      type: ResponseType.Failure,
      receivedAt: Date.now(),
      payload: {
        text: `Failed to connect: ${err instanceof Error ? err.message : "Unknown error"}`,
      },
    });
  });

  const sendText = (text: string, context?: Context): void => {
    if (requestOverride != null) {
      requestOverride(
        {
          conversationId: resolvedContactId,
          request: { unstructured: { text } },
          context,
        },
        () => {},
      );
      return;
    }

    setInterimMessage(escalated ? undefined : copy.thinking);

    const newResponse: Response = {
      type: ResponseType.User,
      receivedAt: Date.now(),
      payload: { type: "text", text, context },
    };
    appendResponse(newResponse);

    void connectionReady.then(() => {
      chatSession?.sendMessage({
        contentType: "text/plain",
        message: text,
      });
    });
  };

  const sendChoice = (
    choiceId: string,
    _context?: Context,
    _metadata?: ChoiceRequestMetadata,
  ): void => {
    const newResponse: Response = {
      type: ResponseType.User,
      receivedAt: Date.now(),
      payload: { type: "choice", choiceId },
    };
    appendResponse(newResponse);

    void connectionReady.then(() => {
      chatSession?.sendMessage({
        contentType: "text/plain",
        message: choiceId,
      });
    });
  };

  const subscribe = (subscriber: Subscriber): (() => void) => {
    subscribers = [...subscribers, subscriber];
    subscriber([...responses]);
    return () => {
      unsubscribe(subscriber);
    };
  };

  const unsubscribe = (subscriber: Subscriber): void => {
    subscribers = subscribers.filter((fn) => fn !== subscriber);
  };

  const handler: ConversationHandler = {
    sendText,
    sendChoice,

    sendSlots: (_slots: SlotsRecordOrArray, _context?: Context): void => {
      warnMethod("sendSlots");
    },

    sendWelcomeFlow: (_context?: Context): void => {
      warnMethod("sendWelcomeFlow");
    },

    sendWelcomeIntent: (_context?: Context): void => {
      warnMethod("sendWelcomeIntent");
    },

    sendFlow: (_flowId: string, _context?: Context): void => {
      warnMethod("sendFlow");
    },

    sendIntent: (_intentId: string, _context?: Context): void => {
      warnMethod("sendIntent");
    },

    sendContext: async (_context: Context): Promise<void> => {
      warnMethod("sendContext");
    },

    sendStructured: (
      structured: StructuredRequest,
      _context?: Context,
    ): void => {
      if (structured.utterance != null) {
        sendText(structured.utterance);
      }
    },

    sendVoicePlusContext: (_context: VoicePlusContext): void => {
      warnMethod("sendVoicePlusContext");
    },

    getVoiceCredentials: async (): Promise<VoiceCredentials> => {
      throw new Error(
        "Voice credentials are not supported by the Connect Chat adapter.",
      );
    },

    submitFeedback: async (): Promise<void> => {
      warnMethod("submitFeedback");
    },

    appendMessageToTranscript: (newResponse): void => {
      const responseWithTimestamp = {
        ...newResponse,
        receivedAt: (newResponse as any).receivedAt ?? Date.now(),
      };
      responses = [...responses, responseWithTimestamp];
      notify(responseWithTimestamp);
    },

    subscribe,
    unsubscribe,

    unsubscribeAll: (): void => {
      subscribers = [];
    },

    currentConversationId: (): string | undefined => resolvedContactId,

    currentLanguageCode: (): LanguageCode => languageCode,

    setLanguageCode: (code: LanguageCode): void => {
      languageCode = code;
    },

    reset: (options?: { clearResponses?: boolean }): void => {
      if (options?.clearResponses) {
        responses = [];
      }
      notify();
      // Disconnect old session and start a fresh Connect Chat session
      if (chatSession != null && connected) {
        try {
          (chatSession as any).disconnectParticipant();
        } catch (_e) {
          /* best effort */
        }
      }
      connected = false;
      chatSession = null;
      resolvedContactId = undefined;
      connectionReady = initSession().catch((err) => {
        appendResponse({
          type: ResponseType.Failure,
          receivedAt: Date.now(),
          payload: {
            text: `Failed to reconnect: ${err instanceof Error ? err.message : "Unknown error"}`,
          },
        });
      });
    },

    destroy: (): void => {
      subscribers = [];
      if (chatSession != null && connected) {
        (chatSession as any).disconnectParticipant();
      }
    },

    setRequestOverride: (override: RequestOverride | undefined): void => {
      requestOverride = override;
    },

    addEventListener: (
      event: ConversationHandlerEvent,
      handler: EventHandlers[ConversationHandlerEvent],
    ): void => {
      if (event === "interimMessage") {
        handler(currentInterimMessage);
      }
      eventListeners[event].push(handler);
    },

    removeEventListener: (
      event: ConversationHandlerEvent,
      handler: EventHandlers[ConversationHandlerEvent],
    ): void => {
      eventListeners[event] = eventListeners[event].filter(
        (h) => h !== handler,
      );
    },

    setInterimMessage,
  };

  return handler;
};
