The Touchpoint SDK provides access to the [ConversationHandler](/headless-api-reference#interface-conversationhandler) through the Touchpoint Instance returned from the top-level create method.

```js
import { create } from "@nlxai/touchpoint-ui";
// Instantiate touchpoint with your configuration options
const touchpointOptions = {};
const touchpoint = await create(touchpointOptions);

// Access conversationHandler
const conversationHandler = touchpoint.conversationHandler;
```

## Examples

Touchpoint can be configured with a number of custom behaviors with the [ConversationHandler](/headless-api-reference#interface-conversationhandler).

### Example 1: Open Touchpoint after user inactivity

```js
// Simple countdown to show Touchpoint
const showTouchpointAfterInactivity = (seconds) => {
  let remaining = seconds;

  const countdown = setInterval(() => {
    remaining--;

    if (remaining <= 0) {
      // Clear the interval
      clearInterval(countdown);

      // Open Touchpoint
      touchpoint.expanded = true;
    }
  }, 1000);
};

// Start a 30 second countdown
showTouchpointAfterInactivity(30);
```

### Example 2: Detecting Modalities in Conversation Responses

Uses [subscribe](/headless-api-reference#subscribe) to listen for a [modality](https://docs.studio.nlx.ai/1-build/resources/modalities) named "MapDirections".

```js
const myListenerFunction = (history, message) => {
  // Only process if we have a new bot message
  if (!message || message.type !== "bot") return;
  const modalities = message.payload?.modalities;
  if (!modalities) return;
  if (modalities.MapDirections) console.log(modalities.MapDirections);
};

// Start listening to the conversation
conversationHandler.subscribe(myListenerFunction);
```
