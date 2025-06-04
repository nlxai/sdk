- [Showing and Hiding the Chat Window](#showing-and-hiding-the-chat-window)
  - [Example: Open Chat on Page Load](#example-open-chat-on-page-load)
  - [Example: Toggle Chat with a Custom Button](#example-toggle-chat-with-a-custom-button)
- [Completely Removing Touchpoint UI from the DOM](#completely-removing-touchpoint-ui-from-the-dom)
- [Example: Open Touchpoint UI After User Inactivity](#example-open-touchpoint-ui-after-user-inactivity)

## Showing and Hiding the Chat Window

You can show or hide the Touchpoint UI window by setting the `expanded` boolean property on the `TouchpointInstance`.

- `touchpoint.expanded = true;` opens the chat window.
- `touchpoint.expanded = false;` collapses the chat window to the launch icon (if visible) or hides it if the launch icon is disabled.

**JavaScript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

// Initialize Touchpoint
create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
}).then((touchpoint) => {
  // To open the chat window:
  // touchpoint.expanded = true;

  // To close the chat window:
  // touchpoint.expanded = false;

  // Example: Open the chat window after 2 seconds
  setTimeout(() => {
    touchpoint.expanded = true;
  }, 2000);
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

  contentLoaded()
    .then(() => {
      return nlxai.touchpointUi.create({
        config: {
          applicationUrl: "YOUR_APPLICATION_URL",
          headers: { "nlx-api-key": "YOUR_API_KEY" },
          languageCode: "en-US",
          userId: crypto.randomUUID(),
        },
      });
    })
    .then((touchpoint) => {
      // To open the chat window:
      // touchpoint.expanded = true;

      // To close the chat window:
      // touchpoint.expanded = false;

      // Example: Open the chat window after 2 seconds
      setTimeout(() => {
        touchpoint.expanded = true;
      }, 2000);
    });
</script>
```

### Example: Open Chat on Page Load

To have the Touchpoint UI automatically expanded when your page loads:

**JavaScript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
}).then((touchpoint) => {
  // Open immediately after initialization
  touchpoint.expanded = true;
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

  contentLoaded()
    .then(() => {
      return nlxai.touchpointUi.create({
        config: {
          applicationUrl: "YOUR_APPLICATION_URL",
          headers: { "nlx-api-key": "YOUR_API_KEY" },
          languageCode: "en-US",
          userId: crypto.randomUUID(),
        },
      });
    })
    .then((touchpoint) => {
      // Open immediately after initialization
      touchpoint.expanded = true;
    });
</script>
```

### Example: Toggle Chat with a Custom Button

If you prefer to use your own button to control the Touchpoint UI, disable the default launch icon by setting `launchIcon: false` in the configuration. Then, use the `expanded` property to toggle visibility.

For details on `launchIcon` and custom launch button styling, see the [Theming and Styling guide](/touchpoint-ui-theming#launch-and-brand-icons) and the [Custom Launch guide](/guide-custom-launch).

**JavaScript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
  launchIcon: false, // Disable the default launch button
}).then((touchpoint) => {
  const customButton = document.getElementById("my-custom-chat-button");
  if (customButton) {
    customButton.addEventListener("click", () => {
      touchpoint.expanded = !touchpoint.expanded;
    });
  }
});
```

**HTML**

```html
<button id="my-custom-chat-button">Toggle Chat</button>

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

  contentLoaded()
    .then(() => {
      return nlxai.touchpointUi.create({
        config: {
          applicationUrl: "YOUR_APPLICATION_URL",
          headers: { "nlx-api-key": "YOUR_API_KEY" },
          languageCode: "en-US",
          userId: crypto.randomUUID(),
        },
        launchIcon: false, // Disable the default launch button
      });
    })
    .then((touchpoint) => {
      const customButton = document.getElementById("my-custom-chat-button");
      if (customButton) {
        customButton.addEventListener("click", () => {
          touchpoint.expanded = !touchpoint.expanded;
        });
      }
    });
</script>
```

## Completely Removing Touchpoint UI from the DOM

To entirely remove Touchpoint UI from your page (including its associated DOM elements and event listeners), call the `teardown()` method on the `TouchpointInstance`. This is useful when navigating away from a page in a single-page application or when the chat functionality is no longer needed.

**JavaScript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
}).then((touchpoint) => {
  // To remove Touchpoint (e.g., on a button click or page navigation):
  document
    .getElementById("remove-chat-button")
    .addEventListener("click", () => {
      touchpoint.teardown();
    });
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

  contentLoaded()
    .then(() => {
      return nlxai.touchpointUi.create({
        config: {
          applicationUrl: "YOUR_APPLICATION_URL",
          headers: { "nlx-api-key": "YOUR_API_KEY" },
          languageCode: "en-US",
          userId: crypto.randomUUID(),
        },
      });
    })
    .then((touchpoint) => {
      // To remove Touchpoints (e.g., on a button click or page navigation):
      const removeButton = document.getElementById("remove-chat-button");
      if (removeButton) {
        removeButton.addEventListener("click", () => {
          touchpoint.teardown();
        });
      }
    });
</script>
```

## Example: Open Touchpoint UI After User Inactivity

You can combine these methods with browser events or timers to create more dynamic interactions, such as proactively opening the Touchpoint UI after a period of user inactivity.

**JavaScript**

```javascript
import { create } from "@nlxai/touchpoint-ui";

create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
}).then((touchpoint) => {
  let inactivityTimer;

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    // Do not open if already expanded or if UI has been torn down
    if (touchpoint && !touchpoint.expanded) {
      inactivityTimer = setTimeout(() => {
        if (touchpoint && !touchpoint.expanded) {
          // Double check before expanding
          touchpoint.expanded = true;
        }
      }, 30000); // Open after 30 seconds of inactivity
    }
  };

  // Events that indicate user activity
  const activityEvents = [
    "mousemove",
    "mousedown",
    "keypress",
    "scroll",
    "touchstart",
  ];
  activityEvents.forEach((event) => {
    document.addEventListener(event, resetInactivityTimer, true);
  });

  // Initialize the timer
  resetInactivityTimer();
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

  contentLoaded()
    .then(() => {
      return nlxai.touchpointUi.create({
        config: {
          applicationUrl: "YOUR_APPLICATION_URL",
          headers: { "nlx-api-key": "YOUR_API_KEY" },
          languageCode: "en-US",
          userId: crypto.randomUUID(),
        },
      });
    })
    .then((touchpoint) => {
      let inactivityTimer;

      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        // touchpoint might be null if teardown was called externally
        if (touchpoint && !touchpoint.expanded) {
          inactivityTimer = setTimeout(() => {
            if (touchpoint && !touchpoint.expanded) {
              touchpoint.expanded = true;
            }
          }, 30000); // Open after 30 seconds of inactivity
        }
      };

      const activityEvents = [
        "mousemove",
        "mousedown",
        "keypress",
        "scroll",
        "touchstart",
      ];
      activityEvents.forEach((event) => {
        document.addEventListener(event, resetInactivityTimer, true);
      });

      resetInactivityTimer();
    });
</script>
```
