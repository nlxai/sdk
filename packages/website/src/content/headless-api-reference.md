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

[index.ts:13](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L13)

---

### SlotsRecord

Ƭ **SlotsRecord**: `Record`\<`string`, `any`\>

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

`SlotRecord` Keys are the attached slot's name

`SlotRecord` Values are usually a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

A `SlotsRecord` is equivalent to an array of [SlotValue](#interfacesslotvaluemd) objects.

#### Defined in

[index.ts:42](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L42)

---

### SlotsRecordOrArray

Ƭ **SlotsRecordOrArray**: [`SlotsRecord`](#slotsrecord) \| [`SlotValue`](#interfacesslotvaluemd)[]

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

Supports either a [SlotsRecord](#slotsrecord) or an array of [SlotValue](#interfacesslotvaluemd) objects

#### Defined in

[index.ts:49](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L49)

---

### UserResponsePayload

Ƭ **UserResponsePayload**: \{ `type`: `"text"` ; `text`: `string` ; `context?`: [`Context`](#context) } \| \{ `type`: `"choice"` ; `choiceId`: `string` ; `context?`: [`Context`](#context) } \| \{ `type`: `"structured"` ; `context?`: [`Context`](#context) } & [`StructuredRequest`](#interfacesstructuredrequestmd)

The payload of the user response

#### Defined in

[index.ts:242](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L242)

---

### Response

Ƭ **Response**: [`BotResponse`](#interfacesbotresponsemd) \| [`UserResponse`](#interfacesuserresponsemd) \| [`FailureMessage`](#interfacesfailuremessagemd)

A response from the application or the user.

#### Defined in

[index.ts:311](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L311)

---

### Time

Ƭ **Time**: `number`

The time value in milliseconds since midnight, January 1, 1970 UTC.

#### Defined in

[index.ts:316](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L316)

---

### NormalizedStructuredRequest

Ƭ **NormalizedStructuredRequest**: [`StructuredRequest`](#interfacesstructuredrequestmd) & \{ `slots?`: [`SlotValue`](#interfacesslotvaluemd)[] }

Normalized structured request with a single way to represent slots

#### Defined in

[index.ts:455](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L455)

---

### LanguageCode

Ƭ **LanguageCode**: `string`

Language code named for clarity, may restrict it to a finite list

#### Defined in

[index.ts:533](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L533)

---

### BotRequestOverride

Ƭ **BotRequestOverride**: (`botRequest`: [`BotRequest`](#interfacesbotrequestmd), `appendBotResponse`: (`res`: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)) => `void`) => `void`

Instead of sending a request to the application, handle it in a custom fashion

#### Type declaration

▸ (`botRequest`, `appendBotResponse`): `void`

##### Parameters

| Name                | Type                                                                       | Description                                                        |
| :------------------ | :------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `botRequest`        | [`BotRequest`](#interfacesbotrequestmd)                                    | The [BotRequest](#interfacesbotrequestmd) that is being overridden |
| `appendBotResponse` | (`res`: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)) => `void` | -                                                                  |

##### Returns

`void`

#### Defined in

[index.ts:540](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L540)

---

### Subscriber

Ƭ **Subscriber**: (`response`: [`Response`](#response)[], `newResponse?`: [`Response`](#response)) => `void`

The callback function for listening to all responses.

#### Type declaration

▸ (`response`, `newResponse?`): `void`

##### Parameters

| Name           | Type                      |
| :------------- | :------------------------ |
| `response`     | [`Response`](#response)[] |
| `newResponse?` | [`Response`](#response)   |

##### Returns

`void`

#### Defined in

[index.ts:660](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L660)

## Functions

### shouldReinitialize

▸ **shouldReinitialize**(`config1`, `config2`): `boolean`

Helper method to decide when a new [Config](#interfacesconfigmd) requires creating a new [ConversationHandler](#interfacesconversationhandlermd) or whether the old `Config`'s
`ConversationHandler` can be used.

The order of configs doesn't matter.

#### Parameters

| Name      | Type                            |
| :-------- | :------------------------------ |
| `config1` | [`Config`](#interfacesconfigmd) |
| `config2` | [`Config`](#interfacesconfigmd) |

#### Returns

`boolean`

true if `createConversation` should be called again

#### Defined in

[index.ts:671](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L671)

---

### isConfigValid

▸ **isConfigValid**(`config`): `boolean`

Check whether a configuration is value.

#### Parameters

| Name     | Type                            | Description        |
| :------- | :------------------------------ | :----------------- |
| `config` | [`Config`](#interfacesconfigmd) | Chat configuration |

#### Returns

`boolean`

isValid - Whether the configuration is valid

#### Defined in

[index.ts:683](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L683)

---

### createConversation

▸ **createConversation**(`config`): [`ConversationHandler`](#interfacesconversationhandlermd)

Call this to create a conversation handler.

#### Parameters

| Name     | Type                            |
| :------- | :------------------------------ |
| `config` | [`Config`](#interfacesconfigmd) |

#### Returns

[`ConversationHandler`](#interfacesconversationhandlermd)

The [ConversationHandler](#interfacesconversationhandlermd) is a bundle of functions to interact with the conversation.

#### Defined in

[index.ts:693](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L693)

---

### getCurrentExpirationTimestamp

▸ **getCurrentExpirationTimestamp**(`responses`): `null` \| `number`

Get current expiration timestamp from the current list of reponses

#### Parameters

| Name        | Type                      | Description                                                                           |
| :---------- | :------------------------ | :------------------------------------------------------------------------------------ |
| `responses` | [`Response`](#response)[] | the current list of user and bot responses (first argument in the subscribe callback) |

#### Returns

`null` \| `number`

an expiration timestamp in Unix Epoch (`new Date().getTime()`), or `null` if this is not known (typically occurs if the bot has not responded yet)

#### Defined in

[index.ts:1112](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L1112)

---

### promisify

▸ **promisify**\<`T`\>(`fn`, `convo`, `timeout?`): (`payload`: `T`) => `Promise`\<[`Response`](#response) \| `null`\>

This package is intentionally designed with a subscription-based API as opposed to a promise-based one where each message corresponds to a single bot response, available asynchronously.

If you need a promise-based wrapper, you can use the `promisify` helper available in the package:

#### Type parameters

| Name | Description                                                                                   |
| :--- | :-------------------------------------------------------------------------------------------- |
| `T`  | the type of the function's params, e.g. for `sendText` it's `text: string, context?: Context` |

#### Parameters

| Name      | Type                                                      | Default value | Description                                                                |
| :-------- | :-------------------------------------------------------- | :------------ | :------------------------------------------------------------------------- |
| `fn`      | (`payload`: `T`) => `void`                                | `undefined`   | the function to wrap (e.g. `convo.sendText`, `convo.sendChoice`, etc.)     |
| `convo`   | [`ConversationHandler`](#interfacesconversationhandlermd) | `undefined`   | the `ConversationHandler` (from [createConversation](#createconversation)) |
| `timeout` | `number`                                                  | `10000`       | the timeout in milliseconds                                                |

#### Returns

`fn`

A promise-wrapped version of the function. The function, when called, returns a promise that resolves to the Conversation's next response.

▸ (`payload`): `Promise`\<[`Response`](#response) \| `null`\>

##### Parameters

| Name      | Type |
| :-------- | :--- |
| `payload` | `T`  |

##### Returns

`Promise`\<[`Response`](#response) \| `null`\>

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

[index.ts:1149](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L1149)

<a name="indexmd"></a>

# Interfaces

<a name="interfacesbotmessagemd"></a>

## Interface: BotMessage

A message from the application, as well as any choices the user can make.

### Properties

#### messageId

• `Optional` **messageId**: `string`

A unique identifier for the message.

##### Defined in

[index.ts:158](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L158)

---

#### nodeId

• `Optional` **nodeId**: `string`

The node id that this message is associated with.
This is must be sent with a choice when the user is changing a previously sent choice.

##### Defined in

[index.ts:163](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L163)

---

#### text

• **text**: `string`

The body of the message. Show this to the user.

##### Defined in

[index.ts:167](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L167)

---

#### choices

• **choices**: [`Choice`](#interfaceschoicemd)[]

A selection of choices to show to the user. They may choose one of them.

##### Defined in

[index.ts:171](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L171)

---

#### metadata

• `Optional` **metadata**: [`BotMessageMetadata`](#interfacesbotmessagemetadatamd)

Metadata

##### Defined in

[index.ts:175](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L175)

---

#### selectedChoiceId

• `Optional` **selectedChoiceId**: `string`

After a choice has been made by the user, this will be updated locally to the selected choice id.
This field is set locally and does not come from the application.

##### Defined in

[index.ts:180](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L180)

<a name="interfacesbotmessagemetadatamd"></a>

## Interface: BotMessageMetadata

Metadata for the individual application message
as well as whether the client should poll for more application responses.

### Properties

#### intentId

• `Optional` **intentId**: `string`

The message node's intent

##### Defined in

[index.ts:148](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L148)

<a name="interfacesbotrequestmd"></a>

## Interface: BotRequest

The request data actually sent to the application, slightly different from [UserResponsePayload](#userresponsepayload), which includes some UI-specific information

### Properties

#### conversationId

• `Optional` **conversationId**: `string`

The current conversation ID

##### Defined in

[index.ts:469](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L469)

---

#### userId

• `Optional` **userId**: `string`

The current user ID

##### Defined in

[index.ts:473](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L473)

---

#### context

• `Optional` **context**: [`Context`](#context)

Request context, if applicable

##### Defined in

[index.ts:477](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L477)

---

#### request

• **request**: `Object`

Main request

##### Type declaration

| Name                | Type                                                                                                           | Description          |
| :------------------ | :------------------------------------------------------------------------------------------------------------- | :------------------- |
| `unstructured?`     | \{ `text`: `string` }                                                                                          | Unstructured request |
| `unstructured.text` | `string`                                                                                                       | Request body text    |
| `structured?`       | [`StructuredRequest`](#interfacesstructuredrequestmd) & \{ `slots?`: [`SlotValue`](#interfacesslotvaluemd)[] } | Structured request   |

##### Defined in

[index.ts:481](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L481)

<a name="interfacesbotresponsemd"></a>

## Interface: BotResponse

A message from the application

See also:

- [UserResponse](#interfacesuserresponsemd)
- [FailureMessage](#interfacesfailuremessagemd)
- [Response](#response)

### Properties

#### type

• **type**: `"bot"`

The type of the response is `"bot"` for bot and `"user"` for user, and "failure" for failure.

##### Defined in

[index.ts:63](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L63)

---

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:67](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L67)

---

#### payload

• **payload**: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)

The payload of the response

##### Defined in

[index.ts:71](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L71)

<a name="interfacesbotresponsemetadatamd"></a>

## Interface: BotResponseMetadata

Global state about the current conversation
as well as whether the client should poll for more application responses.

### Properties

#### intentId

• `Optional` **intentId**: `string`

The conversation's intent

##### Defined in

[index.ts:117](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L117)

---

#### escalation

• `Optional` **escalation**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:121](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L121)

---

#### frustration

• `Optional` **frustration**: `boolean`

Whether the current conversation has been marked frustrated

##### Defined in

[index.ts:125](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L125)

---

#### incomprehension

• `Optional` **incomprehension**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:129](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L129)

---

#### uploadUrls

• **uploadUrls**: [`UploadUrl`](#interfacesuploadurlmd)[]

Upload URL's

##### Defined in

[index.ts:133](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L133)

---

#### hasPendingDataRequest

• `Optional` **hasPendingDataRequest**: `boolean`

Whether the client should poll for more application responses.

##### Defined in

[index.ts:137](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L137)

<a name="interfacesbotresponsepayloadmd"></a>

## Interface: BotResponsePayload

The payload of the bot response

### Properties

#### expirationTimestamp

• `Optional` **expirationTimestamp**: `number`

If there isn't some interaction by this time, the conversation will expire.

##### Defined in

[index.ts:81](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L81)

---

#### conversationId

• `Optional` **conversationId**: `string`

The active conversation ID. If not set, a new conversation will be started.

##### Defined in

[index.ts:85](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L85)

---

#### messages

• **messages**: [`BotMessage`](#interfacesbotmessagemd)[]

Any messages from the bot.

##### Defined in

[index.ts:89](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L89)

---

#### metadata

• `Optional` **metadata**: [`BotResponseMetadata`](#interfacesbotresponsemetadatamd)

Global state about the current conversation
as well as whether the client should poll for more application responses.

##### Defined in

[index.ts:94](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L94)

---

#### payload

• `Optional` **payload**: `string`

If configured, the [node's payload.](#add-functionality)

##### Defined in

[index.ts:98](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L98)

---

#### modalities

• `Optional` **modalities**: `Record`\<`string`, `any`\>

If configured, the node's modalities and their payloads.

##### Defined in

[index.ts:102](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L102)

---

#### context

• `Optional` **context**: [`Context`](#context)

If the node is set to send context, the whole context associated with the conversation.

##### Defined in

[index.ts:106](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L106)

<a name="interfaceschoicemd"></a>

## Interface: Choice

A choices to show to the user.

### Properties

#### choiceId

• **choiceId**: `string`

`choiceId` is used by `sendChoice` to let the user choose this choice.

##### Defined in

[index.ts:204](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L204)

---

#### choiceText

• **choiceText**: `string`

The text of the choice

##### Defined in

[index.ts:208](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L208)

---

#### choicePayload

• `Optional` **choicePayload**: `any`

An optional, schemaless payload for the choice.

##### Defined in

[index.ts:212](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L212)

<a name="interfaceschoicerequestmetadatamd"></a>

## Interface: ChoiceRequestMetadata

Helps link the choice to the specific message in the conversation.

### Properties

#### responseIndex

• `Optional` **responseIndex**: `number`

The index of the [Response](#response) associated with this choice.
Setting this ensures that local state's `selectedChoiceId` on the corresponding [BotResponse](#interfacesbotresponsemd) is set.
It is not sent to the application.

##### Defined in

[index.ts:512](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L512)

---

#### messageIndex

• `Optional` **messageIndex**: `number`

The index of the [BotMessage](#interfacesbotmessagemd) associated with this choice.
Setting this ensures that local state's `selectedChoiceId` on the corresponding [BotResponse](#interfacesbotresponsemd) is set.
It is not sent to the application.

##### Defined in

[index.ts:518](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L518)

---

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:523](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L523)

---

#### intentId

• `Optional` **intentId**: `string`

Intent ID, used for sending to the NLU to allow it to double-check

##### Defined in

[index.ts:527](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L527)

<a name="interfacesconfigmd"></a>

## Interface: Config

The configuration to create a conversation.

### Properties

#### applicationUrl

• `Optional` **applicationUrl**: `string`

Fetch this from the application's Deployment page.

##### Defined in

[index.ts:332](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L332)

---

#### botUrl

• `Optional` **botUrl**: `string`

Legacy name for application URL

**`Deprecated`**

use the applicationUrl field instead

##### Defined in

[index.ts:337](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L337)

---

#### headers

• **headers**: `Record`\<`string`, `string`\> & \{ `nlx-api-key`: `string` }

Headers to forward to the NLX API.

##### Defined in

[index.ts:341](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L341)

---

#### conversationId

• `Optional` **conversationId**: `string`

Set `conversationId` to continue an existing conversation. If not set, a new conversation will be started.

##### Defined in

[index.ts:351](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L351)

---

#### userId

• `Optional` **userId**: `string`

Setting the `userID` allows it to be searchable in application history, as well as usable via `{System.userId}` in the intent.

##### Defined in

[index.ts:355](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L355)

---

#### responses

• `Optional` **responses**: [`Response`](#response)[]

When `responses` is set, initialize the chatHandler with historical messages.

##### Defined in

[index.ts:359](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L359)

---

#### failureMessage

• `Optional` **failureMessage**: `string`

When set, this overrides the default failure message ("We encountered an issue. Please try again soon.").

##### Defined in

[index.ts:363](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L363)

---

#### languageCode

• **languageCode**: `string`

The language code to use for the application. In the browser this can be fetched with `navigator.language`.
If you don't have translations, hard-code this to the language code you support.

##### Defined in

[index.ts:368](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L368)

---

#### experimental

• `Optional` **experimental**: `Object`

Experimental settings

##### Type declaration

| Name              | Type      | Description                                                                                                                                                        |
| :---------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `channelType?`    | `string`  | Simulate alternative channel types                                                                                                                                 |
| `completeBotUrl?` | `boolean` | Prevent the `languageCode` parameter to be appended to the application URL - used in special deployment environments such as the sandbox chat inside Dialog Studio |

##### Defined in

[index.ts:377](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L377)

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

| Name       | Type                  | Description                                                                                                                               |
| :--------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `text`     | `string`              | the user's message                                                                                                                        |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:554](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L554)

---

#### sendSlots

• **sendSlots**: (`slots`: [`SlotsRecordOrArray`](#slotsrecordorarray), `context?`: [`Context`](#context)) => `void`

Send [slots](https://docs.studio.nlx.ai/workspacesettings/introduction-to-settings) to the application.

##### Type declaration

▸ (`slots`, `context?`): `void`

###### Parameters

| Name       | Type                                        | Description                                                                                                                               |
| :--------- | :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `slots`    | [`SlotsRecordOrArray`](#slotsrecordorarray) | The slots to populate                                                                                                                     |
| `context?` | [`Context`](#context)                       | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:560](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L560)

---

#### sendChoice

• **sendChoice**: (`choiceId`: `string`, `context?`: [`Context`](#context), `metadata?`: [`ChoiceRequestMetadata`](#interfaceschoicerequestmetadatamd)) => `void`

Respond to [a choice](https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/nodes#user-choice) from the application.

##### Type declaration

▸ (`choiceId`, `context?`, `metadata?`): `void`

###### Parameters

| Name        | Type                                                          | Description                                                                                                                               |
| :---------- | :------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `choiceId`  | `string`                                                      | -                                                                                                                                         |
| `context?`  | [`Context`](#context)                                         | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |
| `metadata?` | [`ChoiceRequestMetadata`](#interfaceschoicerequestmetadatamd) | links the choice to the specific message and node in the conversation.                                                                    |

###### Returns

`void`

##### Defined in

[index.ts:567](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L567)

---

#### sendWelcomeIntent

• **sendWelcomeIntent**: (`context?`: [`Context`](#context)) => `void`

Trigger the welcome [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents). This should be done when the user starts interacting with the chat.

##### Type declaration

▸ (`context?`): `void`

###### Parameters

| Name       | Type                  | Description                                                                                                                               |
| :--------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:577](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L577)

---

#### sendIntent

• **sendIntent**: (`intentId`: `string`, `context?`: [`Context`](#context)) => `void`

Trigger a specific [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents).

##### Type declaration

▸ (`intentId`, `context?`): `void`

###### Parameters

| Name       | Type                  | Description                                                                                                                               |
| :--------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `intentId` | `string`              | the intent to trigger. The id is the name under the application's _Intents_.                                                              |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:584](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L584)

---

#### sendStructured

• **sendStructured**: (`request`: [`StructuredRequest`](#interfacesstructuredrequestmd), `context?`: [`Context`](#context)) => `void`

Send a combination of choice, slots, and intent in one request.

##### Type declaration

▸ (`request`, `context?`): `void`

###### Parameters

| Name       | Type                                                  | Description                                                                                                                               |
| :--------- | :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `request`  | [`StructuredRequest`](#interfacesstructuredrequestmd) |                                                                                                                                           |
| `context?` | [`Context`](#context)                                 | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:591](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L591)

---

#### subscribe

• **subscribe**: (`subscriber`: [`Subscriber`](#subscriber)) => () => `void`

Subscribe a callback to the conversation. On subscribe, the subscriber will receive all of the Responses that the conversation has already received.

##### Type declaration

▸ (`subscriber`): () => `void`

###### Parameters

| Name         | Type                        | Description               |
| :----------- | :-------------------------- | :------------------------ |
| `subscriber` | [`Subscriber`](#subscriber) | The callback to subscribe |

###### Returns

`fn`

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:596](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L596)

---

#### unsubscribe

• **unsubscribe**: (`subscriber`: [`Subscriber`](#subscriber)) => `void`

Unsubscribe a callback from the conversation.

##### Type declaration

▸ (`subscriber`): `void`

###### Parameters

| Name         | Type                        | Description                 |
| :----------- | :-------------------------- | :-------------------------- |
| `subscriber` | [`Subscriber`](#subscriber) | The callback to unsubscribe |

###### Returns

`void`

##### Defined in

[index.ts:601](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L601)

---

#### unsubscribeAll

• **unsubscribeAll**: () => `void`

Unsubscribe all callback from the conversation.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:605](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L605)

---

#### currentConversationId

• **currentConversationId**: () => `undefined` \| `string`

Get the current conversation ID if it's set, or undefined if there is no conversation.

##### Type declaration

▸ (): `undefined` \| `string`

###### Returns

`undefined` \| `string`

##### Defined in

[index.ts:609](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L609)

---

#### currentLanguageCode

• **currentLanguageCode**: () => `string`

Get the current language code

##### Type declaration

▸ (): `string`

###### Returns

`string`

##### Defined in

[index.ts:613](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L613)

---

#### setLanguageCode

• **setLanguageCode**: (`languageCode`: `string`) => `void`

Set the language code

##### Type declaration

▸ (`languageCode`): `void`

###### Parameters

| Name           | Type     |
| :------------- | :------- |
| `languageCode` | `string` |

###### Returns

`void`

##### Defined in

[index.ts:617](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L617)

---

#### reset

• **reset**: (`options?`: \{ `clearResponses?`: `boolean` }) => `void`

Forces a new conversation. If `clearResponses` is set to true, will also clear historical responses passed to subscribers.
Retains all existing subscribers.

##### Type declaration

▸ (`options?`): `void`

###### Parameters

| Name                      | Type      | Description                                                            |
| :------------------------ | :-------- | :--------------------------------------------------------------------- |
| `options?`                | `Object`  | -                                                                      |
| `options.clearResponses?` | `boolean` | If set to true, will clear historical responses passed to subscribers. |

###### Returns

`void`

##### Defined in

[index.ts:622](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L622)

---

#### destroy

• **destroy**: () => `void`

Removes all subscribers and, if using websockets, closes the connection.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:631](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L631)

---

#### setBotRequestOverride

• **setBotRequestOverride**: (`override`: `undefined` \| [`BotRequestOverride`](#botrequestoverride)) => `void`

Optional [BotRequestOverride](#botrequestoverride) function used to bypass the bot request and handle them in a custom fashion

##### Type declaration

▸ (`override`): `void`

###### Parameters

| Name       | Type                                                       |
| :--------- | :--------------------------------------------------------- |
| `override` | `undefined` \| [`BotRequestOverride`](#botrequestoverride) |

###### Returns

`void`

##### Defined in

[index.ts:635](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L635)

<a name="interfacesfailuremessagemd"></a>

## Interface: FailureMessage

A failure message is received when the NLX api is unreachable, or sends an unparsable response.

### Properties

#### type

• **type**: `"failure"`

The type of the response is `"bot"` for bot and `"user"` for user.

##### Defined in

[index.ts:292](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L292)

---

#### payload

• **payload**: `Object`

The payload only includes an error message.

##### Type declaration

| Name   | Type     | Description                                                                                                |
| :----- | :------- | :--------------------------------------------------------------------------------------------------------- |
| `text` | `string` | The error message is either the default, or the `failureMessage` set in the [Config](#interfacesconfigmd). |

##### Defined in

[index.ts:296](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L296)

---

#### receivedAt

• **receivedAt**: `number`

When the failure occurred.

##### Defined in

[index.ts:305](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L305)

<a name="interfacesslotvaluemd"></a>

## Interface: SlotValue

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

An array of `SlotValue` objects is equivalent to a [SlotsRecord](#slotsrecord).

### Properties

#### slotId

• **slotId**: `string`

The attached slot's name

##### Defined in

[index.ts:24](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L24)

---

#### value

• **value**: `any`

Usually this will be a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

##### Defined in

[index.ts:29](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L29)

<a name="interfacesstructuredrequestmd"></a>

## Interface: StructuredRequest

The body of `sendStructured`
Includes a combination of choice, slots, and intent in one request.

### Properties

#### choiceId

• `Optional` **choiceId**: `string`

The `choiceId` is in the [BotResponse](#interfacesbotresponsemd)'s `.payload.messages[].choices[].choiceId` fields

##### Defined in

[index.ts:423](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L423)

---

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:428](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L428)

---

#### intentId

• `Optional` **intentId**: `string`

The intent to trigger. The `intentId` is the name under the application's _Intents_.

##### Defined in

[index.ts:432](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L432)

---

#### slots

• `Optional` **slots**: [`SlotsRecordOrArray`](#slotsrecordorarray)

The slots to populate

##### Defined in

[index.ts:436](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L436)

---

#### uploadIds

• `Optional` **uploadIds**: `string`[]

Upload ID

##### Defined in

[index.ts:440](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L440)

---

#### utterance

• `Optional` **utterance**: `string`

Upload utterance

##### Defined in

[index.ts:444](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L444)

<a name="interfacesuploadurlmd"></a>

## Interface: UploadUrl

The upload destination for handling conversing with files

### Properties

#### url

• **url**: `string`

The URL of the upload

##### Defined in

[index.ts:190](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L190)

---

#### uploadId

• **uploadId**: `string`

The ID of the upload

##### Defined in

[index.ts:194](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L194)

<a name="interfacesuserresponsemd"></a>

## Interface: UserResponse

A message from the user

See also:

- [BotResponse](#interfacesbotresponsemd)
- [FailureMessage](#interfacesfailuremessagemd)
- [Response](#response)

### Properties

#### type

• **type**: `"user"`

The type of the response is `"bot"` for bot and `"user"` for user, and "failure" for failure.

##### Defined in

[index.ts:228](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L228)

---

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:232](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L232)

---

#### payload

• **payload**: [`UserResponsePayload`](#userresponsepayload)

The payload of the response

##### Defined in

[index.ts:236](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/chat-core/src/index.ts#L236)
