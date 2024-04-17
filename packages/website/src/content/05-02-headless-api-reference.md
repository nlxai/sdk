
<a name="readmemd"></a>

# @nlxai/chat-core

## Interfaces

- [SlotValue](#interfacesslotvaluemd)
- [BotResponse](#interfacesbotresponsemd)
- [BotResponsePayload](#interfacesbotresponsepayloadmd)
- [BotResponseMetadata](#interfacesbotresponsemetadatamd)
- [BotMessage](#interfacesbotmessagemd)
- [Choice](#interfaceschoicemd)
- [UserResponse](#interfacesuserresponsemd)
- [FailureMessage](#interfacesfailuremessagemd)
- [Config](#interfacesconfigmd)
- [StructuredRequest](#interfacesstructuredrequestmd)
- [ChoiceRequestMetadata](#interfaceschoicerequestmetadatamd)
- [ConversationHandler](#interfacesconversationhandlermd)

## Type Aliases

### Context

Ƭ **Context**: `Record`\<`string`, `any`\>

[Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.

#### Defined in

[index.ts:10](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L10)

___

### SlotsRecord

Ƭ **SlotsRecord**: `Record`\<`string`, `any`\>

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

`SlotRecord` Keys are the attached slot's name

`SlotRecord` Values are usually a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

A `SlotsRecord` is equivalent to an array of [SlotValue](#interfacesslotvaluemd) objects.

#### Defined in

[index.ts:39](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L39)

___

### SlotsRecordOrArray

Ƭ **SlotsRecordOrArray**: [`SlotsRecord`](#slotsrecord) \| [`SlotValue`](#interfacesslotvaluemd)[]

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

Supports either a [SlotsRecord](#slotsrecord) or an array of [SlotValue](#interfacesslotvaluemd) objects

#### Defined in

[index.ts:46](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L46)

___

### UserResponsePayload

Ƭ **UserResponsePayload**: \{ `type`: ``"text"`` ; `text`: `string` ; `context?`: [`Context`](#context)  } \| \{ `type`: ``"choice"`` ; `choiceId`: `string` ; `context?`: [`Context`](#context)  } \| \{ `type`: ``"structured"`` ; `context?`: [`Context`](#context)  } & [`StructuredRequest`](#interfacesstructuredrequestmd)

The payload of the user response

#### Defined in

[index.ts:207](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L207)

___

### Response

Ƭ **Response**: [`BotResponse`](#interfacesbotresponsemd) \| [`UserResponse`](#interfacesuserresponsemd) \| [`FailureMessage`](#interfacesfailuremessagemd)

A response from the bot or the user.

#### Defined in

[index.ts:276](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L276)

___

### Time

Ƭ **Time**: `number`

The time value in milliseconds since midnight, January 1, 1970 UTC.

#### Defined in

[index.ts:281](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L281)

___

### Subscriber

Ƭ **Subscriber**: (`response`: [`Response`](#response)[], `newResponse?`: [`Response`](#response)) => `void`

The callback function for listening to all responses.

#### Type declaration

▸ (`response`, `newResponse?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`Response`](#response)[] |
| `newResponse?` | [`Response`](#response) |

##### Returns

`void`

#### Defined in

[index.ts:530](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L530)

## Functions

### shouldReinitialize

▸ **shouldReinitialize**(`config1`, `config2`): `boolean`

Helper method to decide when a new [Config](#interfacesconfigmd) requires creating a new [ConversationHandler](#interfacesconversationhandlermd) or whether the old `Config`'s
`ConversationHandler` can be used.

The order of configs doesn't matter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config1` | [`Config`](#interfacesconfigmd) |
| `config2` | [`Config`](#interfacesconfigmd) |

#### Returns

`boolean`

true if `createConversation` should be called again

#### Defined in

[index.ts:541](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L541)

___

### default

▸ **default**(`config`): [`ConversationHandler`](#interfacesconversationhandlermd)

Call this to create a conversation handler.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](#interfacesconfigmd) |

#### Returns

[`ConversationHandler`](#interfacesconversationhandlermd)

The [ConversationHandler](#interfacesconversationhandlermd) is a bundle of functions to interact with the conversation.

#### Defined in

[index.ts:556](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L556)

___

### promisify

▸ **promisify**\<`T`\>(`fn`, `convo`, `timeout?`): (`payload`: `T`) => `Promise`\<[`Response`](#response) \| ``null``\>

This package is intentionally designed with a subscription-based API as opposed to a promise-based one where each message corresponds to a single bot response, available asynchronously.

If you need a promise-based wrapper, you can use the `promisify` helper available in the package:

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the type of the function's params, e.g. for `sendText` it's `text: string, context?: Context` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fn` | (`payload`: `T`) => `void` | `undefined` | the function to wrap (e.g. `convo.sendText`, `convo.sendChoice`, etc.) |
| `convo` | [`ConversationHandler`](#interfacesconversationhandlermd) | `undefined` | the `ConversationHandler` (from [createConversation](#default)) |
| `timeout` | `number` | `10000` | the timeout in milliseconds |

#### Returns

`fn`

A wrapped version of the function that returns a promise that resolves to the Conversation's next response.

▸ (`payload`): `Promise`\<[`Response`](#response) \| ``null``\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `T` |

##### Returns

`Promise`\<[`Response`](#response) \| ``null``\>

**`Example`**

```typescript
import { createConversation, promisify } from "@nlxai/chat-core";

const convo = createConversation(config);

const sendTextWrapped = promisify(convo.sendText, convo);

sendTextWrapped("Hello").then((response) => {
  console.log(response);
});
```

#### Defined in

[index.ts:949](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L949)


<a name="indexmd"></a>


# Interfaces


<a name="interfacesbotmessagemd"></a>

## Interface: BotMessage

A message from the bot, as well as any choices the user can make.

### Properties

#### nodeId

• `Optional` **nodeId**: `string`

The node id that this message is associated with.
This is must be sent with a choice when the user is changing a previously sent choice.

##### Defined in

[index.ts:146](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L146)

___

#### text

• **text**: `string`

The body of the message. Show this to the user.

##### Defined in

[index.ts:150](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L150)

___

#### choices

• **choices**: [`Choice`](#interfaceschoicemd)[]

A selection of choices to show to the user. They may choose one of them.

##### Defined in

[index.ts:154](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L154)

___

#### selectedChoiceId

• `Optional` **selectedChoiceId**: `string`

After a choice has been made by the user, this will be updated locally to the selected choice id.
This field is set locally and does not come from the bot.

##### Defined in

[index.ts:159](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L159)


<a name="interfacesbotresponsemd"></a>

## Interface: BotResponse

A message from the bot

See also:
- [UserResponse](#interfacesuserresponsemd)
- [FailureMessage](#interfacesfailuremessagemd)
- [Response](#response)

### Properties

#### type

• **type**: ``"bot"``

The type of the response is `"bot"` for bot and `"user"` for user, and "failure" for failure.

##### Defined in

[index.ts:60](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L60)

___

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:64](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L64)

___

#### payload

• **payload**: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)

The payload of the response

##### Defined in

[index.ts:68](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L68)


<a name="interfacesbotresponsemetadatamd"></a>

## Interface: BotResponseMetadata

Global state about the current conversation
as well as whether the client should poll for more bot responses.

### Properties

#### intentId

• `Optional` **intentId**: `string`

The conversation's intent

##### Defined in

[index.ts:114](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L114)

___

#### escalation

• `Optional` **escalation**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:118](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L118)

___

#### frustration

• `Optional` **frustration**: `boolean`

Whether the current conversation has been marked frustrated

##### Defined in

[index.ts:122](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L122)

___

#### incomprehension

• `Optional` **incomprehension**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:126](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L126)

___

#### hasPendingDataRequest

• `Optional` **hasPendingDataRequest**: `boolean`

Whether the client should poll for more bot responses.

##### Defined in

[index.ts:130](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L130)


<a name="interfacesbotresponsepayloadmd"></a>

## Interface: BotResponsePayload

The payload of the bot response

### Properties

#### expirationTimestamp

• `Optional` **expirationTimestamp**: `number`

If there isn't some interaction by this time, the conversation will expire.

##### Defined in

[index.ts:78](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L78)

___

#### conversationId

• `Optional` **conversationId**: `string`

The active conversation ID. If not set, a new conversation will be started.

##### Defined in

[index.ts:82](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L82)

___

#### messages

• **messages**: [`BotMessage`](#interfacesbotmessagemd)[]

Any messages from the bot.

##### Defined in

[index.ts:86](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L86)

___

#### metadata

• `Optional` **metadata**: [`BotResponseMetadata`](#interfacesbotresponsemetadatamd)

Global state about the current conversation
as well as whether the client should poll for more bot responses.

##### Defined in

[index.ts:91](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L91)

___

#### payload

• `Optional` **payload**: `string`

If configured, the [node's payload.](#add-functionality)

##### Defined in

[index.ts:95](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L95)

___

#### modalities

• `Optional` **modalities**: `Record`\<`string`, `any`\>

If configured, the node's modalities and their payloads.

##### Defined in

[index.ts:99](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L99)

___

#### context

• `Optional` **context**: [`Context`](#context)

If the node is set to send context, the whole context associated with the conversation.

##### Defined in

[index.ts:103](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L103)


<a name="interfaceschoicemd"></a>

## Interface: Choice

A choices to show to the user.

### Properties

#### choiceId

• **choiceId**: `string`

`choiceId` is used by `sendChoice` to let the user choose this choice.

##### Defined in

[index.ts:169](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L169)

___

#### choiceText

• **choiceText**: `string`

The text of the choice

##### Defined in

[index.ts:173](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L173)

___

#### choicePayload

• `Optional` **choicePayload**: `any`

An optional, schemaless payload for the choice.

##### Defined in

[index.ts:177](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L177)


<a name="interfaceschoicerequestmetadatamd"></a>

## Interface: ChoiceRequestMetadata

Helps link the choice to the specific message in the conversation.

### Properties

#### responseIndex

• `Optional` **responseIndex**: `number`

The index of the [Response](#response) associated with this choice.
Setting this ensures that local state's `selectedChoiceId` on the corresponding [BotResponse](#interfacesbotresponsemd) is set.
It is not sent to the bot.

##### Defined in

[index.ts:414](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L414)

___

#### messageIndex

• `Optional` **messageIndex**: `number`

The index of the [BotMessage](#interfacesbotmessagemd) associated with this choice.
Setting this ensures that local state's `selectedChoiceId` on the corresponding [BotResponse](#interfacesbotresponsemd) is set.
It is not sent to the bot.

##### Defined in

[index.ts:420](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L420)

___

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:425](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L425)


<a name="interfacesconfigmd"></a>

## Interface: Config

The config to create a conversation.
`botUrl` and

### Properties

#### botUrl

• **botUrl**: `string`

Fetch this from the bot's Deployment page.

##### Defined in

[index.ts:298](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L298)

___

#### conversationId

• `Optional` **conversationId**: `string`

The conversation ID. If not set, a new conversation will be started.

##### Defined in

[index.ts:302](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L302)

___

#### userId

• `Optional` **userId**: `string`

TODO I don't know what this is

##### Defined in

[index.ts:306](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L306)

___

#### responses

• `Optional` **responses**: [`Response`](#response)[]

Set this to initialize the chat with historical messages.

##### Defined in

[index.ts:310](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L310)

___

#### failureMessage

• `Optional` **failureMessage**: `string`

When set, this overrides the default failure message ("We encountered an issue. Please try again soon.").

##### Defined in

[index.ts:314](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L314)

___

#### headers

• **headers**: `Record`\<`string`, `string`\> & \{ `nlx-api-key`: `string`  }

Headers to forward to the NLX API.

##### Defined in

[index.ts:322](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L322)

___

#### languageCode

• **languageCode**: `string`

The language code to use for the bot. In the browser this can be fetched with `navigator.language`.
If you don't have translations, hard-code this to the language code you support.

##### Defined in

[index.ts:332](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L332)

___

#### experimental

• `Optional` **experimental**: `Object`

Experimental settings

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelType?` | `string` | Simulate alternative channel types |
| `completeBotUrl?` | `boolean` | Prevent the `languageCode` parameter to be appended to the bot URL - used in special deployment environments such as the sandbox chat inside Dialog Studio |

##### Defined in

[index.ts:336](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L336)


<a name="interfacesconversationhandlermd"></a>

## Interface: ConversationHandler

A bundle of functions to interact with a conversation, created by [createConversation](#default).

### Properties

#### sendText

• **sendText**: (`text`: `string`, `context?`: [`Context`](#context)) => `void`

Send user's message

##### Type declaration

▸ (`text`, `context?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | the user's message |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:437](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L437)

___

#### sendSlots

• **sendSlots**: (`slots`: [`SlotsRecordOrArray`](#slotsrecordorarray), `context?`: [`Context`](#context)) => `void`

Send [slots](https://docs.studio.nlx.ai/workspacesettings/introduction-to-settings) to the bot.

##### Type declaration

▸ (`slots`, `context?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slots` | [`SlotsRecordOrArray`](#slotsrecordorarray) | The slots to populate |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:443](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L443)

___

#### sendChoice

• **sendChoice**: (`choiceId`: `string`, `context?`: [`Context`](#context), `metadata?`: [`ChoiceRequestMetadata`](#interfaceschoicerequestmetadatamd)) => `void`

Respond to [a choice](https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/nodes#user-choice) from the bot.

##### Type declaration

▸ (`choiceId`, `context?`, `metadata?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `choiceId` | `string` | - |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |
| `metadata?` | [`ChoiceRequestMetadata`](#interfaceschoicerequestmetadatamd) | links the choice to the specific message and node in the conversation. |

###### Returns

`void`

##### Defined in

[index.ts:450](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L450)

___

#### sendWelcomeIntent

• **sendWelcomeIntent**: (`context?`: [`Context`](#context)) => `void`

Trigger the welcome [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents). This should be done when the user starts interacting with the chat.

##### Type declaration

▸ (`context?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:460](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L460)

___

#### sendIntent

• **sendIntent**: (`intentId`: `string`, `context?`: [`Context`](#context)) => `void`

Trigger a specific [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents).

##### Type declaration

▸ (`intentId`, `context?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `intentId` | `string` | the intent to trigger. The id is the name under the Bot's _Intents_. |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:467](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L467)

___

#### sendStructured

• **sendStructured**: (`request`: [`StructuredRequest`](#interfacesstructuredrequestmd), `context?`: [`Context`](#context)) => `void`

Send a combination of choice, slots, and intent in one request.

##### Type declaration

▸ (`request`, `context?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`StructuredRequest`](#interfacesstructuredrequestmd) |  |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:474](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L474)

___

#### subscribe

• **subscribe**: (`subscriber`: [`Subscriber`](#subscriber)) => () => `void`

Subscribe a callback to the conversation. On subscribe, the subscriber will receive all of the Responses that the conversation has already received.

##### Type declaration

▸ (`subscriber`): () => `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriber` | [`Subscriber`](#subscriber) | The callback to subscribe |

###### Returns

`fn`

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:479](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L479)

___

#### unsubscribe

• **unsubscribe**: (`subscriber`: [`Subscriber`](#subscriber)) => `void`

Unsubscribe a callback from the conversation.

##### Type declaration

▸ (`subscriber`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriber` | [`Subscriber`](#subscriber) | The callback to unsubscribe |

###### Returns

`void`

##### Defined in

[index.ts:484](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L484)

___

#### unsubscribeAll

• **unsubscribeAll**: () => `void`

Unsubscribe all callback from the conversation.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:488](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L488)

___

#### currentConversationId

• **currentConversationId**: () => `undefined` \| `string`

Get the current conversation ID if it's set, or undefined if there is no conversation.

##### Type declaration

▸ (): `undefined` \| `string`

###### Returns

`undefined` \| `string`

##### Defined in

[index.ts:492](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L492)

___

#### reset

• **reset**: (`options?`: \{ `clearResponses?`: `boolean`  }) => `void`

Forces a new conversation. If `clearResponses` is set to true, will also clear historical responses passed to subscribers.
Retains all existing subscribers.

##### Type declaration

▸ (`options?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | - |
| `options.clearResponses?` | `boolean` | If set to true, will clear historical responses passed to subscribers. |

###### Returns

`void`

##### Defined in

[index.ts:497](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L497)

___

#### destroy

• **destroy**: () => `void`

Removes all subscribers and, if using websockets, closes the connection.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:506](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L506)


<a name="interfacesfailuremessagemd"></a>

## Interface: FailureMessage

A failure message is received when the NLX api is unreachable, or sends an unparsable response.

### Properties

#### type

• **type**: ``"failure"``

The type of the response is `"bot"` for bot and `"user"` for user.

##### Defined in

[index.ts:257](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L257)

___

#### payload

• **payload**: `Object`

The payload only includes an error message.

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The error message is either the default, or the `failureMessage` set in the [Config](#interfacesconfigmd). |

##### Defined in

[index.ts:261](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L261)

___

#### receivedAt

• **receivedAt**: `number`

When the failure occurred.

##### Defined in

[index.ts:270](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L270)


<a name="interfacesslotvaluemd"></a>

## Interface: SlotValue

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

An array of `SlotValue` objects is equivalent to a [SlotsRecord](#slotsrecord).

### Properties

#### slotId

• **slotId**: `string`

The attached slot's name

##### Defined in

[index.ts:21](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L21)

___

#### value

• **value**: `any`

Usually this will be a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

##### Defined in

[index.ts:26](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L26)


<a name="interfacesstructuredrequestmd"></a>

## Interface: StructuredRequest

The body of `sendStructured`
Includes a combination of choice, slots, and intent in one request.

### Properties

#### choiceId

• `Optional` **choiceId**: `string`

The `choiceId` is in the [BotResponse](#interfacesbotresponsemd)'s `.payload.messages[].choices[].choiceId` fields

##### Defined in

[index.ts:372](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L372)

___

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:377](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L377)

___

#### intentId

• `Optional` **intentId**: `string`

The intent to trigger. The `intentId` is the name under the Bot's _Intents_.

##### Defined in

[index.ts:381](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L381)

___

#### slots

• `Optional` **slots**: [`SlotsRecordOrArray`](#slotsrecordorarray)

The slots to populate

##### Defined in

[index.ts:385](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L385)


<a name="interfacesuserresponsemd"></a>

## Interface: UserResponse

A message from the user

See also:
- [BotResponse](#interfacesbotresponsemd)
- [FailureMessage](#interfacesfailuremessagemd)
- [Response](#response)

### Properties

#### type

• **type**: ``"user"``

The type of the response is `"bot"` for bot and `"user"` for user, and "failure" for failure.

##### Defined in

[index.ts:193](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L193)

___

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:197](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L197)

___

#### payload

• **payload**: [`UserResponsePayload`](#userresponsepayload)

The payload of the response

##### Defined in

[index.ts:201](https://github.com/nlxai/sdk/blob/05aef14f503ae87d487cac75223a950d4c5753ce/packages/chat-core/src/index.ts#L201)
