- [Context Variables in NLX and Touchpoint](#context-variables-in-nlx-and-touchpoint)
- [Passing Initial Data with `initialContext`](#passing-initial-data-with-initialcontext)
- [Customizing Initialization Logic with `initializeConversation`](#customizing-initialization-logic-with-initializeconversation)
  - [Initialization Function Signature](#initialization-function-signature)
- [Examples](#examples)
  - [1. Sending User Information via `initialContext` (Recommended for Data Passing)](#1-sending-user-information-via-initialcontext-recommended-for-data-passing)
  - [2. Launching with a Custom Flow Using `initializeConversation`](#2-launching-with-a-custom-flow-using-initializeconversation)

## Context Variables in NLX and Touchpoint

Context Variables within NLX and Touchpoint allow you pass 'context' about the user's interaction and state from Touchpoint to NLX.

💡 In order to use the context variables from Touchpoint in your flow, you need to define each variable as a [Context Variable](https://docs.nlx.ai/platform/build/resources/context-variables) in your NLX workspace. If the context variable is not configured within NLX, the value will not be available in the Flow.

## Passing Initial Data with `initialContext`

The `initialContext` option in your Touchpoint UI configuration is the simplest way to send data to your NLX application when a conversation starts. `initialContext` works all input modes: text, voice, and voiceMini.

The `initialContext` object accepts key-value pairs, which are then available as [Context Variables](https://docs.nlx.ai/platform/build/resources/context-variables#use-a-context-variable) within your NLX flows.

**When to use `initialContext`:**

- You need to pass user details, page information, or any other relevant data at the beginning of the conversation.
- You don't need custom JavaScript logic to run on launch, just data passing.
- You want a straightforward way to provide context for text, voice, or voiceMini interactions from the start.

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    // userId is required if input is "voice" or "voiceMini"
    userId: crypto.randomUUID(),
  },
  // userTier and current page must be defined as context variables in your NLX workspace
  initialContext: {
    userTier: "gold",
    currentPage: "/products/item123",
  },
  // input: "text", // or "voice", "voiceMini"
});
```

If you also provide a custom `initializeConversation` function (see below), the `initialContext` object will be passed as the second argument to that function.

## Customizing Initialization Logic with `initializeConversation`

For more advanced scenarios where you need to execute custom JavaScript logic when the Touchpoint UI launches, you can use the `initializeConversation` function.

💡 `initializeConversation` **only works** for `text` input mode. Your function is responsible for initiating the conversation (e.g., by calling `handler.sendWelcomeFlow()` or `handler.sendFlow()`).

**When to use `initializeConversation`:**

- You need to conditionally decide which flow to send based on application state.
- You want to perform actions like logging, analytics tracking, or API calls before the first message is sent.
- You need to implement custom setup logic for specific input modes.

### Initialization Function Signature

The `initializeConversation` function receives the [`ConversationHandler`](/touchpoint-ui-ConversationHandler) instance and any `initialContext` you provided in the configuration:

```typescript
type InitializeConversation = (
  conversationHandler: ConversationHandler,
  initialContext?: Record<string, any>, // Context from TouchpointConfiguration.initialContext
) => void;
```

The `ConversationHandler` provides methods like:
| Method | Description |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `sendWelcomeFlow(context?)` | Sends the default welcome Flow. The `context` argument here will merge with or override the `initialContext` passed to the function. |
| `sendFlow(flowId, context?)`| Sends a specific Flow. The `context` argument here will merge with or override the `initialContext` passed to the function. |

## Examples

### 1. Sending User Information via `initialContext` (Recommended for Data Passing)

This example demonstrates passing `firstName` and `userTier`. These need to be defined as Context Variables in your NLX Workspace to be usable in your flows. This approach works for text, voice, and voiceMini.

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
  },
  // userTier and firstName must be defined as context variables in your NLX workspace
  initialContext: {
    firstName: "David",
    userTier: "premium",
  },
  // input: "text", // Or "voice", "voiceMini"
});
```

### 2. Launching with a Custom Flow Using `initializeConversation`

The specific flow (`CheckOrderStatus`) must be defined in your NLX application. `userSource`, `pageUrl`, all must be defined as context variables in your NLX workspace.

```touchpointui
const initializeWithCustomFlow = (conversationHandler) => {
  // userSource and pageUrl must be defined as context variables in your NLX workspace
  const context = {
    userSource: "website",
    pageUrl: window.location.href
  }
  // Send a specific Flow with the context
  conversationHandler.sendFlow("CheckOrderStatus", context);
};

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  initializeConversation: initializeWithCustomFlow,
  input: "text", // This custom function will run for any input mode
});
```
