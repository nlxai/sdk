- [Required Configuration Fields](#required-configuration-fields)
- [Optional Customization Fields](#optional-customization-fields)
- [Common Configuration Examples](#common-configuration-examples)
- [Fully Customized Touchpoint Example](#fully-customized-touchpoint-example)

## Required Configuration Fields

| Field                           | Type   | Description                                  |
| ------------------------------- | ------ | -------------------------------------------- |
| `config.applicationUrl`         | string | The URL endpoint for your NLX application    |
| `config.headers["nlx-api-key"]` | string | Your NLX API key                             |
| `config.languageCode`           | string | The language code for the chat interface     |
| `config.userId`                 | String | **Required only with input is set to voice** |

## Optional Customization Fields

| Field                    | Type                                      | Default                               | Description                                                                                                                                                         |
| :----------------------- | :---------------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `windowSize`             | `"half" \| "full"`                        | `"half"`                              | Controls whether the chat window takes up half or full screen                                                                                                       |
| `colorMode`              | `"light" \| "dark"`                       | `"dark"`                              | Sets the color theme of the widget                                                                                                                                  |
| `brandIcon`              | `string`                                  | `undefined`                           | URL for your brand icon in the chat header                                                                                                                          |
| `launchIcon`             | `string \| boolean`                       | `true`                                | URL for the icon on the launch button. `false` hides it, `true` or `undefined` uses default.                                                                        |
| `userMessageBubble`      | `boolean`                                 | `false`                               | Specifies whether the user message has bubbles or not                                                                                                               |
| `agentMessageBubble`     | `boolean`                                 | `false`                               | Specifies whether the agent message has bubbles or not                                                                                                              |
| `chatMode`               | `boolean`                                 | `false`                               | Enables chat mode, a classic chat experience with inline loaders and the chat history visible at all times.                                                         |
| `theme`                  | `Partial<Theme>`                          | See [Theming](/touchpoint-ui-theming) | Custom theme configuration object. See [Theming](/touchpoint-ui-theming) for details on theme properties.                                                           |
| `customModalities`       | `Record<string, CustomModalityComponent>` | `{}`                                  | Optional custom modality components to render in Touchpoint. Key is the modality name, value is the component. See [Components](/guide-building-custom-components). |
| `initializeConversation` | `(handler: ConversationHandler) => void`  | Sends welcome intent                  | Custom conversation initialization method. Defaults to sending the welcome intent. See [Conversation Handler](/touchpoint-ui-ConversationHandler).                  |
| `input`                  | `"text" \| "voice"`                       | `"text"`                              | Controls the ways in which the user can communicate with the application. <br> ⚠️ The `config.userId` must be set to use voice input                                |

## Common Configuration Examples

Example code snippet for the most common visual and behavioral adjustments.

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  // Required connection config
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },

  // Common optional settings (outside 'config')
  colorMode: "light", // Switch to light theme
  windowSize: "half", // Keep the half-screen overlay
  brandIcon: "https://your-company.com/logo.png", // Add your logo to the header
  launchIcon: "https://your-company.com/chat-icon.svg", // Custom icon for the launch button
  theme: {
    fontFamily: '"Inter", sans-serif', // Use a custom font
    accent: "rgb(0, 115, 230)", // Set a custom accent color (e.g., buttons, highlights)
  },
};

const touchpoint = await create(touchpointOptions);
```

## Fully Customized Touchpoint Example

Example code snip modifying most of the available configuration options for maximum customization.

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  // Required connection config
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "fr-FR", // French language
    userId: "userId", //required for voice
  },

  // All other options (outside 'config')
  windowSize: "full", // Full screen mode
  colorMode: "dark", // Dark theme
  brandIcon: "https://your-company.com/logo-dark.png", // Specific logo for dark mode
  launchIcon: "https://your-company.com/chat-icon.svg", // Specific launch button
  userMessageBubble: true, // Enable bubbles for user messages
  agentMessageBubble: false, // Disable bubbles for agent messages
  chatMode: true, // Use classic chat layout
  input: "voice", // Set input mode to voice only
  theme: {
    // More detailed theme customization
    fontFamily: '"Roboto Slab", serif',
    accent: "rgb(156, 39, 176)", // Purple accent
  },
};

const touchpoint = await create(touchpointOptions);
```
