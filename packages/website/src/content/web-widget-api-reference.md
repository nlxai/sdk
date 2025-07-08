<a name="readmemd"></a>

# @nlxai/chat-widget

## Interfaces

- [WidgetInstance](#interfaceswidgetinstancemd)
- [WidgetRef](#interfaceswidgetrefmd)
- [TitleBar](#interfacestitlebarmd)
- [Nudge](#interfacesnudgemd)
- [Props](#interfacespropsmd)
- [Theme](#interfacesthememd)

## Type Aliases

### StorageType

Ƭ **StorageType**: `"localStorage"` \| `"sessionStorage"`

When this option is set to `"localStorage"` or `"sessionStorage"`,
the state of the chat conversation is persisted in [local](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
or [session](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) storage respectively.

This allows the state and history of the conversation to persist between
full page refreshes.

\> When using the session storage feature, it is your responsibility
\> to make sure that your website complies with your data protection
\> and privacy policy requirements.

#### Defined in

[packages/chat-widget/src/props.ts:45](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L45)

---

### CustomModalityComponent

Ƭ **CustomModalityComponent**\<`T`\>: `ComponentType`\<\{ `key`: `string` ; `data`: `T` ; `conversationHandler`: `ConversationHandler` }\>

Custom Modalities allow rendering of rich components from nodes.
See: https://docs.studio.nlx.ai/build/resources/modalities

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

#### Defined in

[packages/chat-widget/src/props.ts:51](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L51)

## Variables

### defaultTheme

• `Const` **defaultTheme**: [`Theme`](#interfacesthememd)

the default theme

#### Defined in

[packages/chat-widget/src/ui/constants.ts:16](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/ui/constants.ts#L16)

## Functions

### getCurrentExpirationTimestamp

▸ **getCurrentExpirationTimestamp**(`responses`): `null` \| `number`

Get current expiration timestamp from the current list of reponses

#### Parameters

| Name        | Type         | Description                                                                           |
| :---------- | :----------- | :------------------------------------------------------------------------------------ |
| `responses` | `Response`[] | the current list of user and bot responses (first argument in the subscribe callback) |

#### Returns

`null` \| `number`

an expiration timestamp in Unix Epoch (`new Date().getTime()`), or `null` if this is not known (typically occurs if the bot has not responded yet)

#### Defined in

packages/chat-core/lib/index.d.ts:735

---

### create

▸ **create**(`props`): [`WidgetInstance`](#interfaceswidgetinstancemd)

Create a new chat widget and renders it as the last element in the body.

#### Parameters

| Name    | Type                          |
| :------ | :---------------------------- |
| `props` | [`Props`](#interfacespropsmd) |

#### Returns

[`WidgetInstance`](#interfaceswidgetinstancemd)

the WidgetInstance to script widget behavior.

#### Defined in

[packages/chat-widget/src/index.tsx:114](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L114)

---

### clearSession

▸ **clearSession**(`storeIn`): `void`

Clears stored session history.

#### Parameters

| Name      | Type                          | Description                 |
| :-------- | :---------------------------- | :-------------------------- |
| `storeIn` | [`StorageType`](#storagetype) | where to clear the session. |

#### Returns

`void`

#### Defined in

[packages/chat-widget/src/index.tsx:357](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L357)

---

### useConversationHandler

▸ **useConversationHandler**(): `null` \| `ConversationHandler`

Hook to get the ConversationHandler for the widget.
This may be called before the Widget has been created.
It will return null until the Widget has been created and the conversation has been established.

#### Returns

`null` \| `ConversationHandler`

the ConversationHandler if the widget has been created and its conversation has been established, otherwise it returns null.

#### Defined in

[packages/chat-widget/src/index.tsx:480](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L480)

---

### Widget

▸ **Widget**(`props`): `ReactNode`

#### Parameters

| Name    | Type                                                                                     |
| :------ | :--------------------------------------------------------------------------------------- |
| `props` | [`Props`](#interfacespropsmd) & `RefAttributes`\<[`WidgetRef`](#interfaceswidgetrefmd)\> |

#### Returns

`ReactNode`

#### Defined in

[packages/chat-widget/src/index.tsx:484](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L484)

<a name="indexmd"></a>

# Interfaces

<a name="interfacesnudgemd"></a>

## Interface: Nudge

When set, a dismissable call-to-action will appear above the chat icon with the given text.

By default, the call-to-action will be displayed after 3 seconds, and will automatically dismiss after 20 seconds.

It will be dissapear when the chat is opened, but until dismissed, will reappear whenever the chat is minimized or closed.

### Properties

#### content

• **content**: `string`

The text content of the nudge. Markdown is supported.

##### Defined in

[packages/chat-widget/src/props.ts:78](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L78)

---

#### showAfter

• `Optional` **showAfter**: `number`

Show the nudge after a specific time, measured in milliseconds.
Defaults to 3000 (3s) if not set.

##### Defined in

[packages/chat-widget/src/props.ts:83](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L83)

---

#### hideAfter

• `Optional` **hideAfter**: `number`

Hide the nudge after a specific time after it appears, measured in milliseconds.
Defaults to 20000 (20s) if not set.

##### Defined in

[packages/chat-widget/src/props.ts:88](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L88)

<a name="interfacespropsmd"></a>

## Interface: Props

The properties for creating the Chat Widget.

### Properties

#### config

• **config**: `Config`

The configuration to create a conversation.

##### Defined in

[packages/chat-widget/src/props.ts:98](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L98)

---

#### theme

• `Optional` **theme**: `Partial`\<[`Theme`](#interfacesthememd)\>

The theme to apply to the chat widget.

##### Defined in

[packages/chat-widget/src/props.ts:102](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L102)

---

#### titleBar

• `Optional` **titleBar**: [`TitleBar`](#interfacestitlebarmd)

How to configure the title bar. When missing, the widget will not have a title bar.

##### Defined in

[packages/chat-widget/src/props.ts:106](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L106)

---

#### chatIcon

• `Optional` **chatIcon**: `string`

If you want a custom chat icon, set this to the URL of an image to use.

##### Defined in

[packages/chat-widget/src/props.ts:110](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L110)

---

#### nudge

• `Optional` **nudge**: [`Nudge`](#interfacesnudgemd)

An optional [Nudge](#interfacesnudgemd) configuration object.

##### Defined in

[packages/chat-widget/src/props.ts:114](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L114)

---

#### inputPlaceholder

• `Optional` **inputPlaceholder**: `string`

The placeholder in the input field. When not set, the default placeholder is "Type something..."

##### Defined in

[packages/chat-widget/src/props.ts:118](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L118)

---

#### loaderMessage

• `Optional` **loaderMessage**: `string`

A message to display to the user while the bot is still processing the previous message from the user.

##### Defined in

[packages/chat-widget/src/props.ts:122](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L122)

---

#### showLoaderMessageAfter

• `Optional` **showLoaderMessageAfter**: `number`

How long to wait, in milliseconds, before the loader message is displayed. Default is 2,500ms.

##### Defined in

[packages/chat-widget/src/props.ts:126](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L126)

---

#### allowChoiceReselection

• `Optional` **allowChoiceReselection**: `boolean`

If set to true, previously selected choices in the chat can be changed.

##### Defined in

[packages/chat-widget/src/props.ts:130](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L130)

---

#### storeIn

• `Optional` **storeIn**: [`StorageType`](#storagetype)

When set, chat history & conversation will be stored in the browser.

##### Defined in

[packages/chat-widget/src/props.ts:134](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L134)

---

#### onExpand

• `Optional` **onExpand**: (`conversationHandler`: `ConversationHandler`) => `void`

Optional callback to be called when the chat is expanded.

##### Type declaration

▸ (`conversationHandler`): `void`

###### Parameters

| Name                  | Type                  |
| :-------------------- | :-------------------- |
| `conversationHandler` | `ConversationHandler` |

###### Returns

`void`

##### Defined in

[packages/chat-widget/src/props.ts:138](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L138)

---

#### onCollapse

• `Optional` **onCollapse**: (`conversationHandler`: `ConversationHandler`) => `void`

Optional callback to be called when the chat is collapsed. This is also called when the chat is closed.

##### Type declaration

▸ (`conversationHandler`): `void`

###### Parameters

| Name                  | Type                  |
| :-------------------- | :-------------------- |
| `conversationHandler` | `ConversationHandler` |

###### Returns

`void`

##### Defined in

[packages/chat-widget/src/props.ts:142](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L142)

---

#### onClose

• `Optional` **onClose**: () => `void`

Optional callback to be called when the chat is closed via the close button.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/chat-widget/src/props.ts:146](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L146)

---

#### onNudgeClose

• `Optional` **onNudgeClose**: (`conversationHandler`: `ConversationHandler`) => `void`

Optional callback to be called when the nudge element is closed explicitly by the user. It is not called when the nudge is hidden automatically after the `hideAfter` interval passes.

##### Type declaration

▸ (`conversationHandler`): `void`

###### Parameters

| Name                  | Type                  |
| :-------------------- | :-------------------- |
| `conversationHandler` | `ConversationHandler` |

###### Returns

`void`

##### Defined in

[packages/chat-widget/src/props.ts:150](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L150)

---

#### customModalities

• `Optional` **customModalities**: `Record`\<`string`, [`CustomModalityComponent`](#custommodalitycomponent)\<`unknown`\>\>

Set this to render a [CustomModalityComponent](#custommodalitycomponent) for a given modality name
See: https://docs.studio.nlx.ai/build/resources/modalities

##### Defined in

[packages/chat-widget/src/props.ts:155](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L155)

<a name="interfacesthememd"></a>

## Interface: Theme

The theme to apply to the chat widget.
Colors may be in any CSS-compatible format like rgb(50, 50, 50) or #aaa

### Properties

#### primaryColor

• **primaryColor**: `string`

Primary color for interactive UI elements like buttons

##### Defined in

[packages/chat-widget/src/theme.ts:7](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/theme.ts#L7)

---

#### darkMessageColor

• **darkMessageColor**: `string`

Background color for the dark chat bubbles (sent by the user)

##### Defined in

[packages/chat-widget/src/theme.ts:9](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/theme.ts#L9)

---

#### lightMessageColor

• **lightMessageColor**: `string`

Background color for the light chat bubbles (sent by the application)

##### Defined in

[packages/chat-widget/src/theme.ts:11](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/theme.ts#L11)

---

#### white

• **white**: `string`

Customized shade of white

##### Defined in

[packages/chat-widget/src/theme.ts:13](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/theme.ts#L13)

---

#### fontFamily

• **fontFamily**: `string`

Widget font family

##### Defined in

[packages/chat-widget/src/theme.ts:15](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/theme.ts#L15)

---

#### spacing

• **spacing**: `number`

Main spacing unit

##### Defined in

[packages/chat-widget/src/theme.ts:17](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/theme.ts#L17)

---

#### borderRadius

• **borderRadius**: `number`

Chat border radius

##### Defined in

[packages/chat-widget/src/theme.ts:19](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/theme.ts#L19)

---

#### chatWindowMaxHeight

• **chatWindowMaxHeight**: `number`

Max height of the chat window

##### Defined in

[packages/chat-widget/src/theme.ts:21](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/theme.ts#L21)

<a name="interfacestitlebarmd"></a>

## Interface: TitleBar

Configures the Title Bar of the Chat Widget.
This is visible at the top of the widget when it is open / expanded.

### Properties

#### logo

• `Optional` **logo**: `string`

Optional URL to a logo image to be displayed on to the left of the title.

##### Defined in

[packages/chat-widget/src/props.ts:13](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L13)

---

#### title

• **title**: `string`

The title string.

##### Defined in

[packages/chat-widget/src/props.ts:17](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L17)

---

#### withCollapseButton

• `Optional` **withCollapseButton**: `boolean`

Setting this to true shows the collapse button ("\_").
Pressing the collapse button will hide the chat overlay but keep it active.

##### Defined in

[packages/chat-widget/src/props.ts:22](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L22)

---

#### withCloseButton

• `Optional` **withCloseButton**: `boolean`

Setting this to true shows the close button ("X").
Pressing the close button will

- hide the chat overlay
- terminate the ongoing conversation
- call the chat's onClose handler if provided.

##### Defined in

[packages/chat-widget/src/props.ts:30](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/props.ts#L30)

<a name="interfaceswidgetinstancemd"></a>

## Interface: WidgetInstance

A handler for a Widget. Created with [create](#create)

### Properties

#### teardown

• **teardown**: () => `void`

End the conversation, clean up all event handlers, and remove the widget from the DOM.
If you want to additionally clear a stored session, explicitly call [clearSession](#clearsession) with your [Props](#interfacespropsmd).

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/chat-widget/src/index.tsx:74](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L74)

---

#### expand

• **expand**: () => `void`

Expand the widget and call the `onExpand` callback if present.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/chat-widget/src/index.tsx:78](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L78)

---

#### collapse

• **collapse**: () => `void`

Collapse the widget and call the `onCollapse` callback if present.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/chat-widget/src/index.tsx:82](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L82)

---

#### getConversationHandler

• **getConversationHandler**: () => `undefined` \| `ConversationHandler`

Get the ConversationHandler for widget. Returns undefined if the widget has not yet been established.
Note that this might not be available synchronously after widget initialization, and therefore an `undefined` check is highly recommended before use.
See: https://developers.nlx.ai/headless-api-reference#interfacesconversationhandlermd

##### Type declaration

▸ (): `undefined` \| `ConversationHandler`

###### Returns

`undefined` \| `ConversationHandler`

##### Defined in

[packages/chat-widget/src/index.tsx:88](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L88)

<a name="interfaceswidgetrefmd"></a>

## Interface: WidgetRef

Widget Ref, for use when rendering a Widget without using the `create` helper function.

### Properties

#### expand

• **expand**: () => `void`

Expand the widget and call the `onExpand` callback if present.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/chat-widget/src/index.tsx:98](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L98)

---

#### collapse

• **collapse**: () => `void`

Collapse the widget and call the `onCollapse` callback if present.

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/chat-widget/src/index.tsx:102](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L102)

---

#### conversationHandler

• **conversationHandler**: `ConversationHandler`

the ConversationHandler for the widget.

##### Defined in

[packages/chat-widget/src/index.tsx:106](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/chat-widget/src/index.tsx#L106)
