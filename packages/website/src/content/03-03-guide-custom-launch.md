- [Passing Initial Data with `initialContext`](#passing-initial-data-with-initialcontext)
- [Customizing Initialization Logic with `initializeConversation`](#customizing-initialization-logic-with-initializeconversation)
  - [Initialization Function Signature](#initialization-function-signature)
- [Examples](#examples)
  - [1. Sending User Information via `initialContext` (Recommended for Data Passing)](#1-sending-user-information-via-initialcontext-recommended-for-data-passing)
  - [2. Launching with a Custom Intent Using `initializeConversation`](#2-launching-with-a-custom-intent-using-initializeconversation)

## Passing Initial Data with `initialContext`

The `initialContext` option in your Touchpoint UI configuration is the simplest way to send data to your NLX application when a conversation starts. `initialContext` works all input modes: text, voice, and voiceMini.

The `initialContext` object accepts key-value pairs, which are then available as [Context Variables](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) within your NLX flows.

**When to use `initialContext`:**

- You need to pass user details, page information, or any other relevant data at the beginning of the conversation.
- You don't need custom JavaScript logic to run on launch, just data passing.
- You want a straightforward way to provide context for text, voice, or voiceMini interactions from the start.

**JavaScript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    // userId is required if input is "voice" or "voiceMini"
    userId: "your-unique-user-id",
  },
  initialContext: {
    userId: "user-789",
    userTier: "gold",
    currentPage: "/products/item123",
  },
  // input: "text", // or "voice", "voiceMini"
});
```

**HTML**

```html
<script
  defer
  src="[https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js](https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js)"
></script>
<script>
  const contentLoaded = () => {
    if (document.readyState === "loading") {
      return new Promise((resolve) => {
        window.addEventListener("DOMContentLoaded", () => {
          resolve();
        });
      });
    } else {
      return Promise.resolve();
    }
  };

  contentLoaded().then(() => {
    return nlxai.touchpointUi.create({
      config: {
        applicationUrl: "YOUR_APPLICATION_URL",
        headers: { "nlx-api-key": "YOUR_API_KEY" },
        languageCode: "en-US",
        // userId is required if input is "voice" or "voiceMini"
        userId: "your-unique-user-id",
      },
      initialContext: {
        userId: "user-789",
        userTier: "gold",
        currentPage: "/products/item123",
      },
    });
  });
</script>
```

If you also provide a custom `initializeConversation` function (see below), the `initialContext` object will be passed as the second argument to that function.

## Customizing Initialization Logic with `initializeConversation`

For more advanced scenarios where you need to execute custom JavaScript logic when the Touchpoint UI launches, you can use the `initializeConversation` function.

💡 `initializeConversation` **only works** for `text` input mode. Your function is responsible for initiating the conversation (e.g., by calling `handler.sendWelcomeIntent()` or `handler.sendIntent()`).

**When to use `initializeConversation`:**

- You need to conditionally decide which intent to send based on application state.
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
| `sendWelcomeIntent(context?)` | Sends the default welcome intent. The `context` argument here will merge with or override the `initialContext` passed to the function. |
| `sendIntent(intent, context?)`| Sends a specific intent. The `context` argument here will merge with or override the `initialContext` passed to the function. |

## Examples

### 1. Sending User Information via `initialContext` (Recommended for Data Passing)

This example demonstrates passing `firstName` and `userTier`. These need to be defined as Context Variables in your NLX Workspace to be usable in your flows. This approach works for text, voice, and voiceMini.

**JavaScript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: "user123", // Required for voice
  },
  initialContext: {
    // userId and userTier must be defined as Context Variables in NLX Studio
    firstName: "David",
    userTier: "premium",
  },
  // input: "text", // Or "voice", "voiceMini"
});
```

**HTML**

```html
<script
  defer
  src="[https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js](https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js)"
></script>
<script>
  const contentLoaded = () => {
    if (document.readyState === "loading") {
      return new Promise((resolve) => {
        window.addEventListener("DOMContentLoaded", () => {
          resolve();
        });
      });
    } else {
      return Promise.resolve();
    }
  };

  contentLoaded().then(() => {
    return nlxai.touchpointUi.create({
      config: {
        applicationUrl: "YOUR_APPLICATION_URL",
        headers: { "nlx-api-key": "YOUR_API_KEY" },
        languageCode: "en-US",
        userId: "user123", // Required for voice
      },
      initialContext: {
        firstName: "David",
        userTier: "premium",
      },
      // input: "text", // Or "voice", "voiceMini"
    });
  });
</script>
```

### 2. Launching with a Custom Intent Using `initializeConversation`

The specific flow (`CheckOrderStatus`) must be defined in your NLX application. `userSource`, `pageUrl`, `clientTime` all must be defined as context variables in your NLX workspace.

**JavaScript**

```javascript
import { create, type InitializeConversation } from "@nlxai/touchpoint-ui";

const initializeWithCustomIntent: InitializeConversation = (conversationHandler) => {
  const context = {
    userSource: "website",
    pageUrl: window.location.href,
    clientTime: new Date().toISOString(),
  }
  // Send a specific intent with the context
  conversationHandler.sendIntent("CheckOrderStatus", context);
};

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  initializeConversation: initializeWithCustomIntent,
  input: "text", // This custom function will run for any input mode
});
```

**HTML**

```html
<script
  defer
  src="[https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js](https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js)"
></script>
<script>
  const contentLoaded = () => {
    if (document.readyState === "loading") {
      return new Promise((resolve) => {
        window.addEventListener("DOMContentLoaded", () => {
          resolve();
        });
      });
    } else {
      return Promise.resolve();
    }
  };

  const initializeWithCustomIntent: InitializeConversation = (conversationHandler) => {
    const context = {
      userSource: "website",
      pageUrl: window.location.href,
      clientTime: new Date().toISOString(),
    }
    // Send a specific intent with the context
    conversationHandler.sendIntent("CheckOrderStatus", context);
  };

  contentLoaded().then(() => {
    return nlxai.touchpointUi.create({
      config: {
        applicationUrl: "YOUR_APPLICATION_URL",
        headers: { "nlx-api-key": "YOUR_API_KEY" },
        languageCode: "en-US",
      },
      initializeConversation: initializeWithCustomIntent,
      input: "text",
    });
  });
</script>
```
