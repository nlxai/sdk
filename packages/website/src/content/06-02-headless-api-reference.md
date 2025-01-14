
<a name="readmemd"></a>

# @nlxai/chat-core

## Interfaces

- [SlotValue](#interfacesslotvaluemd)
- [BotResponse](#interfacesbotresponsemd)
- [BotResponsePayload](#interfacesbotresponsepayloadmd)
- [BotResponseMetadata](#interfacesbotresponsemetadatamd)
- [BotMessageMetadata](#interfacesbotmessagemetadatamd)
- [BotMessage](#interfacesbotmessagemd)
- [UploadUrl](#interfacesuploadurlmd)
- [Choice](#interfaceschoicemd)
- [UserResponse](#interfacesuserresponsemd)
- [FailureMessage](#interfacesfailuremessagemd)
- [Config](#interfacesconfigmd)
- [StructuredRequest](#interfacesstructuredrequestmd)
- [BotRequest](#interfacesbotrequestmd)
- [ChoiceRequestMetadata](#interfaceschoicerequestmetadatamd)
- [ConversationHandler](#interfacesconversationhandlermd)

## Type Aliases

### Context

Ƭ **Context**: `Record`\<`string`, `any`\>

[Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.

#### Defined in

[index.ts:13](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L13)

___

### SlotsRecord

Ƭ **SlotsRecord**: `Record`\<`string`, `any`\>

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

`SlotRecord` Keys are the attached slot's name

`SlotRecord` Values are usually a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

A `SlotsRecord` is equivalent to an array of [SlotValue](#interfacesslotvaluemd) objects.

#### Defined in

[index.ts:42](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L42)

___

### SlotsRecordOrArray

Ƭ **SlotsRecordOrArray**: [`SlotsRecord`](#slotsrecord) \| [`SlotValue`](#interfacesslotvaluemd)[]

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

Supports either a [SlotsRecord](#slotsrecord) or an array of [SlotValue](#interfacesslotvaluemd) objects

#### Defined in

[index.ts:49](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L49)

___

### UserResponsePayload

Ƭ **UserResponsePayload**: \{ `type`: ``"text"`` ; `text`: `string` ; `context?`: [`Context`](#context)  } \| \{ `type`: ``"choice"`` ; `choiceId`: `string` ; `context?`: [`Context`](#context)  } \| \{ `type`: ``"structured"`` ; `context?`: [`Context`](#context)  } & [`StructuredRequest`](#interfacesstructuredrequestmd)

The payload of the user response

#### Defined in

[index.ts:242](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L242)

___

### Response

Ƭ **Response**: [`BotResponse`](#interfacesbotresponsemd) \| [`UserResponse`](#interfacesuserresponsemd) \| [`FailureMessage`](#interfacesfailuremessagemd)

A response from the bot or the user.

#### Defined in

[index.ts:311](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L311)

___

### Time

Ƭ **Time**: `number`

The time value in milliseconds since midnight, January 1, 1970 UTC.

#### Defined in

[index.ts:316](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L316)

___

### NormalizedStructuredRequest

Ƭ **NormalizedStructuredRequest**: [`StructuredRequest`](#interfacesstructuredrequestmd) & \{ `slots?`: [`SlotValue`](#interfacesslotvaluemd)[]  }

Normalized structured request with a single way to represent slots

#### Defined in

[index.ts:450](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L450)

___

### BotRequestOverride

Ƭ **BotRequestOverride**: (`botRequest`: [`BotRequest`](#interfacesbotrequestmd), `appendBotResponse`: (`res`: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)) => `void`) => `void`

Instead of sending a request to the bot, handle it in a custom fashion

#### Type declaration

▸ (`botRequest`, `appendBotResponse`): `void`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `botRequest` | [`BotRequest`](#interfacesbotrequestmd) | The [BotRequest](#interfacesbotrequestmd) that is being overridden |
| `appendBotResponse` | (`res`: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)) => `void` | - |

##### Returns

`void`

#### Defined in

[index.ts:530](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L530)

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

[index.ts:641](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L641)

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

[index.ts:652](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L652)

___

### createConversation

▸ **createConversation**(`config`): [`ConversationHandler`](#interfacesconversationhandlermd)

Call this to create a conversation handler.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](#interfacesconfigmd) |

#### Returns

[`ConversationHandler`](#interfacesconversationhandlermd)

The [ConversationHandler](#interfacesconversationhandlermd) is a bundle of functions to interact with the conversation.

#### Defined in

[index.ts:664](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L664)

___

### getCurrentExpirationTimestamp

▸ **getCurrentExpirationTimestamp**(`responses`): ``null`` \| `number`

Get current expiration timestamp from the current list of reponses

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `responses` | [`Response`](#response)[] | the current list of user and bot responses (first argument in the subscribe callback) |

#### Returns

``null`` \| `number`

an expiration timestamp in Unix Epoch (`new Date().getTime()`), or `null` if this is not known (typically occurs if the bot has not responded yet)

#### Defined in

[index.ts:1057](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L1057)

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
| `convo` | [`ConversationHandler`](#interfacesconversationhandlermd) | `undefined` | the `ConversationHandler` (from [createConversation](#createconversation)) |
| `timeout` | `number` | `10000` | the timeout in milliseconds |

#### Returns

`fn`

A promise-wrapped version of the function. The function, when called, returns a promise that resolves to the Conversation's next response.

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

[index.ts:1094](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L1094)


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

[index.ts:158](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L158)

___

#### nodeId

• `Optional` **nodeId**: `string`

The node id that this message is associated with.
This is must be sent with a choice when the user is changing a previously sent choice.

##### Defined in

[index.ts:163](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L163)

___

#### text

• **text**: `string`

The body of the message. Show this to the user.

##### Defined in

[index.ts:167](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L167)

___

#### choices

• **choices**: [`Choice`](#interfaceschoicemd)[]

A selection of choices to show to the user. They may choose one of them.

##### Defined in

[index.ts:171](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L171)

___

#### metadata

• `Optional` **metadata**: [`BotMessageMetadata`](#interfacesbotmessagemetadatamd)

Metadata

##### Defined in

[index.ts:175](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L175)

___

#### selectedChoiceId

• `Optional` **selectedChoiceId**: `string`

After a choice has been made by the user, this will be updated locally to the selected choice id.
This field is set locally and does not come from the bot.

##### Defined in

[index.ts:180](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L180)


<a name="interfacesbotmessagemetadatamd"></a>

## Interface: BotMessageMetadata

Metadata for the individual bot message
as well as whether the client should poll for more bot responses.

### Properties

#### intentId

• `Optional` **intentId**: `string`

The message node's intent

##### Defined in

[index.ts:148](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L148)


<a name="interfacesbotrequestmd"></a>

## Interface: BotRequest

The request data actually sent to the bot, slightly different from [UserResponsePayload](#userresponsepayload), which includes some UI-specific information

### Properties

#### conversationId

• `Optional` **conversationId**: `string`

The current conversation ID

##### Defined in

[index.ts:464](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L464)

___

#### userId

• `Optional` **userId**: `string`

The current user ID

##### Defined in

[index.ts:468](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L468)

___

#### context

• `Optional` **context**: [`Context`](#context)

Request context, if applicable

##### Defined in

[index.ts:472](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L472)

___

#### request

• **request**: `Object`

Main request

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `unstructured?` | \{ `text`: `string`  } | Unstructured request |
| `unstructured.text` | `string` | Request body text |
| `structured?` | [`StructuredRequest`](#interfacesstructuredrequestmd) & \{ `slots?`: [`SlotValue`](#interfacesslotvaluemd)[]  } | Structured request |

##### Defined in

[index.ts:476](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L476)


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

[index.ts:63](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L63)

___

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:67](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L67)

___

#### payload

• **payload**: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)

The payload of the response

##### Defined in

[index.ts:71](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L71)


<a name="interfacesbotresponsemetadatamd"></a>

## Interface: BotResponseMetadata

Global state about the current conversation
as well as whether the client should poll for more bot responses.

### Properties

#### intentId

• `Optional` **intentId**: `string`

The conversation's intent

##### Defined in

[index.ts:117](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L117)

___

#### escalation

• `Optional` **escalation**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:121](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L121)

___

#### frustration

• `Optional` **frustration**: `boolean`

Whether the current conversation has been marked frustrated

##### Defined in

[index.ts:125](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L125)

___

#### incomprehension

• `Optional` **incomprehension**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:129](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L129)

___

#### uploadUrls

• **uploadUrls**: [`UploadUrl`](#interfacesuploadurlmd)[]

Upload URL's

##### Defined in

[index.ts:133](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L133)

___

#### hasPendingDataRequest

• `Optional` **hasPendingDataRequest**: `boolean`

Whether the client should poll for more bot responses.

##### Defined in

[index.ts:137](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L137)


<a name="interfacesbotresponsepayloadmd"></a>

## Interface: BotResponsePayload

The payload of the bot response

### Properties

#### expirationTimestamp

• `Optional` **expirationTimestamp**: `number`

If there isn't some interaction by this time, the conversation will expire.

##### Defined in

[index.ts:81](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L81)

___

#### conversationId

• `Optional` **conversationId**: `string`

The active conversation ID. If not set, a new conversation will be started.

##### Defined in

[index.ts:85](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L85)

___

#### messages

• **messages**: [`BotMessage`](#interfacesbotmessagemd)[]

Any messages from the bot.

##### Defined in

[index.ts:89](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L89)

___

#### metadata

• `Optional` **metadata**: [`BotResponseMetadata`](#interfacesbotresponsemetadatamd)

Global state about the current conversation
as well as whether the client should poll for more bot responses.

##### Defined in

[index.ts:94](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L94)

___

#### payload

• `Optional` **payload**: `string`

If configured, the [node's payload.](#add-functionality)

##### Defined in

[index.ts:98](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L98)

___

#### modalities

• `Optional` **modalities**: `Record`\<`string`, `any`\>

If configured, the node's modalities and their payloads.

##### Defined in

[index.ts:102](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L102)

___

#### context

• `Optional` **context**: [`Context`](#context)

If the node is set to send context, the whole context associated with the conversation.

##### Defined in

[index.ts:106](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L106)


<a name="interfaceschoicemd"></a>

## Interface: Choice

A choices to show to the user.

### Properties

#### choiceId

• **choiceId**: `string`

`choiceId` is used by `sendChoice` to let the user choose this choice.

##### Defined in

[index.ts:204](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L204)

___

#### choiceText

• **choiceText**: `string`

The text of the choice

##### Defined in

[index.ts:208](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L208)

___

#### choicePayload

• `Optional` **choicePayload**: `any`

An optional, schemaless payload for the choice.

##### Defined in

[index.ts:212](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L212)


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

[index.ts:507](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L507)

___

#### messageIndex

• `Optional` **messageIndex**: `number`

The index of the [BotMessage](#interfacesbotmessagemd) associated with this choice.
Setting this ensures that local state's `selectedChoiceId` on the corresponding [BotResponse](#interfacesbotresponsemd) is set.
It is not sent to the bot.

##### Defined in

[index.ts:513](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L513)

___

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:518](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L518)

___

#### intentId

• `Optional` **intentId**: `string`

Intent ID, used for sending to the NLU to allow it to double-check

##### Defined in

[index.ts:522](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L522)


<a name="interfacesconfigmd"></a>

## Interface: Config

The configuration to create a conversation.

### Properties

#### botUrl

• **botUrl**: `string`

Fetch this from the bot's Deployment page.

##### Defined in

[index.ts:332](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L332)

___

#### headers

• **headers**: `Record`\<`string`, `string`\> & \{ `nlx-api-key`: `string`  }

Headers to forward to the NLX API.

##### Defined in

[index.ts:336](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L336)

___

#### conversationId

• `Optional` **conversationId**: `string`

Set `conversationId` to continue an existing conversation. If not set, a new conversation will be started.

##### Defined in

[index.ts:346](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L346)

___

#### userId

• `Optional` **userId**: `string`

Setting the `userID` allows it to be searchable in bot history, as well as usable via `{System.userId}` in the intent.

##### Defined in

[index.ts:350](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L350)

___

#### responses

• `Optional` **responses**: [`Response`](#response)[]

When `responses` is set, initialize the chatHandler with historical messages.

##### Defined in

[index.ts:354](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L354)

___

#### failureMessage

• `Optional` **failureMessage**: `string`

When set, this overrides the default failure message ("We encountered an issue. Please try again soon.").

##### Defined in

[index.ts:358](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L358)

___

#### languageCode

• **languageCode**: `string`

The language code to use for the bot. In the browser this can be fetched with `navigator.language`.
If you don't have translations, hard-code this to the language code you support.

##### Defined in

[index.ts:363](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L363)

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

[index.ts:372](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L372)


<a name="interfacesconversationhandlermd"></a>

## Interface: ConversationHandler

A bundle of functions to interact with a conversation, created by [createConversation](#createconversation).

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

[index.ts:544](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L544)

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

[index.ts:550](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L550)

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

[index.ts:557](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L557)

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

[index.ts:567](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L567)

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

[index.ts:574](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L574)

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

[index.ts:581](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L581)

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

[index.ts:586](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L586)

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

[index.ts:591](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L591)

___

#### unsubscribeAll

• **unsubscribeAll**: () => `void`

Unsubscribe all callback from the conversation.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:595](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L595)

___

#### currentConversationId

• **currentConversationId**: () => `undefined` \| `string`

Get the current conversation ID if it's set, or undefined if there is no conversation.

##### Type declaration

▸ (): `undefined` \| `string`

###### Returns

`undefined` \| `string`

##### Defined in

[index.ts:599](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L599)

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

[index.ts:604](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L604)

___

#### destroy

• **destroy**: () => `void`

Removes all subscribers and, if using websockets, closes the connection.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:613](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L613)

___

#### setBotRequestOverride

• **setBotRequestOverride**: (`override`: `undefined` \| [`BotRequestOverride`](#botrequestoverride)) => `void`

Optional [BotRequestOverride](#botrequestoverride) function used to bypass the bot request and handle them in a custom fashion

##### Type declaration

▸ (`override`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `override` | `undefined` \| [`BotRequestOverride`](#botrequestoverride) |

###### Returns

`void`

##### Defined in

[index.ts:617](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L617)


<a name="interfacesfailuremessagemd"></a>

## Interface: FailureMessage

A failure message is received when the NLX api is unreachable, or sends an unparsable response.

### Properties

#### type

• **type**: ``"failure"``

The type of the response is `"bot"` for bot and `"user"` for user.

##### Defined in

[index.ts:292](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L292)

___

#### payload

• **payload**: `Object`

The payload only includes an error message.

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The error message is either the default, or the `failureMessage` set in the [Config](#interfacesconfigmd). |

##### Defined in

[index.ts:296](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L296)

___

#### receivedAt

• **receivedAt**: `number`

When the failure occurred.

##### Defined in

[index.ts:305](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L305)


<a name="interfacesslotvaluemd"></a>

## Interface: SlotValue

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

An array of `SlotValue` objects is equivalent to a [SlotsRecord](#slotsrecord).

### Properties

#### slotId

• **slotId**: `string`

The attached slot's name

##### Defined in

[index.ts:24](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L24)

___

#### value

• **value**: `any`

Usually this will be a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

##### Defined in

[index.ts:29](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L29)


<a name="interfacesstructuredrequestmd"></a>

## Interface: StructuredRequest

The body of `sendStructured`
Includes a combination of choice, slots, and intent in one request.

### Properties

#### choiceId

• `Optional` **choiceId**: `string`

The `choiceId` is in the [BotResponse](#interfacesbotresponsemd)'s `.payload.messages[].choices[].choiceId` fields

##### Defined in

[index.ts:418](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L418)

___

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:423](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L423)

___

#### intentId

• `Optional` **intentId**: `string`

The intent to trigger. The `intentId` is the name under the Bot's _Intents_.

##### Defined in

[index.ts:427](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L427)

___

#### slots

• `Optional` **slots**: [`SlotsRecordOrArray`](#slotsrecordorarray)

The slots to populate

##### Defined in

[index.ts:431](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L431)

___

#### uploadIds

• `Optional` **uploadIds**: `string`[]

Upload ID

##### Defined in

[index.ts:435](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L435)

___

#### utterance

• `Optional` **utterance**: `string`

Upload utterance

##### Defined in

[index.ts:439](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L439)


<a name="interfacesuploadurlmd"></a>

## Interface: UploadUrl

The upload destination for handling conversing with files

### Properties

#### url

• **url**: `string`

The URL of the upload

##### Defined in

[index.ts:190](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L190)

___

#### uploadId

• **uploadId**: `string`

The ID of the upload

##### Defined in

[index.ts:194](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L194)


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

[index.ts:228](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L228)

___

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:232](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L232)

___

#### payload

• **payload**: [`UserResponsePayload`](#userresponsepayload)

The payload of the response

##### Defined in

[index.ts:236](https://github.com/nlxai/sdk/blob/4e955cfe47540d811508dbfc6f5480f2c4521d7a/packages/chat-core/src/index.ts#L236)
