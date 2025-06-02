- [Managing Expanded State](#managing-expanded-state)
  - [Example Open chat on page load](#example-open-chat-on-page-load)
  - [Example Toggle chat with custom button](#example-toggle-chat-with-custom-button)
  - [Example open chat based on user behavior](#example-open-chat-based-on-user-behavior)
- [Removing Touchpoint from the DOM](#removing-touchpoint-from-the-dom)

The Touchpoint widget's visibility can be dynamically controlled properly removing it from the DOM through the returned [Touchpoint Instance](/touchpoint-ui-api-reference#interfacestouchpointinstancemd).

## Managing Expanded State

The `expanded` property allows you to programmatically show or hide the chat window:

```javascript
// Initialize Touchpoint
import { create } from "@nlxai/touchpoint-ui";

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },
});

// Open the chat window programmatically
touchpoint.expanded = true;

// Close the chat window programmatically
touchpoint.expanded = false;
```

### Example Open chat on page load

If you want the chat widget to be automatically expanded when your page loads:

```javascript
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },
});

// Open immediately after initialization
touchpoint.expanded = true;
```

### Example Toggle chat with custom button

Create your own button to open and close the chat:

```javascript
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },
  // Optionally hide the default launcher
  launchIcon: false,
});

// Add click event to your custom button
document.getElementById("my-chat-button").addEventListener("click", () => {
  touchpoint.expanded = !touchpoint.expanded;
});
```

### Example open chat based on user behavior

Open the chat after a user has been on the page for a certain amount of time:

```javascript
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },
});

// Open chat after 30 seconds
setTimeout(() => {
  touchpoint.expanded = true;
}, 30000);
```

## Removing Touchpoint from the DOM

When you need to completely remove the Touchpoint widget from your page, use the `teardown()` method:

```javascript
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },
});

// Later, when you want to remove the widget:
touchpoint.teardown();
```
