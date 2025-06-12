- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
  - [Bidirectional Communication](#bidirectional-communication)
  - [Voice Commands](#voice-commands)
- [Sending Page Context](#sending-page-context)
  - [Understanding analyzePageForms](#understanding-analyzepageforms)
    - [context Object](#context-object)
    - [formElements Object](#formelements-object)
  - [Sending Context to NLX](#sending-context-to-nlx)
  - [When to Send Context](#when-to-send-context)
  - [Best Practices](#best-practices)
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

## Sending Page Context

Provide NLX with information about your page structure using the Voice Plus context API. This powers the input / formfill commands for NLX to have context of which fields are available and their types.

### Understanding analyzePageForms

The `analyzePageForms` function scans your page for form elements and returns two important objects:

```javascript
import { create, analyzePageForms } from "@nlxai/touchpoint-ui";

// Analyze forms on the current page
const { context, formElements } = analyzePageForms();
```

#### context Object

A structured representation of your forms for NLX to understand - This context is sent to NLX so it knows what fields are available, their types, and any constraints. NLX uses this to understand user requests like "fill in my email" or "enter John in the first name field". You shouldn't need to interact with or modify this object.

**Example**

```javascript
{
  forms: [
    {
      id: "contact-form",
      fields: [
        {
          id: "firstName",
          name: "firstName",
          type: "text",
          placeholder: "First Name",
          label: "First Name",
          required: false
        },
        {
          id: "email",
          name: "email", 
          type: "email",
          placeholder: "Email",
          label: "Email",
          required: true
        }
        // ... more fields
      ]
    }
  ]
}
```

**Purpose**:

#### formElements Object
A key-value mapping of form field IDs to their DOM elements. Store this reference to quickly access form elements when processing voice commands. The IDs in this object will match the field IDs sent back by NLX in voice commands.

```javascript
{
  "firstName": HTMLInputElement,
  "lastName": HTMLInputElement,
  "email": HTMLInputElement,
  "phone": HTMLInputElement,
  "message": HTMLTextAreaElement
}
```


### Sending Context to NLX

```javascript
import { create, analyzePageForms } from "@nlxai/touchpoint-ui";

// Analyze forms on the current page
const { context, formElements } = analyzePageForms();

// Store formElements for later use when handling commands
window.formElements = formElements; // or use state management

// Send form context specifically for voice plus
touchpoint.conversationHandler.sendVoicePlusContext({
  context: context,
});

// Or send general context without triggering a message
touchpoint.conversationHandler.sendContext(context);
```

### When to Send Context

1. **On page load** - Send initial context after touchpoint initialization
2. **On route changes** - In SPAs, resend context when navigating to new pages
3. **After dynamic form updates** - If forms are added/removed dynamically
4. **After significant DOM changes** - When form structure changes

### Best Practices

- Always store the `formElements` reference for use in your command handlers
- Re-analyze and resend context when your page structure changes
- Include meaningful IDs and labels on form fields for better voice recognition
- Consider adding `aria-label` attributes for better accessibility and voice context

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

Automatically fill form fields based on voice input. The voice agent sends back commands with field IDs that match the IDs from your `formElements` object:

```javascript
import { create, analyzePageForms } from "@nlxai/touchpoint-ui";

// Analyze and store form elements at initialization
const { context, formElements } = analyzePageForms();

// Send context to enable voice form filling
touchpoint.conversationHandler.sendContext(context);

function handleFormInput(command) {
  // Voice command structure:
  // {
  //   classification: "input",
  //   fields: [
  //     { id: "firstName", value: "John" },
  //     { id: "email", value: "john@example.com" }
  //   ]
  // }
  
  if (!command.fields) return;

  command.fields.forEach((field) => {
    // Use the stored formElements to find the DOM element
    if (formElements[field.id]) {
      const element = formElements[field.id];
      element.value = field.value;

      // Optional: Trigger events for framework compatibility
      // Uncomment if your framework needs these events
      // element.dispatchEvent(new Event('input', { bubbles: true }));
      // element.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Optional: Add visual feedback
      element.classList.add('voice-updated');
      setTimeout(() => element.classList.remove('voice-updated'), 2000);
    } else {
      console.warn(`Field with id "${field.id}" not found in formElements`);
    }
  });
}
```

**Important Notes:**
- The `field.id` in the command will match the element IDs in your `formElements` object
- Always check if the element exists before trying to update it
- Some frameworks (React, Vue) may require dispatching events to trigger updates
- Consider adding visual feedback to show which fields were updated by voice

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
