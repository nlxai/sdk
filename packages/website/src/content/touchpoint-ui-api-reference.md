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
- [TouchpointInstance](#interfacestouchpointinstancemd)
- [Theme](#interfacesthememd)
- [TouchpointConfiguration](#interfacestouchpointconfigurationmd)

## Type Aliases

### AccessibilityInformation

Ƭ **AccessibilityInformation**: `Record`\<`string`, `any`\>

Accessibility information

#### Defined in

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:9](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L9)

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

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:16](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L16)

---

### WindowSize

Ƭ **WindowSize**: `"half"` \| `"full"`

Window size configuration

#### Defined in

[packages/touchpoint-ui/src/types.ts:12](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L12)

---

### ColorMode

Ƭ **ColorMode**: `"light"` \| `"dark"`

Color mode configuration (light/dark modes)

#### Defined in

[packages/touchpoint-ui/src/types.ts:17](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L17)

---

### CustomModalityComponent

Ƭ **CustomModalityComponent**\<`Data`\>: `ComponentType`\<\{ `data`: `Data` ; `conversationHandler`: `ConversationHandler` ; `enabled`: `boolean` }\>

Custom Modalities allow rendering of rich components from nodes.
See: https://docs.studio.nlx.ai/build/resources/modalities

#### Type parameters

| Name   |
| :----- |
| `Data` |

#### Defined in

[packages/touchpoint-ui/src/types.ts:41](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L41)

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

[packages/touchpoint-ui/src/types.ts:175](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L175)

---

### CustomLaunchButton

Ƭ **CustomLaunchButton**: `ComponentType`\<\{ `className?`: `string` ; `onClick?`: () => `void` }\>

Fully custom launch icon

#### Defined in

[packages/touchpoint-ui/src/types.ts:183](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L183)

---

### Input

Ƭ **Input**: `"text"` \| `"voice"` \| `"voiceMini"`

Input type for the experience

#### Defined in

[packages/touchpoint-ui/src/types.ts:197](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L197)

---

### BidirectionalConfig

Ƭ **BidirectionalConfig**: \{ `automaticContext?`: `true` ; `navigation?`: (`action`: `"page_next"` \| `"page_previous"` \| `"page_custom"`, `destination`: `string` \| `undefined`, `destinations`: `Record`\<`string`, `string`\>) => `void` ; `input?`: (`fields`: \{ `id`: `string` ; `value`: `string` }[], `pageFields`: `Record`\<`string`, `Element`\>) => `void` ; `custom?`: (`action`: `string`, `payload`: `unknown`) => `void` } \| \{ `automaticContext`: `false` ; `navigation?`: (`action`: `"page_next"` \| `"page_previous"` \| `"page_custom"`, `destination?`: `string`) => `void` ; `input?`: (`fields`: \{ `id`: `string` ; `value`: `string` }[]) => `void` ; `custom?`: (`action`: `string`, `payload`: `unknown`) => `void` }

Configuration for bidirectional mode of voice+.

#### Defined in

[packages/touchpoint-ui/src/types.ts:202](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L202)

## Variables

### version

• `Const` **version**: `string` = `packageJson.version`

Package version

#### Defined in

[packages/touchpoint-ui/src/index.tsx:50](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/index.tsx#L50)

## Functions

### analyzePageForms

▸ **analyzePageForms**(): [`PageForms`](#interfacespageformsmd)

Analyze page forms

#### Returns

[`PageForms`](#interfacespageformsmd)

pageForms

#### Defined in

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:71](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L71)

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

[packages/touchpoint-ui/src/components/Ripple.tsx:24](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/Ripple.tsx#L24)

---

### Carousel

▸ **Carousel**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type        | Description                                                                                                                           |
| :------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | `Object`    | -                                                                                                                                     |
| `props.children`           | `ReactNode` | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`       | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/Carousel.tsx:5](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Carousel.tsx#L5)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:33](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L33)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:76](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L76)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:101](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L101)

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

[packages/touchpoint-ui/src/components/ui/DateInput.tsx:25](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/DateInput.tsx#L25)

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

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:94](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L94)

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

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:33](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L33)

---

### BaseText

▸ **BaseText**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type        | Description                                                                                                                           |
| :------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | `Object`    | -                                                                                                                                     |
| `props.children`           | `ReactNode` | -                                                                                                                                     |
| `props.faded?`             | `boolean`   | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`       | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/Typography.tsx:5](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Typography.tsx#L5)

---

### SmallText

▸ **SmallText**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name                       | Type        | Description                                                                                                                           |
| :------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | `Object`    | -                                                                                                                                     |
| `props.children`           | `ReactNode` | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`       | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

#### Defined in

[packages/touchpoint-ui/src/components/ui/Typography.tsx:16](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Typography.tsx#L16)

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

[packages/touchpoint-ui/src/index.tsx:59](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/index.tsx#L59)

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

[packages/touchpoint-ui/src/index.tsx:320](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/index.tsx#L320)

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

[packages/touchpoint-ui/src/preview.tsx:10](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/preview.tsx#L10)

<a name="indexmd"></a>

# Interfaces

<a name="interfacescustomcardpropsmd"></a>

## Interface: CustomCardProps

Props for the CustomCard component

### Properties

#### children

• **children**: `ReactNode`

Content to be rendered inside the card.

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:14](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L14)

---

#### selected

• `Optional` **selected**: `boolean`

Whether the card is in a selected state. Used to highlight the card.

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:18](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L18)

---

#### onClick

• `Optional` **onClick**: () => `void`

Handler function for when the card is clicked

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:22](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L22)

---

#### href

• `Optional` **href**: `string`

Transform the card into an anchor tag with the href specified

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:26](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L26)

---

#### newTab

• `Optional` **newTab**: `boolean`

Specify whether the URL should take the user to a new tab

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:30](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L30)

<a name="interfacescustomcardrowpropsmd"></a>

## Interface: CustomCardRowProps

Props for the CustomCardRow component

### Properties

#### left

• **left**: `ReactNode`

Content to be displayed on the left side of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:90](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L90)

---

#### right

• **right**: `ReactNode`

Content to be displayed on the right side of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:94](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L94)

---

#### icon

• `Optional` **icon**: [`Icon`](#icon)

Optional icon to be displayed in the center of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:98](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L98)

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

[packages/touchpoint-ui/src/components/ui/DateInput.tsx:16](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/DateInput.tsx#L16)

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

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:31](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L31)

---

#### label

• **label**: `string`

Accessible label for the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:35](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L35)

---

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:39](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L39)

---

#### type

• **type**: [`IconButtonType`](#iconbuttontype)

Visual style variant of the button. One of IconButtonType.

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:43](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L43)

---

#### Icon

• **Icon**: `FC`\<[`IconProps`](#interfacesiconsiconpropsmd)\>

Icon component to display inside the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:47](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L47)

<a name="interfacesiconsiconpropsmd"></a>

## Interface: IconProps

[Icons](#modulesiconsmd).IconProps

Props for icon components

### Properties

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the icon

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:11](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L11)

---

#### size

• `Optional` **size**: `number`

Custom size in pixels for the icon

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:15](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L15)

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

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:18](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L18)

<a name="interfacespageformsmd"></a>

## Interface: PageForms

Page forms with elements

### Properties

#### context

• **context**: [`InteractiveElementInfo`](#interfacesinteractiveelementinfomd)[]

Page context

##### Defined in

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:28](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L28)

---

#### formElements

• **formElements**: `Record`\<`string`, `Element`\>

Form element references

##### Defined in

[packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts:32](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/bidirectional/analyzePageForms.ts#L32)

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

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:13](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L13)

---

#### label

• **label**: `string`

Text to display on the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:17](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L17)

---

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:21](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L21)

---

#### type

• `Optional` **type**: `"main"` \| `"ghost"`

Visual style variant of the button
Default value is "ghost"

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:26](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L26)

---

#### Icon

• **Icon**: `FC`\<[`IconProps`](#interfacesiconsiconpropsmd)\>

Icon component to display inside the button.

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:30](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L30)

<a name="interfacesthememd"></a>

## Interface: Theme

The full theme expressed as CSS custom properties

### Properties

#### fontFamily

• **fontFamily**: `string`

Font family

##### Defined in

[packages/touchpoint-ui/src/types.ts:66](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L66)

---

#### primary80

• **primary80**: `string`

Primary color with 80% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:71](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L71)

---

#### primary60

• **primary60**: `string`

Primary color with 60% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:75](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L75)

---

#### primary40

• **primary40**: `string`

Primary color with 40% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:79](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L79)

---

#### primary20

• **primary20**: `string`

Primary color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:83](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L83)

---

#### primary10

• **primary10**: `string`

Primary color with 10% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:87](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L87)

---

#### primary5

• **primary5**: `string`

Primary color with 5% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:91](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L91)

---

#### primary1

• **primary1**: `string`

Primary color with 1% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:95](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L95)

---

#### secondary80

• **secondary80**: `string`

Secondary color with 80% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:100](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L100)

---

#### secondary60

• **secondary60**: `string`

Secondary color with 60% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:104](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L104)

---

#### secondary40

• **secondary40**: `string`

Secondary color with 40% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:108](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L108)

---

#### secondary20

• **secondary20**: `string`

Secondary color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:112](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L112)

---

#### secondary10

• **secondary10**: `string`

Secondary color with 10% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:116](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L116)

---

#### secondary5

• **secondary5**: `string`

Secondary color with 5% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:120](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L120)

---

#### secondary1

• **secondary1**: `string`

Secondary color with 1% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:124](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L124)

---

#### accent

• **accent**: `string`

Accent color used e.g. for prominent buttons, the loader animation as well as selected card outlines

##### Defined in

[packages/touchpoint-ui/src/types.ts:129](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L129)

---

#### accent20

• **accent20**: `string`

Accent color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:133](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L133)

---

#### background

• **background**: `string`

The background color of the main Touchpoint interface

##### Defined in

[packages/touchpoint-ui/src/types.ts:137](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L137)

---

#### overlay

• **overlay**: `string`

The color of the overlay covering the visible portion of the website when the Touchpoint interface does not cover the full screen

##### Defined in

[packages/touchpoint-ui/src/types.ts:141](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L141)

---

#### warningPrimary

• **warningPrimary**: `string`

Primary warning color

##### Defined in

[packages/touchpoint-ui/src/types.ts:146](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L146)

---

#### warningSecondary

• **warningSecondary**: `string`

Secondary warning color

##### Defined in

[packages/touchpoint-ui/src/types.ts:150](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L150)

---

#### errorPrimary

• **errorPrimary**: `string`

Primary error color

##### Defined in

[packages/touchpoint-ui/src/types.ts:154](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L154)

---

#### errorSecondary

• **errorSecondary**: `string`

Secondary error color

##### Defined in

[packages/touchpoint-ui/src/types.ts:158](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L158)

---

#### innerBorderRadius

• **innerBorderRadius**: `string`

Inner border radius: used for most buttons

##### Defined in

[packages/touchpoint-ui/src/types.ts:163](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L163)

---

#### outerBorderRadius

• **outerBorderRadius**: `string`

Outer border radius: generally used for elements that contain buttons that have inner border radius. Also used by the launch button.

##### Defined in

[packages/touchpoint-ui/src/types.ts:167](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L167)

<a name="interfacestouchpointconfigurationmd"></a>

## Interface: TouchpointConfiguration

Main Touchpoint creation properties object

### Properties

#### config

• **config**: `Config`

Connection information for the @nlxai/chat-core conversation handler

##### Defined in

[packages/touchpoint-ui/src/types.ts:289](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L289)

---

#### windowSize

• `Optional` **windowSize**: [`WindowSize`](#windowsize)

Optional window size for the chat window, defaults to `half`

##### Defined in

[packages/touchpoint-ui/src/types.ts:293](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L293)

---

#### colorMode

• `Optional` **colorMode**: [`ColorMode`](#colormode)

Optional color mode for the chat window, defaults to `dark`

##### Defined in

[packages/touchpoint-ui/src/types.ts:297](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L297)

---

#### brandIcon

• `Optional` **brandIcon**: `string`

URL of icon used to display the brand in the chat header

##### Defined in

[packages/touchpoint-ui/src/types.ts:301](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L301)

---

#### launchIcon

• `Optional` **launchIcon**: `string` \| `boolean` \| [`CustomLaunchButton`](#customlaunchbutton)

URL of icon used on the launch icon in the bottom right when the experience is collapsed.

When set to `false`, no launch button is shown at all. When not set or set to `true`, the default launch icon is rendered.

##### Defined in

[packages/touchpoint-ui/src/types.ts:307](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L307)

---

#### userMessageBubble

• `Optional` **userMessageBubble**: `boolean`

Specifies whether the user message has bubbles or not

##### Defined in

[packages/touchpoint-ui/src/types.ts:311](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L311)

---

#### agentMessageBubble

• `Optional` **agentMessageBubble**: `boolean`

Specifies whether the agent message has bubbles or not

##### Defined in

[packages/touchpoint-ui/src/types.ts:315](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L315)

---

#### chatMode

• `Optional` **chatMode**: `boolean`

Enables chat mode, a classic chat experience with inline loaders and the chat history visible at all times.

##### Defined in

[packages/touchpoint-ui/src/types.ts:319](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L319)

---

#### theme

• `Optional` **theme**: `Partial`\<[`Theme`](#interfacesthememd)\>

Optional theme object to override default theme values

##### Defined in

[packages/touchpoint-ui/src/types.ts:323](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L323)

---

#### customModalities

• `Optional` **customModalities**: `Record`\<`string`, [`CustomModalityComponent`](#custommodalitycomponent)\<`unknown`\>\>

Optional custom modality components to render in Touchpoint

##### Defined in

[packages/touchpoint-ui/src/types.ts:327](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L327)

---

#### initializeConversation

• `Optional` **initializeConversation**: [`InitializeConversation`](#initializeconversation)

Custom conversation init method. Defaults to sending the welcome intent

**`Param`**

the conversation handler.

**`Param`**

the context object

##### Defined in

[packages/touchpoint-ui/src/types.ts:333](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L333)

---

#### input

• `Optional` **input**: [`Input`](#input)

Controls the ways in which the user can communicate with the application. Defaults to `"text"`

##### Defined in

[packages/touchpoint-ui/src/types.ts:337](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L337)

---

#### initialContext

• `Optional` **initialContext**: `Context`

Context sent with the initial request.

##### Defined in

[packages/touchpoint-ui/src/types.ts:341](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L341)

---

#### bidirectional

• `Optional` **bidirectional**: [`BidirectionalConfig`](#bidirectionalconfig)

Enables bidirectional mode of voice+. Will automatically set the bidirectional flag in the config.

##### Defined in

[packages/touchpoint-ui/src/types.ts:347](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/types.ts#L347)

<a name="interfacestouchpointinstancemd"></a>

## Interface: TouchpointInstance

Instance of a Touchpoint UI component

### Properties

#### expanded

• **expanded**: `boolean`

Controls whether the Touchpoint UI is expanded or collapsed

##### Defined in

[packages/touchpoint-ui/src/index.tsx:304](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/index.tsx#L304)

---

#### conversationHandler

• **conversationHandler**: `ConversationHandler`

The conversation handler instance for interacting with the application

##### Defined in

[packages/touchpoint-ui/src/index.tsx:308](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/index.tsx#L308)

---

#### teardown

• **teardown**: () => `void`

Method to remove the Touchpoint UI from the DOM

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/index.tsx:312](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/index.tsx#L312)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:21](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L21)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:29](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L29)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:40](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L40)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:67](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L67)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:78](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L78)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:86](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L86)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:97](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L97)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:108](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L108)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:119](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L119)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:130](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L130)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:141](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L141)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:152](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L152)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:167](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L167)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:178](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L178)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:189](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L189)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:200](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L200)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:211](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L211)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:225](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L225)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:248](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L248)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:259](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L259)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:270](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L270)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:281](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L281)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:292](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L292)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:303](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L303)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:314](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L314)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:325](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L325)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:336](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L336)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:347](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L347)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:355](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L355)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:372](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L372)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:383](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L383)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:394](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L394)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:405](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L405)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:416](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L416)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:427](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L427)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:438](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L438)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:449](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L449)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:460](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L460)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:477](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L477)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:488](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L488)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:499](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L499)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:510](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/touchpoint-ui/src/components/ui/Icons.tsx#L510)
