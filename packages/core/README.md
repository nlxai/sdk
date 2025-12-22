# NLX SDK Core

The core package of our official JavaScript SDK to communicate with NLX conversational applications.

# Getting started

```bash
npm i --save @nlxai/core
```

```js
import { createConversation } from "@nlxai/core";

// Create some configuration
const config = {
  applicationUrl: "", // obtain from NLX deployments page
  headers: {
    "nlx-api-key": "", // obtain from NLX deployments page
  },
  userId: "abcd-1234", // optional property to identify the user
  conversationId: "", // start with a specific conversation ID - useful if you want to resume a previous conversation
  languageCode: "es-US", // optional language code for standard applications that do not run on US English
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

# Usecases

## Implementing a custom chat widget

Generally we recommend using [Touchpoint](../touchpoint-ui/README.md) for integrating with an application, but if this is unsuitable for some reason, it is not difficult to build a custom widget. Here is a very simple example to get started:

```tsx
import React, { StrictMode, type FC, useState, useEffect } from "react";
import * as ReactDOMClient from "react-dom/client";
import {
  type ConversationHandler,
  createConversation,
  type Response,
  ResponseType,
} from "@nlxai/core";

const App: FC<{ conversation: ConversationHandler }> = ({ conversation }) => {
  const [messages, setMessages] = useState<Response[]>([]);
  const [input, setInput] = useState<string>("");

  // This effect synchronizes component state with the ConversationHandler state
  useEffect(
    () =>
      conversation.subscribe((responses) => {
        setMessages(responses);
      }),
    [conversation],
  );

  return (
    <div className="chat">
      <div className="history">
        {messages.map((msg, idx) => {
          if (msg.type === ResponseType.Application) {
            return (
              <div key={idx}>
                {msg.payload.messages.map((m, i) => (
                  <div key={i} className="app-msg">
                    {m.text}
                  </div>
                ))}
              </div>
            );
          } else if (
            msg.type === ResponseType.User &&
            msg.payload.type === "text"
          ) {
            return (
              <div key={idx} className="user-msg">
                {msg.payload.text}
              </div>
            );
          }
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          conversation.sendText(input);
          setInput("");
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};
const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement!);

const conversation = createConversation({
  applicationUrl:
    "https://apps.nlx.ai/c/Xq3kT5uVOCGipRW8kW9pB/BajtUGSLN5hoqiSmgTA7B",
  headers: {
    "nlx-api-key": "VkvGvxQ-iQQ/EgpgyJQxkDL-OhmhVwzV",
  },
  languageCode: "en-US",
});

conversation.sendWelcomeFlow();

root.render(
  <StrictMode>
    <App conversation={conversation} />
  </StrictMode>,
);
```

[Play with it live](https://playcode.io/react-typescript-playground-hooks--019aca7a-bb1a-76be-adbc-158d25c32b99).

Obviously there are many more features that you could implement, but the advantage of a custom implementation is that you only need to implement the features you will actually be using.

## Implementing a custom channel

If you want your application to communicate through a custom channel, then all you need to do is to deploy a custom NodeJS endpoint (such as AWS Lambda or similar) that uses @nlxai/core to translate the various requests and responses into whatever format your custom channel expects. As an example, here is a way to allow your application to use GitHub Issues as a channel to communicate over (as a Deno app - [explore the implemtentation](https://www.val.town/x/jakubnlx/github-as-an-nlx-channel/code/README.md)):

```typescript
import { Octokit } from "npm:@octokit/core";
import { createConversation, promisify, ResponseType } from "npm:@nlxai/core";

const octokit = new Octokit({
  auth: Deno.env.get("GITHUB_TOKEN"),
});

async function run(user: string, issueNumber: number, body?: string) {
  const conversation = createConversation({
    applicationUrl: Deno.env.get("NLX_APPLICATION_URL"),
    headers: {
      "nlx-api-key": Deno.env.get("NLX_API_KEY"),
    },
    languageCode: "en-US",
    conversationId: `issue-${issueNumber}`,
    userId: user,
  });
  const sendWelcomeFlow = promisify(conversation.sendWelcomeFlow, conversation);
  const sendText = promisify(conversation.sendText, conversation);
  let response;
  if (!body) {
    response = await sendWelcomeFlow();
  } else {
    response = await sendText(body);
  }
  if (response.type === ResponseType.Application) {
    for (const message of response.payload.messages) {
      await postComment(issueNumber, message.text);
    }
  }
}

async function postComment(issueNumber: number, body: string) {
  await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: Deno.env.get("GITHUB_OWNER"),
      repo: Deno.env.get("GITHUB_REPO"),
      issue_number: issueNumber,
      body: body,
    },
  );
}

export default async function (req: Request): Promise<Response> {
  try {
    const event = req.headers.get("X-GitHub-Event") || "unknown";
    const body = await req.text();
    const payload = JSON.parse(body);

    console.log(`GitHub webhook: ${event} event received`);
    if (event === "issues" && payload.action === "opened") {
      await run(payload.issue.user.login, payload.issue.number);
    }
    if (
      event === "issue_comment" &&
      payload.action === "created" &&
      payload.comment.user.login !== Deno.env.get("GITHUB_OWNER")
    ) {
      console.log("user", payload.comment.user.login);
      await run(
        payload.comment.user.login,
        payload.issue.number,
        payload.comment.body,
      );
    }

    // Handle other events
    return Response.json({
      status: "received",
      event,
      action: payload.action || null,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json(
      {
        error: "Processing failed",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
```

# API reference

<!-- include docs/README.md -->
## Functions

### createConversation()

```ts
function createConversation(configuration): ConversationHandler;
```

Call this to create a conversation handler.

#### Parameters

##### configuration

[`Config`](#config)

The necessary configuration to create the conversation.

#### Returns

[`ConversationHandler`](#conversationhandler)

The [ConversationHandler](#conversationhandler) is a bundle of functions to interact with the conversation.

#### Example

```typescript
import { createConversation } from "@nlx/core";

const conversation = createConversation({
  applicationUrl: "https://apps.nlx.ai/c/cfab3-243ad-232dc",
  headers: {
    "nlx-api-key": "4393029032-dwsd",
  },
  userId: "abcd-1234",
  languageCode: "en-US",
});
```

---

### isConfigValid()

```ts
function isConfigValid(configuration): boolean;
```

Check whether a configuration is valid.

#### Parameters

##### configuration

[`Config`](#config)

Conversation configuration

#### Returns

`boolean`

Whether the configuration is valid?

---

### shouldReinitialize()

```ts
function shouldReinitialize(config1, config2): boolean;
```

Helper method to decide when a new [Config](#config) requires creating a new [ConversationHandler](#conversationhandler) or whether the old `Config`'s
`ConversationHandler` can be used.

The order of configs doesn't matter.

#### Parameters

##### config1

[`Config`](#config)

##### config2

[`Config`](#config)

#### Returns

`boolean`

true if `createConversation` should be called again

---

### getCurrentExpirationTimestamp()

```ts
function getCurrentExpirationTimestamp(responses): number | null;
```

Get current expiration timestamp from a list of responses. Can be used to determine if a conversation has timed out.

#### Parameters

##### responses

[`Response`](#response)[]

The current list of user and application responses (first argument in the subscribe callback)

#### Returns

`number` \| `null`

An expiration timestamp in Unix Epoch (`new Date().getTime()`), or `null` if this is not known (typically occurs if the application has not responded yet)

#### Example

```typescript
import { useState } from "react";
import { getCurrentExpirationTimestamp } from "@nlxai/core";

const [isTimedOut, setIsTimedOut] = useState(false);

conversation.subscribe((responses) => {
  const expirationTimestamp = getCurrentExpirationTimestamp(responses);
  if (expirationTimestamp != null && expirationTimestamp < new Date().getTime()) {
    setIsTimedOut(true);
  }
});

return (<div>
  {isTimedOut ? (
    <p>Your session has timed out. Please start a new conversation.</p>
  ) : (
    <p>Your session is active.</p>
  )}
</div>
```

---

### promisify()

```ts
function promisify<Params>(
  fn,
  convo,
  timeout,
): (payload) => Promise<Response | null>;
```

This package is intentionally designed with a subscription-based API as opposed to a promise-based one where each message corresponds to a single application response, available asynchronously.

If you need a promise-based wrapper, you can use the `promisify` helper available in the package:

#### Type Parameters

##### Params

`Params`

the type of the function's params, e.g. for `sendText` it's `text: string, context?: Context`

#### Parameters

##### fn

(`payload`) => `void`

the function to wrap (e.g. `convo.sendText`, `convo.sendChoice`, etc.)

##### convo

[`ConversationHandler`](#conversationhandler)

the `ConversationHandler` (from [createConversation](#createconversation))

##### timeout

`number` = `10000`

the timeout in milliseconds

#### Returns

A promise-wrapped version of the function. The function, when called, returns a promise that resolves to the Conversation's next response.

```ts
(payload): Promise<Response | null>;
```

##### Parameters

###### payload

`Params`

##### Returns

`Promise`\<[`Response`](#response) \| `null`\>

#### Example

```typescript
import { createConversation, promisify } from "@nlxai/core";

const convo = createConversation(config);

const sendTextWrapped = promisify(convo.sendText, convo);

sendTextWrapped("Hello").then((response) => {
  console.log(response);
});
```

## Variables

### version

```ts
const version: string = packageJson.version;
```

Package version

## Interfaces

### Config

The configuration necessary to create a conversation.

#### Properties

##### applicationUrl?

```ts
optional applicationUrl: string;
```

The URL at which your conversational application is running.
Fetch this from the application's API channel tab.

##### headers

```ts
headers: Record<string, string> & object;
```

Headers to forward to the NLX API.

###### Type Declaration

###### nlx-api-key

```ts
nlx-api-key: string;
```

The `nlx-api-key` is required. Fetch this from the application's API channel tab.

##### conversationId?

```ts
optional conversationId: string;
```

Set `conversationId` to continue an existing conversation. If not set, a new conversation will be started (and a new conversationId will be generated internally).

##### userId?

```ts
optional userId: string;
```

Setting the `userID` allows it to be searchable in application history, as well as usable via `{System.userId}` in the flow.

##### responses?

```ts
optional responses: Response[];
```

When `responses` is set, initialize the chatHandler with historical messages. This is useful when restoring a previous conversation, that perhaps started on a different page.

##### failureMessage?

```ts
optional failureMessage: string;
```

When set, this overrides the default failure message ("We encountered an issue. Please try again soon.").

##### languageCode

```ts
languageCode: string;
```

The language code to use for the application. In the browser this can be fetched with `navigator.language`.
If you don't have translations, hard-code this to the language code you support.

##### bidirectional?

```ts
optional bidirectional: boolean;
```

Specifies whether the conversation is using bidirectional Voice+ (if so, an additional command socket will be opened).

---

### ConversationHandler

A bundle of functions to interact with a conversation, created by [createConversation](#createconversation).

#### Properties

##### sendText()

```ts
sendText: (text, context?) => void;
```

Send user's message

###### Parameters

###### text

`string`

the user's message

###### context?

[`Context`](#context)

[Context](https://docs.nlx.ai/platform/nlx-platform-guide/build-with-nlx/flows/context-variables#what-are-context-variables) for usage later in the flow.

###### Returns

`void`

##### sendSlots()

```ts
sendSlots: (slots, context?) => void;
```

Send [slots](https://docs.nlx.ai/platform/nlx-platform-guide/build-with-nlx/flows/slots-custom#slot-settings) to the application.

###### Parameters

###### slots

[`SlotsRecordOrArray`](#slotsrecordorarray)

The slots to populate

###### context?

[`Context`](#context)

[Context](https://docs.nlx.ai/platform/nlx-platform-guide/build-with-nlx/flows/context-variables#what-are-context-variables) for usage later in the flow.

###### Returns

`void`

##### sendChoice()

```ts
sendChoice: (choiceId, context?, metadata?) => void;
```

Respond to [a choice](https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/nodes#user-choice) from the application.

###### Parameters

###### choiceId

`string`

The `choiceId` is in the [ApplicationResponse](#applicationresponse)'s `.payload.messages[].choices[].choiceId` fields

###### context?

[`Context`](#context)

[Context](https://docs.nlx.ai/platform/nlx-platform-guide/build-with-nlx/flows/context-variables#what-are-context-variables) for usage later in the flow.

###### metadata?

[`ChoiceRequestMetadata`](#choicerequestmetadata)

links the choice to the specific message and node in the conversation.

###### Returns

`void`

##### sendWelcomeFlow()

```ts
sendWelcomeFlow: (context?) => void;
```

Trigger the welcome flow. This should be done when the user starts interacting with the conversation.

###### Parameters

###### context?

[`Context`](#context)

[Context](https://docs.nlx.ai/platform/nlx-platform-guide/build-with-nlx/flows/context-variables#what-are-context-variables) for usage later in the flow.

###### Returns

`void`

##### sendFlow()

```ts
sendFlow: (flowId, context?) => void;
```

Trigger a specific flow.

###### Parameters

###### flowId

`string`

the flow to trigger. The id is the name under the application's _Intents_.

###### context?

[`Context`](#context)

[Context](https://docs.nlx.ai/platform/nlx-platform-guide/build-with-nlx/flows/context-variables#what-are-context-variables) for usage later in the intent.

###### Returns

`void`

##### sendContext()

```ts
sendContext: (context) => Promise<void>;
```

Send context without sending a message

###### Parameters

###### context

[`Context`](#context)

[Context](https://docs.nlx.ai/platform/nlx-platform-guide/build-with-nlx/flows/context-variables#what-are-context-variables) for usage later in the intent.

###### Returns

`Promise`\<`void`\>

##### appendMessageToTranscript()

```ts
appendMessageToTranscript: (response) => void;
```

Append messages manually to the transcript. This is an advanced feature that allows routing and aggregation of different chat message
sources.

###### Parameters

###### response

the response with optional timestamps.

`Omit`\<[`ApplicationResponse`](#applicationresponse), `"receivedAt"`\> & `object` | `Omit`\<[`UserResponse`](#userresponse), `"receivedAt"`\> & `object` | `Omit`\<[`FailureMessage`](#failuremessage-1), `"receivedAt"`\> & `object`

###### Returns

`void`

##### sendStructured()

```ts
sendStructured: (request, context?) => void;
```

Send a combination of choice, slots, and intent in one request.

###### Parameters

###### request

[`StructuredRequest`](#structuredrequest)

###### context?

[`Context`](#context)

[Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.

###### Returns

`void`

##### submitFeedback()

```ts
submitFeedback: (url, feedback) => Promise<void>;
```

Submit feedback about a response.

###### Parameters

###### url

`string`

The URL comming from the Application response `metadata.feedbackURL` field.

###### feedback

Either a numerical rating or a textual comment.

\{
`rating`: `number`;
\} | \{
`comment`: `string`;
\}

###### Returns

`Promise`\<`void`\>

##### subscribe()

```ts
subscribe: (subscriber) => () => void;
```

Subscribe a callback to the conversation. On subscribe, the subscriber will receive all of the Responses that the conversation has already received.

###### Parameters

###### subscriber

[`Subscriber`](#subscriber)

The callback to subscribe

###### Returns

A function to unsubscribe the callback.

```ts
(): void;
```

###### Returns

`void`

##### unsubscribe()

```ts
unsubscribe: (subscriber) => void;
```

Unsubscribe a callback from the conversation.

###### Parameters

###### subscriber

[`Subscriber`](#subscriber)

The callback to unsubscribe

###### Returns

`void`

##### unsubscribeAll()

```ts
unsubscribeAll: () => void;
```

Unsubscribe all callback from the conversation.

###### Returns

`void`

##### currentConversationId()

```ts
currentConversationId: () => string | undefined;
```

Get the current conversation ID if it's set, or undefined if there is no conversation.

###### Returns

`string` \| `undefined`

##### currentLanguageCode()

```ts
currentLanguageCode: () => string;
```

Get the current language code

###### Returns

`string`

##### setLanguageCode()

```ts
setLanguageCode: (languageCode) => void;
```

Set the language code

###### Parameters

###### languageCode

`string`

###### Returns

`void`

##### reset()

```ts
reset: (options?) => void;
```

Forces a new conversation. If `clearResponses` is set to true, will also clear historical responses passed to subscribers.
Retains all existing subscribers.

###### Parameters

###### options?

###### clearResponses?

`boolean`

If set to true, will clear historical responses passed to subscribers.

###### Returns

`void`

##### destroy()

```ts
destroy: () => void;
```

Removes all subscribers and, if using websockets, closes the connection.

###### Returns

`void`

##### setRequestOverride()

```ts
setRequestOverride: (override) => void;
```

Optional [RequestOverride](#requestoverride) function used to bypass the application request and handle them in a custom fashion

###### Parameters

###### override

[`RequestOverride`](#requestoverride) | `undefined`

###### Returns

`void`

##### addEventListener()

```ts
addEventListener: (event, handler) => void;
```

Add a listener to one of the handler's custom events

###### Parameters

###### event

`"voicePlusCommand"`

###### handler

(`payload`) => `void`

###### Returns

`void`

##### removeEventListener()

```ts
removeEventListener: (event, handler) => void;
```

Remove a listener to one of the handler's custom events

###### Parameters

###### event

`"voicePlusCommand"`

###### handler

(`payload`) => `void`

###### Returns

`void`

---

### SlotValue

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

An array of `SlotValue` objects is equivalent to a [SlotsRecord](#slotsrecord).

#### Properties

##### slotId

```ts
slotId: string;
```

The attached slot's name

##### value

```ts
value: any;
```

Usually this will be a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

---

### ApplicationResponse

A message from the application

See also:

- [UserResponse](#userresponse)
- [FailureMessage](#failuremessage-1)
- [Response](#response)

#### Properties

##### type

```ts
type: Application;
```

The application response type

##### receivedAt

```ts
receivedAt: number;
```

When the response was received

##### payload

```ts
payload: ApplicationResponsePayload;
```

The payload of the response

---

### ApplicationResponsePayload

The payload of the application response

#### Properties

##### expirationTimestamp?

```ts
optional expirationTimestamp: number;
```

If there isn't some interaction by this time, the conversation will expire.

##### conversationId?

```ts
optional conversationId: string;
```

The active conversation ID. If not set, a new conversation will be started.

##### messages

```ts
messages: ApplicationMessage[];
```

Any messages from the application.

##### metadata?

```ts
optional metadata: ApplicationResponseMetadata;
```

Global state about the current conversation
as well as whether the client should poll for more application responses.

##### payload?

```ts
optional payload: string;
```

If configured, the [node's payload.](See: https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/advanced-messaging-+-functionality#add-functionality)

##### modalities?

```ts
optional modalities: ModalityPayloads;
```

If configured, the node's modalities and their payloads.

##### context?

```ts
optional context: Context;
```

If the node is set to send context, the whole context associated with the conversation.

---

### ApplicationResponseMetadata

Global state about the current conversation
as well as whether the client should poll for more application responses.

#### Properties

##### intentId?

```ts
optional intentId: string;
```

The conversation's intent

##### escalation?

```ts
optional escalation: boolean;
```

Whether the current conversation has been marked as incomprehension.

##### frustration?

```ts
optional frustration: boolean;
```

Whether the current conversation has been marked frustrated

##### incomprehension?

```ts
optional incomprehension: boolean;
```

Whether the current conversation has been marked as incomprehension.

##### uploadUrls

```ts
uploadUrls: UploadUrl[];
```

Upload URL's

##### hasPendingDataRequest?

```ts
optional hasPendingDataRequest: boolean;
```

Whether the client should poll for more application responses.

##### sources?

```ts
optional sources: KnowledgeBaseResponseSource[];
```

Knowledge base sources

##### feedbackUrl?

```ts
optional feedbackUrl: string;
```

URL to use for submitting feedback about this response. See `feedbackConfig` for what the expected feedback type is.

You can pass this as the first argument to `submitFeedback`.

##### feedbackConfig?

```ts
optional feedbackConfig: FeedbackConfiguration;
```

If present, the application would like to collect feedback from the user.

---

### KnowledgeBaseResponseSource

Response for knowlege base sources

#### Properties

##### fileName?

```ts
optional fileName: string;
```

File name

##### pageNumber?

```ts
optional pageNumber: number;
```

Page number

##### content?

```ts
optional content: string;
```

Content

##### metadata?

```ts
optional metadata: Record<string, unknown>;
```

Metadata

##### presignedUrl?

```ts
optional presignedUrl: string;
```

Presigned URL for direct retrieval

---

### ApplicationMessageMetadata

Metadata for the individual application message
as well as whether the client should poll for more application responses.

#### Properties

##### intentId?

```ts
optional intentId: string;
```

The message node's intent

---

### ApplicationMessage

A message from the application, as well as any choices the user can make.

#### Properties

##### messageId?

```ts
optional messageId: string;
```

A unique identifier for the message.

##### nodeId?

```ts
optional nodeId: string;
```

The node id that this message is associated with.
This is must be sent with a choice when the user is changing a previously sent choice.

##### text

```ts
text: string;
```

The body of the message. Show this to the user.

##### choices

```ts
choices: Choice[];
```

A selection of choices to show to the user. They may choose one of them.

##### metadata?

```ts
optional metadata: ApplicationMessageMetadata;
```

Metadata

##### selectedChoiceId?

```ts
optional selectedChoiceId: string;
```

After a choice has been made by the user, this will be updated locally to the selected choice id.
This field is set locally and does not come from the application.

---

### UploadUrl

The upload destination for handling conversing with files

#### Properties

##### url

```ts
url: string;
```

The URL of the upload

##### uploadId

```ts
uploadId: string;
```

The ID of the upload

---

### Choice

A choices to show to the user.

#### Properties

##### choiceId

```ts
choiceId: string;
```

`choiceId` is used by `sendChoice` to let the user choose this choice.

##### choiceText

```ts
choiceText: string;
```

The text of the choice

##### choicePayload?

```ts
optional choicePayload: any;
```

An optional, schemaless payload for the choice.

---

### UserResponse

A message from the user

See also:

- [ApplicationResponse](#applicationresponse)
- [FailureMessage](#failuremessage-1)
- [Response](#response)

#### Properties

##### type

```ts
type: User;
```

The user response type

##### receivedAt

```ts
receivedAt: number;
```

When the response was received

##### payload

```ts
payload: UserResponsePayload;
```

The payload of the response

---

### FailureMessage

A failure message is received when the NLX api is unreachable, or sends an unparsable response.

#### Properties

##### type

```ts
type: Failure;
```

The failure response type

##### payload

```ts
payload: object;
```

The payload only includes an error message.

###### text

```ts
text: string;
```

The error message is either the default, or the `failureMessage` set in the [Config](#config).

##### receivedAt

```ts
receivedAt: number;
```

When the failure occurred.

---

### FeedbackConfiguration

Configuration for feedback collection. You can use this to render an appropriate feedback widget in your application.

#### Properties

##### feedbackId

```ts
feedbackId: string;
```

Unique identifier for the feedback collection.

##### feedbackName

```ts
feedbackName: string;
```

Human readable name of this feedback collection.

##### feedbackType

```ts
feedbackType: object;
```

Type of feedback being collected.
At the moment only binary feedback is supported, but we plan to introduce more types in the future.
Hence your code should make sure to check the `type` attribute to make sure the expected feedback type is handled.

###### type

```ts
type: "binary";
```

A binary feedback type is a thumbs up/down sort of choice.

###### config

```ts
config: object;
```

Configuration specific to binary feedback.

###### config.positiveValue

```ts
positiveValue: number;
```

Value to send for positive feedback. Default `1`.

###### config.negativeValue

```ts
negativeValue: number;
```

Value to send for negative feedback. Default `-1`.

##### commentsEnabled

```ts
commentsEnabled: boolean;
```

Whether comments are enabled for this feedback collection.

##### question?

```ts
optional question: string;
```

Optional question to show to the user when collecting feedback.

##### labels

```ts
labels: object;
```

Labels for individual feedback UI elements as customised by the builder.

###### positive?

```ts
optional positive: string;
```

Label for positive feedback

###### negative?

```ts
optional negative: string;
```

Label for negative feedback

---

### StructuredRequest

The body of `sendStructured`
Includes a combination of choice, slots, and intent in one request.

#### Properties

##### choiceId?

```ts
optional choiceId: string;
```

The `choiceId` is in the [ApplicationResponse](#applicationresponse)'s `.payload.messages[].choices[].choiceId` fields

##### nodeId?

```ts
optional nodeId: string;
```

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [ApplicationMessage](#applicationmessage).

##### ~~intentId?~~

```ts
optional intentId: string;
```

The intent to trigger. The `intentId` is the name under the application's _Intents_.

###### Deprecated

use `flowId` instead.

##### flowId?

```ts
optional flowId: string;
```

The flow to trigger. The `flowId` is the name under the application's _Flows_.

##### slots?

```ts
optional slots: SlotsRecordOrArray;
```

The slots to populate

##### uploadIds?

```ts
optional uploadIds: string[];
```

Upload ID

##### utterance?

```ts
optional utterance: string;
```

Upload utterance

---

### ApplicationRequest

The request data actually sent to the application, slightly different from [UserResponsePayload](#userresponsepayload-1), which includes some UI-specific information

#### Properties

##### conversationId?

```ts
optional conversationId: string;
```

The current conversation ID

##### userId?

```ts
optional userId: string;
```

The current user ID

##### context?

```ts
optional context: Context;
```

Request context, if applicable

##### request

```ts
request: object;
```

Main request

###### unstructured?

```ts
optional unstructured: object;
```

Unstructured request

###### unstructured.text

```ts
text: string;
```

Request body text

###### structured?

```ts
optional structured: StructuredRequest & object;
```

Structured request

###### Type Declaration

###### slots?

```ts
optional slots: SlotValue[];
```

Only array-form slots are allowed for the purposes of sending to the backend

---

### VoiceCredentials

Credentials to connect to a Voice channel

#### Properties

##### url

```ts
url: string;
```

Voice Connection URL

##### roomName

```ts
roomName: string;
```

Voice room name

##### token

```ts
token: string;
```

Voice token

##### participantName

```ts
participantName: string;
```

Voice participant name

---

### ChoiceRequestMetadata

Helps link the choice to the specific message in the conversation.

#### Properties

##### responseIndex?

```ts
optional responseIndex: number;
```

The index of the [Response](#response) associated with this choice.
Setting this ensures that local state's `selectedChoiceId` on the corresponding [ApplicationResponse](#applicationresponse) is set.
It is not sent to the application.

##### messageIndex?

```ts
optional messageIndex: number;
```

The index of the [ApplicationMessage](#applicationmessage) associated with this choice.
Setting this ensures that local state's `selectedChoiceId` on the corresponding [ApplicationResponse](#applicationresponse) is set.
It is not sent to the application.

##### nodeId?

```ts
optional nodeId: string;
```

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [ApplicationMessage](#applicationmessage).

##### intentId?

```ts
optional intentId: string;
```

Intent ID, used for sending to the NLU to allow it to double-check

---

### VoicePlusMessage

Messages sent to the Voice+ socket

#### Properties

##### context

```ts
context: any;
```

Voice+ context

---

### EventHandlers

Dictionary of handler methods per event

#### Properties

##### voicePlusCommand()

```ts
voicePlusCommand: (payload) => void;
```

Voice+ command event handler

###### Parameters

###### payload

`any`

###### Returns

`void`

## Enumerations

### ResponseType

Response type

#### Enumeration Members

##### Application

```ts
Application: "bot";
```

Response from the application

##### User

```ts
User: "user";
```

Response from the user

##### Failure

```ts
Failure: "failure";
```

Generic failure (cannot be attributed to the application)

## Events

### ConversationHandlerEvent

```ts
type ConversationHandlerEvent = "voicePlusCommand";
```

Handler events
voicePlusCommand

## Type Aliases

### Context

```ts
type Context = Record<string, any>;
```

[Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.

---

### SlotsRecord

```ts
type SlotsRecord = Record<string, any>;
```

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

`SlotRecord` Keys are the attached slot's name

`SlotRecord` Values are usually a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

A `SlotsRecord` is equivalent to an array of [SlotValue](#slotvalue) objects.

---

### SlotsRecordOrArray

```ts
type SlotsRecordOrArray = SlotsRecord | SlotValue[];
```

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

Supports either a [SlotsRecord](#slotsrecord) or an array of [SlotValue](#slotvalue) objects

---

### ModalityPayloads

```ts
type ModalityPayloads = Record<string, any>;
```

Payloads for modalities as a key-value pair by modality name

---

### UserResponsePayload

```ts
type UserResponsePayload =
  | {
      type: "text";
      text: string;
      context?: Context;
    }
  | {
      type: "choice";
      choiceId: string;
      context?: Context;
    }
  | (object & StructuredRequest);
```

The payload of the user response

#### Type Declaration

```ts
{
  type: "text";
  text: string;
  context?: Context;
}
```

##### type

```ts
type: "text";
```

Set when `sendText` is called.

##### text

```ts
text: string;
```

The user's message

##### context?

```ts
optional context: Context;
```

[Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.

```ts
{
  type: "choice";
  choiceId: string;
  context?: Context;
}
```

##### type

```ts
type: "choice";
```

Set when `sendChoice` is called.

##### choiceId

```ts
choiceId: string;
```

The `choiceId` passed to `sendChoice`
Correlates to a `choiceId` in the [ApplicationResponse](#applicationresponse)'s `.payload.messages[].choices[].choiceId` fields

##### context?

```ts
optional context: Context;
```

[Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.

`object` & [`StructuredRequest`](#structuredrequest)

---

### Response

```ts
type Response = ApplicationResponse | UserResponse | FailureMessage;
```

A response from the application or the user.

---

### Time

```ts
type Time = number;
```

The time value in milliseconds since midnight, January 1, 1970 UTC.

---

### NormalizedStructuredRequest

```ts
type NormalizedStructuredRequest = StructuredRequest & object;
```

Normalized structured request with a single way to represent slots

#### Type Declaration

##### slots?

```ts
optional slots: SlotValue[];
```

Only array-form slots are allowed for the purposes of sending to the backend

---

### LanguageCode

```ts
type LanguageCode = string;
```

Language code named for clarity, may restrict it to a finite list

---

### RequestOverride()

```ts
type RequestOverride = (applicationRequest, appendResponse) => void;
```

Instead of sending a request to the application, handle it in a custom fashion

#### Parameters

##### applicationRequest

[`ApplicationRequest`](#applicationrequest)

The [ApplicationRequest](#applicationrequest) that is being overridden

##### appendResponse

(`res`) => `void`

A method to append the [ApplicationResponsePayload](#applicationresponsepayload-1) to the message history

#### Returns

`void`

---

### VoicePlusContext

```ts
type VoicePlusContext = any;
```

Voice+ context, type to be defined

---

### Subscriber()

```ts
type Subscriber = (response, newResponse?) => void;
```

The callback function for listening to all responses.

#### Parameters

##### response

[`Response`](#response)[]

##### newResponse?

[`Response`](#response)

#### Returns

`void`

