- [Enabling Voice Input](#enabling-voice-input)
- [User Experience](#user-experience)
- [Prerequisites](#prerequisites)
- [Customization](#customization)

Touchpoint UI supports voice input to allow your users to talk to your applications over the internet.

## Enabling Voice Input

To enable voice mode, set:

- `userId` to a `"string"` in the `config` objection within the `TouchpointConfiguration`.
- `input` option in your `TouchpointConfiguration` to `"voice"`

<table>
<tr><th>js</th><th>html</th></tr>
<tr>
<td>

```javascript
import { create } from "@nlxai/touchpoint-ui";

const touchpointConfig = {
  config: {
    applicationUrl: "YOUR_NLX_BOT_URL",
    headers: { "nlx-api-key": "YOUR_NLX_API_KEY" },
    languageCode: "en-US",
    userId: "userId", // required to use for voice
  },
  input: "voice", // Key setting to enable voice input
  // Other settings like theme, brandIcon, etc.
};

const touchpoint = await create(touchpointOptions);
```

</td>
<td>

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
  contentLoaded().then(() => {
    return nlxai.touchpointUi.create({
      config: {
        applicationUrl: "REPLACE_WITH_APPLICATION_URL",
        headers: {
          "nlx-api-key": "REPLACE_WITH_API_KEY",
        },
        languageCode: "en-US",
        userId: "REPLACE_WITH_USER_ID",
      },
      colorMode: "dark",
      input: "voice",
      theme: {
        fontFamily: '"Neue Haas Grotesk", sans-serif',
        accent: "#AECAFF",
      },
    });
  });
</script>
```

</td>
</tr>
<table>

## User Experience

- The user clicks the microphone icon to start/stop voice input.
- Visual cues (like the `Ripple` animation) indicate when the application is speaking or listening.

## Prerequisites

- Your NLX application deployment must be configured to support voice integration for the API channels.
- The browser must support the WebRTC APIs.
- Users must grant microphone permission when prompted by the browser.

## Customization

- The visual appearance is controlled by the standard Touchpoint UI [Theming](/touchpoint-ui-theming)
