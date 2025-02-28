The Touchpoint SDK provides access to the underlying [ConversationHandler](/headless-api-reference#interface-conversationhandler) outside of Custom Components via the Touchpoint Instance returned from the top-level create method.

### Use Cases

- Send custom intent after a period of inactivity
- Interact with existing elements on your webpage

## Accessing the ConversationHandler

```js
import { create } from "@nlxai/touchpoint-ui";

const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY",
    },
    languageCode: "en-US",
  },
  theme: { fontFamily: '"Neue Haas Grotesk", sans-serif', accent: "#2663DA" },
};

// Instantiate touchpoint
const touchpoint = await create(touchpointOptions);

// Access the Conversation Handler from the TouchpointInstance

// CUSTOM BEHAVIOR SNIPPET
setTimeout(() => {
  const conversationHandler = touchpoint.conversationHandler;
  if (conversationHandler) {
    conversationHandler.sendIntent("MyCustomIntent");
    touchpoint.expand();
  }
}, 16000);
// CUSTOM BEHAVIOR SNIPPET END
```
