# NLX Chat SDK Core

This is the core package of our official JavaScript SDK to communicate with NLX conversational bots.

## Getting started

```js
import createConversation from "@nlxai/chat-core";

// Create some configuration
const config = {
  botUrl: "", // obtain from NLX deployments page
  headers: {
    "nlx-api-key": "", // obtain from NLX deployments page
  },
  userId: "abcd-1234", // optional property to identify the user
  conversationId: "", // start with a specific conversation ID - useful if you want to resume a previous conversation
  languageCode: "es-US", // optional language code for standard bots that do not run on US English
  environment: "production", // optional environment name for multi-environment bots to control which data request environment should be used.  "production" or "development" are the only supported values.
};

// Start the conversation
const convo = createConversation(config);

// Subscribe to changes in the list of responses; the newest response is sent as a second argument
convo.subscribe((responses, newResponse) => {
  console.log(responses);
});

// Send a message from the user's end
convo.sendText("hello");
```

## API reference

The package exports a main function called `createConversation`, which is called with the bot configuration and returns a conversation handler object.

The conversation handler has the following methods. For each send method, conversation context can be optionally specified as a second argument.

#### `sendText: (text: string, context?: Record<string, unknown>) => void`

Send a simple text to your bot.

#### `sendChoice: (choiceId: string, context?: Record<string, unknown>) => void`

Your bot may send a list of choices to choose from, each with a `choiceText` and a `choiceId` field. You can use `choiceText` as button labels, and include the `choiceId` in this method when sending responses.

#### `sendSlots: (slots: Record<string, unknown>, context?: Record<string, unknown>) => void`

Send slot values directly through custom widgets such as interactive maps.

#### `sendIntent: (intentId: string, context?: Record<string, unknown>) => void`

Trigger a specific intent. The most common use of this method is to show welcome messages by sending the `NLX.Welcome` intent.

#### `sendStructured: (request: StructuredRequest, context?: Record<string, unknown>) => void`

Send a combination of choice, slots and intent ID in one request.

#### `subscribe: (subscriber: (responses: Response[], newResponse: Response | undefined) => void) => void`

Subscribe to the current state of messages whenever there is a change. The second argument returns the new response that is triggering the subscription, if there is one.

#### `unsubscribe: (subscriber: (responses: Response[]) => void) => void`

Remove a subscription.

#### `unsubscribeAll: () => void`

Remove all subscriptions.

#### `reset: () => void`

Reset the conversation. This makes sure that information previously collected by your bot will not affect the logic of the conversation any longer.

## Upgrading to 1.0.0

Starting 1.0.0, the language code is automatically appended to the bot URL. If you're upgrading your SDK, please make sure:

- you initialize the app with a `languageCode` parameter (this is now mandatory).
- if you appended the language code to the URL manually before, make sure to remove it (`https://bots.studio.nlx.ai/abcd/efgh` instead of `https://bots.studio.nlx.ai/abcd/efgh-en-US`).

The automatic language code append can be disabled by setting the `config.experimental.completeBotUrl` field to `true`.

## TypeScript

This SDK is written in TypeScript so you can use our type definitions in your project.

## Recipes

### Promise wrapper

This package is intentionally designed with a subscription-based API as opposed to a promise-based one where each message corresponds to a single bot response, available asynchronously.

If you need a promise-based wrapper, you can use the `promisify` helper available in the package:

```ts
import { createConversation, promisify } from "@nlxai/chat-core";

const convo = createConversation(config);

const sendTextWrapped = promisify(convo.sendText, convo);

sendTextWrapped("Hello").then((response) => {
  console.log(response);
});
```

> IMPORTANT: the wrapped promise will resolve with the first available bot response - subsequent, asynchronously arriving responses are ignored. Use this pattern only if you know that there is a single response. This is currently a reasonably safe assumption for bots working over HTTP.

## Contributing

Issues and feature requests are always welcome.

## License

MIT.
