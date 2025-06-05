- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
  - [Bidirectional Communication](#bidirectional-communication)
  - [Voice Commands](#voice-commands)
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
const touchpoint = await nlxai.touchpointUi.create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
    conversationId: crypto.randomUUID()
  },
  input: "voiceMini" // Enables bidirectional mode
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

| Classification | Actions | Description |
|---|---|---|
| `navigation` | `page_next`, `page_previous`, `page_custom` | Navigate between pages |
| `input` | Form field updates | Fill form fields with voice data |
| `custom` | Application-specific | Custom commands defined by your flow |

## Sending Page Context

Provide NLX with information about your page structure using the Voice Plus context API. This powers the input / formfill commands for NLX to have context of which fields are available and their types.

```javascript
import { analyzePageForms } from "@nlxai/voice-plus-web";

// Analyze forms on the current page
const { context, formElements } = analyzePageForms();

// Send context to NLX
touchpoint.conversationHandler.sendVoicePlusContext({
  context: context
});
```

## Handling Voice Commands

Register a handler to process voice commands from NLX:

```javascript
touchpoint.conversationHandler.addEventListener("voicePlusCommand", (payload) => {
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
});
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
      if (data.uri) {
        // Handle relative or absolute navigation
        if (data.uri.startsWith('/')) {
          window.location.pathname = data.uri;
        } else {
          window.location.href = data.uri;
        }
      }
      break;
  }
}
```

### Form Fill Commands

Automatically fill form fields based on voice input:


```javascript
function handleFormInput(data) {
  if (!data.formData) return;
  
  Object.entries(data.formData).forEach(([fieldName, value]) => {
    // Find form field by name or id
    const field = document.querySelector(
      `[name="${fieldName}"], #${fieldName}`
    );
    
    if (field) {
      // Update field value
      field.value = value;
      
      // Trigger change event for frameworks
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
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
      behavior: 'smooth' 
    });
  }
}
```

## Browser Requirements

Enhanced Voice Plus requires:
- Modern browser with WebRTC support
- Microphone permissions
- Secure context (HTTPS)


## Complete Implementation Example

A starter example implementing voice-driven form filling and navigation:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Voice Plus Example</title>
  <style>
    .voice-updated {
      animation: highlight 2s ease-out;
    }
    
    @keyframes highlight {
      0% { background-color: #ffeb3b; }
      100% { background-color: transparent; }
    }
  </style>
</head>
<body>
  <form id="contact-form">
    <input type="text" name="firstName" placeholder="First Name" />
    <input type="text" name="lastName" placeholder="Last Name" />
    <input type="email" name="email" placeholder="Email" />
    <input type="tel" name="phone" placeholder="Phone" />
    <textarea name="message" placeholder="Message"></textarea>
    <button type="submit">Submit</button>
  </form>

  <script defer src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
  <script defer src="https://unpkg.com/@nlxai/voice-plus-web/lib/index.umd.js"></script>
  <script>
    // Initialize Enhanced Voice Plus
    const userId = crypto.randomUUID();

    async function initializeVoicePlus() {
      // Create touchpoint with voiceMini
      const touchpoint = await nlxai.touchpointUi.create({
        config: {
          applicationUrl: "YOUR_APPLICATION_URL",
          headers: {
            "nlx-api-key": "YOUR_API_KEY"
          },
          languageCode: "en-US",
          userId,
        },
        input: "voiceMini"
      });
      
      // Send page context when ready
      setTimeout(() => {
        sendPageContext(touchpoint.conversationHandler);
      }, 1000);
      
      // Set up command handler
      setupCommandHandler(touchpoint.conversationHandler);
      
      return touchpoint;
    }

    // Send page context to NLX
    function sendPageContext(handler) {
      const { context } = nlxai.voicePlusWeb.analyzePageForms();
      
      handler.sendVoicePlusContext({
        forms: context,
        pageInfo: {
          title: document.title,
          url: window.location.href
        }
      });
    }

    // Set up voice command handler
    function setupCommandHandler(handler) {
      handler.addEventListener("voicePlusCommand", (payload) => {
        console.log("Voice command received:", payload);
        
        switch (payload.classification) {
          case "navigation":
            handleNavigation(payload.action, payload.data);
            break;
            
          case "input":
            handleFormInput(payload.data);
            break;
            
          case "custom":
            handleCustomCommand(payload.action, payload.data);
            break;
        }
      });
    }

    // Handle navigation commands
    function handleNavigation(action, data) {
      switch (action) {
        case "page_next":
          window.history.forward();
          break;
          
        case "page_previous":
          window.history.back();
          break;
          
        case "page_custom":
          if (data.uri) {
            if (data.uri.startsWith('/')) {
              window.location.pathname = data.uri;
            } else {
              window.location.href = data.uri;
            }
          }
          break;
      }
    }

    // Handle form input commands
    function handleFormInput(data) {
      if (!data.formData) return;
      
      Object.entries(data.formData).forEach(([fieldName, value]) => {
        const field = document.querySelector(
          `[name="${fieldName}"], #${fieldName}`
        );
        
        if (field) {
          field.value = value;
          field.classList.add('voice-updated');
          
          field.dispatchEvent(new Event('input', { bubbles: true }));
          field.dispatchEvent(new Event('change', { bubbles: true }));
          
          setTimeout(() => {
            field.classList.remove('voice-updated');
          }, 2000);
        }
      });
    }

    // Handle custom commands
    function handleCustomCommand(action, data) {
      console.log("Custom command:", action, data);
      // Implement your custom commands here
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

<summary>JavaScript Example</summary>

```javascript
// Initialize Enhanced Voice Plus
const userId = crypto.randomUUID();

async function initializeVoicePlus() {
  // Create touchpoint with voiceMini
  const touchpoint = await nlxai.touchpointUi.create({
    config: {
      applicationUrl: "YOUR_APPLICATION_URL",
      headers: {
        "nlx-api-key": "YOUR_API_KEY"
      },
      languageCode: "en-US",
      userId,
    },
    input: "voiceMini"
  });
  
  // Send page context when ready
  setTimeout(() => {
    sendPageContext(touchpoint.conversationHandler);
  }, 1000);
  
  // Set up command handler
  setupCommandHandler(touchpoint.conversationHandler);
  
  return touchpoint;
}

// Send page context to NLX
function sendPageContext(handler) {
  const { context } = nlxai.voicePlusWeb.analyzePageForms();
  
  handler.sendVoicePlusContext({
    forms: context,
    pageInfo: {
      title: document.title,
      url: window.location.href,
      sections: Array.from(document.querySelectorAll('[data-section]'))
        .map(el => ({
          id: el.id,
          name: el.dataset.section
        }))
    }
  });
}

// Set up voice command handler
function setupCommandHandler(handler) {
  handler.addEventListener("voicePlusCommand", (payload) => {
    console.log("Voice command received:", payload);
    
    switch (payload.classification) {
      case "navigation":
        handleNavigation(payload.action, payload.data);
        break;
        
      case "input":
        handleFormInput(payload.data);
        break;
        
      case "custom":
        handleCustomCommand(payload.action, payload.data);
        break;
    }
  });
}

// Initialize when page loads
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