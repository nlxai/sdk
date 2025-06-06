- [Basic Setup](#basic-setup)
  - [Required Configuration](#required-configuration)
- [Customization](#customization)
- [Voice Input](#voice-input)
- [Complete Configuration Reference](#complete-configuration-reference)
  - [Core Config (inside `config` object)](#core-config-inside-config-object)
  - [Optional Config (inside `config` object)](#optional-config-inside-config-object)
  - [UI Options (outside `config` object)](#ui-options-outside-config-object)
  - [Message Styling](#message-styling)
  - [Theme Customization (inside `theme` object)](#theme-customization-inside-theme-object)
  - [Advanced Options](#advanced-options)

## Basic Setup

### Required Configuration

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
});
```

| Field                    | Type   | Description                            |
| ------------------------ | ------ | -------------------------------------- |
| `applicationUrl`         | string | Your NLX application endpoint          |
| `headers["nlx-api-key"]` | string | Your NLX API key                       |
| `languageCode`           | string | Chat language (e.g., "en-US", "fr-FR") |

---

## Customization

Add these options outside the `config` object:

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
  // Brand customization
  colorMode: "light", // "light" or "dark"
  theme: {
    accent: "#0066CC", // Your brand color
    fontFamily: '"Inter", sans-serif', // Your brand font
  },
  brandIcon: "https://yoursite.com/logo.png", // Header logo
  launchIcon: "https://yoursite.com/chat-icon.svg", // Chat button icon
});
```

---

## Voice Input

Voice input requires a `userId` in your config:

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
  },
  input: "voice", // Enable voice input
});
```

---

## Complete Configuration Reference

### Core Config (inside `config` object)

| Field                    | Type   | Required       | Description                                        |
| ------------------------ | ------ | -------------- | -------------------------------------------------- |
| `applicationUrl`         | string | Yes            | Your NLX application endpoint                      |
| `headers["nlx-api-key"]` | string | Yes            | Your NLX API key                                   |
| `languageCode`           | string | Yes            | Chat language (e.g., "en-US", "fr-FR")             |
| `userId`                 | string | For voice only | User identifier (required when `input` is "voice") |

**Example**

```touchpointui
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
};
```

### Optional Config (inside `config` object)

| Field            | Type                                                  | Required | Description                                                                                                                                                      |
| ---------------- | ----------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conversationId` | string                                                | optional | `conversationId` to continue an existing conversation. Used to recover conversation when [persisting history](/guide-persisting-history).                        |
| `responses`      | array of [Response](/headless-api-reference#response) | optional | When `responses` is set, initialize the chatHandler with historical messages. Used to recover conversation when [persisting history](/guide-persisting-history). |

**Example**

```touchpointui
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
    conversationId: "existing-conversation-id",
    responses: [
      // Array of previous Response objects
    ],
  },
};
```

💡 See the API Reference for the [Full Configuration Object](/headless-api-reference#interfacesconfigmd)

### UI Options (outside `config` object)

| Field        | Type                                   | Default   | Description                             |
| ------------ | -------------------------------------- | --------- | --------------------------------------- |
| `windowSize` | `"half"` \| `"full"`                   | `"half"`  | Half-screen overlay or full-screen mode |
| `colorMode`  | `"light"` \| `"dark"`                  | `"dark"`  | Light or dark theme                     |
| `brandIcon`  | string                                 | undefined | URL for header logo                     |
| `launchIcon` | string \| boolean                      | true      | URL for chat button icon, false to hide |
| `input`      | `"text"` \| `"voice"` \| `"voiceMini"` | `"text"`  | How users communicate with the chat     |

**Example**

```touchpointui
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US",
    userId: crypto.randomUUID()
  }
  windowSize: "half",
  colorMode: "dark",
  brandIcon: "https://yoursite.com/logo.png",
  launchIcon: "https://yoursite.com/chat-icon.svg",
  input: "text"
};
```

### Message Styling

| Field                | Type    | Default | Description                                      |
| -------------------- | ------- | ------- | ------------------------------------------------ |
| `userMessageBubble`  | boolean | false   | Add bubbles to user messages                     |
| `agentMessageBubble` | boolean | false   | Add bubbles to agent messages                    |
| `chatMode`           | boolean | false   | Show persistent chat history with inline loaders |

💡 See the [Chat Modes](/guide-touchpoint-chat-modes) section for more information.

**Example**

```touchpointui
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US",
    userId: crypto.randomUUID()
  }
  chatMode: true,
  userMessageBubble: true,
  agentMessageBubble: true
};
```

### Theme Customization (inside `theme` object)

| Field               | Type   | Default             | Description                      |
| ------------------- | ------ | ------------------- | -------------------------------- |
| `fontFamily`        | string | "Neue Haas Grotesk" | Font for all text                |
| `accent`            | string | varies by mode      | Color for buttons and highlights |
| `innerBorderRadius` | string | "12px"              | Rounding for buttons and inputs  |
| `outerBorderRadius` | string | "20px"              | Rounding for main window         |

💡 See the [Theming and Styling](/touchpoint-ui-theming) section for more information.

**Example**

```touchpointui
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US",
    userId: crypto.randomUUID()
  }
  theme: {
    fontFamily: '"Helvetica Neue", sans-serif',
    accent: "rgb(28, 99, 218)"
  }
};
```

### Advanced Options

| Field                    | Type     | Default            | Description                                                                                                                                                                               |
| ------------------------ | -------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customModalities`       | object   | {}                 | Custom UI components for rich responses. Read more in the [Custom Components](/guide-building-custom-components) for how customModalities are used.                                       |
| `initializeConversation` | function | Sends welcome flow | Control the first interaction. Read more in the [Launching with Context](/guide-custom-launch#customizing-initialization-logic-with-initializeconversation) section for more information. |
| `initialContext`         | object   | undefined          | Context sent with initial request. Read more in the [Launching with Context](/guide-custom-launch#passing-initial-data-with-initialcontext) section for more information.                 |

**Example**

```touchpointui
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
  initialContext: {
    userTier: "premium",
    currentPage: "/products",
  },
  customModalities: {
    OrderDetails: OrderDetailsComponent,
    MapDisplay: MapDisplayComponent,
  },
};
```
