
<a name="readmemd"></a>

# @nlxai/multimodal

## Interfaces

- [Client](#interfacesclientmd)
- [Config](#interfacesconfigmd)

## Setup

### create

▸ **create**(`options`): [`Client`](#interfacesclientmd)

The starting point of the package. Call create to create a multimodal client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Config`](#interfacesconfigmd) | configuration options for the client |

#### Returns

[`Client`](#interfacesclientmd)

a multimodal client

**`Example`**

```typescript
 const client = nlxai.multimodal.create({
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

[index.ts:26](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/multimodal/src/index.ts#L26)

___

## Client

### Context

Ƭ **Context**: `Record`\<`string`, `any`\>

[context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) to send back to the voice bot, for usage later in the intent.

#### Defined in

[index.ts:113](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/multimodal/src/index.ts#L113)


<a name="indexmd"></a>


# Interfaces


<a name="interfacesclientmd"></a>

## Interface: Client

The multimodal client

### Properties

#### sendStep

• **sendStep**: (`stepId`: `string`, `context?`: [`Context`](#context)) => `Promise`\<`void`\>

**`Example`**

```typescript
 const client = nlxai.multimodal.create({
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

[index.ts:106](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/multimodal/src/index.ts#L106)


<a name="interfacesconfigmd"></a>

## Interface: Config

Initial configuration used when creating a journey manager

### Properties

#### apiKey

• **apiKey**: `string`

* the API key generated for the journey.

##### Defined in

[index.ts:121](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/multimodal/src/index.ts#L121)

___

#### journeyId

• **journeyId**: `string`

the ID of the journey.

##### Defined in

[index.ts:123](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/multimodal/src/index.ts#L123)

___

#### workspaceId

• **workspaceId**: `string`

your workspace id

##### Defined in

[index.ts:126](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/multimodal/src/index.ts#L126)

___

#### conversationId

• **conversationId**: `string`

the conversation id, passed from the active voice bot.

_Note: This must be dynamically set by the voice bot._

##### Defined in

[index.ts:133](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/multimodal/src/index.ts#L133)

___

#### languageCode

• **languageCode**: `string`

the user's language code, consistent with the language codes defined on the journey.

##### Defined in

[index.ts:138](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/multimodal/src/index.ts#L138)

___

#### debug

• `Optional` **debug**: `boolean`

set to true to help debug issues or errors. Defaults to false

##### Defined in

[index.ts:141](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/multimodal/src/index.ts#L141)
