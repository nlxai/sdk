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
