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

/**
 * Configuration for the Amazon Connect Chat adapter.
 *
 * No AWS access keys or secret keys are required client-side. Authentication
 * is handled via the participant token returned by the StartChatContact API.
 *
 * There are two ways to obtain chat details:
 *
 * 1. **Use `startChatEndpoint`** (recommended) — provide the URL of your API Gateway
 *    endpoint (deployed via the AWS-provided CloudFormation template). The adapter
 *    calls it automatically to start the chat.
 *
 * 2. **Use `chatDetails` directly** — if you've already called StartChatContact
 *    yourself, pass the response directly.
 */
export interface ConnectChatConfig {
  /**
   * URL of the API Gateway endpoint that calls StartChatContact.
   * This is the endpoint created by the AWS CloudFormation template for Connect Chat.
   * When provided, the adapter automatically initiates the chat — no manual
   * StartChatContact call is needed.
   *
   * Mutually exclusive with `chatDetails`.
   */
  startChatEndpoint?: string;
  /**
   * Parameters to pass when calling the `startChatEndpoint`.
   */
  startChatParams?: {
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
  };
  /**
   * Pre-obtained chat details from a prior StartChatContact call.
   * Mutually exclusive with `startChatEndpoint`.
   */
  chatDetails?: {
    /** The contact ID */
    contactId: string;
    /** The participant ID */
    participantId: string;
    /** The participant token used for authentication */
    participantToken: string;
  };
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

interface ResolvedChatDetails {
  contactId: string;
  participantId: string;
  participantToken: string;
}

/**
 * Creates a ConversationHandler backed by Amazon Connect Chat via amazon-connect-chatjs.
 *
 * This adapter conforms to the same interface used by \@nlxai/core's `createConversation`,
 * so it can be passed directly to Touchpoint UI via the `conversationHandler` prop.
 *
 * Prerequisites:
 * - `amazon-connect-chatjs` must be loaded before calling this function
 *   (via `import "amazon-connect-chatjs"` or a `<script>` tag).
 * - Either provide a `startChatEndpoint` (URL of the API Gateway from the AWS
 *   CloudFormation template) or pre-obtained `chatDetails`.
 *
 * @example
 * ```typescript
 * import "amazon-connect-chatjs";
 * import { createConnectChatConversation } from "@nlxai/connect-chat-adapter";
 * import { create } from "@nlxai/touchpoint-ui";
 *
 * // Option 1: Let the adapter call StartChatContact via your API Gateway
 * const touchpoint = await create({
 *   conversationHandler: createConnectChatConversation({
 *     startChatEndpoint: "https://abc123.execute-api.us-east-1.amazonaws.com/Prod",
 *     startChatParams: {
 *       instanceId: "your-connect-instance-id",
 *       contactFlowId: "your-contact-flow-id",
 *       participantDisplayName: "Customer",
 *     },
 *     region: "us-east-1",
 *   }),
 *   theme: { accent: "#0972d3" },
 * });
 *
 * // Option 2: Pass pre-obtained chatDetails
 * const touchpoint = await create({
 *   conversationHandler: createConnectChatConversation({
 *     chatDetails: {
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
export function createConnectChatConversation(
  config: ConnectChatConfig,
): ConversationHandler {
  let subscribers: Subscriber[] = [];
  let responses: Response[] = [];
  let languageCode: LanguageCode = config.languageCode ?? "en-US";
  let requestOverride: RequestOverride | undefined;
  let chatSession: any;
  let connected = false;

  const eventListeners: Record<
    ConversationHandlerEvent,
    Array<(...args: any[]) => void>
  > = {
    interimMessage: [],
    voicePlusCommand: [],
  };

  const notify = (newResponse?: Response): void => {
    subscribers.forEach((subscriber) => {
      subscriber([...responses], newResponse);
    });
  };

  const appendResponse = (response: Response): void => {
    if (response.type === ResponseType.Application) {
      eventListeners.interimMessage.forEach((listener) =>
        (listener as any)(undefined),
      );
    }
    responses = [...responses, response];
    notify(response);
  };

  const getConnectGlobal = (): any => {
    const g =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof window !== "undefined"
          ? window
          : undefined;
    const connectObj = (g as any)?.connect;
    if (connectObj?.ChatSession == null) {
      throw new Error(
        "@nlxai/connect-chat-adapter: amazon-connect-chatjs must be loaded before creating a Connect Chat conversation. " +
          "Import it via `import 'amazon-connect-chatjs'` or include the script tag.",
      );
    }
    return connectObj;
  };

  const fetchChatDetails = async (): Promise<ResolvedChatDetails> => {
    if (config.chatDetails != null) {
      return config.chatDetails;
    }
    if (config.startChatEndpoint == null) {
      throw new Error(
        "@nlxai/connect-chat-adapter: Either 'chatDetails' or 'startChatEndpoint' must be provided.",
      );
    }

    const body: Record<string, unknown> = {};
    if (config.startChatParams?.instanceId != null) {
      body.InstanceId = config.startChatParams.instanceId;
    }
    if (config.startChatParams?.contactFlowId != null) {
      body.ContactFlowId = config.startChatParams.contactFlowId;
    }
    if (config.startChatParams?.participantDisplayName != null) {
      body.ParticipantDetails = {
        DisplayName: config.startChatParams.participantDisplayName,
      };
    }
    if (config.startChatParams?.contactAttributes != null) {
      body.Attributes = config.startChatParams.contactAttributes;
    }

    body.SupportedMessagingContentTypes = config.startChatParams
      ?.supportedMessagingContentTypes ?? [
      "text/plain",
      "text/markdown",
      "application/json",
      "application/vnd.amazonaws.connect.message.interactive",
    ];

    const res = await fetch(config.startChatEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`StartChatContact endpoint returned ${res.status}`);
    }

    const data = await res.json();
    // The CloudFormation-deployed Lambda returns: { data: { startChatResult: { ContactId, ParticipantId, ParticipantToken } } }
    const startChatResult = data?.data?.startChatResult ?? data?.data ?? data;
    return {
      contactId: startChatResult.ContactId ?? startChatResult.contactId,
      participantId:
        startChatResult.ParticipantId ?? startChatResult.participantId,
      participantToken:
        startChatResult.ParticipantToken ?? startChatResult.participantToken,
    };
  };

  let resolvedContactId: string | undefined;

  const initSession = async (): Promise<void> => {
    const chatDetails = await fetchChatDetails();
    resolvedContactId = chatDetails.contactId;

    const connectGlobal = getConnectGlobal();

    connectGlobal.ChatSession.setGlobalConfig({
      region: config.region ?? "us-west-2",
      ...(config.globalConfig ?? {}),
    });

    chatSession = connectGlobal.ChatSession.create({
      chatDetails,
      type: connectGlobal.ChatSession.SessionTypes.CUSTOMER,
    });

    chatSession.onMessage((event: any) => {
      const data = event.data;
      if (data == null) return;

      const participantRole = data.ParticipantRole;
      if (participantRole === "CUSTOMER") return;

      const contentType: string = data.ContentType ?? "";

      if (contentType === "text/plain" || contentType === "text/markdown") {
        const text = data.Content ?? "";
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
        payload: { text: "Connection lost. Please try again." },
      });
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
      // No-op: Connect Chat does not have a slots concept
    },

    sendWelcomeFlow: (_context?: Context): void => {
      // Connect Chat triggers the contact flow automatically on connection
    },

    sendWelcomeIntent: (_context?: Context): void => {
      // Deprecated, no-op
    },

    sendFlow: (_flowId: string, _context?: Context): void => {
      // No-op: Connect Chat does not support arbitrary flow triggering from client
    },

    sendIntent: (_intentId: string, _context?: Context): void => {
      // Deprecated, no-op
    },

    sendContext: async (_context: Context): Promise<void> => {
      // No-op
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
      // No-op
    },

    getVoiceCredentials: async (): Promise<VoiceCredentials> => {
      throw new Error(
        "Voice credentials are not supported by the Connect Chat adapter.",
      );
    },

    submitFeedback: async (): Promise<void> => {
      // No-op
    },

    appendMessageToTranscript: (newResponse): void => {
      const responseWithTimestamp = {
        ...newResponse,
        receivedAt: (newResponse as any).receivedAt ?? Date.now(),
      };
      responses = [...responses, responseWithTimestamp as Response];
      notify(responseWithTimestamp as Response);
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
          chatSession.disconnectParticipant();
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
        chatSession.disconnectParticipant();
      }
    },

    setRequestOverride: (override: RequestOverride | undefined): void => {
      requestOverride = override;
    },

    addEventListener: (
      event: ConversationHandlerEvent,
      handler: EventHandlers[ConversationHandlerEvent],
    ): void => {
      eventListeners[event].push(handler as any);
    },

    removeEventListener: (
      event: ConversationHandlerEvent,
      handler: EventHandlers[ConversationHandlerEvent],
    ): void => {
      eventListeners[event] = eventListeners[event].filter(
        (h) => h !== handler,
      );
    },

    setInterimMessage: (message?: string): void => {
      eventListeners.interimMessage.forEach((listener) =>
        (listener as any)(message),
      );
    },
  };

  return handler;
}
