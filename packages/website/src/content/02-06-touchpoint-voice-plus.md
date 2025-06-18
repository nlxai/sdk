- [Getting Started](#getting-started)
- [Voice Commands Concepts](#voice-commands-concepts)
- [Sending Page Context](#sending-page-context)
  - [When to Send Context](#when-to-send-context)
  - [Best Practices](#best-practices)
  - [Sending Context Example](#sending-context-example)
- [Your Voice Plus Command Handler](#your-voice-plus-command-handler)
- [Navigation Command Handler](#navigation-command-handler)
  - [Payload from NLX](#payload-from-nlx)
  - [Sample Handler](#sample-handler)
- [Form Fill Command Handler](#form-fill-command-handler)
  - [Payload from NLX](#payload-from-nlx-1)
  - [Sample Handler](#sample-handler-1)
- [Custom Command Handler](#custom-command-handler)
  - [Enriching the Knowledge Base](#enriching-the-knowledge-base)
  - [Example Payloads](#example-payloads)
  - [Sample Handler](#sample-handler-2)
- [Complete Implementation Example](#complete-implementation-example)

## Getting Started

Voice Plus with bidirectional mode enabled requires the `voiceMini` input mode. This mode allows your application to handle voice commands while still maintaining a conversational flow with the user.:

```html
<script type="module">
  import {
    create,
    React,
    html,
    analyzePageForms,
  } from "https://unpkg.com/@nlxai/touchpoint-ui@1.0.5-alpha.13/lib/index.js?module";

  const touchpointOptions = {
    config: {
      applicationUrl: "YOUR_APPLICATION_URL",
      headers: {
        "nlx-api-key": "YOUR_API_KEY",
      },
      bidirectional: true, // Explicitly enable bidirectional mode
      languageCode: "en-US",
      userId: crypto.randomUUID(), // Required for voice
    },
    input: "voiceMini", // Enables voice input with bidirectional support
  };

  const touchpoint = await create(touchpointOptions);
</script>
```

## Voice Commands Concepts

Enhanced Voice Plus supports three command types:

| Classification | Actions                                     | Description                          |
| -------------- | ------------------------------------------- | ------------------------------------ |
| `navigation`   | `page_next`, `page_previous`, `page_custom` | Navigate between pages               |
| `input`        | Form field updates                          | Fill form fields with voice data     |
| `custom`       | Application-specific                        | Custom commands defined by your flow |

## Sending Page Context

Provide NLX with information about your page structure using the Voice Plus context API. This powers the input / formfill commands for NLX to have context of which fields are available and their types.

The `analyzePageForms` function scans your page for form elements and returns two important objects:

```js
// Analyze forms on the current page
const { context, formElements } = analyzePageForms();
```

### When to Send Context

1. **On page load** - Send initial context after touchpoint initialization
2. **On route changes** - In SPAs, resend context when navigating to new pages
3. **After dynamic form updates** - If forms are added/removed dynamically
4. **After significant DOM changes** - When form structure changes

### Best Practices

- Always store the `formElements` reference for use in your command handlers
- Re-analyze and resend context when your page structure changes
- Use good form accessibility practices such as [labeling fields](https://www.w3.org/WAI/tutorials/forms/labels/)
- Provide [form instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) for better voice recognition

### Sending Context Example

```html
<script type="module">
  import {
    create,
    React,
    html,
    analyzePageForms,
  } from "https://unpkg.com/@nlxai/touchpoint-ui@1.0.5-alpha.13/lib/index.js?module";

  const touchpointOptions = {
    config: {
      applicationUrl: "YOUR_APPLICATION_URL",
      headers: {
        "nlx-api-key": "YOUR_API_KEY",
      },
      bidirectional: true, // Explicitly enable bidirectional mode
      languageCode: "en-US",
      userId: crypto.randomUUID(), // Required for voice
    },
    input: "voiceMini", // Enables voice input with bidirectional support
  };

  const touchpoint = await create(touchpointOptions);

  const { context, formElements } = analyzePageForms();
  // Store formElements for later use when handling commands
  window.formElements = formElements; // or use state management

  // Array of destinations for navigation commands
  const destinations = ["about", "contact", "pricing"];

  touchpoint.conversationHandler.sendContext({
    "nlx:vpContext": {
      url: window.location.origin,
      fields: context,
      destinations: destinations,
    },
  });
</script>
```

## Your Voice Plus Command Handler

Register a handler to process voice commands from NLX:

```javascript
touchpoint.conversationHandler.addEventListener(
  "voicePlusCommand",
  (command) => {
    const { classification, action } = command;

    switch (classification) {
      case "navigation":
        handleNavigation(action, command);
        break;
      case "input":
        handleFormInput(command);
        break;
      case "custom":
        handleCustomCommand(action, command);
        break;
    }
  },
);
```

## Navigation Command Handler

Handle voice-driven navigation between pages:

### Payload from NLX

| Key              | Value                                       | Description                             |
| ---------------- | ------------------------------------------- | --------------------------------------- |
| `classification` | `navigation`                                | Indicates this is a navigation command  |
| `action`         | `page_next`, `page_previous`, `page_custom` | Type of navigation action               |
| `destination`    | `/about`                                    | Relative or absolute URL to navigate to |

**Example Payload:**

```json
{
  "classification": "navigation",
  "action": "page_next",
  "destination": "/about"
}
```

### Sample Handler

This is basic navigation handling logic that you should be updated based on your application's routing logic. For instance, if you are using a framework like React, Vue, or Angular, you would use their respective routing libraries to handle navigation.

```javascript
function handleNavigation(action, command) {
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
      if (command.destination) {
        // Handle relative or absolute navigation
        if (command.destination.startsWith("/")) {
          window.location.pathname = command.destination;
        } else {
          window.location.href = command.destination;
        }
      }
      break;
  }
}
```

## Form Fill Command Handler

Automatically fill form fields based on voice input. The voice agent sends back commands with field IDs that match the IDs from your `formElements` object:

**Important Notes:**

- The `field.id` in the command will match the element IDs in your `formElements` object
  - This is different from the element's own 'id' attribute. It is unique to Voice+.
  - Voice+ generates its own id for reference as the HTML element may not have an `id` at all or the page might violate the HTML spec and assign the same id to multiple elements.
- Always check if the element exists before trying to update it

### Payload from NLX

| Key              | Value                                      | Description                                                                                                                                            |
| ---------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `classification` | `input`                                    | Indicates this is a form fill command                                                                                                                  |
| `fields`         | Array of field objects                     | Each object contains `id` and `value`                                                                                                                  |
| `id`             | NLX's unique identifier for the form field | Pairs and will be use to match the ID in your formElements. <br/><br/> This is different from the element's own 'id' attribute. It is unique to Voice+ |
| `value`          | Value to set for the form field            | The value to fill in the form field                                                                                                                    |

**Example Payload:**

```json
{
  "classification": "input",
  "fields": [
    { "id": "firstName", "value": "John" },
    { "id": "email", "value": "john@example.com" }
  ]
}
```

### Sample Handler

```javascript
function handleFormInput(command) {
  if (!command.fields) return;

  command.fields.forEach((field) => {
    // Use the stored formElements to find the DOM element
    if (formElements[field.id]) {
      const element = formElements[field.id];
      element.value = field.value;
    } else {
      console.warn(`Field with id "${field.id}" not found in formElements`);
    }
  });
}
```

## Custom Command Handler

Implement application-specific voice commands by attaching a knowledge base to your Voice+ node in the flow builder. This allows you to define custom actions that can be triggered by voice commands.

### Enriching the Knowledge Base

To enrich the article Q&A Knowledge Base Responses with custom voice+ commands, you will need to add MetaData to each of the responses.

There are built in metadata keys that will trigger the `input` or `navigation` classifications, but you can also define your own custom actions.

| Key                 | Classification | Action             | Description                                                                                                                                                                     |
| ------------------- | -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nlx:destination`   | `navigation`   | `page_custom`      | Navigate to a specific page or section                                                                                                                                          |
| `nlx:action`        | `custom`       | Custom action name | Send custom actions to the frontend.                                                                                                                                            |
| `nlx:actionPayload` | `custom`       | Custom action data | Optional value **only** taken into account if `nlx:action` key is present. Sent as payload key to the frontend along with command type custom and action = nlx:action key value |

### Example Payloads

Suppose I want to create a custom command that sends users to the contact page when they'd like to get in touch about animal policy along with extra information.

I create a new Article in the Knowledge Base attached to the Voice+ Node with the following content:

- **Question**: How do I get in touch about animal policy?
- **Answer**: You can contact us about animal policy by visiting our Contact Page.

| metadata key            | value          |
| ----------------------- | -------------- |
| `nlx:destination`       | `contact`      |
| `nlx:action`            | `animalPolicy` |
| `nlx:actionPayload`     | `{}`           |
| `nlx:actionPayload.dog` | `true`         |
| `nlx:actionPayload.cat` | `true`         |

I will receive **TWO** payloads from NLX when this article is triggered, one for the navigation command and one for the custom command.

**Example Navigation Command:**

```json
{
  "classification": "navigation",
  "action": "page_custom",
  "destination": "contact"
}
```

**Example Custom Command:**

```json
{
  "classification": "custom",
  "action": "animalPolicy",
  "payload": {
    "dog": true,
    "cat": true
  }
}
```

### Sample Handler

```javascript
function handleCustomCommand(action, command) {
  // Example: Voice-enabled product search
  if (action === "animalPolicy") {
    setDogPolicy(command.payload.dog);
    setCatPolicy(command.payload.cat);
  }
}
```

## Complete Implementation Example

A comprehensive example implementing voice-driven form filling, navigation:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Enhanced Voice Plus Example</title>
    <style>
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

    <script type="module">
      import {
        create,
        React,
        html,
        analyzePageForms,
      } from "https://unpkg.com/@nlxai/touchpoint-ui@1.0.5-alpha.13/lib/index.js?module";

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
        const { context, formElements: elements } = analyzePageForms();
        formElements = elements;

        // Array of destinations for navigation commands
        const destinations = ["home", "about", "contact", "products"];

        // Send context using the new sendContext method
        touchpoint.conversationHandler.sendContext({
          "nlx:vpContext": {
            url: window.location.origin,
            fields: context,
            destinations: destinations,
          },
        });
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
                handleCustomCommand(command.action, command);
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
      function handleCustomCommand(action, command) {
        console.log("Custom command:", action, command.payload);

        // Example: Handle custom search command
        if (action === "search") {
          // Implement search functionality
          console.log("Searching for:", command.payload.query);
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
