- [Getting Started](#getting-started)
- [Voice Commands Concepts](#voice-commands-concepts)
- [Sending Page Context](#sending-page-context)
  - [When to Send Context](#when-to-send-context)
  - [Best Practices](#best-practices)
  - [Sending Context Example](#sending-context-example)
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
- [Complete Custom Implementation Example](#complete-custom-implementation-example)

## Getting Started

Voice+ with bidirectional mode enabled requires `voiceMini` input mode. This mode allows your application to handle voice commands while still maintaining a conversational flow with the user. This is **all you need** to get an out of the box experience that allows you to navigate your site and fill out forms.

```touchpointui
const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },
  input: "voiceMini", // Enables voice input with bidirectional support
  bidirectional: {},
};

const touchpoint = await create(touchpointOptions);
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
import { analyzePageForms } from "@nlxai/touchpoint-ui";
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

```touchpointui
import { create, analyzePageForms } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
  },
  input: "voiceMini", // Enables voice input with bidirectional support
  bidirectional: {
    automaticContext: false,
  }, // Explicitly enable bidirectional mode.
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
```

## Navigation Command Handler

Customize the handler for voice-driven navigation between pages:

### Payload from NLX

| Key           | Value                                       | Description                             |
| ------------- | ------------------------------------------- | --------------------------------------- |
| `action`      | `page_next`, `page_previous`, `page_custom` | Type of navigation action               |
| `destination` | `/about`                                    | Relative or absolute URL to navigate to |

**Example Payload:**

```json
{
  "classification": "navigation",
  "action": "page_next",
  "destination": "/about"
}
```

### Sample Handler

Touchpoint includes an application-agnostic navigation handler built in to the SDK that leverages `window` based navigation.

If you are using a framework like React, Vue, or Angular, you would use their respective routing libraries to handle navigation in a custom navigation handler.

```touchpointui
function handleNavigation(action, destination) {
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
      // Handle relative or absolute navigation
      if (destination.startsWith("/")) {
        window.location.pathname = destination;
      } else {
        window.location.href = destination;
      }

      break;
  }
}

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
  },
  input: "voiceMini", // Enables voice input with bidirectional support
  bidirectional: {
    automaticContext: false,
    navigation: handleNavigation,
  }, // Explicitly enable bidirectional mode.
};
```

## Form Fill Command Handler

Touchpoint includes an application-agnostic form-input handler built in to the SDK that sets the values received from NLX during a conversation.

To customize the formfill behavior build and specify a custom input handler. NLX will send input commands with field IDs that match the IDs from your `formElements` object returned from analyzePageForms():

**Important Notes:**

- The `field.id` in the command will match the element IDs in your `formElements` object
  - This is different from the element's own `id` attribute. It is unique to Voice+.
  - Voice+ generates its own `id` for reference as the HTML element may not have an `id` at all or the page might violate the HTML spec and assign the same id to multiple elements.
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

```touchpointui
function handleFormInput(fields, formElements) {
  fields.forEach((field) => {
    // Use the stored formElements to find the DOM element
    if (formElements[field.id]) {
      const element = formElements[field.id];
      element.value = field.value;
    } else {
      console.warn(`Field with id "${field.id}" not found in formElements`);
    }
  });
}

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
  },
  input: "voiceMini", // Enables voice input with bidirectional support
  bidirectional: {
    input: handleFormInput,
  }, // Explicitly enable bidirectional mode.
};
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

```touchpointui
function handleCustomCommand(action, payload) {
  // Example: Voice-enabled product search
  if (action === "animalPolicy") {
    setDogPolicy(payload.dog);
    setCatPolicy(payload.cat);
  }
}

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
  },
  input: "voiceMini", // Enables voice input with bidirectional support
  bidirectional: {
    custom: handleCustomCommand,
  }, // Explicitly enable bidirectional mode.
};
```

## Complete Custom Implementation Example

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
      } from "https://unpkg.com/@nlxai/touchpoint-ui@1.1.3/lib/index.js?module";

      // Initialize Enhanced Voice Plus with bidirectional support
      const userId = crypto.randomUUID();
      let formElements = {};

      async function initializeVoicePlus() {
        // Create touchpoint with voiceMini and bidirectional enabled
        const touchpoint = await create({
          config: {
            applicationUrl: "YOUR_APPLICATION_URL",
            headers: {
              "nlx-api-key": "YOUR_API_KEY",
            },
            languageCode: "en-US",
            userId,
          },
          input: "voiceMini",
          bidirectional: {
            automaticContext: false,
            navigation: handleNavigation,
            input: handleFormInput,
            custom: handleCustom,
          },
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

      // Handle navigation commands
      function handleNavigation(action, destination) {
        switch (action) {
          case "page_next":
            window.history.forward();
            break;

          case "page_previous":
            window.history.back();
            break;

          case "page_custom":
            if (destination.startsWith("/")) {
              window.location.pathname = destination;
            } else {
              window.location.href = destination;
            }

            break;
        }
      }

      // Handle form input commands with new structure
      function handleFormInput(fields) {
        fields.forEach((field) => {
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
      function handleCustomCommand(action, payload) {
        console.log("Custom command:", action, payload);

        // Example: Handle custom search command
        if (action === "search") {
          // Implement search functionality
          console.log("Searching for:", payload.query);
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
