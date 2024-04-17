
<a name="readmemd"></a>

# @nlxai/voice-compass

## Interfaces

- [Client](#interfacesclientmd)
- [Config](#interfacesconfigmd)

## Setup

### create

▸ **create**(`options`): [`Client`](#interfacesclientmd)

The starting point of the package. Call create to create a `VoiceCompass` client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Config`](#interfacesconfigmd) | configuration options for the client |

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

[index.ts:23](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/voice-compass/src/index.ts#L23)

___

## Client

### Context

Ƭ **Context**: `Record`\<`string`, `any`\>

[context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) to send back to the voice bot, for usage later in the intent.

#### Defined in

[index.ts:110](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/voice-compass/src/index.ts#L110)


<a name="indexmd"></a>


# Interfaces


<a name="interfacesclientmd"></a>

## Interface: Client

The VoiceCompass client

### Properties

#### sendStep

• **sendStep**: (`stepId`: `string`, `context?`: [`Context`](#context)) => `Promise`\<`void`\>

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
| `context?` | [`Context`](#context) | [context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) to send back to the voice bot, for usage later in the intent. |

###### Returns

`Promise`\<`void`\>

##### Defined in

[index.ts:103](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/voice-compass/src/index.ts#L103)


<a name="interfacesconfigmd"></a>

## Interface: Config

Initial configuration used when creating a journey manager

### Properties

#### apiKey

• **apiKey**: `string`

* the API key generated for the journey.

##### Defined in

[index.ts:118](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/voice-compass/src/index.ts#L118)

___

#### journeyId

• **journeyId**: `string`

the ID of the journey.

##### Defined in

[index.ts:120](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/voice-compass/src/index.ts#L120)

___

#### workspaceId

• **workspaceId**: `string`

your workspace id

##### Defined in

[index.ts:123](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/voice-compass/src/index.ts#L123)

___

#### conversationId

• **conversationId**: `string`

the conversation id, passed from the active voice bot.

_Note: This must be dynamically set by the voice bot._

##### Defined in

[index.ts:130](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/voice-compass/src/index.ts#L130)

___

#### languageCode

• **languageCode**: `string`

the user's language code.

In the browser may be fetched from `navigator.language`, or if the journey doesn't support multiple languages, can be hardcoded.

##### Defined in

[index.ts:137](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/voice-compass/src/index.ts#L137)

___

#### debug

• `Optional` **debug**: `boolean`

set to true to help debug issues or errors. Defaults to false

##### Defined in

[index.ts:140](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/voice-compass/src/index.ts#L140)
