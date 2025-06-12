- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
  - [Bidirectional Communication](#bidirectional-communication)
  - [Voice Commands](#voice-commands)
  - [Room Data and Modalities](#room-data-and-modalities)
- [Sending Page Context](#sending-page-context)
- [Handling Voice Commands](#handling-voice-commands)
- [Command Handlers](#command-handlers)
  - [Navigation Commands](#navigation-commands)
  - [Form Fill Commands](#form-fill-commands)
  - [Custom Commands](#custom-commands)
- [Browser Requirements](#browser-requirements)
- [Complete Implementation Example](#complete-implementation-example)
- [Related Documentation](#related-documentation)

## Getting Started

Enhanced Voice Plus requires the `voiceMini` input mode, which automatically enables bidirectional communication:

```javascript
import { create, analyzePageForms } from "@nlxai/touchpoint-ui";

const touchpoint = await nlxai.touchpointUi.create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    bidirectional: true, // Explicitly enable bidirectional mode
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
    conversationId: crypto.randomUUID(),
  },
  input: "voiceMini", // Enables voice input with bidirectional support
});
```

## Core Concepts

### Bidirectional Communication

When using `voiceMini`, Touchpoint establishes two connections:

- **Standard API Channel**: For conversation messages
- **Voice Plus WebSocket**: For real-time voice commands

This dual-channel approach enables your application to receive and respond to voice commands while maintaining the conversation flow.

### Voice Commands

Enhanced Voice Plus supports three command types:

| Classification | Actions                                     | Description                          |
| -------------- | ------------------------------------------- | ------------------------------------ |
| `navigation`   | `page_next`, `page_previous`, `page_custom` | Navigate between pages               |
| `input`        | Form field updates                          | Fill form fields with voice data     |
| `custom`       | Application-specific                        | Custom commands defined by your flow |

### Room Data and Modalities

The voice agent can send rich data back to your application through room data events. This enables the agent to:

- Display charts, maps, or custom visualizations
- Update UI components dynamically
- Send structured data beyond simple commands

## Sending Page Context

Provide NLX with information about your page structure using the Voice Plus context API. This powers the input / formfill commands for NLX to have context of which fields are available and their types.

```javascript
import { create, analyzePageForms } from "@nlxai/touchpoint-ui";

// Analyze forms on the current page
const { context, formElements } = analyzePageForms();

// Send form context specifically for voice plus
touchpoint.conversationHandler.sendVoicePlusContext({
  context: context,
});

// Or send general context without triggering a message
touchpoint.conversationHandler.sendContext(context);
```

## Handling Voice Commands

Register a handler to process voice commands from NLX:

```javascript
touchpoint.conversationHandler.addEventListener(
  "voicePlusCommand",
  (payload) => {
    const { classification, action, data } = payload;

    switch (classification) {
      case "navigation":
        handleNavigation(action, data);
        break;
      case "input":
        handleFormInput(data);
        break;
      case "custom":
        handleCustomCommand(action, data);
        break;
    }
  },
);
```

## Command Handlers

### Navigation Commands

Handle voice-driven navigation between pages:

```javascript
function handleNavigation(action, data) {
  switch (action) {
    case "page_next":
      // Navigate to next page
      window.history.forward();
      break;

    case "page_previous":
      // Navigate to previous page
      window.history.back();
      break;

    case "page_custom":
      // Navigate to specific page
      if (data.destination) {
        // Handle relative or absolute navigation
        if (data.destination.startsWith("/")) {
          window.location.pathname = data.destination;
        } else {
          window.location.href = data.destination;
        }
      }
      break;
  }
}
```

### Form Fill Commands

Automatically fill form fields based on voice input:

```javascript
import { create, analyzePageForms } from "@nlxai/touchpoint-ui";

// Analyze and store form elements
const { context, formElements } = analyzePageForms();

// Send context to enable voice form filling
touchpoint.conversationHandler.sendContext(context);

function handleFormInput(command) {
  // Handle the new fields array structure
  if (!command.fields) return;

  command.fields.forEach((field) => {
    if (formElements[field.id]) {
      const element = formElements[field.id];
      element.value = field.value;

      // Trigger events for framework compatibility
      // element.dispatchEvent(new Event('input', { bubbles: true }));
      // element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
}
```

### Custom Commands

Implement application-specific voice commands:

```javascript
function handleCustomCommand(action, data) {
  // Example: Voice-enabled product search
  if (action === "search_products") {
    performSearch(data.query);
  }

  // Example: Voice-controlled shopping cart
  if (action === "add_to_cart") {
    addProductToCart(data.productId, data.quantity);
  }

  // Example: Voice navigation to specific sections
  if (action === "go_to_section") {
    document.getElementById(data.sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  }
}
```

## Browser Requirements

Enhanced Voice Plus requires:

- Modern browser with WebRTC support
- Microphone permissions

## Complete Implementation Example

A comprehensive example implementing voice-driven form filling, navigation:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Enhanced Voice Plus Example</title>
    <style>
      .voice-updated {
        animation: highlight 2s ease-out;
      }

      @keyframes highlight {
        0% {
          background-color: #ffeb3b;
        }
        100% {
          background-color: transparent;
        }
      }
    </style>
  </head>
  <body>
    <h1>Enhanced Voice Plus Demo</h1>

    <form id="contact-form">
      <input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="First Name"
      />
      <input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Last Name"
      />
      <input type="email" id="email" name="email" placeholder="Email" />
      <input type="tel" id="phone" name="phone" placeholder="Phone" />
      <textarea id="message" name="message" placeholder="Message"></textarea>
      <button type="submit">Submit</button>
    </form>

    <script
      defer
      src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"
    ></script>
    <script>
      // Initialize Enhanced Voice Plus with bidirectional support
      const userId = crypto.randomUUID();
      const conversationId = crypto.randomUUID();
      let formElements = {};

      async function initializeVoicePlus() {
        // Create touchpoint with voiceMini and bidirectional enabled
        const touchpoint = await nlxai.touchpointUi.create({
          config: {
            applicationUrl: "YOUR_APPLICATION_URL",
            headers: {
              "nlx-api-key": "YOUR_API_KEY",
            },
            bidirectional: true, // Enable bidirectional communication
            languageCode: "en-US",
            userId,
            conversationId,
          },
          input: "voiceMini",
        });

        // Send initial page context
        sendPageContext(touchpoint);

        // Set up voice command handler
        setupCommandHandler(touchpoint);

        return touchpoint;
      }

      // Send page context to NLX
      function sendPageContext(touchpoint) {
        const { context, formElements: elements } =
          nlxai.touchpointUi.analyzePageForms();
        formElements = elements;

        // Send context using the new sendContext method
        touchpoint.conversationHandler.sendContext(context);
      }

      // Set up voice command handler
      function setupCommandHandler(touchpoint) {
        touchpoint.conversationHandler.addEventListener(
          "voicePlusCommand",
          (command) => {
            console.log("Voice command received:", command);

            switch (command.classification) {
              case "navigation":
                handleNavigation(command.action, command);
                break;

              case "input":
                handleFormInput(command);
                break;

              case "custom":
                handleCustomCommand(command.action, command.data);
                break;
            }
          },
        );
      }

      // Handle navigation commands
      function handleNavigation(action, command) {
        const destination = command.destination || command.data?.destination;

        switch (action) {
          case "page_next":
            window.history.forward();
            break;

          case "page_previous":
            window.history.back();
            break;

          case "page_custom":
            if (destination) {
              if (destination.startsWith("/")) {
                window.location.pathname = destination;
              } else {
                window.location.href = destination;
              }
            }
            break;
        }
      }

      // Handle form input commands with new structure
      function handleFormInput(command) {
        if (!command.fields) return;

        command.fields.forEach((field) => {
          if (formElements[field.id]) {
            const element = formElements[field.id];
            element.value = field.value;
            element.classList.add("voice-updated");

            // Trigger events for frameworks that listen to them
            element.dispatchEvent(new Event("input", { bubbles: true }));
            element.dispatchEvent(new Event("change", { bubbles: true }));

            setTimeout(() => {
              element.classList.remove("voice-updated");
            }, 2000);
          }
        });
      }

      // Handle custom commands
      function handleCustomCommand(action, data) {
        console.log("Custom command:", action, data);

        // Example: Handle custom search command
        if (action === "search") {
          // Implement search functionality
          console.log("Searching for:", data.query);
        }
      }

      // Initialize when page loads
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeVoicePlus);
      } else {
        initializeVoicePlus();
      }
    </script>
  </body>
</html>
```

<details>

<summary>React/JavaScript Example</summary>

```javascript
import { create, analyzePageForms } from "@nlxai/touchpoint-ui";

// Initialize Enhanced Voice Plus with bidirectional support
const userId = crypto.randomUUID();
const conversationId = crypto.randomUUID();
let formElements = {};

async function initializeVoicePlus() {
  // Create touchpoint with voiceMini and bidirectional enabled
  const touchpoint = await create({
    config: {
      applicationUrl: "YOUR_APPLICATION_URL",
      headers: {
        "nlx-api-key": "YOUR_API_KEY",
      },
      bidirectional: true,
      languageCode: "en-US",
      userId,
      conversationId,
    },
    input: "voiceMini",
  });

  // Send initial page context
  sendPageContext(touchpoint);

  // Set up handlers
  setupCommandHandler(touchpoint);

  return touchpoint;
}

// Send page context to NLX
function sendPageContext(touchpoint) {
  const { context, formElements: elements } = analyzePageForms();
  formElements = elements;

  // Use sendContext for silent context updates
  touchpoint.conversationHandler.sendContext(context);
}

// Set up voice command handler
function setupCommandHandler(touchpoint) {
  touchpoint.conversationHandler.addEventListener(
    "voicePlusCommand",
    (command) => {
      console.log("Voice command received:", command);

      switch (command.classification) {
        case "navigation":
          handleNavigation(command.action, command);
          break;

        case "input":
          handleFormInput(command);
          break;

        case "custom":
          handleCustomCommand(command.action, command.data);
          break;
      }
    },
  );
}

// Handle form input with new structure
function handleFormInput(command) {
  if (!command.fields) return;

  command.fields.forEach((field) => {
    if (formElements[field.id]) {
      const element = formElements[field.id];
      element.value = field.value;

      // Trigger events for React/framework compatibility
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
}

// Initialize when ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeVoicePlus);
} else {
  initializeVoicePlus();
}
```

</details>

## Related Documentation

- [Touchpoint UI Setup Guide](./02-01-touchpoint-setup)
- [Voice Configuration](./02-03-touchpoint-customization#voice-configuration)
- [Conversation Handlers](./02-04-touchpoint-advanced#conversation-handlers)
