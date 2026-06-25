# Amazon Connect Chat Adapter

An adapter that connects [Amazon Connect Chat](https://docs.aws.amazon.com/connect/latest/adminguide/chat.html) to [Touchpoint UI](../touchpoint-ui/README.md), allowing you to use NLX's Touchpoint widget as the frontend for an Amazon Connect contact flow.

## Getting started

```bash
npm i --save @nlxai/connect-chat-adapter
```

## Usage

### 1. Fetch chat details

Before creating a conversation, you need to obtain chat details by calling the StartChatContact API via your backend endpoint:

```typescript
import { fetchChatDetails } from "@nlxai/connect-chat-adapter";

const details = await fetchChatDetails("https://your-api-gateway-endpoint/start-chat", {
  instanceId: "your-connect-instance-id",
  contactFlowId: "your-contact-flow-id",
  participantDisplayName: "Customer",
});
```

### 2. Create the conversation handler

```typescript
import { createConnectChatConversation } from "@nlxai/connect-chat-adapter";
import { create } from "@nlxai/touchpoint-ui";

const touchpoint = await create({
  conversationHandler: createConnectChatConversation({
    details,
    region: "us-east-1",
  }),
  theme: { accent: "#0972d3" },
});
```

## Configuration

### `ConnectChatConfig`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `ChatDetails` | Yes | Chat details from a prior StartChatContact call |
| `region` | `string` | No | AWS region (defaults to `"us-west-2"`) |
| `languageCode` | `LanguageCode` | No | Language code for the conversation |
| `globalConfig` | `Record<string, unknown>` | No | Global config passed to `connect.ChatSession.setGlobalConfig()` |

### `ChatDetails`

| Property | Type | Description |
| --- | --- | --- |
| `contactId` | `string` | The contact ID |
| `participantId` | `string` | The participant ID |
| `participantToken` | `string` | The participant token used for authentication |

### `DetailsParams`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `instanceId` | `string` | No | Connect instance ID |
| `contactFlowId` | `string` | No | Contact flow ID to use |
| `participantDisplayName` | `string` | No | Customer display name |
| `contactAttributes` | `Record<string, string>` | No | Contact attributes passed to the contact flow |
| `supportedMessagingContentTypes` | `string[]` | No | Content types the participant supports receiving |

# API reference

<!-- include docs/README.md -->
## Functions

### fetchChatDetails()

```ts
function fetchChatDetails(endpoint, params): Promise<ChatDetails>;
```

Fetch chat details via API Gateway endpoint

#### Parameters

##### endpoint

`string`

##### params

[`DetailsParams`](#detailsparams)

#### Returns

`Promise`\<[`ChatDetails`](#chatdetails)\>

---

### createConnectChatConversation()

```ts
function createConnectChatConversation(config): ConversationHandler;
```

Creates a ConversationHandler backed by Amazon Connect Chat via amazon-connect-chatjs.

This adapter conforms to the same interface used by @nlxai/core's `createConversation`,
so it can be passed directly to Touchpoint UI via the `conversationHandler` prop.

#### Parameters

##### config

[`ConnectChatConfig`](#connectchatconfig)

#### Returns

`ConversationHandler`

#### Example

```typescript
import { createConnectChatConversation } from "@nlxai/connect-chat-adapter";
import { create } from "@nlxai/touchpoint-ui";

const touchpoint = await create({
  conversationHandler: createConnectChatConversation({
    details: {
      contactId: "abc-123",
      participantId: "def-456",
      participantToken: "token-xyz",
    },
    region: "us-east-1",
  }),
  theme: { accent: "#0972d3" },
});
```

## Interfaces

### ConnectChatConfig

Configuration for the Amazon Connect Chat adapter.

No AWS access keys or secret keys are required client-side. Authentication
is handled via the participant token returned by the StartChatContact API.

Chat details are obtained via the `fetchChatDetails` call.

#### Properties

##### details

```ts
details: ChatDetails;
```

Pre-obtained chat details from a prior StartChatContact call.

##### region?

```ts
optional region?: string;
```

AWS region (e.g., "us-east-1"). Defaults to "us-west-2".

##### languageCode?

```ts
optional languageCode?: string;
```

Language code for the conversation

##### globalConfig?

```ts
optional globalConfig?: Record<string, unknown>;
```

Optional global config to pass to `connect.ChatSession.setGlobalConfig()`.
See the AmazonConnectChatJS documentation for available options.

---

### ChatDetails

Chat details

#### Properties

##### contactId

```ts
contactId: string;
```

The contact ID

##### participantId

```ts
participantId: string;
```

The participant ID

##### participantToken

```ts
participantToken: string;
```

The participant token used for authentication

---

### DetailsParams

Parameters to pass when calling the `startChatEndpoint`.

#### Properties

##### instanceId?

```ts
optional instanceId?: string;
```

Connect instance ID

##### contactFlowId?

```ts
optional contactFlowId?: string;
```

Contact flow ID to use

##### participantDisplayName?

```ts
optional participantDisplayName?: string;
```

Customer display name

##### contactAttributes?

```ts
optional contactAttributes?: Record<string, string>;
```

Contact attributes passed to the contact flow

##### supportedMessagingContentTypes?

```ts
optional supportedMessagingContentTypes?: string[];
```

Content types the chat participant supports receiving.
Defaults to text/plain, text/markdown, application/json, and interactive messages.

