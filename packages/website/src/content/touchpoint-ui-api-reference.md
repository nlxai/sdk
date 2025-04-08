<a name="readmemd"></a>

# @nlxai/touchpoint-ui

## Namespaces

- [Icons](#modulesiconsmd)

## Interfaces

- [CustomCardProps](#interfacescustomcardpropsmd)
- [CustomCardRowProps](#interfacescustomcardrowpropsmd)
- [DateInputProps](#interfacesdateinputpropsmd)
- [IconButtonProps](#interfacesiconbuttonpropsmd)
- [TextButtonProps](#interfacestextbuttonpropsmd)
- [TouchpointInstance](#interfacestouchpointinstancemd)
- [Theme](#interfacesthememd)
- [TouchpointConfiguration](#interfacestouchpointconfigurationmd)

## Type Aliases

### IconButtonType

Ƭ **IconButtonType**: `"main"` \| `"ghost"` \| `"activated"` \| `"coverup"` \| `"overlay"`

Represents the different types of icon buttons available in the application.

- `main`: The primary icon button.
- `ghost`: A transparent or less prominent icon button.
- `activated`: An icon button that indicates an active state.
- `coverup`: An icon button used to cover up or mask something.
- `overlay`: An icon button that appears over other content.

#### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:16](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L16)

---

### WindowSize

Ƭ **WindowSize**: `"half"` \| `"full"`

Window size configuration

#### Defined in

[packages/touchpoint-ui/src/types.ts:7](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L7)

---

### ColorMode

Ƭ **ColorMode**: `"light"` \| `"dark"`

Color mode configuration (light/dark modes)

#### Defined in

[packages/touchpoint-ui/src/types.ts:12](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L12)

---

### CustomModalityComponent

Ƭ **CustomModalityComponent**\<`Data`\>: `FC`\<\{ `data`: `Data` ; `conversationHandler`: `ConversationHandler` ; `enabled`: `boolean` }\>

Custom Modalities allow rendering of rich components from nodes.
See: https://docs.studio.nlx.ai/build/resources/modalities

#### Type parameters

| Name   |
| :----- |
| `Data` |

#### Defined in

[packages/touchpoint-ui/src/types.ts:36](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L36)

## Functions

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

[packages/touchpoint-ui/src/components/ui/Carousel.tsx:5](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Carousel.tsx#L5)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:25](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L25)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:44](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L44)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:69](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L69)

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

[packages/touchpoint-ui/src/components/ui/DateInput.tsx:25](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/DateInput.tsx#L25)

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

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:64](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L64)

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

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:33](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L33)

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

[packages/touchpoint-ui/src/components/ui/Typography.tsx:5](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Typography.tsx#L5)

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

[packages/touchpoint-ui/src/components/ui/Typography.tsx:16](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Typography.tsx#L16)

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

[packages/touchpoint-ui/src/index.tsx:33](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/index.tsx#L33)

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

[packages/touchpoint-ui/src/index.tsx:195](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/index.tsx#L195)

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

[packages/touchpoint-ui/src/preview.tsx:10](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/preview.tsx#L10)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:14](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L14)

---

#### selected

• `Optional` **selected**: `boolean`

Whether the card is in a selected state. Used to highlight the card.

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:18](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L18)

---

#### onClick

• `Optional` **onClick**: () => `void`

Handler function for when the card is clicked

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:22](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L22)

<a name="interfacescustomcardrowpropsmd"></a>

## Interface: CustomCardRowProps

Props for the CustomCardRow component

### Properties

#### left

• **left**: `ReactNode`

Content to be displayed on the left side of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:58](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L58)

---

#### right

• **right**: `ReactNode`

Content to be displayed on the right side of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:62](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L62)

---

#### icon

• `Optional` **icon**: [`Icon`](#icon)

Optional icon to be displayed in the center of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:66](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L66)

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

[packages/touchpoint-ui/src/components/ui/DateInput.tsx:16](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/DateInput.tsx#L16)

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

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:30](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L30)

---

#### label

• **label**: `string`

Accessible label for the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:34](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L34)

---

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:38](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L38)

---

#### type

• **type**: [`IconButtonType`](#iconbuttontype)

Visual style variant of the button. One of IconButtonType.

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:42](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L42)

---

#### Icon

• **Icon**: `FC`\<[`IconProps`](#interfacesiconsiconpropsmd)\>

Icon component to display inside the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:46](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L46)

<a name="interfacesiconsiconpropsmd"></a>

## Interface: IconProps

[Icons](#modulesiconsmd).IconProps

Props for icon components

### Properties

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the icon

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:11](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L11)

---

#### size

• `Optional` **size**: `number`

Custom size in pixels for the icon

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:15](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L15)

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

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:13](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L13)

---

#### label

• **label**: `string`

Text to display on the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:17](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L17)

---

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:21](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L21)

---

#### type

• `Optional` **type**: `"main"` \| `"ghost"`

Visual style variant of the button
Default value is "ghost"

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:26](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L26)

---

#### Icon

• **Icon**: `FC`\<[`IconProps`](#interfacesiconsiconpropsmd)\>

Icon component to display inside the button.

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:30](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L30)

<a name="interfacesthememd"></a>

## Interface: Theme

The full theme expressed as CSS custom properties

### Properties

#### fontFamily

• **fontFamily**: `string`

Font family

##### Defined in

[packages/touchpoint-ui/src/types.ts:61](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L61)

---

#### primary80

• **primary80**: `string`

Primary color with 80% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:66](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L66)

---

#### primary60

• **primary60**: `string`

Primary color with 60% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:70](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L70)

---

#### primary40

• **primary40**: `string`

Primary color with 40% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:74](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L74)

---

#### primary20

• **primary20**: `string`

Primary color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:78](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L78)

---

#### primary10

• **primary10**: `string`

Primary color with 10% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:82](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L82)

---

#### primary5

• **primary5**: `string`

Primary color with 5% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:86](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L86)

---

#### primary1

• **primary1**: `string`

Primary color with 1% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:90](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L90)

---

#### secondary80

• **secondary80**: `string`

Secondary color with 80% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:95](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L95)

---

#### secondary60

• **secondary60**: `string`

Secondary color with 60% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:99](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L99)

---

#### secondary40

• **secondary40**: `string`

Secondary color with 40% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:103](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L103)

---

#### secondary20

• **secondary20**: `string`

Secondary color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:107](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L107)

---

#### secondary10

• **secondary10**: `string`

Secondary color with 10% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:111](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L111)

---

#### secondary5

• **secondary5**: `string`

Secondary color with 5% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:115](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L115)

---

#### secondary1

• **secondary1**: `string`

Secondary color with 1% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:119](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L119)

---

#### accent

• **accent**: `string`

Accent color used e.g. for prominent buttons, the loader animation as well as selected card outlines

##### Defined in

[packages/touchpoint-ui/src/types.ts:124](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L124)

---

#### accent20

• **accent20**: `string`

Accent color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:128](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L128)

---

#### background

• **background**: `string`

The background color of the main Touchpoint interface

##### Defined in

[packages/touchpoint-ui/src/types.ts:132](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L132)

---

#### overlay

• **overlay**: `string`

The color of the overlay covering the visible portion of the website when the Touchpoint interface does not cover the full screen

##### Defined in

[packages/touchpoint-ui/src/types.ts:136](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L136)

---

#### warningPrimary

• **warningPrimary**: `string`

Primary warning color

##### Defined in

[packages/touchpoint-ui/src/types.ts:141](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L141)

---

#### warningSecondary

• **warningSecondary**: `string`

Secondary warning color

##### Defined in

[packages/touchpoint-ui/src/types.ts:145](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L145)

---

#### errorPrimary

• **errorPrimary**: `string`

Primary error color

##### Defined in

[packages/touchpoint-ui/src/types.ts:149](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L149)

---

#### errorSecondary

• **errorSecondary**: `string`

Secondary error color

##### Defined in

[packages/touchpoint-ui/src/types.ts:153](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L153)

---

#### innerBorderRadius

• **innerBorderRadius**: `string`

Inner border radius: used for most buttons

##### Defined in

[packages/touchpoint-ui/src/types.ts:158](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L158)

---

#### outerBorderRadius

• **outerBorderRadius**: `string`

Outer border radius: generally used for elements that contain buttons that have inner border radius. Also used by the launch button.

##### Defined in

[packages/touchpoint-ui/src/types.ts:162](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L162)

<a name="interfacestouchpointconfigurationmd"></a>

## Interface: TouchpointConfiguration

Main Touchpoint creation properties object

### Properties

#### config

• **config**: `Config`

Connection information for the @nlxai/chat-core conversation handler

##### Defined in

[packages/touchpoint-ui/src/types.ts:172](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L172)

---

#### windowSize

• `Optional` **windowSize**: [`WindowSize`](#windowsize)

Optional window size for the chat window, defaults to `half`

##### Defined in

[packages/touchpoint-ui/src/types.ts:176](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L176)

---

#### colorMode

• `Optional` **colorMode**: [`ColorMode`](#colormode)

Optional color mode for the chat window, defaults to `dark`

##### Defined in

[packages/touchpoint-ui/src/types.ts:180](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L180)

---

#### brandIcon

• `Optional` **brandIcon**: `string`

URL of icon used to display the brand in the chat header

##### Defined in

[packages/touchpoint-ui/src/types.ts:184](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L184)

---

#### launchIcon

• `Optional` **launchIcon**: `string` \| `boolean`

URL of icon used on the launch icon in the bottom right when the experience is collapsed.

When set to `false`, no launch button is shown at all. When not set or set to `true`, the default launch icon is rendered.

##### Defined in

[packages/touchpoint-ui/src/types.ts:190](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L190)

---

#### theme

• `Optional` **theme**: `Partial`\<[`Theme`](#interfacesthememd)\>

Optional theme object to override default theme values

##### Defined in

[packages/touchpoint-ui/src/types.ts:194](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L194)

---

#### customModalities

• `Optional` **customModalities**: `Record`\<`string`, [`CustomModalityComponent`](#custommodalitycomponent)\<`any`\>\>

Optional custom modality components to render in Touchpoint

##### Defined in

[packages/touchpoint-ui/src/types.ts:198](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/types.ts#L198)

<a name="interfacestouchpointinstancemd"></a>

## Interface: TouchpointInstance

Instance of a Touchpoint UI component

### Properties

#### expanded

• **expanded**: `boolean`

Controls whether the Touchpoint UI is expanded or collapsed

##### Defined in

[packages/touchpoint-ui/src/index.tsx:179](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/index.tsx#L179)

---

#### conversationHandler

• **conversationHandler**: `ConversationHandler`

The conversation handler instance for interacting with the application

##### Defined in

[packages/touchpoint-ui/src/index.tsx:183](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/index.tsx#L183)

---

#### teardown

• **teardown**: () => `void`

Method to remove the Touchpoint UI from the DOM

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/index.tsx:187](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/index.tsx#L187)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:21](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L21)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:29](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L29)

---

#### Assistant

▸ **Assistant**(`props`, `deprecatedLegacyContext?`): `ReactNode`

##### Parameters

| Name                       | Type                                       | Description                                                                                                                           |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `props`                    | [`IconProps`](#interfacesiconsiconpropsmd) | -                                                                                                                                     |
| `deprecatedLegacyContext?` | `any`                                      | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

##### Returns

`ReactNode`

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:40](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L40)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:67](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L67)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:78](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L78)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:86](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L86)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:97](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L97)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:108](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L108)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:119](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L119)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:130](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L130)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:141](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L141)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:152](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L152)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:167](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L167)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:178](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L178)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:189](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L189)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:200](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L200)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:211](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L211)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:225](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L225)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:248](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L248)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:259](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L259)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:270](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L270)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:281](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L281)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:292](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L292)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:303](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L303)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:314](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L314)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:325](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L325)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:336](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L336)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:347](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L347)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:355](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L355)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:372](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L372)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:383](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L383)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:394](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L394)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:405](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L405)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:416](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L416)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:427](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L427)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:438](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L438)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:449](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L449)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:460](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L460)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:477](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L477)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:488](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L488)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:499](https://github.com/nlxai/sdk/blob/8b853457d427626d7c75ba959ddb9dd0754725af/packages/touchpoint-ui/src/components/ui/Icons.tsx#L499)
