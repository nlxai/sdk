- [Chat Modes](#chat-modes)
  - [Visual Comparison Details](#visual-comparison-details)
  - [When to Use Assistant Style](#when-to-use-assistant-style)
  - [When to Use Classic Chat Style](#when-to-use-classic-chat-style)
- [Configuration Quick Reference](#configuration-quick-reference)
- [Assistant Style (Default)](#assistant-style-default)
  - [Example Assistant Configuration](#example-assistant-configuration)
  - [Example Assistant Configuration with message bubbles](#example-assistant-configuration-with-message-bubbles)
- [Classic Chat Style](#classic-chat-style)
  - [Example Classic Chat Configuration](#example-classic-chat-configuration)
  - [Example Classic Chat Configuration with message bubbles](#example-classic-chat-configuration-with-message-bubbles)


## Chat Modes

* **Assistant Style**
  * Focused interface highlighting current interaction with clean minimal interface to focus user attention and reduced distractions.
* **Classic Chat Style** 
  * Traditional messaging interface with full history visible, easy message reference, familiar chat experience.

### Visual Comparison Details

| Feature           | Assistant Style               | Classic Chat Style   |
|-------------------|-------------------------------|----------------------|
| Message History   | Hidden by default, scrollable | Always visible       |
| Focus             | Current interaction only      | Full conversation    |
| Loading Indicator | Full-screen overlay           | Inline with messages |
| Screen Space      | Maximizes content area        | Fixed message list   |
| User Experience   | Step-by-step guidance         | Conversational flow  |


### When to Use Assistant Style

- **Guided workflows**: Step-by-step processes like form filling or troubleshooting
- **Simple queries**: Quick questions that don't require conversation history
- **Mobile experiences**: Limited screen space benefits from focused interface
- **Task completion**: When users need to focus on one thing at a time


<img src="/animations/assistantMode.webp" alt="Assistant Mode Animation" style="max-width: 40%;">

### When to Use Classic Chat Style

- **Support conversations**: When users need to reference previous messages
- **Complex discussions**: Multi-turn conversations with context dependencies
- **Documentation queries**: When users might need to scroll back for information
- **Familiar experience**: When users expect traditional chat interfaces

<img src="/animations/chatMode2.webp" alt="Chat Mode Animation" style="max-width: 40%;">


## Configuration Quick Reference

| Property             | Type    | Default | Description                                      |
|----------------------|---------|---------|--------------------------------------------------|
| `chatMode`           | boolean | `false` | `false` = Assistant style, `true` = Classic chat |
| `userMessageBubble`  | boolean | `false` | Add bubble styling to user messages              |
| `agentMessageBubble` | boolean | `false` | Add bubble styling to agent messages             |

**Note**: Message bubble settings work with both chat modes but have different visual effects in each mode.

## Assistant Style (Default)

The Assistant Style provides a focused experience where only the latest application message is prominently displayed. This creates a clean interface that directs the user's attention to the most recent information or question, while still allowing them to scroll up to view conversation history.

### Example Assistant Configuration

To implement the default Assistant Style, you can either omit the `chatMode` parameter or explicitly set it to `false`:

**Javascript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
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

**HTML**

```html
<!-- HTML Example: Assistant Style (Default) -->
<script defer src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
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
    const touchpointOptions = {
      config: {
        applicationUrl: "YOUR_APPLICATION_URL",
        headers: {
          "nlx-api-key": "YOUR_API_KEY",
        },
        languageCode: "en-US",
      },
      chatMode: false, // Explicitly set to false or omit (default is false)
      theme: {
        fontFamily: '"Neue Haas Grotesk", sans-serif',
        accent: "#AECAFF",
      },
    };

    return nlxai.touchpointUi.create(touchpointOptions);
  });
</script>
```

### Example Assistant Configuration with message bubbles

To add message bubbles to the Assistant Style:

**Javascript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
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

**HTML**

```html
<!-- HTML Example: Assistant Style with Message Bubbles -->
<script defer src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
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
    const touchpointOptions = {
      config: {
        applicationUrl: "YOUR_APPLICATION_URL",
        headers: {
          "nlx-api-key": "YOUR_API_KEY",
        },
        languageCode: "en-US",
      },
      chatMode: false, // Assistant style
      userMessageBubble: true, // Display user messages in bubbles
      agentMessageBubble: true, // Display agent messages in bubbles
      theme: {
        fontFamily: '"Neue Haas Grotesk", sans-serif',
        accent: "#AECAFF",
      },
    };

    return nlxai.touchpointUi.create(touchpointOptions);
  });
</script>
```

## Classic Chat Style

The Classic Chat Style provides a traditional messaging interface where all messages stack chronologically and remain visible. This creates a more conventional chat experience that many users are already familiar with from messaging apps.

### Example Classic Chat Configuration

To implement the Classic Chat Style, set the `chatMode` parameter to `true`:

**Javascript**


```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
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

**HTML**

```html
<!-- HTML Example: Classic Chat Style -->
<script defer src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
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
    const touchpointOptions = {
      config: {
        applicationUrl: "YOUR_APPLICATION_URL",
        headers: {
          "nlx-api-key": "YOUR_API_KEY",
        },
        languageCode: "en-US",
      },
      chatMode: true, // Enable classic chat mode
      theme: {
        fontFamily: '"Arial", sans-serif',
        accent: "rgb(40, 167, 69)", // Example green accent
      },
    };

    return nlxai.touchpointUi.create(touchpointOptions);
  });
</script>
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
    languageCode: "en-US",
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

**HTML**

```html
<!-- HTML Example: Classic Chat Style with message bubbles -->
<script defer src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
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
    const touchpointOptions = {
      config: {
        applicationUrl: "YOUR_APPLICATION_URL",
        headers: {
          "nlx-api-key": "YOUR_API_KEY",
        },
        languageCode: "en-US",
      },
      chatMode: true, // Enable classic chat mode
      userMessageBubble: true, // Display user messages in bubbles
      agentMessageBubble: true, // Display agent messages in bubbles
      theme: {
        fontFamily: '"Arial", sans-serif',
        accent: "rgb(40, 167, 69)", // Example green accent
      },
    };

    return nlxai.touchpointUi.create(touchpointOptions);
  });
</script>
```

For more information on customizing your Touchpoint UI experience, refer to the [Theming documentation](/touchpoint-ui-theming) and [Component Configuration](/guide-building-custom-components) guides.
