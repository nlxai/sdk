<a name="readmemd"></a>

# @nlxai/touchpoint-ui

## Namespaces

- [Icons](#modulesiconsmd)

## Interfaces

- [InteractiveElementInfo](#interfacesinteractiveelementinfomd)
- [PageForms](#interfacespageformsmd)
- [CustomCardProps](#interfacescustomcardpropsmd)
- [CustomCardRowProps](#interfacescustomcardrowpropsmd)
- [DateInputProps](#interfacesdateinputpropsmd)
- [IconButtonProps](#interfacesiconbuttonpropsmd)
- [TextButtonProps](#interfacestextbuttonpropsmd)
- [ChoiceMessage](#interfaceschoicemessagemd)
- [Theme](#interfacesthememd)
- [InputField](#interfacesinputfieldmd)
- [PageState](#interfacespagestatemd)
- [BidirectionalContext](#interfacesbidirectionalcontextmd)
- [TouchpointConfiguration](#interfacestouchpointconfigurationmd)
- [BidirectionalCustomCommand](#interfacesbidirectionalcustomcommandmd)
- [TouchpointInstance](#interfacestouchpointinstancemd)

## Type Aliases

### AccessibilityInformation

Ƭ **AccessibilityInformation**: `Record`\<`string`, `any`\>

Accessibility information

#### Defined in

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:9](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L9)

---

### IconButtonType

Ƭ **IconButtonType**: `"main"` \| `"ghost"` \| `"activated"` \| `"coverup"` \| `"error"` \| `"overlay"`

Represents the different types of icon buttons available in the application.

- `main`: The primary icon button.
- `ghost`: A transparent or less prominent icon button.
- `activated`: An icon button that indicates an active state.
- `coverup`: An icon button used to cover up or mask something.
- `overlay`: An icon button that appears over other content.

#### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:16](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L16)

---

### WindowSize

Ƭ **WindowSize**: `"half"` \| `"full"`

Window size configuration

#### Defined in

[packages/touchpoint-ui/src/interface.ts:13](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L13)

---

### ColorMode

Ƭ **ColorMode**: `"light"` \| `"dark"`

Color mode configuration (light/dark modes)

#### Defined in

[packages/touchpoint-ui/src/interface.ts:18](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L18)

---

### CustomModalityComponent

Ƭ **CustomModalityComponent**\<`Data`\>: `ComponentType`\<\{ `data`: `Data` ; `conversationHandler`: `ConversationHandler` ; `enabled`: `boolean` ; `className?`: `string` }\>

Custom Modalities allow rendering of rich components from nodes.
See: https://docs.studio.nlx.ai/build/resources/modalities

#### Type parameters

| Name   |
| :----- |
| `Data` |

#### Defined in

[packages/touchpoint-ui/src/interface.ts:42](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L42)

---

### InitializeConversation

Ƭ **InitializeConversation**: (`handler`: `ConversationHandler`, `context?`: `Context`) => `void`

Custom conversation init method. Defaults to sending the welcome intent

#### Type declaration

▸ (`handler`, `context?`): `void`

##### Parameters

| Name       | Type                  | Description                                            |
| :--------- | :-------------------- | :----------------------------------------------------- |
| `handler`  | `ConversationHandler` | the conversation handler.                              |
| `context?` | `Context`             | context set via TouchpointConfiguration.initialContext |

##### Returns

`void`

#### Defined in

[packages/touchpoint-ui/src/interface.ts:180](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L180)

---

### CustomLaunchButton

Ƭ **CustomLaunchButton**: `ComponentType`\<\{ `className?`: `string` ; `onClick?`: () => `void` }\>

Fully custom launch icon

#### Defined in

[packages/touchpoint-ui/src/interface.ts:188](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L188)

---

### Input

Ƭ **Input**: `"text"` \| `"voice"` \| `"voiceMini"`

Input type for the experience

#### Defined in

[packages/touchpoint-ui/src/interface.ts:202](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L202)

---

### BidirectionalConfig

Ƭ **BidirectionalConfig**: \{ `automaticContext?`: `true` ; `navigation?`: (`action`: `"page_next"` \| `"page_previous"` \| `"page_custom"` \| `"page_unknown"`, `destination`: `string` \| `undefined`, `destinations`: `Record`\<`string`, `string`\>) => `void` ; `input?`: (`fields`: [`InputField`](#interfacesinputfieldmd)[], `pageFields`: `Record`\<`string`, `Element`\>) => `void` ; `custom?`: (`action`: `string`, `payload`: `unknown`) => `void` ; `customizeAutomaticContext?`: (`arg`: \{ `context`: [`BidirectionalContext`](#interfacesbidirectionalcontextmd) ; `state`: [`PageState`](#interfacespagestatemd) }) => \{ `context`: [`BidirectionalContext`](#interfacesbidirectionalcontextmd) ; `state`: [`PageState`](#interfacespagestatemd) } } \| \{ `automaticContext`: `false` ; `navigation?`: (`action`: `"page_next"` \| `"page_previous"` \| `"page_custom"` \| `"page_unknown"`, `destination?`: `string`) => `void` ; `input?`: (`fields`: [`InputField`](#interfacesinputfieldmd)[]) => `void` ; `custom?`: (`action`: `string`, `payload`: `unknown`) => `void` }

Configuration for bidirectional mode of voice+.

#### Defined in

[packages/touchpoint-ui/src/interface.ts:256](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L256)

## Variables

### version

• `Const` **version**: `string` = `packageJson.version`

Package version

#### Defined in

[packages/touchpoint-ui/src/index.tsx:52](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/index.tsx#L52)

## Functions

### analyzePageForms

▸ **analyzePageForms**(): [`PageForms`](#interfacespageformsmd)

Analyze page forms

#### Returns

[`PageForms`](#interfacespageformsmd)

pageForms

#### Defined in

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:89](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L89)

---

### Ripple

▸ **Ripple**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type            | Description                                                                                                                           |
| :------------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | `Object`        | -                                                                                                                                     |
| `props.className?`         | `string`        | -                                                                                                                                     |
| `props.style?`             | `CSSProperties` | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`           | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/Ripple.tsx:24](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/Ripple.tsx#L24)

---

### Carousel

▸ **Carousel**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type        | Description                                                                                                                           |
| :------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | `Object`    | -                                                                                                                                     |
| `props.className?`         | `string`    | -                                                                                                                                     |
| `props.children?`          | `ReactNode` | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`       | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/Carousel.tsx:17](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Carousel.tsx#L17)

---

### CustomCard

▸ **CustomCard**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type                                              | Description                                                                                                                           |
| :------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`CustomCardProps`](#interfacescustomcardpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                             | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:38](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L38)

---

### CustomCardImageRow

▸ **CustomCardImageRow**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type     | Description                                                                                                                           |
| :------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | `Object` | -                                                                                                                                     |
| `props.src`                | `string` | -                                                                                                                                     |
| `props.alt?`               | `string` | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`    | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:96](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L96)

---

### CustomCardRow

▸ **CustomCardRow**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type                                                    | Description                                                                                                                           |
| :------------------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`CustomCardRowProps`](#interfacescustomcardrowpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                                   | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:121](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L121)

---

### DateInput

▸ **DateInput**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type                                            | Description                                                                                                                           |
| :------------------------- | :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`DateInputProps`](#interfacesdateinputpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                           | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/DateInput.tsx:29](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/DateInput.tsx#L29)

---

### IconButton

▸ **IconButton**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type                                              | Description                                                                                                                           |
| :------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconButtonProps`](#interfacesiconbuttonpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                             | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:94](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L94)

---

### TextButton

▸ **TextButton**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type                                              | Description                                                                                                                           |
| :------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`TextButtonProps`](#interfacestextbuttonpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                             | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:33](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L33)

---

### BaseText

▸ **BaseText**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type        | Description                                                                                                                           |
| :------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | `Object`    | -                                                                                                                                     |
| `props.children`           | `ReactNode` | -                                                                                                                                     |
| `props.faded?`             | `boolean`   | -                                                                                                                                     |
| `props.className?`         | `string`    | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`       | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/Typography.tsx:5](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Typography.tsx#L5)

---

### SmallText

▸ **SmallText**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type        | Description                                                                                                                           |
| :------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | `Object`    | -                                                                                                                                     |
| `props.children`           | `ReactNode` | -                                                                                                                                     |
| `props.className?`         | `string`    | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`       | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/Typography.tsx:21](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Typography.tsx#L21)

---

### html

▸ **html**(`strings`, `...values`): `unknown`

#### Parameters

| Name        | Type                   |
| :---------- | :--------------------- |
| `strings`   | `TemplateStringsArray` |
| `...values` | `any`[]                |

#### Returns

`unknown`

#### Defined in

[packages/touchpoint-ui/src/index.tsx:61](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/index.tsx#L61)

---

### create

▸ **create**(`props`): `Promise`\<[`TouchpointInstance`](#interfacestouchpointinstancemd)\>

Creates a new Touchpoint UI instance and appends it to the document body

#### Parameters

| Name    | Type                                                              | Description                        |
| :------ | :---------------------------------------------------------------- | :--------------------------------- |
| `props` | [`TouchpointConfiguration`](#interfacestouchpointconfigurationmd) | Configuration props for Touchpoint |

#### Returns

`Promise`\<[`TouchpointInstance`](#interfacestouchpointinstancemd)\>

A promise that resolves to a TouchpointInstance

#### Defined in

[packages/touchpoint-ui/src/index.tsx:342](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/index.tsx#L342)

---

### PreviewContainer

▸ **PreviewContainer**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | `Object`                                   | -                                                                                                                                     |
| `props.children`           | `ReactNode`                                | -                                                                                                                                     |
| `props.mode`               | [`ColorMode`](#colormode)                  | -                                                                                                                                     |
| `props.theme`              | `Partial`\<[`Theme`](#interfacesthememd)\> | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/preview.tsx:10](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/preview.tsx#L10)

<a name="indexmd"></a>

# Interfaces

<a name="interfacesbidirectionalcontextmd"></a>

## Interface: BidirectionalContext

Bidirectional context information that is sent to the LLM.

### Properties

#### uri

• `Optional` **uri**: `string`

Identifier for which page you are currently on. This can be used to filter the relevant KB pages.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:235](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L235)

---

#### fields

• `Optional` **fields**: [`InteractiveElementInfo`](#interfacesinteractiveelementinfomd)[]

The active form fields that can be filled in.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:237](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L237)

---

#### destinations

• `Optional` **destinations**: `string`[]

Human readable location names that can be navigated to.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:239](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L239)

---

#### actions

• `Optional` **actions**: \{ `action`: `string` ; `description?`: `string` ; `schema?`: `any` }[]

Custom actions that can be performed.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:243](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L243)

<a name="interfacesbidirectionalcustomcommandmd"></a>

## Interface: BidirectionalCustomCommand

During a Voice+ bidirectional conversation, you can indicate to the application the availability of
custom commands that the user can invoke.

**`Type Param`**

Commands can take a single parameter which will be generated from this schema.

### Properties

#### action

• **action**: `string`

The name of the command, used to invoke it. Should be unique and descriptive in the context of the LLM.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:444](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L444)

---

#### description

• `Optional` **description**: `string`

A short description of the command, used to help the LLM understand its purpose.

If omitted, then the command will not be sent to the application and must be triggered
from the application side.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:451](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L451)

---

#### schema

• `Optional` **schema**: `any`

A JSON Schema that defines the structure of the command's input.

Use descriptive names and `description` fields to give the underlying LLM plenty of context for
it to generate reasonable parameters. Note that the LLM output will be validated (and transformed)
with this schema, so you are guaranteed type safe inputs to your handler.

Should follow the JSONSchema specification.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:462](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L462)

---

#### handler

• **handler**: (`value`: `any`) => `void`

A handler that will be called with an argument matching the schema when the command is invoked.

##### Type declaration

▸ (`value`): `void`

###### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/interface.ts:466](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L466)

<a name="interfaceschoicemessagemd"></a>

## Interface: ChoiceMessage

Choice message with metadata

### Properties

#### message

• **message**: `ApplicationMessage`

Message contents

##### Defined in

[packages/touchpoint-ui/src/interface.ts:27](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L27)

---

#### responseIndex

• **responseIndex**: `number`

Index in the response transcript history

##### Defined in

[packages/touchpoint-ui/src/interface.ts:31](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L31)

---

#### messageIndex

• **messageIndex**: `number`

Message index in the current response

##### Defined in

[packages/touchpoint-ui/src/interface.ts:35](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L35)

<a name="interfacescustomcardpropsmd"></a>

## Interface: CustomCardProps

Props for the CustomCard component

### Properties

#### className

• `Optional` **className**: `string`

Class name

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:15](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L15)

---

#### children

• **children**: `ReactNode`

Content to be rendered inside the card.

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:19](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L19)

---

#### selected

• `Optional` **selected**: `boolean`

Whether the card is in a selected state. Used to highlight the card.

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:23](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L23)

---

#### onClick

• `Optional` **onClick**: () => `void`

Handler function for when the card is clicked

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:27](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L27)

---

#### href

• `Optional` **href**: `string`

Transform the card into an anchor tag with the href specified

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:31](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L31)

---

#### newTab

• `Optional` **newTab**: `boolean`

Specify whether the URL should take the user to a new tab

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:35](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L35)

<a name="interfacescustomcardrowpropsmd"></a>

## Interface: CustomCardRowProps

Props for the CustomCardRow component

### Properties

#### left

• **left**: `ReactNode`

Content to be displayed on the left side of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:110](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L110)

---

#### right

• **right**: `ReactNode`

Content to be displayed on the right side of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:114](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L114)

---

#### icon

• `Optional` **icon**: [`Icon`](#icon)

Optional icon to be displayed in the center of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:118](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L118)

<a name="interfacesdateinputpropsmd"></a>

## Interface: DateInputProps

Props for the DateInput component

### Properties

#### onSubmit

• `Optional` **onSubmit**: (`date`: `string`) => `void`

Handler function called when the date is submitted

##### Type declaration

▸ (`date`): `void`

###### Parameters

| Name   | Type     | Description                             |
| :----- | :------- | :-------------------------------------- |
| `date` | `string` | The submitted date in YYYY-MM-DD format |

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/components/ui/DateInput.tsx:16](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/DateInput.tsx#L16)

---

#### className

• `Optional` **className**: `string`

Class name

##### Defined in

[packages/touchpoint-ui/src/components/ui/DateInput.tsx:20](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/DateInput.tsx#L20)

<a name="interfacesiconbuttonpropsmd"></a>

## Interface: IconButtonProps

Props for the IconButton component

### Properties

#### onClick

• `Optional` **onClick**: () => `void`

Handler function called when the button is clicked

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:31](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L31)

---

#### label

• **label**: `string`

Accessible label for the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:35](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L35)

---

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:39](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L39)

---

#### type

• **type**: [`IconButtonType`](#iconbuttontype)

Visual style variant of the button. One of IconButtonType.

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:43](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L43)

---

#### Icon

• **Icon**: `FC`\<[`IconProps`](#interfacesiconsiconpropsmd)\>

Icon component to display inside the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:47](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L47)

<a name="interfacesiconsiconpropsmd"></a>

## Interface: IconProps

[Icons](#modulesiconsmd).IconProps

Props for icon components

### Properties

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the icon

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:11](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L11)

---

#### size

• `Optional` **size**: `number`

Custom size in pixels for the icon

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:15](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L15)

<a name="interfacesinputfieldmd"></a>

## Interface: InputField

Input field value

### Properties

#### id

• **id**: `string`

Field ID

##### Defined in

[packages/touchpoint-ui/src/interface.ts:211](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L211)

---

#### value

• **value**: `string` \| `boolean`

Field value

##### Defined in

[packages/touchpoint-ui/src/interface.ts:215](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L215)

<a name="interfacesinteractiveelementinfomd"></a>

## Interface: InteractiveElementInfo

Accessibility information with ID

### Hierarchy

- [`AccessibilityInformation`](#accessibilityinformation)

  ↳ **`InteractiveElementInfo`**

### Properties

#### id

• **id**: `string`

Form element ID (assigned by the analysis logic, not necessarily equal to the DOM ID)

##### Defined in

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:18](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L18)

<a name="interfacespageformsmd"></a>

## Interface: PageForms

Page forms with elements

### Properties

#### context

• **context**: [`InteractiveElementInfo`](#interfacesinteractiveelementinfomd)[]

Page context

##### Defined in

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:28](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L28)

---

#### formElements

• **formElements**: `Record`\<`string`, `Element`\>

Form element references

##### Defined in

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:32](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L32)

<a name="interfacespagestatemd"></a>

## Interface: PageState

Internal state that the automatic context maintains.

### Properties

#### formElements

• **formElements**: `Record`\<`string`, `Element`\>

Mapping from form element IDs to their DOM elements

##### Defined in

[packages/touchpoint-ui/src/interface.ts:223](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L223)

---

#### links

• **links**: `Record`\<`string`, `string`\>

Mapping from link element names to their URLs

##### Defined in

[packages/touchpoint-ui/src/interface.ts:225](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L225)

---

#### customCommands

• **customCommands**: `Map`\<`string`, (`arg`: `any`) => `void`\>

Mapping from custom commands to their handlers

##### Defined in

[packages/touchpoint-ui/src/interface.ts:227](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L227)

<a name="interfacestextbuttonpropsmd"></a>

## Interface: TextButtonProps

Props for the TextButton component

### Properties

#### onClick

• `Optional` **onClick**: () => `void`

Handler function called when the button is clicked

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:13](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L13)

---

#### label

• **label**: `string`

Text to display on the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:17](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L17)

---

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:21](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L21)

---

#### type

• `Optional` **type**: `"main"` \| `"ghost"`

Visual style variant of the button
Default value is "ghost"

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:26](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L26)

---

#### Icon

• **Icon**: `FC`\<[`IconProps`](#interfacesiconsiconpropsmd)\>

Icon component to display inside the button.

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:30](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L30)

<a name="interfacesthememd"></a>

## Interface: Theme

The full theme expressed as CSS custom properties

### Properties

#### fontFamily

• **fontFamily**: `string`

Font family

##### Defined in

[packages/touchpoint-ui/src/interface.ts:71](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L71)

---

#### primary80

• **primary80**: `string`

Primary color with 80% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:76](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L76)

---

#### primary60

• **primary60**: `string`

Primary color with 60% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:80](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L80)

---

#### primary40

• **primary40**: `string`

Primary color with 40% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:84](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L84)

---

#### primary20

• **primary20**: `string`

Primary color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:88](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L88)

---

#### primary10

• **primary10**: `string`

Primary color with 10% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:92](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L92)

---

#### primary5

• **primary5**: `string`

Primary color with 5% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:96](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L96)

---

#### primary1

• **primary1**: `string`

Primary color with 1% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:100](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L100)

---

#### secondary80

• **secondary80**: `string`

Secondary color with 80% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:105](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L105)

---

#### secondary60

• **secondary60**: `string`

Secondary color with 60% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:109](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L109)

---

#### secondary40

• **secondary40**: `string`

Secondary color with 40% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:113](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L113)

---

#### secondary20

• **secondary20**: `string`

Secondary color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:117](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L117)

---

#### secondary10

• **secondary10**: `string`

Secondary color with 10% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:121](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L121)

---

#### secondary5

• **secondary5**: `string`

Secondary color with 5% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:125](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L125)

---

#### secondary1

• **secondary1**: `string`

Secondary color with 1% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:129](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L129)

---

#### accent

• **accent**: `string`

Accent color used e.g. for prominent buttons, the loader animation as well as selected card outlines

##### Defined in

[packages/touchpoint-ui/src/interface.ts:134](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L134)

---

#### accent20

• **accent20**: `string`

Accent color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/interface.ts:138](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L138)

---

#### background

• **background**: `string`

The background color of the main Touchpoint interface

##### Defined in

[packages/touchpoint-ui/src/interface.ts:142](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L142)

---

#### overlay

• **overlay**: `string`

The color of the overlay covering the visible portion of the website when the Touchpoint interface does not cover the full screen

##### Defined in

[packages/touchpoint-ui/src/interface.ts:146](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L146)

---

#### warningPrimary

• **warningPrimary**: `string`

Primary warning color

##### Defined in

[packages/touchpoint-ui/src/interface.ts:151](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L151)

---

#### warningSecondary

• **warningSecondary**: `string`

Secondary warning color

##### Defined in

[packages/touchpoint-ui/src/interface.ts:155](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L155)

---

#### errorPrimary

• **errorPrimary**: `string`

Primary error color

##### Defined in

[packages/touchpoint-ui/src/interface.ts:159](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L159)

---

#### errorSecondary

• **errorSecondary**: `string`

Secondary error color

##### Defined in

[packages/touchpoint-ui/src/interface.ts:163](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L163)

---

#### innerBorderRadius

• **innerBorderRadius**: `string`

Inner border radius: used for most buttons

##### Defined in

[packages/touchpoint-ui/src/interface.ts:168](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L168)

---

#### outerBorderRadius

• **outerBorderRadius**: `string`

Outer border radius: generally used for elements that contain buttons that have inner border radius. Also used by the launch button.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:172](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L172)

<a name="interfacestouchpointconfigurationmd"></a>

## Interface: TouchpointConfiguration

Main Touchpoint creation properties object

### Properties

#### config

• **config**: `Config`

Connection information for the @nlxai/core conversation handler

##### Defined in

[packages/touchpoint-ui/src/interface.ts:365](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L365)

---

#### windowSize

• `Optional` **windowSize**: [`WindowSize`](#windowsize)

Optional window size for the chat window, defaults to `half`

##### Defined in

[packages/touchpoint-ui/src/interface.ts:369](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L369)

---

#### colorMode

• `Optional` **colorMode**: [`ColorMode`](#colormode)

Optional color mode for the chat window, defaults to `dark`

##### Defined in

[packages/touchpoint-ui/src/interface.ts:373](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L373)

---

#### brandIcon

• `Optional` **brandIcon**: `string`

URL of icon used to display the brand in the chat header

##### Defined in

[packages/touchpoint-ui/src/interface.ts:377](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L377)

---

#### animate

• `Optional` **animate**: `boolean`

Include border animation. Currently only supported in Voice Mini.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:381](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L381)

---

#### launchIcon

• `Optional` **launchIcon**: `string` \| `boolean` \| [`CustomLaunchButton`](#customlaunchbutton)

URL of icon used on the launch icon in the bottom right when the experience is collapsed.

When set to `false`, no launch button is shown at all. When not set or set to `true`, the default launch icon is rendered.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:387](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L387)

---

#### userMessageBubble

• `Optional` **userMessageBubble**: `boolean`

Specifies whether the user message has bubbles or not

##### Defined in

[packages/touchpoint-ui/src/interface.ts:391](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L391)

---

#### agentMessageBubble

• `Optional` **agentMessageBubble**: `boolean`

Specifies whether the agent message has bubbles or not

##### Defined in

[packages/touchpoint-ui/src/interface.ts:395](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L395)

---

#### chatMode

• `Optional` **chatMode**: `boolean`

Enables chat mode, a classic chat experience with inline loaders and the chat history visible at all times.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:399](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L399)

---

#### theme

• `Optional` **theme**: `Partial`\<[`Theme`](#interfacesthememd)\>

Optional theme object to override default theme values

##### Defined in

[packages/touchpoint-ui/src/interface.ts:403](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L403)

---

#### modalityComponents

• `Optional` **modalityComponents**: `Record`\<`string`, [`CustomModalityComponent`](#custommodalitycomponent)\<`unknown`\>\>

Optional custom modality components to render in Touchpoint

##### Defined in

[packages/touchpoint-ui/src/interface.ts:407](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L407)

---

#### customModalities

• `Optional` **customModalities**: `Record`\<`string`, [`CustomModalityComponent`](#custommodalitycomponent)\<`unknown`\>\>

Optional custom modality components to render in Touchpoint

**`Deprecated`**

use [TouchpointConfiguration.modalityComponents](#modalitycomponents) instead.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:412](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L412)

---

#### initializeConversation

• `Optional` **initializeConversation**: [`InitializeConversation`](#initializeconversation)

Custom conversation init method. Defaults to sending the welcome intent

**`Param`**

the conversation handler.

**`Param`**

the context object

##### Defined in

[packages/touchpoint-ui/src/interface.ts:418](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L418)

---

#### input

• `Optional` **input**: [`Input`](#input)

Controls the ways in which the user can communicate with the application. Defaults to `"text"`

##### Defined in

[packages/touchpoint-ui/src/interface.ts:422](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L422)

---

#### initialContext

• `Optional` **initialContext**: `Context`

Context sent with the initial request.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:426](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L426)

---

#### bidirectional

• `Optional` **bidirectional**: [`BidirectionalConfig`](#bidirectionalconfig)

Enables bidirectional mode of voice+. Will automatically set the bidirectional flag in the config.

##### Defined in

[packages/touchpoint-ui/src/interface.ts:432](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L432)

<a name="interfacestouchpointinstancemd"></a>

## Interface: TouchpointInstance

Instance of a Touchpoint UI component

### Properties

#### expanded

• **expanded**: `boolean`

Controls whether the Touchpoint UI is expanded or collapsed

##### Defined in

[packages/touchpoint-ui/src/interface.ts:476](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L476)

---

#### conversationHandler

• **conversationHandler**: `ConversationHandler`

The conversation handler instance for interacting with the application

##### Defined in

[packages/touchpoint-ui/src/interface.ts:480](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L480)

---

#### teardown

• **teardown**: () => `void`

Method to remove the Touchpoint UI from the DOM

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/interface.ts:484](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L484)

---

#### setCustomBidirectionalCommands

• **setCustomBidirectionalCommands**: (`commands`: [`BidirectionalCustomCommand`](#interfacesbidirectionalcustomcommandmd)[]) => `void`

Sets currently available custom bidirectional commands.
This allows you to define custom commands that can be used in the voice bot.
The commands will be available in the voice bot and can be used to trigger actions.

Example:

```javascript
client.setCustomBidirectionalCommands([
  {
    action: "Meal",
    description: "add a meal to your flight",
    schema: {
      enum: ["standard", "vegetarian", "vegan", "gluten-free"],
    },
    handler: (value) => {
      console.log("Meal option:", value);
    },
  },
]);
```

This will allow the voice bot to use the command `Meal` with the value `standard`, `vegetarian`, `vegan`, or `gluten-free`.

When using more complex arguments, a library such as [Zod](https://zod.dev) can be useful:

```javascript
import * as z from "zod/v4";

const schema = z.object({
  name: z.string().describe("The customer's name, such as John Doe"),
  email: z.string().email().describe("The customer's email address"),
});

client.setCustomBidirectionalCommands([
  {
    action: "Meal",
    description: "add a meal to your flight",
    schema: z.toJSONSchema(schema, { io: "input" }),
    handler: (value) => {
      const result = z.safeParse(schema, value);
      if (result.success) {
        // result.data is now type safe and TypeScript can reason about it
        console.log("Meal option:", result.data);
      } else {
        console.error("Failed to parse Meal option:", result.error);
      }
    },
  },
]);
```

##### Type declaration

▸ (`commands`): `void`

###### Parameters

| Name       | Type                                                                      | Description                                   |
| :--------- | :------------------------------------------------------------------------ | :-------------------------------------------- |
| `commands` | [`BidirectionalCustomCommand`](#interfacesbidirectionalcustomcommandmd)[] | A list containing the custom commands to set. |

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/interface.ts:538](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/interface.ts#L538)

# Modules

<a name="modulesiconsmd"></a>

## Namespace: Icons

### Interfaces

- [IconProps](#interfacesiconsiconpropsmd)

### Type Aliases

#### Icon

Ƭ **Icon**: `FC`\<[`IconProps`](#interfacesiconsiconpropsmd)\>

Type definition for an icon component

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:21](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L21)

### Functions

#### Action

▸ **Action**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:29](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L29)

---

#### Touchpoint

▸ **Touchpoint**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:40](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L40)

---

#### AssistantOld

▸ **AssistantOld**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:67](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L67)

---

#### Add

▸ **Add**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:78](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L78)

---

#### ArrowDown

▸ **ArrowDown**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:86](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L86)

---

#### ArrowLeft

▸ **ArrowLeft**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:97](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L97)

---

#### ArrowRight

▸ **ArrowRight**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:108](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L108)

---

#### ArrowUp

▸ **ArrowUp**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:119](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L119)

---

#### ArrowForward

▸ **ArrowForward**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:130](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L130)

---

#### Attachment

▸ **Attachment**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:141](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L141)

---

#### Camera

▸ **Camera**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:152](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L152)

---

#### Check

▸ **Check**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:167](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L167)

---

#### Close

▸ **Close**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:178](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L178)

---

#### Copy

▸ **Copy**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:189](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L189)

---

#### Date

▸ **Date**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:200](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L200)

---

#### Delete

▸ **Delete**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:211](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L211)

---

#### Escalate

▸ **Escalate**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:225](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L225)

---

#### Error

▸ **Error**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:248](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L248)

---

#### FullScreen

▸ **FullScreen**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:259](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L259)

---

#### Mic

▸ **Mic**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:270](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L270)

---

#### MicOff

▸ **MicOff**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:281](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L281)

---

#### Location

▸ **Location**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:292](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L292)

---

#### Volume

▸ **Volume**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:303](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L303)

---

#### VolumeOff

▸ **VolumeOff**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:314](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L314)

---

#### Translate

▸ **Translate**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:325](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L325)

---

#### OpenInNew

▸ **OpenInNew**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:336](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L336)

---

#### Play

▸ **Play**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:347](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L347)

---

#### Preview

▸ **Preview**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:355](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L355)

---

#### Reorder

▸ **Reorder**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:372](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L372)

---

#### Restart

▸ **Restart**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:383](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L383)

---

#### Settings

▸ **Settings**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:394](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L394)

---

#### Search

▸ **Search**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:405](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L405)

---

#### Share

▸ **Share**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:416](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L416)

---

#### Warning

▸ **Warning**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:427](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L427)

---

#### ThumbDown

▸ **ThumbDown**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:438](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L438)

---

#### ThumbUp

▸ **ThumbUp**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:449](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L449)

---

#### Time

▸ **Time**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:460](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L460)

---

#### Undo

▸ **Undo**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:477](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L477)

---

#### Refresh

▸ **Refresh**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:488](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L488)

---

#### Help

▸ **Help**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:499](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L499)

---

#### OpenLink

▸ **OpenLink**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:510](https://github.com/nlxai/sdk/blob/e13e2baae9abf0ee3add35f3a4b4c3fe47e8f43d/packages/touchpoint-ui/src/components/ui/Icons.tsx#L510)
