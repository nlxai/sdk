- [Chat Modes](#chat-modes)
- [Assistant Style (Default)](#assistant-style-default)
  - [Example Assistant Configuration](#example-assistant-configuration)
  - [Example Assistant Configuration with message bubbles](#example-assistant-configuration-with-message-bubbles)
- [Classic Chat Style](#classic-chat-style)
  - [Example Classic Chat Configuration](#example-classic-chat-configuration)
  - [Example Classic Chat Configuration with message bubbles](#example-classic-chat-configuration-with-message-bubbles)

Touchpoint UI offers two distinct chat interface modes to suit different user experience needs.

## Chat Modes

| Mode                   | Description                                        | Best Used When                                            | Key Benefits                                                    |
| :--------------------- | :------------------------------------------------- | :-------------------------------------------------------- | :-------------------------------------------------------------- |
| **Assistant Style**    | Focused interface highlighting current interaction | Guided tasks, step-by-step workflows, single interactions | Clean minimal interface, focused attention, reduced distraction |
| **Classic Chat Style** | Traditional messaging interface with history       | Complex discussions, reference-heavy interactions         | Full history visible, easy reference, familiar experience       |

## Assistant Style (Default)

The Assistant Style provides a focused experience where only the latest application message is prominently displayed. This creates a clean interface that directs the user's attention to the most recent information or question, while still allowing them to scroll up to view conversation history.

<img src="/animations/assistantMode.webp" alt="Assistant Mode Animation" style="max-width: 40%;">


### Example Assistant Configuration

To implement the default Assistant Style, you can either omit the `chatMode` parameter or explicitly set it to `false`:

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
  },
  chatMode: false, // Explicitly set to false or omit (default is false)
  // Add other common options like theme, brandIcon etc. if needed
  theme: {
    fontFamily: '"Neue Haas Grotesk", sans-serif',
    accent: "#AECAFF",
  },
};

const touchpoint = await create(touchpointOptions);
```

### Example Assistant Configuration with message bubbles

To add message bubbles to the Assistant Style:

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
  },
  chatMode: false, // Assistant style
  userMessageBubble: true, // Display user messages in bubbles
  agentMessageBubble: true, // Display agent messages in bubbles
  theme: {
    fontFamily: '"Neue Haas Grotesk", sans-serif',
    accent: "#AECAFF",
  },
};

const touchpoint = await create(touchpointOptions);
```

## Classic Chat Style

The Classic Chat Style provides a traditional messaging interface where all messages stack chronologically and remain visible. This creates a more conventional chat experience that many users are already familiar with from messaging apps.

<img src="/animations/chatMode2.webp" alt="Chat Mode Animation" style="max-width: 40%;">


### Example Classic Chat Configuration

To implement the Classic Chat Style, set the `chatMode` parameter to `true`:

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
  },
  chatMode: true, // Enable classic chat mode
  // Add other common options like theme, brandIcon etc. if needed
  theme: {
    fontFamily: '"Arial", sans-serif',
    accent: "rgb(40, 167, 69)", // Example green accent
  },
};

const touchpoint = await create(touchpointOptions);
```

### Example Classic Chat Configuration with message bubbles

To enable message bubbles in Classic Chat Style for a more traditional messaging look:

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
  },
  chatMode: true, // Enable classic chat mode
  userMessageBubble: true, // Display user messages in bubbles
  agentMessageBubble: true, // Display agent messages in bubbles
  theme: {
    fontFamily: '"Arial", sans-serif',
    accent: "rgb(40, 167, 69)", // Example green accent
  },
};

const touchpoint = await create(touchpointOptions);
```

For more information on customizing your Touchpoint UI experience, refer to the [Theming documentation](/touchpoint-ui-theming) and [Component Configuration](/guide-building-custom-components) guides.
