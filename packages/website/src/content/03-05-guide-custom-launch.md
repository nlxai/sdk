- [Customizing Conversation Initialization](#customizing-conversation-initialization)
  - [Initialization Function](#initialization-function)
- [Example sending user information on Touchpoint Launch](#example-sending-user-information-on-touchpoint-launch)
- [Example launching Touchpoint with a custom intent](#example-launching-touchpoint-with-a-custom-intent)
- [Example passing API Key on Touchpoint Launch](#example-passing-api-key-on-touchpoint-launch)

The launch behavior of the Touchpoint-UI widget can be customized with both custom visual elements and custom initialization logic.

## Customizing Conversation Initialization

By default, Touchpoint starts a conversation by sending a welcome intent when the widget is launched. You can provide a function to the `initializeConversation` option to customize this behavior:

- Send a different intent than the default welcome intent
- Include custom context data with the welcome intent
- Perform additional operations before starting the conversation
- Add custom logging or tracking at initialization time

### Initialization Function

The provided function will be passed the [ConversationHandler](/headless-api-reference#interface-conversationhandler)

```typescript
type InitializeConversation = (handler: ConversationHandler) => void;
```

Where `ConversationHandler` provides the following methods:

| Method                         | Description                                                                                                            |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `sendWelcomeIntent(context?)`  | Sends the welcome intent with optional context. Context Variables must be defined within NLX to be used in your flows. |
| `sendIntent(intent, context?)` | Sends a specific intent with optional context. The specific intent must be defined as a flow in your NLX application   |

## Example sending user information on Touchpoint Launch

The context passed (`userId` and `userTier`) need to be defined as Context Variables within your Workspace to be used within the flow.

```javascript
import { create, type InitializeConversation } from "@nlxai/touchpoint-ui";

const initializeWithUserContext: InitializeConversation = (handler) => {
  // Include user information in the context
  handler.sendWelcomeIntent({
    userId: "user123",
    userTier: "premium"
  });
};

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },
  initializeConversation: initializeWithUserContext,
});
```

## Example launching Touchpoint with a custom intent

The specific intent (CheckOrderStatus) must be defined as a flow within your NLX application.

```javascript
import { create, type InitializeConversation } from "@nlxai/touchpoint-ui";

const initializeWithCustomIntent: InitializeConversation = (handler) => {
  // Send a specific intent instead of the welcome intent
  handler.sendIntent("CheckOrderStatus", {
    source: "website",
    pageUrl: window.location.href
  });
};

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },
  initializeConversation: initializeWithCustomIntent,
});
```

## Example passing API Key on Touchpoint Launch

The context passed (`UserApiKey`) needs to be defined as Context Variables within your Workspace to be used within the flow.

```javascript
import { create, type InitializeConversation } from "@nlxai/touchpoint-ui";

// Assume userCredential holds the API key needed for the conversation
const userCredential = "USER_SPECIFIC_API_KEY";

const initializeWithAPIKey: InitializeConversation = (handler) => {
  console.log("Initializing conversation with custom API key context");
  // Send the welcome intent, but include the API key in the context
  handler.sendWelcomeIntent({ UserApiKey: userCredential });
};

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_GENERAL_API_KEY", // General key for initial connection
    },
    languageCode: "en-US",
  },
  initializeConversation: initializeWithAPIKey,
});
```
