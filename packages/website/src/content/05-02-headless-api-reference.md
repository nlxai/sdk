
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

[index.ts:10](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L10)

___

### SlotsRecord

Ƭ **SlotsRecord**: `Record`\<`string`, `any`\>

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

`SlotRecord` Keys are the attached slot's name

`SlotRecord` Values are usually a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

A `SlotsRecord` is equivalent to an array of [SlotValue](#interfacesslotvaluemd) objects.

#### Defined in

[index.ts:39](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L39)

___

### SlotsRecordOrArray

Ƭ **SlotsRecordOrArray**: [`SlotsRecord`](#slotsrecord) \| [`SlotValue`](#interfacesslotvaluemd)[]

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

Supports either a [SlotsRecord](#slotsrecord) or an array of [SlotValue](#interfacesslotvaluemd) objects

#### Defined in

[index.ts:46](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L46)

___

### UserResponsePayload

Ƭ **UserResponsePayload**: \{ `type`: ``"text"`` ; `text`: `string` ; `context?`: [`Context`](#context)  } \| \{ `type`: ``"choice"`` ; `choiceId`: `string` ; `context?`: [`Context`](#context)  } \| \{ `type`: ``"structured"`` ; `context?`: [`Context`](#context)  } & [`StructuredRequest`](#interfacesstructuredrequestmd)

The payload of the user response

#### Defined in

[index.ts:206](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L206)

___

### Response

Ƭ **Response**: [`BotResponse`](#interfacesbotresponsemd) \| [`UserResponse`](#interfacesuserresponsemd) \| [`FailureMessage`](#interfacesfailuremessagemd)

A response from the bot or the user.

#### Defined in

[index.ts:275](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L275)

___

### Time

Ƭ **Time**: `number`

The time value in milliseconds since midnight, January 1, 1970 UTC.

#### Defined in

[index.ts:280](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L280)

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

[index.ts:531](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L531)

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

[index.ts:542](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L542)

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

[index.ts:557](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L557)

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

[index.ts:950](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L950)


<a name="indexmd"></a>


# Interfaces


<a name="interfacesbotmessagemd"></a>

## Interface: BotMessage

A message from the bot, as well as any choices the user can make.

### Properties

#### messageId

• `Optional` **messageId**: `string`

A unique identifier for the message.

##### Defined in

[index.ts:140](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L140)

___

#### nodeId

• `Optional` **nodeId**: `string`

The node id that this message is associated with.
This is must be sent with a choice when the user is changing a previously sent choice.

##### Defined in

[index.ts:145](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L145)

___

#### text

• **text**: `string`

The body of the message. Show this to the user.

##### Defined in

[index.ts:149](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L149)

___

#### choices

• **choices**: [`Choice`](#interfaceschoicemd)[]

A selection of choices to show to the user. They may choose one of them.

##### Defined in

[index.ts:153](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L153)

___

#### selectedChoiceId

• `Optional` **selectedChoiceId**: `string`

After a choice has been made by the user, this will be updated locally to the selected choice id.
This field is set locally and does not come from the bot.

##### Defined in

[index.ts:158](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L158)


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

[index.ts:60](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L60)

___

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:64](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L64)

___

#### payload

• **payload**: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)

The payload of the response

##### Defined in

[index.ts:68](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L68)


<a name="interfacesbotresponsemetadatamd"></a>

## Interface: BotResponseMetadata

Global state about the current conversation
as well as whether the client should poll for more bot responses.

### Properties

#### intentId

• `Optional` **intentId**: `string`

The conversation's intent

##### Defined in

[index.ts:114](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L114)

___

#### escalation

• `Optional` **escalation**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:118](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L118)

___

#### frustration

• `Optional` **frustration**: `boolean`

Whether the current conversation has been marked frustrated

##### Defined in

[index.ts:122](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L122)

___

#### incomprehension

• `Optional` **incomprehension**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:126](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L126)

___

#### hasPendingDataRequest

• `Optional` **hasPendingDataRequest**: `boolean`

Whether the client should poll for more bot responses.

##### Defined in

[index.ts:130](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L130)


<a name="interfacesbotresponsepayloadmd"></a>

## Interface: BotResponsePayload

The payload of the bot response

### Properties

#### expirationTimestamp

• `Optional` **expirationTimestamp**: `number`

If there isn't some interaction by this time, the conversation will expire.

##### Defined in

[index.ts:78](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L78)

___

#### conversationId

• `Optional` **conversationId**: `string`

The active conversation ID. If not set, a new conversation will be started.

##### Defined in

[index.ts:82](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L82)

___

#### messages

• **messages**: [`BotMessage`](#interfacesbotmessagemd)[]

Any messages from the bot.

##### Defined in

[index.ts:86](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L86)

___

#### metadata

• `Optional` **metadata**: [`BotResponseMetadata`](#interfacesbotresponsemetadatamd)

Global state about the current conversation
as well as whether the client should poll for more bot responses.

##### Defined in

[index.ts:91](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L91)

___

#### payload

• `Optional` **payload**: `string`

If configured, the [node's payload.](#add-functionality)

##### Defined in

[index.ts:95](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L95)

___

#### modalities

• `Optional` **modalities**: `Record`\<`string`, `any`\>

If configured, the node's modalities and their payloads.

##### Defined in

[index.ts:99](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L99)

___

#### context

• `Optional` **context**: [`Context`](#context)

If the node is set to send context, the whole context associated with the conversation.

##### Defined in

[index.ts:103](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L103)


<a name="interfaceschoicemd"></a>

## Interface: Choice

A choices to show to the user.

### Properties

#### choiceId

• **choiceId**: `string`

`choiceId` is used by `sendChoice` to let the user choose this choice.

##### Defined in

[index.ts:168](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L168)

___

#### choiceText

• **choiceText**: `string`

The text of the choice

##### Defined in

[index.ts:172](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L172)

___

#### choicePayload

• `Optional` **choicePayload**: `any`

An optional, schemaless payload for the choice.

##### Defined in

[index.ts:176](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L176)


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

[index.ts:415](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L415)

___

#### messageIndex

• `Optional` **messageIndex**: `number`

The index of the [BotMessage](#interfacesbotmessagemd) associated with this choice.
Setting this ensures that local state's `selectedChoiceId` on the corresponding [BotResponse](#interfacesbotresponsemd) is set.
It is not sent to the bot.

##### Defined in

[index.ts:421](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L421)

___

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:426](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L426)


<a name="interfacesconfigmd"></a>

## Interface: Config

The config to create a conversation.
`botUrl` and

### Properties

#### botUrl

• **botUrl**: `string`

Fetch this from the bot's Deployment page.

##### Defined in

[index.ts:297](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L297)

___

#### headers

• **headers**: `Record`\<`string`, `string`\> & \{ `nlx-api-key`: `string`  }

Headers to forward to the NLX API.

##### Defined in

[index.ts:301](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L301)

___

#### conversationId

• `Optional` **conversationId**: `string`

Set `conversationId` to continue an existing conversation. If not set, a new conversation will be started.

##### Defined in

[index.ts:311](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L311)

___

#### userId

• `Optional` **userId**: `string`

Setting the `userID` allows it to be searchable in bot history, as well as usable via `{System.userId}` in the intent.

##### Defined in

[index.ts:315](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L315)

___

#### responses

• `Optional` **responses**: [`Response`](#response)[]

When `responses` is set, initialize the chatHandler with historical messages.

##### Defined in

[index.ts:319](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L319)

___

#### failureMessage

• `Optional` **failureMessage**: `string`

When set, this overrides the default failure message ("We encountered an issue. Please try again soon.").

##### Defined in

[index.ts:323](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L323)

___

#### languageCode

• **languageCode**: `string`

The language code to use for the bot. In the browser this can be fetched with `navigator.language`.
If you don't have translations, hard-code this to the language code you support.

##### Defined in

[index.ts:328](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L328)

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

[index.ts:337](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L337)


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

[index.ts:438](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L438)

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

[index.ts:444](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L444)

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

[index.ts:451](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L451)

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

[index.ts:461](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L461)

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

[index.ts:468](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L468)

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

[index.ts:475](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L475)

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

[index.ts:480](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L480)

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

[index.ts:485](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L485)

___

#### unsubscribeAll

• **unsubscribeAll**: () => `void`

Unsubscribe all callback from the conversation.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:489](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L489)

___

#### currentConversationId

• **currentConversationId**: () => `undefined` \| `string`

Get the current conversation ID if it's set, or undefined if there is no conversation.

##### Type declaration

▸ (): `undefined` \| `string`

###### Returns

`undefined` \| `string`

##### Defined in

[index.ts:493](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L493)

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

[index.ts:498](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L498)

___

#### destroy

• **destroy**: () => `void`

Removes all subscribers and, if using websockets, closes the connection.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:507](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L507)


<a name="interfacesfailuremessagemd"></a>

## Interface: FailureMessage

A failure message is received when the NLX api is unreachable, or sends an unparsable response.

### Properties

#### type

• **type**: ``"failure"``

The type of the response is `"bot"` for bot and `"user"` for user.

##### Defined in

[index.ts:256](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L256)

___

#### payload

• **payload**: `Object`

The payload only includes an error message.

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The error message is either the default, or the `failureMessage` set in the [Config](#interfacesconfigmd). |

##### Defined in

[index.ts:260](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L260)

___

#### receivedAt

• **receivedAt**: `number`

When the failure occurred.

##### Defined in

[index.ts:269](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L269)


<a name="interfacesslotvaluemd"></a>

## Interface: SlotValue

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

An array of `SlotValue` objects is equivalent to a [SlotsRecord](#slotsrecord).

### Properties

#### slotId

• **slotId**: `string`

The attached slot's name

##### Defined in

[index.ts:21](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L21)

___

#### value

• **value**: `any`

Usually this will be a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

##### Defined in

[index.ts:26](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L26)


<a name="interfacesstructuredrequestmd"></a>

## Interface: StructuredRequest

The body of `sendStructured`
Includes a combination of choice, slots, and intent in one request.

### Properties

#### choiceId

• `Optional` **choiceId**: `string`

The `choiceId` is in the [BotResponse](#interfacesbotresponsemd)'s `.payload.messages[].choices[].choiceId` fields

##### Defined in

[index.ts:373](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L373)

___

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:378](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L378)

___

#### intentId

• `Optional` **intentId**: `string`

The intent to trigger. The `intentId` is the name under the Bot's _Intents_.

##### Defined in

[index.ts:382](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L382)

___

#### slots

• `Optional` **slots**: [`SlotsRecordOrArray`](#slotsrecordorarray)

The slots to populate

##### Defined in

[index.ts:386](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L386)


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

[index.ts:192](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L192)

___

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:196](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L196)

___

#### payload

• **payload**: [`UserResponsePayload`](#userresponsepayload)

The payload of the response

##### Defined in

[index.ts:200](https://github.com/nlxai/sdk/blob/9000e5617de1de2b189dac5dc77d80c0222fb982/packages/chat-core/src/index.ts#L200)
