
<a name="readmemd"></a>

# @nlxai/chat-core

## Interfaces

- [SlotValue](#interfacesslotvaluemd)
- [BotResponse](#interfacesbotresponsemd)
- [BotResponsePayload](#interfacesbotresponsepayloadmd)
- [BotResponseMetadata](#interfacesbotresponsemetadatamd)
- [KnowledgeBaseResponseSource](#interfacesknowledgebaseresponsesourcemd)
- [BotMessageMetadata](#interfacesbotmessagemetadatamd)
- [BotMessage](#interfacesbotmessagemd)
- [UploadUrl](#interfacesuploadurlmd)
- [Choice](#interfaceschoicemd)
- [UserResponse](#interfacesuserresponsemd)
- [FailureMessage](#interfacesfailuremessagemd)
- [Config](#interfacesconfigmd)
- [StructuredRequest](#interfacesstructuredrequestmd)
- [ApplicationRequest](#interfacesapplicationrequestmd)
- [VoiceCredentials](#interfacesvoicecredentialsmd)
- [ChoiceRequestMetadata](#interfaceschoicerequestmetadatamd)
- [VoicePlusMessage](#interfacesvoiceplusmessagemd)
- [EventHandlers](#interfaceseventhandlersmd)
- [ConversationHandler](#interfacesconversationhandlermd)

## Type Aliases

### Context

Ƭ **Context**: `Record`\<`string`, `any`\>

[Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent.

#### Defined in

[index.ts:18](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L18)

___

### SlotsRecord

Ƭ **SlotsRecord**: `Record`\<`string`, `any`\>

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

`SlotRecord` Keys are the attached slot's name

`SlotRecord` Values are usually a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

A `SlotsRecord` is equivalent to an array of [SlotValue](#interfacesslotvaluemd) objects.

#### Defined in

[index.ts:47](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L47)

___

### SlotsRecordOrArray

Ƭ **SlotsRecordOrArray**: [`SlotsRecord`](#slotsrecord) \| [`SlotValue`](#interfacesslotvaluemd)[]

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

Supports either a [SlotsRecord](#slotsrecord) or an array of [SlotValue](#interfacesslotvaluemd) objects

#### Defined in

[index.ts:54](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L54)

___

### ModalityPayloads

Ƭ **ModalityPayloads**: `Record`\<`string`, `any`\>

Payloads for modalities as a key-value pair by modality name

#### Defined in

[index.ts:117](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L117)

___

### UserResponsePayload

Ƭ **UserResponsePayload**: \{ `type`: ``"text"`` ; `text`: `string` ; `context?`: [`Context`](#context)  } \| \{ `type`: ``"choice"`` ; `choiceId`: `string` ; `context?`: [`Context`](#context)  } \| \{ `type`: ``"structured"`` ; `context?`: [`Context`](#context)  } & [`StructuredRequest`](#interfacesstructuredrequestmd)

The payload of the user response

#### Defined in

[index.ts:282](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L282)

___

### Response

Ƭ **Response**: [`BotResponse`](#interfacesbotresponsemd) \| [`UserResponse`](#interfacesuserresponsemd) \| [`FailureMessage`](#interfacesfailuremessagemd)

A response from the application or the user.

#### Defined in

[index.ts:351](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L351)

___

### Time

Ƭ **Time**: `number`

The time value in milliseconds since midnight, January 1, 1970 UTC.

#### Defined in

[index.ts:356](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L356)

___

### NormalizedStructuredRequest

Ƭ **NormalizedStructuredRequest**: [`StructuredRequest`](#interfacesstructuredrequestmd) & \{ `slots?`: [`SlotValue`](#interfacesslotvaluemd)[]  }

Normalized structured request with a single way to represent slots

#### Defined in

[index.ts:505](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L505)

___

### BotRequest

Ƭ **BotRequest**: [`ApplicationRequest`](#interfacesapplicationrequestmd)

Legacy name for application request

**`Deprecated`**

use [ApplicationRequest](#interfacesapplicationrequestmd)

#### Defined in

[index.ts:557](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L557)

___

### LanguageCode

Ƭ **LanguageCode**: `string`

Language code named for clarity, may restrict it to a finite list

#### Defined in

[index.ts:611](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L611)

___

### RequestOverride

Ƭ **RequestOverride**: (`botRequest`: [`BotRequest`](#botrequest), `appendResponse`: (`res`: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)) => `void`) => `void`

Instead of sending a request to the application, handle it in a custom fashion

#### Type declaration

▸ (`botRequest`, `appendResponse`): `void`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `botRequest` | [`BotRequest`](#botrequest) | The [BotRequest](#botrequest) that is being overridden |
| `appendResponse` | (`res`: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)) => `void` | A method to append the [BotResponsePayload](#interfacesbotresponsepayloadmd) to the message history |

##### Returns

`void`

#### Defined in

[index.ts:618](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L618)

___

### BotRequestOverride

Ƭ **BotRequestOverride**: [`RequestOverride`](#requestoverride)

Legacy name for bot request override

**`Deprecated`**

use [RequestOverride](#requestoverride) instead

#### Defined in

[index.ts:627](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L627)

___

### VoicePlusContext

Ƭ **VoicePlusContext**: `any`

Voice+ context, type to be defined

#### Defined in

[index.ts:632](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L632)

___

### ConversationHandlerEvent

Ƭ **ConversationHandlerEvent**: ``"voicePlusCommand"``

Handler events

#### Defined in

[index.ts:647](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L647)

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

[index.ts:825](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L825)

## Variables

### version

• `Const` **version**: `string` = `packageJson.version`

Package version

#### Defined in

[index.ts:10](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L10)

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

[index.ts:836](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L836)

___

### isConfigValid

▸ **isConfigValid**(`config`): `boolean`

Check whether a configuration is value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`Config`](#interfacesconfigmd) | Chat configuration |

#### Returns

`boolean`

isValid - Whether the configuration is valid

#### Defined in

[index.ts:891](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L891)

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

[index.ts:903](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L903)

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

[index.ts:1488](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L1488)

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

[index.ts:1525](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L1525)


<a name="indexmd"></a>


# Interfaces


<a name="interfacesapplicationrequestmd"></a>

## Interface: ApplicationRequest

The request data actually sent to the application, slightly different from [UserResponsePayload](#userresponsepayload), which includes some UI-specific information

### Properties

#### conversationId

• `Optional` **conversationId**: `string`

The current conversation ID

##### Defined in

[index.ts:519](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L519)

___

#### userId

• `Optional` **userId**: `string`

The current user ID

##### Defined in

[index.ts:523](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L523)

___

#### context

• `Optional` **context**: [`Context`](#context)

Request context, if applicable

##### Defined in

[index.ts:527](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L527)

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

[index.ts:531](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L531)


<a name="interfacesbotmessagemd"></a>

## Interface: BotMessage

A message from the application, as well as any choices the user can make.

### Properties

#### messageId

• `Optional` **messageId**: `string`

A unique identifier for the message.

##### Defined in

[index.ts:198](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L198)

___

#### nodeId

• `Optional` **nodeId**: `string`

The node id that this message is associated with.
This is must be sent with a choice when the user is changing a previously sent choice.

##### Defined in

[index.ts:203](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L203)

___

#### text

• **text**: `string`

The body of the message. Show this to the user.

##### Defined in

[index.ts:207](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L207)

___

#### choices

• **choices**: [`Choice`](#interfaceschoicemd)[]

A selection of choices to show to the user. They may choose one of them.

##### Defined in

[index.ts:211](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L211)

___

#### metadata

• `Optional` **metadata**: [`BotMessageMetadata`](#interfacesbotmessagemetadatamd)

Metadata

##### Defined in

[index.ts:215](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L215)

___

#### selectedChoiceId

• `Optional` **selectedChoiceId**: `string`

After a choice has been made by the user, this will be updated locally to the selected choice id.
This field is set locally and does not come from the application.

##### Defined in

[index.ts:220](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L220)


<a name="interfacesbotmessagemetadatamd"></a>

## Interface: BotMessageMetadata

Metadata for the individual application message
as well as whether the client should poll for more application responses.

### Properties

#### intentId

• `Optional` **intentId**: `string`

The message node's intent

##### Defined in

[index.ts:188](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L188)


<a name="interfacesbotresponsemd"></a>

## Interface: BotResponse

A message from the application

See also:
- [UserResponse](#interfacesuserresponsemd)
- [FailureMessage](#interfacesfailuremessagemd)
- [Response](#response)

### Properties

#### type

• **type**: ``"bot"``

The type of the response is `"bot"` for bot and `"user"` for user, and "failure" for failure.

##### Defined in

[index.ts:68](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L68)

___

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:72](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L72)

___

#### payload

• **payload**: [`BotResponsePayload`](#interfacesbotresponsepayloadmd)

The payload of the response

##### Defined in

[index.ts:76](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L76)


<a name="interfacesbotresponsemetadatamd"></a>

## Interface: BotResponseMetadata

Global state about the current conversation
as well as whether the client should poll for more application responses.

### Properties

#### intentId

• `Optional` **intentId**: `string`

The conversation's intent

##### Defined in

[index.ts:127](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L127)

___

#### escalation

• `Optional` **escalation**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:131](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L131)

___

#### frustration

• `Optional` **frustration**: `boolean`

Whether the current conversation has been marked frustrated

##### Defined in

[index.ts:135](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L135)

___

#### incomprehension

• `Optional` **incomprehension**: `boolean`

Whether the current conversation has been marked as incomprehension.

##### Defined in

[index.ts:139](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L139)

___

#### uploadUrls

• **uploadUrls**: [`UploadUrl`](#interfacesuploadurlmd)[]

Upload URL's

##### Defined in

[index.ts:143](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L143)

___

#### hasPendingDataRequest

• `Optional` **hasPendingDataRequest**: `boolean`

Whether the client should poll for more application responses.

##### Defined in

[index.ts:147](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L147)

___

#### sources

• `Optional` **sources**: [`KnowledgeBaseResponseSource`](#interfacesknowledgebaseresponsesourcemd)[]

Knowledge base sources

##### Defined in

[index.ts:151](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L151)


<a name="interfacesbotresponsepayloadmd"></a>

## Interface: BotResponsePayload

The payload of the bot response

### Properties

#### expirationTimestamp

• `Optional` **expirationTimestamp**: `number`

If there isn't some interaction by this time, the conversation will expire.

##### Defined in

[index.ts:86](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L86)

___

#### conversationId

• `Optional` **conversationId**: `string`

The active conversation ID. If not set, a new conversation will be started.

##### Defined in

[index.ts:90](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L90)

___

#### messages

• **messages**: [`BotMessage`](#interfacesbotmessagemd)[]

Any messages from the bot.

##### Defined in

[index.ts:94](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L94)

___

#### metadata

• `Optional` **metadata**: [`BotResponseMetadata`](#interfacesbotresponsemetadatamd)

Global state about the current conversation
as well as whether the client should poll for more application responses.

##### Defined in

[index.ts:99](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L99)

___

#### payload

• `Optional` **payload**: `string`

If configured, the [node's payload.](#add-functionality)

##### Defined in

[index.ts:103](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L103)

___

#### modalities

• `Optional` **modalities**: [`ModalityPayloads`](#modalitypayloads)

If configured, the node's modalities and their payloads.

##### Defined in

[index.ts:107](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L107)

___

#### context

• `Optional` **context**: [`Context`](#context)

If the node is set to send context, the whole context associated with the conversation.

##### Defined in

[index.ts:111](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L111)


<a name="interfaceschoicemd"></a>

## Interface: Choice

A choices to show to the user.

### Properties

#### choiceId

• **choiceId**: `string`

`choiceId` is used by `sendChoice` to let the user choose this choice.

##### Defined in

[index.ts:244](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L244)

___

#### choiceText

• **choiceText**: `string`

The text of the choice

##### Defined in

[index.ts:248](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L248)

___

#### choicePayload

• `Optional` **choicePayload**: `any`

An optional, schemaless payload for the choice.

##### Defined in

[index.ts:252](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L252)


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

[index.ts:590](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L590)

___

#### messageIndex

• `Optional` **messageIndex**: `number`

The index of the [BotMessage](#interfacesbotmessagemd) associated with this choice.
Setting this ensures that local state's `selectedChoiceId` on the corresponding [BotResponse](#interfacesbotresponsemd) is set.
It is not sent to the application.

##### Defined in

[index.ts:596](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L596)

___

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:601](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L601)

___

#### intentId

• `Optional` **intentId**: `string`

Intent ID, used for sending to the NLU to allow it to double-check

##### Defined in

[index.ts:605](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L605)


<a name="interfacesconfigmd"></a>

## Interface: Config

The configuration to create a conversation.

### Properties

#### applicationUrl

• `Optional` **applicationUrl**: `string`

Fetch this from the application's Deployment page.

##### Defined in

[index.ts:372](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L372)

___

#### botUrl

• `Optional` **botUrl**: `string`

Legacy name for application URL

**`Deprecated`**

use the applicationUrl field instead

##### Defined in

[index.ts:377](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L377)

___

#### headers

• **headers**: `Record`\<`string`, `string`\> & \{ `nlx-api-key`: `string`  }

Headers to forward to the NLX API.

##### Defined in

[index.ts:381](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L381)

___

#### conversationId

• `Optional` **conversationId**: `string`

Set `conversationId` to continue an existing conversation. If not set, a new conversation will be started.

##### Defined in

[index.ts:391](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L391)

___

#### userId

• `Optional` **userId**: `string`

Setting the `userID` allows it to be searchable in application history, as well as usable via `{System.userId}` in the intent.

##### Defined in

[index.ts:395](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L395)

___

#### responses

• `Optional` **responses**: [`Response`](#response)[]

When `responses` is set, initialize the chatHandler with historical messages.

##### Defined in

[index.ts:399](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L399)

___

#### failureMessage

• `Optional` **failureMessage**: `string`

When set, this overrides the default failure message ("We encountered an issue. Please try again soon.").

##### Defined in

[index.ts:403](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L403)

___

#### languageCode

• **languageCode**: `string`

The language code to use for the application. In the browser this can be fetched with `navigator.language`.
If you don't have translations, hard-code this to the language code you support.

##### Defined in

[index.ts:408](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L408)

___

#### bidirectional

• `Optional` **bidirectional**: `boolean`

Specifies whether the conversation is bidirectional

##### Defined in

[index.ts:417](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L417)

___

#### experimental

• `Optional` **experimental**: `Object`

Experimental settings

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelType?` | `string` | Simulate alternative channel types |
| `completeBotUrl?` | `boolean` | Prevent the `languageCode` parameter to be appended to the application URL - used in special deployment environments such as the sandbox chat inside Dialog Studio |

##### Defined in

[index.ts:421](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L421)


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

[index.ts:668](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L668)

___

#### sendSlots

• **sendSlots**: (`slots`: [`SlotsRecordOrArray`](#slotsrecordorarray), `context?`: [`Context`](#context)) => `void`

Send [slots](https://docs.studio.nlx.ai/workspacesettings/introduction-to-settings) to the application.

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

[index.ts:674](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L674)

___

#### sendChoice

• **sendChoice**: (`choiceId`: `string`, `context?`: [`Context`](#context), `metadata?`: [`ChoiceRequestMetadata`](#interfaceschoicerequestmetadatamd)) => `void`

Respond to [a choice](https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/nodes#user-choice) from the application.

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

[index.ts:681](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L681)

___

#### sendWelcomeFlow

• **sendWelcomeFlow**: (`context?`: [`Context`](#context)) => `void`

Trigger the welcome flow. This should be done when the user starts interacting with the chat.

##### Type declaration

▸ (`context?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:691](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L691)

___

#### sendWelcomeIntent

• **sendWelcomeIntent**: (`context?`: [`Context`](#context)) => `void`

Trigger the welcome [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents). This should be done when the user starts interacting with the chat.

**`Deprecated`**

use `sendWelcomeFlow` instead

##### Type declaration

▸ (`context?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:698](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L698)

___

#### sendFlow

• **sendFlow**: (`flowId`: `string`, `context?`: [`Context`](#context)) => `void`

Trigger a specific flow.

##### Type declaration

▸ (`flowId`, `context?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flowId` | `string` | the flow to trigger. The id is the name under the application's _Intents_. |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:705](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L705)

___

#### sendIntent

• **sendIntent**: (`intentId`: `string`, `context?`: [`Context`](#context)) => `void`

Trigger a specific [intent](https://docs.studio.nlx.ai/intents/introduction-to-intents).

**`Deprecated`**

use `sendFlow` instead

##### Type declaration

▸ (`intentId`, `context?`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `intentId` | `string` | the intent to trigger. The id is the name under the application's _Intents_. |
| `context?` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`void`

##### Defined in

[index.ts:713](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L713)

___

#### sendContext

• **sendContext**: (`context`: [`Context`](#context)) => `Promise`\<`void`\>

Send context without sending a message

##### Type declaration

▸ (`context`): `Promise`\<`void`\>

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | [`Context`](#context) | [Context](https://docs.studio.nlx.ai/workspacesettings/documentation-settings/settings-context-attributes) for usage later in the intent. |

###### Returns

`Promise`\<`void`\>

##### Defined in

[index.ts:719](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L719)

___

#### getVoiceCredentials

• **getVoiceCredentials**: (`context?`: [`Context`](#context)) => `Promise`\<[`VoiceCredentials`](#interfacesvoicecredentialsmd)\>

Obtain Voice credentials to run the experience in voice.

##### Type declaration

▸ (`context?`): `Promise`\<[`VoiceCredentials`](#interfacesvoicecredentialsmd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | [`Context`](#context) |

###### Returns

`Promise`\<[`VoiceCredentials`](#interfacesvoicecredentialsmd)\>

##### Defined in

[index.ts:726](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L726)

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

[index.ts:733](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L733)

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

[index.ts:738](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L738)

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

[index.ts:743](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L743)

___

#### unsubscribeAll

• **unsubscribeAll**: () => `void`

Unsubscribe all callback from the conversation.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:747](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L747)

___

#### currentConversationId

• **currentConversationId**: () => `undefined` \| `string`

Get the current conversation ID if it's set, or undefined if there is no conversation.

##### Type declaration

▸ (): `undefined` \| `string`

###### Returns

`undefined` \| `string`

##### Defined in

[index.ts:751](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L751)

___

#### currentLanguageCode

• **currentLanguageCode**: () => `string`

Get the current language code

##### Type declaration

▸ (): `string`

###### Returns

`string`

##### Defined in

[index.ts:755](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L755)

___

#### setLanguageCode

• **setLanguageCode**: (`languageCode`: `string`) => `void`

Set the language code

##### Type declaration

▸ (`languageCode`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `languageCode` | `string` |

###### Returns

`void`

##### Defined in

[index.ts:759](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L759)

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

[index.ts:764](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L764)

___

#### destroy

• **destroy**: () => `void`

Removes all subscribers and, if using websockets, closes the connection.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[index.ts:773](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L773)

___

#### setBotRequestOverride

• **setBotRequestOverride**: (`override`: `undefined` \| [`RequestOverride`](#requestoverride)) => `void`

Optional [RequestOverride](#requestoverride) function used to bypass the bot request and handle them in a custom fashion

**`Deprecated`**

use `setRequestOverride` instead

##### Type declaration

▸ (`override`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `override` | `undefined` \| [`RequestOverride`](#requestoverride) |

###### Returns

`void`

##### Defined in

[index.ts:778](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L778)

___

#### setRequestOverride

• **setRequestOverride**: (`override`: `undefined` \| [`RequestOverride`](#requestoverride)) => `void`

Optional [RequestOverride](#requestoverride) function used to bypass the bot request and handle them in a custom fashion

##### Type declaration

▸ (`override`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `override` | `undefined` \| [`RequestOverride`](#requestoverride) |

###### Returns

`void`

##### Defined in

[index.ts:782](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L782)

___

#### addEventListener

• **addEventListener**: (`event`: ``"voicePlusCommand"``, `handler`: (`payload`: `any`) => `void`) => `void`

Add a listener to one of the handler's custom events

##### Type declaration

▸ (`event`, `handler`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"voicePlusCommand"`` |
| `handler` | (`payload`: `any`) => `void` |

###### Returns

`void`

##### Defined in

[index.ts:786](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L786)

___

#### removeEventListener

• **removeEventListener**: (`event`: ``"voicePlusCommand"``, `handler`: (`payload`: `any`) => `void`) => `void`

Remove a listener to one of the handler's custom events

##### Type declaration

▸ (`event`, `handler`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"voicePlusCommand"`` |
| `handler` | (`payload`: `any`) => `void` |

###### Returns

`void`

##### Defined in

[index.ts:793](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L793)

___

#### sendVoicePlusContext

• **sendVoicePlusContext**: (`context`: `any`) => `void`

Send voicePlus message

##### Type declaration

▸ (`context`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `any` |

###### Returns

`void`

##### Defined in

[index.ts:800](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L800)


<a name="interfaceseventhandlersmd"></a>

## Interface: EventHandlers

Dictionary of handler methods per event

### Properties

#### voicePlusCommand

• **voicePlusCommand**: (`payload`: `any`) => `void`

Voice+ command event handler

##### Type declaration

▸ (`payload`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `any` |

###### Returns

`void`

##### Defined in

[index.ts:656](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L656)


<a name="interfacesfailuremessagemd"></a>

## Interface: FailureMessage

A failure message is received when the NLX api is unreachable, or sends an unparsable response.

### Properties

#### type

• **type**: ``"failure"``

The type of the response is `"bot"` for bot and `"user"` for user.

##### Defined in

[index.ts:332](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L332)

___

#### payload

• **payload**: `Object`

The payload only includes an error message.

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The error message is either the default, or the `failureMessage` set in the [Config](#interfacesconfigmd). |

##### Defined in

[index.ts:336](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L336)

___

#### receivedAt

• **receivedAt**: `number`

When the failure occurred.

##### Defined in

[index.ts:345](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L345)


<a name="interfacesknowledgebaseresponsesourcemd"></a>

## Interface: KnowledgeBaseResponseSource

Response for knowlege base sources

### Properties

#### fileName

• `Optional` **fileName**: `string`

File name

##### Defined in

[index.ts:161](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L161)

___

#### pageNumber

• `Optional` **pageNumber**: `number`

Page number

##### Defined in

[index.ts:165](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L165)

___

#### content

• `Optional` **content**: `string`

Content

##### Defined in

[index.ts:169](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L169)

___

#### metadata

• `Optional` **metadata**: `Record`\<`string`, `unknown`\>

Metadata

##### Defined in

[index.ts:173](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L173)

___

#### presignedUrl

• `Optional` **presignedUrl**: `string`

Presigned URL for direct retrieval

##### Defined in

[index.ts:177](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L177)


<a name="interfacesslotvaluemd"></a>

## Interface: SlotValue

Values to fill an intent's [attached slots](https://docs.studio.nlx.ai/intents/documentation-intents/intents-attached-slots).

An array of `SlotValue` objects is equivalent to a [SlotsRecord](#slotsrecord).

### Properties

#### slotId

• **slotId**: `string`

The attached slot's name

##### Defined in

[index.ts:29](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L29)

___

#### value

• **value**: `any`

Usually this will be a discrete value matching the slots's [type](https://docs.studio.nlx.ai/slots/documentation-slots/slots-values#system-slots).
for custom slots, this can optionally be the value's ID.

##### Defined in

[index.ts:34](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L34)


<a name="interfacesstructuredrequestmd"></a>

## Interface: StructuredRequest

The body of `sendStructured`
Includes a combination of choice, slots, and intent in one request.

### Properties

#### choiceId

• `Optional` **choiceId**: `string`

The `choiceId` is in the [BotResponse](#interfacesbotresponsemd)'s `.payload.messages[].choices[].choiceId` fields

##### Defined in

[index.ts:468](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L468)

___

#### nodeId

• `Optional` **nodeId**: `string`

Required if you want to change a choice that's already been sent.
The `nodeId` can be found in the corresponding [BotMessage](#interfacesbotmessagemd).

##### Defined in

[index.ts:473](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L473)

___

#### intentId

• `Optional` **intentId**: `string`

The intent to trigger. The `intentId` is the name under the application's _Intents_.

**`Deprecated`**

use `flowId` instead.

##### Defined in

[index.ts:478](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L478)

___

#### flowId

• `Optional` **flowId**: `string`

The flow to trigger. The `flowId` is the name under the application's _Flows_.

##### Defined in

[index.ts:482](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L482)

___

#### slots

• `Optional` **slots**: [`SlotsRecordOrArray`](#slotsrecordorarray)

The slots to populate

##### Defined in

[index.ts:486](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L486)

___

#### uploadIds

• `Optional` **uploadIds**: `string`[]

Upload ID

##### Defined in

[index.ts:490](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L490)

___

#### utterance

• `Optional` **utterance**: `string`

Upload utterance

##### Defined in

[index.ts:494](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L494)


<a name="interfacesuploadurlmd"></a>

## Interface: UploadUrl

The upload destination for handling conversing with files

### Properties

#### url

• **url**: `string`

The URL of the upload

##### Defined in

[index.ts:230](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L230)

___

#### uploadId

• **uploadId**: `string`

The ID of the upload

##### Defined in

[index.ts:234](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L234)


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

[index.ts:268](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L268)

___

#### receivedAt

• **receivedAt**: `number`

When the response was received

##### Defined in

[index.ts:272](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L272)

___

#### payload

• **payload**: [`UserResponsePayload`](#userresponsepayload)

The payload of the response

##### Defined in

[index.ts:276](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L276)


<a name="interfacesvoicecredentialsmd"></a>

## Interface: VoiceCredentials

Credentials to connect to a Voice channel

### Properties

#### url

• **url**: `string`

Voice Connection URL

##### Defined in

[index.ts:566](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L566)

___

#### roomName

• **roomName**: `string`

Voice room name

##### Defined in

[index.ts:570](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L570)

___

#### token

• **token**: `string`

Voice token

##### Defined in

[index.ts:574](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L574)

___

#### participantName

• **participantName**: `string`

Voice participant name

##### Defined in

[index.ts:578](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L578)


<a name="interfacesvoiceplusmessagemd"></a>

## Interface: VoicePlusMessage

Messages sent to the Voice+ socket

### Properties

#### context

• **context**: `any`

Voice+ context

##### Defined in

[index.ts:641](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-core/src/index.ts#L641)
