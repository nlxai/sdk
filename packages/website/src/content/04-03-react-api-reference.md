
<a name="readmemd"></a>

# @nlxai/chat-react

## Interfaces

- [ChatHook](#interfaceschathookmd)

## References

### default

Renames and re-exports [useChat](#usechat)

## Functions

### useChat

▸ **useChat**(`config`): [`ChatHook`](#interfaceschathookmd)

A [custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks)
used to create fully custom chat widgets for web and mobile.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Config` | The configuration object for the chatbot. |

#### Returns

[`ChatHook`](#interfaceschathookmd)

the hook object containing the chat state and methods.

#### Defined in

[index.ts:52](https://github.com/nlxai/sdk/blob/780ef075aad846baf30d1d35cba0dfe1e91281ff/packages/chat-react/src/index.ts#L52)


<a name="indexmd"></a>


# Interfaces


<a name="interfaceschathookmd"></a>

## Interface: ChatHook

Created by [useChat](#usechat).

### Properties

#### conversationHandler

• **conversationHandler**: `ConversationHandler`

Contains the full conversation handler object from the [the @nlxai/chat-core package](https://github.com/nlxai/chat-sdk/blob/master/packages/chat-core/README.md).
This is mostly used for the `send*` methods like `sendText` or `sendStructured`, as the response subscription is
handled by the hook automatically.

##### Defined in

[index.ts:21](https://github.com/nlxai/sdk/blob/780ef075aad846baf30d1d35cba0dfe1e91281ff/packages/chat-react/src/index.ts#L21)

___

#### inputValue

• **inputValue**: `string`

Hold the value of the chat input field, which is auto-cleared whenever a message is sent.

Using this field is optional and you can hold input state separately.

##### Defined in

[index.ts:27](https://github.com/nlxai/sdk/blob/780ef075aad846baf30d1d35cba0dfe1e91281ff/packages/chat-react/src/index.ts#L27)

___

#### setInputValue

• **setInputValue**: (`val`: `string`) => `void`

Modify the value of the chat input field.

##### Type declaration

▸ (`val`): `void`

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | The new value of the input field. |

###### Returns

`void`

##### Defined in

[index.ts:32](https://github.com/nlxai/sdk/blob/780ef075aad846baf30d1d35cba0dfe1e91281ff/packages/chat-react/src/index.ts#L32)

___

#### responses

• **responses**: `Response`[]

The reactive full history of the chat messages.
It contains the `type: "user" | "bot"` field and an associated payload.
Please refer to [the type definitions](https://developers.nlx.ai/headless-api-reference#response) for a complete structure.

##### Defined in

[index.ts:38](https://github.com/nlxai/sdk/blob/780ef075aad846baf30d1d35cba0dfe1e91281ff/packages/chat-react/src/index.ts#L38)

___

#### waiting

• **waiting**: `boolean`

A reactive value that is `true` whenever a response from the bot is in progress, used to render a message
bubble with loading dots.

##### Defined in

[index.ts:43](https://github.com/nlxai/sdk/blob/780ef075aad846baf30d1d35cba0dfe1e91281ff/packages/chat-react/src/index.ts#L43)
