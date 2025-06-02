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

**JavaScript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: "REQUIRED_FOR_VOICE",
  },
});
```

**HTML**

```html
<script
  defer
  src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"
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
        userId: "REQUIRED_FOR_VOICE",
      },
    });
  });
</script>
```

| Field                    | Type   | Description                            |
| ------------------------ | ------ | -------------------------------------- |
| `applicationUrl`         | string | Your NLX application endpoint          |
| `headers["nlx-api-key"]` | string | Your NLX API key                       |
| `languageCode`           | string | Chat language (e.g., "en-US", "fr-FR") |

---

## Customization

Add these options outside the `config` object:

**JavaScript**

```javascript
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: "REQUIRED_FOR_VOICE",
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

**HTML**

```html
<script
  defer
  src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"
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
        userId: "REQUIRED_FOR_VOICE",
      },
      colorMode: "light",
      theme: {
        accent: "#0066CC",
        fontFamily: '"Inter", sans-serif',
      },
      brandIcon: "https://yoursite.com/logo.png",
      launchIcon: "https://yoursite.com/chat-icon.svg",
    });
  });
</script>
```

---

## Voice Input

Voice input requires a `userId` in your config:

**JavaScript**

```javascript
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: "user-12345", // Required for voice
  },
  input: "voice", // Enable voice input
});
```

**HTML**

```html
<script
  defer
  src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"
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
        userId: "user-12345",
      },
      input: "voice",
    });
  });
</script>
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

**Example JS**

```js
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: "user-123-abc",
  },
};
```

### Optional Config (inside `config` object)

| Field            | Type                                                  | Required | Description                                                                                                                                                      |
| ---------------- | ----------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conversationId` | string                                                | optional | `conversationId` to continue an existing conversation. Used to recover conversation when [persisting history](/guide-persisting-history).                        |
| `responses`      | array of [Response](/headless-api-reference#response) | optional | When `responses` is set, initialize the chatHandler with historical messages. Used to recover conversation when [persisting history](/guide-persisting-history). |

**Example JS**

```js
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: "user-123-abc",
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

**Example JS**

```js
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US",
    userId: "user-123-abc"
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

**Example JS**

```js
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US",
    userId: "user-123-abc"
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

**Example JS**

```js
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US",
    userId: "user-123-abc"
  }
  theme: {
    fontFamily: '"Helvetica Neue", sans-serif',
    accent: "rgb(28, 99, 218)"
  }
};
```

### Advanced Options

| Field                    | Type     | Default              | Description                                                                                                                                                                               |
| ------------------------ | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customModalities`       | object   | {}                   | Custom UI components for rich responses. Read more in the [Custom Components](/guide-building-custom-components) for how customModalities are used.                                       |
| `initializeConversation` | function | Sends welcome intent | Control the first interaction. Read more in the [Launching with Context](/guide-custom-launch#customizing-initialization-logic-with-initializeconversation) section for more information. |
| `initialContext`         | object   | undefined            | Context sent with initial request. Read more in the [Launching with Context](/guide-custom-launch#passing-initial-data-with-initialcontext) section for more information.                 |

**Example JS**

```js
const touchpointConfig = {
  // Core configuration (required)
  config: {
    applicationUrl: "https://your-bot.studio.nlx.ai/...",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: "user-123-abc",
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
