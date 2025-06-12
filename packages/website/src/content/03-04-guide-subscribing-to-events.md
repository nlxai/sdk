- [How to Subscribe to Conversation Updates](#how-to-subscribe-to-conversation-updates)
  - [`subscribe(callback)`](#subscribecallback)
- [Example Use Case: Reacting to Modalities](#example-use-case-reacting-to-modalities)
- [Unsubscribing from Events](#unsubscribing-from-events)
  - [Unsubscribing a Specific Listener](#unsubscribing-a-specific-listener)
  - [Unsubscribing All Listeners](#unsubscribing-all-listeners)
- [Working with Response Objects](#working-with-response-objects)
  - [NLX Response Object Details](#nlx-response-object-details)
  - [User Response Object Details](#user-response-object-details)
  - [Failure Response Object Details](#failure-response-object-details)

## How to Subscribe to Conversation Updates

You use the `conversationHandler.subscribe()` method to register a callback function. This callback is invoked whenever the conversation history changes (e.g., a new message is added).

### `subscribe(callback)`

The `subscribe` method takes a call function that will be called with `(allResponses: Response[], newResponse?: Response)`

| Parameter      | Type         | Description                                                                                                                                                        |
| :------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allResponses` | `Response[]` | An array containing all `Response` objects in the conversation history up to this point. This reflects the complete current state of the conversation.             |
| `newResponse`  | `Response?`  | The most recent `Response` object that triggered this specific callback invocation. It is `undefined` during the initial call when the subscriber first registers. |

The `subscribe` method returns a function that you can call later to unsubscribe this specific callback.

**JavaScript**

```touchpointui
// Assuming 'touchpoint' is initialized as per the setup guide
// const touchpoint = await create({ config: { /* ... */ } });
const { conversationHandler } = touchpoint;

const myConversationListener = (allResponses, newResponse) => {
  console.log("Total messages so far:", allResponses.length);

  if (newResponse) {
    console.log("A new response was received. Type:", newResponse.type);
    // Further processing of newResponse...
  } else {
    console.log("Subscription initialized. Historical messages:", allResponses);
  }
};

// Start listening to conversation updates
const unsubscribeListener = conversationHandler.subscribe(
  myConversationListener,
);

// To stop this specific listener later:
// unsubscribeListener();
```

## Example Use Case: Reacting to Modalities

A common use for `subscribe` is to detect and act upon custom modalities sent by NLX. This example looks for the Modalities to be defined in NLX: `MapDisplay`, `TrackOrder`

```js
// Assuming 'conversationHandler' is obtained

const handleConversationUpdate = (allResponses, newResponse) => {
  if (newResponse && newResponse.type === "bot") {
    const botPayload = newResponse.payload;
    console.log("Bot says:", botPayload.messages.map((m) => m.text).join(" "));

    // Check for a specific custom modality, e.g., "MapDisplay"
    if (botPayload.modalities?.MapDisplay) {
      const mapData = botPayload.modalities.MapDisplay;
      console.log("Received MapDisplay data:", mapData);
      // Example: Call a function to render a map on your page
      // renderMapOnPage(mapData.latitude, mapData.longitude, mapData.zoom);
    }

    // Check for another modality, e.g., "TrackOrder"
    if (botPayload.modalities?.TrackOrder) {
      const orderDetails = botPayload.modalities.TrackOrder;
      // Example: Update UI with order status
      // displayOrderStatus(orderDetails.status, orderDetails.estimatedDelivery);
    }
  } else if (newResponse && newResponse.type === "user") {
    if (newResponse.payload.type === "text") {
      console.log("User sent text:", newResponse.payload.text);
      // Example: Send user messages to an analytics service
      // analytics.track("UserMessageSent", { text: newResponse.payload.text });
    }
  }
};

const unsubscribe = conversationHandler.subscribe(handleConversationUpdate);

// Later, if you need to clean up:
// unsubscribe();
```

## Unsubscribing from Events

It's important to clean up subscriptions when they are no longer needed to prevent memory leaks and unintended behavior, especially in single-page applications or when components are unmounted.

### Unsubscribing a Specific Listener

The `subscribe` method returns a function. Call this function to remove that specific listener.

```js
const unsubscribeMe = conversationHandler.subscribe(mySpecificCallback);
// ... later ...
unsubscribeMe(); // This will stop mySpecificCallback from being called
```

### Unsubscribing All Listeners

To remove all previously registered subscribers from the `conversationHandler`:

```js
conversationHandler.unsubscribeAll();
```

## Working with Response Objects

The `Response` objects provided to your callback give you detailed information about each interaction. The callback receives `allResponses` (an array of all historical `Response` objects) and `newResponse` (the most recent `Response` object, if applicable).

A `Response` object (whether in `allResponses` or as `newResponse`) always has a `type` property that indicates its origin:

| `Response.type` Value | Description                                                  |
| :-------------------- | :----------------------------------------------------------- |
| `"bot"`               | A message or set of messages from the NLX application.       |
| `"user"`              | A message or action initiated by the user.                   |
| `"failure"`           | An error occurred in communication with the NLX application. |

For detailed structures of these objects, refer to the [Headless API Reference](/headless-api-reference).

### NLX Response Object Details

If the `newResponse.type` is `"bot"`, its `payload` contains details from NLX:

| `newResponse.payload` Property | Type / Structure                 | Description                                                                                                                                                    |
| :----------------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `messages`                     | `BotMessage[]`                   | An array of message objects from the bot. See `BotMessage` structure below.                                                                                    |
| `modalities`                   | `Record<string, any>` (Optional) | An object where keys are modality names (e.g., `"MapDisplay"`) and values are their data payloads. This allows for custom UI rendering or client-side actions. |

Each `BotMessage` object within the `payload.messages` array has the following key properties:

| `BotMessage` Property | Type       | Description                                               |
| :-------------------- | :--------- | :-------------------------------------------------------- |
| `text`                | `string`   | The text content of the message.                          |
| `choices`             | `Choice[]` | An array of choice objects offered to the user.           |
| `nodeId`              | `string?`  | Identifier for the flow node that generated this message. |
| `messageId`           | `string?`  | Unique identifier for this specific message.              |

**Example Application Message (Choices)**

```json
{
  "type": "bot",
  "receivedAt": 1701234567890,
  "payload": {
    "conversationId": "conversationId",
    "messages": [
      {
        "messageId": "messageId",
        "nodeId": "nodeId",
        "text": "Hello! How can I help you today?",
        "choices": [
          {
            "choiceId": "choice_product_info",
            "choiceText": "Learn about products"
          },
          {
            "choiceId": "choice_support",
            "choiceText": "Get support"
          }
      }
    ]
  }
}
```

**Example Application Message (modalities)**

```json
{
  "type": "bot",
  "receivedAt": 1701234597890,
  "payload": {
    "messages": [
      {
        "text": "Here's your order information:",
        "choices": []
      }
    ],
    "modalities": {
      "OrderDetails": {
        "orderId": "ORD-12345",
        "status": "Shipped",
        "trackingNumber": "1Z999AA1234567890"
      }
    }
  }
}
```

### User Response Object Details

If the `newResponse.type` is `"user"`, its `payload` provides information about the user's input:

| `newResponse.payload` Property | Type                                     | Description                                                                                             |
| :----------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `type`                         | `"text"` \| `"choice"` \| `"structured"` | Indicates the kind of user input.                                                                       |
| `text`                         | `string`                                 | The text entered by the user. (Present if `payload.type` is `"text"`)                                   |
| `choiceId`                     | `string`                                 | The ID of the choice selected by the user. (Present if `payload.type` is `"choice"`)                    |
| _(Other properties)_           | (Varies)                                 | For `payload.type` `"structured"`, other properties relevant to the structured request will be present. |

**Example User Response (text)**

```json
{
  "type": "user",
  "receivedAt": 1701234577890,
  "payload": {
    "type": "text",
    "text": "I need help with my order",
    "context": {
      "pageUrl": "/orders"
    }
  }
}
```

**Example User Response (choice)**

```json
{
  "type": "user",
  "receivedAt": 1701234587890,
  "payload": {
    "type": "choice",
    "choiceId": "choice_support",
    "context": {}
  }
}
```

### Failure Response Object Details

If the `newResponse.type` is `"failure"`, its `payload` contains error information:

| `newResponse.payload` Property | Type     | Description                                                                                      |
| :----------------------------- | :------- | :----------------------------------------------------------------------------------------------- |
| `text`                         | `string` | A description of the error or failure encountered during communication with the NLX application. |

**Example Failure Message**

```json
{
  "type": "failure",
  "receivedAt": 1701234607890,
  "payload": {
    "text": "We encountered an issue. Please try again soon."
  }
}
```
