 
import {
  ResponseType,
  type Response,
  type ConversationHandler,
} from "@nlxai/core";

export const mockConversationHandler: ConversationHandler = {
  sendText: () => {},
  sendSlots: () => {},
  sendChoice: () => {},
  sendWelcomeFlow: () => {},
  sendWelcomeIntent: () => {},
  sendFlow: () => {},
  sendIntent: () => {},
  sendStructured: () => {},
  sendContext: async () => {
    await Promise.reject(new Error("Mock implementation"));
  },
  getVoiceCredentials: async () => {
    return await Promise.reject(new Error("Mock implementation"));
  },
  submitFeedback: async () => {
    await Promise.reject(new Error("Mock implementation"));
  },
  appendMessageToTranscript: () => {},
  subscribe: () => () => {},
  unsubscribe: () => {},
  unsubscribeAll: () => {},
  currentConversationId: () => undefined,
  setLanguageCode: () => {},
  reset: () => {},
  destroy: () => {},
  currentLanguageCode: () => "en-US",
  setRequestOverride: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  sendVoicePlusContext: () => {},
};

export const responses: Response[] = [
  {
    type: ResponseType.User,
    receivedAt: 1774542161833,
    payload: {
      type: "structured",
      intentId: "NLX.Welcome",
    },
  },
  {
    type: ResponseType.Application,
    receivedAt: 1774542162360,
    payload: {
      messages: [
        {
          nodeId: "93afd14e-a9d1-4e67-bb48-74edf01f0610",
          messageId:
            "c8f9aa4d00fb808d6d94ae68e4f78c69b14ba90554e4240a4186e7d34cad3301",
          text: "Hello",
          choices: [],
        },
        {
          nodeId: "93afd14e-a9d1-4e67-bb48-74edf01f0610",
          messageId:
            "93d54dc2fe5c3428e75be331bd190d5b7492ccf6707286d4f380a9aa190e0c88",
          text: "What's your name?",
          choices: [],
        },
      ],
      conversationId: "84746211-c932-4e96-a9a7-7c374bd7a218",
      expirationTimestamp: 1774542462283,
      modalities: {
        DefaultCarousel: {
          $saveAs: {
            type: "slot",
            id: "FirstName",
          },
          cards: [
            {
              thumbnail: null,
              id: "one",
              rows: [
                {
                  value: "value",
                  label: "key",
                },
              ],
              thumbnailAlt: null,
            },
            {
              thumbnail: null,
              id: "two",
              rows: [
                {
                  value: "value",
                  label: "key",
                },
              ],
              thumbnailAlt: null,
            },
          ],
        },
      },
      metadata: {
        hasPendingDataRequest: false,
        uploadUrls: [],
        intentId: "TestFlow",
        escalation: false,
        frustration: false,
        incomprehension: false,
      },
    },
  },
  {
    type: ResponseType.User,
    receivedAt: 1774542181426,
    payload: {
      type: "text",
      text: "My name is Paul",
    },
  },
  {
    type: ResponseType.Application,
    receivedAt: 1774542182586,
    payload: {
      messages: [
        {
          nodeId: "f89ef7e2-aefa-4f3b-9e22-4ff8dc36cf70",
          messageId:
            "280166ea2824e8d087daf3bde696b3d1396f8a51a4524c8c75ac48e957a36e27",
          text: "Hello, Paul",
          choices: [],
        },
      ],
      conversationId: "84746211-c932-4e96-a9a7-7c374bd7a218",
      expirationTimestamp: 1774542462309,
      modalities: {},
      metadata: {
        hasPendingDataRequest: false,
        uploadUrls: [],
        intentId: "TestFlow",
        escalation: false,
        frustration: false,
        incomprehension: false,
      },
    },
  },
];
