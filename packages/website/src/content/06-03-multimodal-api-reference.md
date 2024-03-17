
<a name="readmemd"></a>

# @nlxai/voice-compass

## Table of contents

### Interfaces

- [Client](#interfacesclientmd)
- [Config](#interfacesconfigmd)

### Type Aliases

- [Context](#context)

### Functions

- [create](#create)

## Setup

### create

▸ **create**(`options`): [`Client`](#interfacesclientmd)

The starting point of the package. Call create to create a `VoiceCompass` client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Config`](#interfacesconfigmd) | the configuration object |

#### Returns

[`Client`](#interfacesclientmd)

a Voice Compass client

**`Example`**

```typescript
 const client = nlxai.voiceCompass.create({
 // hard-coded params
 apiKey: "REPLACE_WITH_API_KEY",
 workspaceId: "REPLACE_WITH_WORKSPACE_ID",
 journeyId: "REPLACE_WITH_JOURNEY_ID",
 // dynamic params
 conversationId: "REPLACE_WITH_CONVERSATION_ID",
 languageCode: "en-US",
});

client.sendStep("REPLACE_WITH_STEP_ID");
```

#### Defined in

[index.ts:27](https://github.com/nlxai/sdk/blob/790d0f0/packages/voice-compass/src/index.ts#L27)

___

## Client

### Context

Ƭ **Context**: `Record`\<`string`, `any`\>

context to send back to the voice bot, for usage later in the intent.

#### Defined in

[index.ts:115](https://github.com/nlxai/sdk/blob/790d0f0/packages/voice-compass/src/index.ts#L115)

# Interfaces


<a name="interfacesclientmd"></a>

[@nlxai/voice-compass](#readmemd) / Client

## Interface: Client

The VoiceCompass client

### Table of contents

#### Properties

- [sendStep](#sendstep)

### Properties

#### sendStep

• **sendStep**: (`stepId`: `string`, `context?`: [`Context`](#context)) => `Promise`\<`void`\>

*

**`Example`**

```typescript
 const client = nlxai.voiceCompass.create({
 // hard-coded params
 apiKey: "REPLACE_WITH_API_KEY",
 workspaceId: "REPLACE_WITH_WORKSPACE_ID",
 journeyId: "REPLACE_WITH_JOURNEY_ID",
 // dynamic params
 conversationId: "REPLACE_WITH_CONVERSATION_ID",
 languageCode: "en-US",
});

client.sendStep("REPLACE_WITH_STEP_ID", {selectedSeat: "4a"});
```
sends a step to the voice bot

##### Type declaration

▸ (`stepId`, `context?`): `Promise`\<`void`\>

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stepId` | `string` | the next step to transition to. _Note: Must be a valid UUID_ |
| `context?` | [`Context`](#context) | context to send back to the voice bot, for usage later in the intent. |

###### Returns

`Promise`\<`void`\>

##### Defined in

[index.ts:108](https://github.com/nlxai/sdk/blob/790d0f0/packages/voice-compass/src/index.ts#L108)


<a name="interfacesconfigmd"></a>

[@nlxai/voice-compass](#readmemd) / Config

## Interface: Config

Initial configuration used when creating a journey manager

### Table of contents

#### Properties

- [apiKey](#apikey)
- [journeyId](#journeyid)
- [workspaceId](#workspaceid)
- [conversationId](#conversationid)
- [languageCode](#languagecode)
- [debug](#debug)

### Properties

#### apiKey

• **apiKey**: `string`

* the API key generated for the journey.  *

##### Defined in

[index.ts:123](https://github.com/nlxai/sdk/blob/790d0f0/packages/voice-compass/src/index.ts#L123)

___

#### journeyId

• **journeyId**: `string`

the ID of the journey.

##### Defined in

[index.ts:125](https://github.com/nlxai/sdk/blob/790d0f0/packages/voice-compass/src/index.ts#L125)

___

#### workspaceId

• **workspaceId**: `string`

your workspace id

##### Defined in

[index.ts:128](https://github.com/nlxai/sdk/blob/790d0f0/packages/voice-compass/src/index.ts#L128)

___

#### conversationId

• **conversationId**: `string`

the conversation id, passed from the active voice bot.

_Note: This must be dynamically set by the voice bot._

##### Defined in

[index.ts:134](https://github.com/nlxai/sdk/blob/790d0f0/packages/voice-compass/src/index.ts#L134)

___

#### languageCode

• **languageCode**: `string`

the user's language code.

In the browser may be fetched from `navigator.language`, or if the journey doesn't support multiple languages, can be hardcoded.

##### Defined in

[index.ts:140](https://github.com/nlxai/sdk/blob/790d0f0/packages/voice-compass/src/index.ts#L140)

___

#### debug

• `Optional` **debug**: `boolean`

set to true to help debug issues or errors. Defaults to false

##### Defined in

[index.ts:143](https://github.com/nlxai/sdk/blob/790d0f0/packages/voice-compass/src/index.ts#L143)
