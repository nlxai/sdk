<a name="readmemd"></a>

# @nlxai/voice-plus-core

## Interfaces

- [Client](#interfacesclientmd)
- [Config](#interfacesconfigmd)

## Setup

### create

▸ **create**(`options`): [`Client`](#interfacesclientmd)

The starting point of the package. Call create to create a Voice+ client.

#### Parameters

| Name      | Type                            | Description                          |
| :-------- | :------------------------------ | :----------------------------------- |
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

[index.ts:26](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L26)

---

## Client

### Context

Ƭ **Context**: `Record`\<`string`, `any`\>

[context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) to send back to the voice bot, for usage later in the intent.

#### Defined in

[index.ts:143](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L143)

## Other

### StepInfo

Ƭ **StepInfo**: `string` \| \{ `stepId`: `string` ; `stepTriggerDescription?`: `string` }

Step information, either a step ID as a single string or an object

#### Defined in

[index.ts:95](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L95)

<a name="indexmd"></a>

# Interfaces

<a name="interfacesclientmd"></a>

## Interface: Client

The Voice+ client

### Properties

#### sendStep

• **sendStep**: (`step`: [`StepInfo`](#stepinfo), `context?`: [`Context`](#context)) => `Promise`\<`void`\>

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

client.sendStep("REPLACE_WITH_STEP_ID", { selectedSeat: "4a" });
```

sends a step to the voice bot

##### Type declaration

▸ (`step`, `context?`): `Promise`\<`void`\>

###### Parameters

| Name       | Type                    | Description                                                                                                                                                              |
| :--------- | :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `step`     | [`StepInfo`](#stepinfo) | the next step to transition to, either a UUID as string or an object containing stepId. _Note: The step ID must be a valid UUID_                                         |
| `context?` | [`Context`](#context)   | [context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) to send back to the voice bot, for usage later in the intent. |

###### Returns

`Promise`\<`void`\>

##### Defined in

[index.ts:136](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L136)

<a name="interfacesconfigmd"></a>

## Interface: Config

Initial configuration used when creating a journey manager

### Properties

#### apiKey

• **apiKey**: `string`

- the API key generated for the journey.

##### Defined in

[index.ts:151](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L151)

---

#### journeyId

• `Optional` **journeyId**: `string`

The ID of the journey.

**`Deprecated`**

use `scriptId` instead

##### Defined in

[index.ts:156](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L156)

---

#### scriptId

• `Optional` **scriptId**: `string`

the ID of the script.

##### Defined in

[index.ts:158](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L158)

---

#### workspaceId

• **workspaceId**: `string`

your workspace id

##### Defined in

[index.ts:161](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L161)

---

#### conversationId

• **conversationId**: `string`

the conversation id, passed from the active voice bot.

_Note: This must be dynamically set by the voice bot._

##### Defined in

[index.ts:168](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L168)

---

#### languageCode

• **languageCode**: `string`

the user's language code, consistent with the language codes defined on the journey.

##### Defined in

[index.ts:173](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L173)

---

#### debug

• `Optional` **debug**: `boolean`

set to true to help debug issues or errors. Defaults to false

##### Defined in

[index.ts:176](https://github.com/nlxai/sdk/blob/b4642b95ec6a2752e4ef1cad2accf262f9fadaa7/packages/voice-plus-core/src/index.ts#L176)
