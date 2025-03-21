<a name="readmemd"></a>

# @nlxai/touchpoint-ui

## Namespaces

- [Icons](#modulesiconsmd)

## Interfaces

- [Props](#interfacespropsmd)
- [CustomCardProps](#interfacescustomcardpropsmd)
- [CustomCardRowProps](#interfacescustomcardrowpropsmd)
- [DateInputProps](#interfacesdateinputpropsmd)
- [IconButtonProps](#interfacesiconbuttonpropsmd)
- [TextButtonProps](#interfacestextbuttonpropsmd)
- [TouchpointInstance](#interfacestouchpointinstancemd)
- [Theme](#interfacesthememd)

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

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:16](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L16)

---

### WindowSize

Ƭ **WindowSize**: `"half"` \| `"full"`

Window size configuration

#### Defined in

[packages/touchpoint-ui/src/types.ts:7](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L7)

---

### ColorMode

Ƭ **ColorMode**: `"light"` \| `"dark"`

Color mode configuration (light/dark modes)

#### Defined in

[packages/touchpoint-ui/src/types.ts:12](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L12)

---

### CustomModalityComponent

Ƭ **CustomModalityComponent**\<`Data`\>: `FC`\<\{ `data`: `Data` ; `conversationHandler`: `ConversationHandler` }\>

Custom Modalities allow rendering of rich components from nodes.
See: https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/advanced-messaging-+-functionality#modalities

#### Type parameters

| Name   |
| :----- |
| `Data` |

#### Defined in

[packages/touchpoint-ui/src/types.ts:36](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L36)

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

[packages/touchpoint-ui/src/components/ui/Carousel.tsx:5](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Carousel.tsx#L5)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:25](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L25)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:44](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L44)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:69](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L69)

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

[packages/touchpoint-ui/src/components/ui/DateInput.tsx:25](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/DateInput.tsx#L25)

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

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:64](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L64)

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

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:33](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L33)

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

[packages/touchpoint-ui/src/components/ui/Typography.tsx:5](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Typography.tsx#L5)

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

[packages/touchpoint-ui/src/components/ui/Typography.tsx:16](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Typography.tsx#L16)

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

[packages/touchpoint-ui/src/index.tsx:31](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/index.tsx#L31)

---

### create

▸ **create**(`props`): `Promise`\<[`TouchpointInstance`](#interfacestouchpointinstancemd)\>

Creates a new Touchpoint UI instance and appends it to the document body

#### Parameters

| Name    | Type                          | Description                        |
| :------ | :---------------------------- | :--------------------------------- |
| `props` | [`Props`](#interfacespropsmd) | Configuration props for Touchpoint |

#### Returns

`Promise`\<[`TouchpointInstance`](#interfacestouchpointinstancemd)\>

A promise that resolves to a TouchpointInstance

#### Defined in

[packages/touchpoint-ui/src/index.tsx:141](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/index.tsx#L141)

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

[packages/touchpoint-ui/src/preview.tsx:10](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/preview.tsx#L10)

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

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:14](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L14)

---

#### selected

• `Optional` **selected**: `boolean`

Whether the card is in a selected state. Used to highlight the card.

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:18](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L18)

---

#### onClick

• `Optional` **onClick**: () => `void`

Handler function for when the card is clicked

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:22](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L22)

<a name="interfacescustomcardrowpropsmd"></a>

## Interface: CustomCardRowProps

Props for the CustomCardRow component

### Properties

#### left

• **left**: `ReactNode`

Content to be displayed on the left side of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:58](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L58)

---

#### right

• **right**: `ReactNode`

Content to be displayed on the right side of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:62](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L62)

---

#### icon

• `Optional` **icon**: [`Icon`](#icon)

Optional icon to be displayed in the center of the row

##### Defined in

[packages/touchpoint-ui/src/components/ui/CustomCard.tsx:66](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/CustomCard.tsx#L66)

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

[packages/touchpoint-ui/src/components/ui/DateInput.tsx:16](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/DateInput.tsx#L16)

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

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:30](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L30)

---

#### label

• **label**: `string`

Accessible label for the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:34](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L34)

---

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:38](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L38)

---

#### type

• **type**: [`IconButtonType`](#iconbuttontype)

Visual style variant of the button. One of IconButtonType.

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:42](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L42)

---

#### Icon

• **Icon**: `FC`\<[`IconProps`](#interfacesiconsiconpropsmd)\>

Icon component to display inside the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/IconButton.tsx:46](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/IconButton.tsx#L46)

<a name="interfacesiconsiconpropsmd"></a>

## Interface: IconProps

[Icons](#modulesiconsmd).IconProps

Props for icon components

### Properties

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the icon

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:11](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L11)

---

#### size

• `Optional` **size**: `number`

Custom size in pixels for the icon

##### Defined in

[packages/touchpoint-ui/src/components/ui/Icons.tsx:15](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L15)

<a name="interfacespropsmd"></a>

## Interface: Props

Main Touchpoint creation properties object

### Properties

#### config

• **config**: `Config`

Configuration object for Touchpoint

##### Defined in

[packages/touchpoint-ui/src/App.tsx:44](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/App.tsx#L44)

---

#### windowSize

• `Optional` **windowSize**: [`WindowSize`](#windowsize)

Optional window size for the chat window, defaults to `half`

##### Defined in

[packages/touchpoint-ui/src/App.tsx:48](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/App.tsx#L48)

---

#### colorMode

• `Optional` **colorMode**: [`ColorMode`](#colormode)

Optional color mode for the chat window, defaults to `dark`

##### Defined in

[packages/touchpoint-ui/src/App.tsx:52](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/App.tsx#L52)

---

#### brandIcon

• `Optional` **brandIcon**: `string`

URL of icon used to display the brand in the chat header

##### Defined in

[packages/touchpoint-ui/src/App.tsx:56](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/App.tsx#L56)

---

#### launchIcon

• `Optional` **launchIcon**: `string` \| `boolean`

URL of icon used on the launch icon in the bottom right when the experience is collapsed.

When set to `false`, no launch button is shown at all. When not set or set to `true`, the default launch icon is rendered.

##### Defined in

[packages/touchpoint-ui/src/App.tsx:62](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/App.tsx#L62)

---

#### theme

• `Optional` **theme**: `Partial`\<[`Theme`](#interfacesthememd)\>

Optional theme object to override default theme values

##### Defined in

[packages/touchpoint-ui/src/App.tsx:66](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/App.tsx#L66)

---

#### customModalities

• `Optional` **customModalities**: `Record`\<`string`, [`CustomModalityComponent`](#custommodalitycomponent)\<`any`\>\>

Optional custom modality components to render in Touchpoint

##### Defined in

[packages/touchpoint-ui/src/App.tsx:70](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/App.tsx#L70)

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

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:13](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L13)

---

#### label

• **label**: `string`

Text to display on the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:17](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L17)

---

#### className

• `Optional` **className**: `string`

Additional CSS classes to apply to the button

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:21](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L21)

---

#### type

• `Optional` **type**: `"main"` \| `"ghost"`

Visual style variant of the button
Default value is "ghost"

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:26](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L26)

---

#### Icon

• **Icon**: `FC`\<[`IconProps`](#interfacesiconsiconpropsmd)\>

Icon component to display inside the button.

##### Defined in

[packages/touchpoint-ui/src/components/ui/TextButton.tsx:30](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/TextButton.tsx#L30)

<a name="interfacesthememd"></a>

## Interface: Theme

The full theme expressed as CSS custom properties

### Properties

#### fontFamily

• **fontFamily**: `string`

Font family

##### Defined in

[packages/touchpoint-ui/src/types.ts:54](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L54)

---

#### primary80

• **primary80**: `string`

Primary color with 80% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:59](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L59)

---

#### primary60

• **primary60**: `string`

Primary color with 60% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:63](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L63)

---

#### primary40

• **primary40**: `string`

Primary color with 40% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:67](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L67)

---

#### primary20

• **primary20**: `string`

Primary color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:71](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L71)

---

#### primary10

• **primary10**: `string`

Primary color with 10% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:75](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L75)

---

#### primary5

• **primary5**: `string`

Primary color with 5% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:79](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L79)

---

#### primary1

• **primary1**: `string`

Primary color with 1% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:83](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L83)

---

#### secondary80

• **secondary80**: `string`

Secondary color with 80% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:88](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L88)

---

#### secondary60

• **secondary60**: `string`

Secondary color with 60% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:92](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L92)

---

#### secondary40

• **secondary40**: `string`

Secondary color with 40% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:96](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L96)

---

#### secondary20

• **secondary20**: `string`

Secondary color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:100](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L100)

---

#### secondary10

• **secondary10**: `string`

Secondary color with 10% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:104](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L104)

---

#### secondary5

• **secondary5**: `string`

Secondary color with 5% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:108](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L108)

---

#### secondary1

• **secondary1**: `string`

Secondary color with 1% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:112](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L112)

---

#### accent

• **accent**: `string`

Accent color used e.g. for prominent buttons, the loader animation as well as selected card outlines

##### Defined in

[packages/touchpoint-ui/src/types.ts:117](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L117)

---

#### accent20

• **accent20**: `string`

Accent color with 20% opacity

##### Defined in

[packages/touchpoint-ui/src/types.ts:121](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L121)

---

#### background

• **background**: `string`

The background color of the main Touchpoint interface

##### Defined in

[packages/touchpoint-ui/src/types.ts:125](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L125)

---

#### overlay

• **overlay**: `string`

The color of the overlay covering the visible portion of the website when the Touchpoint interface does not cover the full screen

##### Defined in

[packages/touchpoint-ui/src/types.ts:129](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L129)

---

#### warningPrimary

• **warningPrimary**: `string`

Primary warning color

##### Defined in

[packages/touchpoint-ui/src/types.ts:134](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L134)

---

#### warningSecondary

• **warningSecondary**: `string`

Secondary warning color

##### Defined in

[packages/touchpoint-ui/src/types.ts:138](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L138)

---

#### errorPrimary

• **errorPrimary**: `string`

Primary error color

##### Defined in

[packages/touchpoint-ui/src/types.ts:142](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L142)

---

#### errorSecondary

• **errorSecondary**: `string`

Secondary error color

##### Defined in

[packages/touchpoint-ui/src/types.ts:146](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L146)

---

#### innerBorderRadius

• **innerBorderRadius**: `string`

Inner border radius: used for most buttons

##### Defined in

[packages/touchpoint-ui/src/types.ts:151](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L151)

---

#### outerBorderRadius

• **outerBorderRadius**: `string`

Outer border radius: generally used for elements that contain buttons that have inner border radius. Also used by the launch button.

##### Defined in

[packages/touchpoint-ui/src/types.ts:155](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/types.ts#L155)

<a name="interfacestouchpointinstancemd"></a>

## Interface: TouchpointInstance

Instance of a Touchpoint UI component

### Properties

#### expanded

• **expanded**: `boolean`

Controls whether the Touchpoint UI is expanded or collapsed

##### Defined in

[packages/touchpoint-ui/src/index.tsx:124](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/index.tsx#L124)

---

#### conversationHandler

• **conversationHandler**: `ConversationHandler`

The conversation handler instance for interacting with the application

##### Defined in

[packages/touchpoint-ui/src/index.tsx:128](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/index.tsx#L128)

---

#### teardown

• **teardown**: () => `void`

Method to remove the Touchpoint UI from the DOM

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[packages/touchpoint-ui/src/index.tsx:132](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/index.tsx#L132)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:21](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L21)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:29](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L29)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:40](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L40)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:67](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L67)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:78](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L78)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:86](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L86)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:97](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L97)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:108](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L108)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:119](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L119)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:130](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L130)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:141](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L141)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:152](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L152)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:167](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L167)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:178](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L178)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:189](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L189)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:200](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L200)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:211](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L211)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:225](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L225)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:248](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L248)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:259](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L259)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:270](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L270)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:281](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L281)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:292](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L292)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:303](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L303)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:314](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L314)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:325](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L325)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:336](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L336)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:347](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L347)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:355](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L355)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:372](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L372)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:383](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L383)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:394](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L394)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:405](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L405)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:416](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L416)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:427](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L427)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:438](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L438)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:449](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L449)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:460](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L460)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:477](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L477)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:488](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L488)

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

[packages/touchpoint-ui/src/components/ui/Icons.tsx:499](https://github.com/nlxai/sdk/blob/26f38959172570500ea03ce3d0f735855faa5734/packages/touchpoint-ui/src/components/ui/Icons.tsx#L499)
