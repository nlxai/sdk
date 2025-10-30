- [Accessing the ConversationHandler](#accessing-the-conversationhandler)
  - [From the Touchpoint Instance](#from-the-touchpoint-instance)
  - [From Custom Modality Components](#from-custom-modality-components)
- [Sending Messages and Data](#sending-messages-and-data)
  - [`sendText(text, context?)`](#sendtexttext-context)
  - [`sendFlow(flowId, context?)`](#sendflowflowid-context)
  - [`sendWelcomeFlow(context?)`](#sendwelcomeflowcontext)
  - [`sendChoice(choiceId, context?)`](#sendchoicechoiceid-context)
  - [`sendSlots(slots, context?)`](#sendslotsslots-context)
  - [`sendStructured(request, context?)`](#sendstructuredrequest-context)

## Accessing the ConversationHandler

You can access the `ConversationHandler` in two main ways:

### From the Touchpoint Instance

When you initialize Touchpoint UI using the `create` method, it returns a `TouchpointInstance` object. This object contains the `conversationHandler`.

```touchpointui
const touchpointOptions = {
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  // Other Touchpoint UI options
};

const touchpoint = await create(touchpointOptions);
const conversationHandler = touchpoint.conversationHandler;
// Now you can use conversationHandler methods
// Make it globally accessible for other script tags or inline event handlers
window.myAppGlobalConversationHandler = conversationHandler;
```

### From Custom Modality Components

When building [Custom Modality Components](/guide-building-custom-components), the `conversationHandler` is passed as a prop to your component, allowing seamless interaction with the ongoing conversation.

**Component example**

```touchpointui
const MyCustomButtonComponent = ({ data, conversationHandler }) => {
  const myButton = html`
  <TextButton
    label="My Button"
    Icon=${Icons.ArrowForward}
    onClick="${() => {
      conversationHandler.sendChoice(data.buttonId);
    }}}"
  />`;
  return myButton;
};
```

To use this component, you would register it in the `modalityComponents` option when creating the Touchpoint instance.

## Sending Messages and Data

The `ConversationHandler` provides several methods to send information to your NLX application. Most of these methods allow an optional `context` object as the second argument, enabling you to pass context variables to NLX to use in your flows.

💡 In order to use the context variables from Touchpoint in your flow, you need to define each variable as a [Context Variable](https://docs.nlx.ai/platform/build/resources/context-variables) in your NLX workspace. If the context variable is not configured within NLX, the value will not be available in the Flow.

### `sendText(text, context?)`

Use `sendText` to send a free-form text message from the user. This is typically used when your NLX flow expects a textual response, such as capturing a name, email, or any other information for a slot that accepts open-ended input.

**When to use:**

- Responding to an open-ended question from the bot.
- Filling a slot that expects arbitrary text input.

```js
// Assuming 'conversationHandler' is obtained
conversationHandler.sendText("Yes, I'd like to know more about your services.");

// Sending text with context
conversationHandler.sendText("My email is user@example.com", {
  pageSection: "pricingInquiry",
  timestamp: new Date().toISOString(),
});
```

### `sendFlow(flowId, context?)`

Use `sendFlow` to programmatically trigger a specific flow within your NLX application. This is useful for starting the conversation at a particular point or guiding it based on user actions outside the chat interface (e.g., clicking a "Track Order" button on your website).

**When to use:**

- Starting a conversation with a specific purpose (e.g., "CheckOrderStatus").
- Responding to user interactions on your webpage that map to a defined flow.
- Allowing custom components to direct the conversation flow.

```js
// Assuming 'conversationHandler' is obtained
conversationHandler.sendFlow("RequestTechnicalSupport");

// Sending an flow with context variables
conversationHandler.sendFlow("ViewProductDetails", {
  productId: "PROD12345",
  category: "electronics",
});
```

### `sendWelcomeFlow(context?)`

Use `sendWelcomeFlow` to initiate the conversation with the default welcome flow configured in your NLX application. This is automatically called by Touchpoint UI by default when the chat opens (unless `initializeConversation` is overridden), but you can call it manually to restart or refresh the conversation. You can also pass `context` variables to personalize the welcome experience.

**When to use:**

- Starting the conversation when Touchpoint is first opened.
- Providing a "start over" functionality.
- Sending initial context data (like user status or page information) at the beginning of a conversation.

```js
// Assuming 'conversationHandler' is obtained

// Simple welcome flow
conversationHandler.sendWelcomeFlow();

// Welcome flow with initial context
conversationHandler.sendWelcomeFlow({
  userLoggedIn: true,
  entryPoint: "ProductPageWelcome",
  languagePreference: "es-MX",
});
```

Refer to the [Launching with Context guide](/guide-custom-launch) for more on customizing initial interactions.

### `sendChoice(choiceId, context?)`

Use `sendChoice` when the user selects an option from a list of choices presented by the NLX application. These choices might appear as quick replies, buttons in a card, or items in a carousel. The `choiceId` must match one of the `choiceId`s provided by the bot in a previous message.

**When to use:**

- User clicks a quick reply button.
- User selects an item from a [carousel](/touchpoint-carousel) or list that has an associated `choiceId`.
- Responding to a user-choice node that expects a 'label' or 'id' response.

```touchpointui
const MyCustomButtonComponent = ({ data, conversationHandler }) => {
  const myButton = html`<TextButton
    label="My Button"
    Icon=${Icons.ArrowForward}
    onClick="${() => {
      conversationHandler.sendChoice(data.buttonId);
    }}}"
  />`;
  return myButton;
};
```

### `sendSlots(slots, context?)`

Use `sendSlots` to send a collection of slot values to NLX. This is highly useful for providing multiple pieces of information at once, such as filling a form.

Provide an object where keys are the **slot names** (as defined in your NLX Application's "Attached Slots" section for an Flow, or as slot collector node names) and values are the data for those slots.

**When to use:**

- Submitting data from a form within a custom component or your webpage.
- Providing multiple pieces of information gathered through a custom UI.

```js
// Assuming 'conversationHandler' is obtained
// Slot names ('FirstName', 'ProductInterest') must match those in your NLX configuration.
conversationHandler.sendSlots({
  FirstName: "Alex",
  LastName: "Rivera",
  ProductInterest: "Solar Panels",
});

// Sending slots with context
conversationHandler.sendSlots(
  { EmailAddress: "alex.rivera@email.com", ZipCode: "90210" },
  { formName: "leadCaptureForm" },
);
```

### `sendStructured(request, context?)`

`sendStructured` is used for sending a combination of an flow, choice, and/or slots in a single request. This is useful for more complex interactions where multiple pieces of data need to be conveyed simultaneously.

Refer to the [Headless API Reference (`StructuredRequest` type)](/headless-api-reference#interfacesconversationhandlermd) for details on the `request` object structure.

```js
// Assuming 'conversationHandler' is obtained
conversationHandler.sendStructured(
  {
    flowId: "FinalizeOrderFlow", // Trigger a specific flow
    slots: {
      // Provide slot data
      PaymentMethod: "CreditCard",
      ShippingPreference: "Express",
    },
    // choiceId: "confirm_action" // Optionally, also send a choiceId
  },
  { currentCartValue: 150.75 }, // Send along some context
);
```
