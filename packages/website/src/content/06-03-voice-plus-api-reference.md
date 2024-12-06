
<a name="readmemd"></a>

# @nlxai/voice-plus

## Interfaces

- [Client](#interfacesclientmd)
- [Config](#interfacesconfigmd)

## Setup

### create

▸ **create**(`options`): [`Client`](#interfacesclientmd)

The starting point of the package. Call create to create a Voice+ client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Config`](#interfacesconfigmd) | configuration options for the client |

#### Returns

[`Client`](#interfacesclientmd)

a Voice+ client

**`Example`**

```typescript
 const client = nlxai.voicePlus.create({
 // hard-coded params
 apiKey: "REPLACE_WITH_API_KEY",
 workspaceId: "REPLACE_WITH_WORKSPACE_ID",
 scriptId: "REPLACE_WITH_SCRIPT_ID",
 // dynamic params
 conversationId: "REPLACE_WITH_CONVERSATION_ID",
 languageCode: "en-US",
});

client.sendStep("REPLACE_WITH_STEP_ID");
```

#### Defined in

index.ts:26

___

## Client

### Context

Ƭ **Context**: `Record`\<`string`, `any`\>

[context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) to send back to the voice bot, for usage later in the intent.

#### Defined in

index.ts:121


<a name="indexmd"></a>


# Interfaces


<a name="interfacesclientmd"></a>

## Interface: Client

The Voice+ client

### Properties

#### sendStep

• **sendStep**: (`stepId`: `string`, `context?`: [`Context`](#context)) => `Promise`\<`void`\>

**`Example`**

```typescript
 const client = nlxai.voicePlus.create({
 // hard-coded params
 apiKey: "REPLACE_WITH_API_KEY",
 workspaceId: "REPLACE_WITH_WORKSPACE_ID",
 scriptId: "REPLACE_WITH_SCRIPT_ID",
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

index.ts:114


<a name="interfacesconfigmd"></a>

## Interface: Config

Initial configuration used when creating a journey manager

### Properties

#### apiKey

• **apiKey**: `string`

* the API key generated for the journey.

##### Defined in

index.ts:129

___

#### journeyId

• `Optional` **journeyId**: `string`

The ID of the journey.

**`Deprecated`**

use `scriptId` instead

##### Defined in

index.ts:134

___

#### scriptId

• `Optional` **scriptId**: `string`

the ID of the script.

##### Defined in

index.ts:136

___

#### workspaceId

• **workspaceId**: `string`

your workspace id

##### Defined in

index.ts:139

___

#### conversationId

• **conversationId**: `string`

the conversation id, passed from the active voice bot.

_Note: This must be dynamically set by the voice bot._

##### Defined in

index.ts:146

___

#### languageCode

• **languageCode**: `string`

the user's language code, consistent with the language codes defined on the journey.

##### Defined in

index.ts:151

___

#### debug

• `Optional` **debug**: `boolean`

set to true to help debug issues or errors. Defaults to false

##### Defined in

index.ts:154
