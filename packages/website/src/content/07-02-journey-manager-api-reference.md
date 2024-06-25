
<a name="readmemd"></a>

# @nlxai/journey-manager

## Interfaces

- [UrlCondition](#interfacesurlconditionmd)
- [Trigger](#interfacestriggermd)
- [ClickStep](#interfacesclickstepmd)
- [ActiveTrigger](#interfacesactivetriggermd)
- [RunOutput](#interfacesrunoutputmd)
- [RunProps](#interfacesrunpropsmd)
- [Query](#interfacesquerymd)
- [SerializedRegex](#interfacesserializedregexmd)
- [EncodedQuery](#interfacesencodedquerymd)
- [ThemeColors](#interfacesthemecolorsmd)
- [Theme](#interfacesthememd)
- [PartialTheme](#interfacespartialthememd)
- [UiConfig](#interfacesuiconfigmd)

## Type Aliases

### StepId

Ƭ **StepId**: `string`

Step ID

#### Defined in

[journey-manager/src/index.ts:22](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L22)

___

### Triggers

Ƭ **Triggers**: `Record`\<[`StepId`](#stepid), [`Trigger`](#interfacestriggermd)\>

A record of triggers

#### Defined in

[journey-manager/src/index.ts:64](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L64)

___

### ActiveTriggerEventType

Ƭ **ActiveTriggerEventType**: ``"click"``

Active trigger event type.

#### Defined in

[journey-manager/src/index.ts:163](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L163)

___

### Method

Ƭ **Method**: ``"AltText"`` \| ``"DisplayValue"`` \| ``"LabelText"`` \| ``"PlaceholderText"`` \| ``"Role"`` \| ``"TestId"`` \| ``"Text"`` \| ``"Title"`` \| ``"QuerySelector"``

Matching method

#### Defined in

[journey-manager/src/queries.ts:10](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L10)

## Functions

### run

▸ **run**(`props`): `Promise`\<[`RunOutput`](#interfacesrunoutputmd)\>

Run the multimodal journey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`RunProps`](#interfacesrunpropsmd) | The run configuration object |

#### Returns

`Promise`\<[`RunOutput`](#interfacesrunoutputmd)\>

an promise of an object containing a teardown function and the multimodal client.

#### Defined in

[journey-manager/src/index.ts:261](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L261)


<a name="indexmd"></a>


# Interfaces


<a name="interfacesactivetriggermd"></a>

## Interface: ActiveTrigger

Active trigger.

### Properties

#### trigger

• **trigger**: [`ClickStep`](#interfacesclickstepmd)

The trigger associated with the elements.

##### Defined in

[journey-manager/src/index.ts:170](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L170)

___

#### elements

• **elements**: `HTMLElement`[]

The matched elements

##### Defined in

[journey-manager/src/index.ts:172](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L172)


<a name="interfacesclickstepmd"></a>

## Interface: ClickStep

Click step

### Properties

#### stepId

• **stepId**: `string`

Step ID

##### Defined in

[journey-manager/src/index.ts:79](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L79)

___

#### query

• **query**: [`Query`](#interfacesquerymd)

Element query

##### Defined in

[journey-manager/src/index.ts:83](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L83)

___

#### once

• `Optional` **once**: `boolean`

Controls whether the step should only trigger the first time it is clicked, or on all subsequent clicks as well

##### Defined in

[journey-manager/src/index.ts:87](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L87)

___

#### urlCondition

• `Optional` **urlCondition**: [`UrlCondition`](#interfacesurlconditionmd)

URL condition for the click

##### Defined in

[journey-manager/src/index.ts:91](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L91)


<a name="interfacesencodedquerymd"></a>

## Interface: EncodedQuery

Encoded query

### Properties

#### name

• **name**: [`Method`](#method)

Query name

##### Defined in

[journey-manager/src/queries.ts:60](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L60)

___

#### target

• **target**: `string` \| [`SerializedRegex`](#interfacesserializedregexmd)

Query target

##### Defined in

[journey-manager/src/queries.ts:64](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L64)

___

#### options

• **options**: ``null`` \| `Record`\<`string`, `boolean` \| [`SerializedRegex`](#interfacesserializedregexmd)\>

Query options

##### Defined in

[journey-manager/src/queries.ts:68](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L68)

___

#### parent

• **parent**: ``null`` \| [`EncodedQuery`](#interfacesencodedquerymd)

Query parent

##### Defined in

[journey-manager/src/queries.ts:72](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L72)


<a name="interfacespartialthememd"></a>

## Interface: PartialTheme

Deep partial variant of the UI theme, input by the library user

### Properties

#### colors

• `Optional` **colors**: `Partial`\<[`ThemeColors`](#interfacesthemecolorsmd)\>

UI colors

##### Defined in

[journey-manager/src/ui.tsx:47](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L47)

___

#### fontFamily

• `Optional` **fontFamily**: `string`

Font family

##### Defined in

[journey-manager/src/ui.tsx:51](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L51)


<a name="interfacesquerymd"></a>

## Interface: Query

Query

### Properties

#### queryName

• **queryName**: [`Method`](#method)

Query name

##### Defined in

[journey-manager/src/queries.ts:28](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L28)

___

#### queryArgs

• **queryArgs**: [`string` \| `RegExp`, Record\<string, boolean \| RegExp\>?]

Query arguments

##### Defined in

[journey-manager/src/queries.ts:32](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L32)

___

#### parent

• `Optional` **parent**: [`Query`](#interfacesquerymd)

Parent query

##### Defined in

[journey-manager/src/queries.ts:36](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L36)


<a name="interfacesrunoutputmd"></a>

## Interface: RunOutput

Created by [run](#run).

### Properties

#### teardown

• **teardown**: () => `void`

Stop running the journey, removing all event listeners

##### Type declaration

▸ (): `void`

###### Returns

`void`

##### Defined in

[journey-manager/src/index.ts:182](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L182)

___

#### client

• **client**: `Client`

The regular multimodal SDK client

##### Defined in

[journey-manager/src/index.ts:186](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L186)


<a name="interfacesrunpropsmd"></a>

## Interface: RunProps

Configuration for the run method

### Properties

#### config

• **config**: `Config`

The regular multimodal configuration

##### Defined in

[journey-manager/src/index.ts:196](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L196)

___

#### ui

• `Optional` **ui**: [`UiConfig`](#interfacesuiconfigmd)

UI configuration

##### Defined in

[journey-manager/src/index.ts:200](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L200)

___

#### triggers

• `Optional` **triggers**: [`Triggers`](#triggers)

The triggers dictionary, downloaded from the Dialog Studio desktop app.
If triggers are not provided, they will be fetched from the CDN.

##### Defined in

[journey-manager/src/index.ts:205](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L205)

___

#### onDigression

• `Optional` **onDigression**: (`client`: `Client`) => `void`

Digression detection callback

##### Type declaration

▸ (`client`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Client` |

###### Returns

`void`

##### Defined in

[journey-manager/src/index.ts:209](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L209)


<a name="interfacesserializedregexmd"></a>

## Interface: SerializedRegex

Serialized regex

### Properties

#### regexp

• **regexp**: `string`

Regex body

##### Defined in

[journey-manager/src/queries.ts:46](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L46)

___

#### flags

• **flags**: `string`

Regex flags

##### Defined in

[journey-manager/src/queries.ts:50](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/queries.ts#L50)


<a name="interfacesthememd"></a>

## Interface: Theme

Visual theme for the UI

### Properties

#### colors

• **colors**: [`ThemeColors`](#interfacesthemecolorsmd)

UI colors

##### Defined in

[journey-manager/src/ui.tsx:33](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L33)

___

#### fontFamily

• **fontFamily**: `string`

Font family

##### Defined in

[journey-manager/src/ui.tsx:37](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L37)


<a name="interfacesthemecolorsmd"></a>

## Interface: ThemeColors

Theme colors

### Properties

#### primary

• **primary**: `string`

Primary color

##### Defined in

[journey-manager/src/ui.tsx:15](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L15)

___

#### primaryHover

• **primaryHover**: `string`

Primary color on hover

##### Defined in

[journey-manager/src/ui.tsx:19](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L19)

___

#### highlight

• **highlight**: `string`

Color for trigger highlights

##### Defined in

[journey-manager/src/ui.tsx:23](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L23)


<a name="interfacestriggermd"></a>

## Interface: Trigger

A single trigger

### Properties

#### event

• **event**: ``"click"`` \| ``"pageLoad"``

Event

##### Defined in

[journey-manager/src/index.ts:46](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L46)

___

#### query

• `Optional` **query**: [`EncodedQuery`](#interfacesencodedquerymd)

A query identifying the element

##### Defined in

[journey-manager/src/index.ts:50](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L50)

___

#### once

• `Optional` **once**: `boolean`

A flag specifying whether the trigger should only fire a single time

##### Defined in

[journey-manager/src/index.ts:54](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L54)

___

#### urlCondition

• `Optional` **urlCondition**: [`UrlCondition`](#interfacesurlconditionmd)

URL condition

##### Defined in

[journey-manager/src/index.ts:58](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L58)


<a name="interfacesuiconfigmd"></a>

## Interface: UiConfig

Full UI configuration

### Properties

#### title

• **title**: `string`

Drawer title

##### Defined in

[journey-manager/src/ui.tsx:61](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L61)

___

#### subtitle

• **subtitle**: `string`

Drawer subtitle

##### Defined in

[journey-manager/src/ui.tsx:65](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L65)

___

#### highlights

• `Optional` **highlights**: `boolean`

Render highlights

##### Defined in

[journey-manager/src/ui.tsx:69](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L69)

___

#### theme

• `Optional` **theme**: [`PartialTheme`](#interfacespartialthememd)

UI theme

##### Defined in

[journey-manager/src/ui.tsx:73](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L73)

___

#### escalationStep

• `Optional` **escalationStep**: `string`

Escalation step ID

##### Defined in

[journey-manager/src/ui.tsx:77](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L77)

___

#### endStep

• `Optional` **endStep**: `string`

End step ID

##### Defined in

[journey-manager/src/ui.tsx:81](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L81)

___

#### onPreviousStep

• `Optional` **onPreviousStep**: (`config`: \{ `sendStep`: (`stepId`: `string`, `context?`: `Context`) => `Promise`\<`void`\> ; `triggeredSteps`: \{ `stepId`: `string` ; `url`: `string`  }[]  }) => `void`

On previous step

##### Type declaration

▸ (`config`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.sendStep` | (`stepId`: `string`, `context?`: `Context`) => `Promise`\<`void`\> |
| `config.triggeredSteps` | \{ `stepId`: `string` ; `url`: `string`  }[] |

###### Returns

`void`

##### Defined in

[journey-manager/src/ui.tsx:85](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/ui.tsx#L85)


<a name="interfacesurlconditionmd"></a>

## Interface: UrlCondition

URL match condition

### Properties

#### operator

• **operator**: ``"contains"`` \| ``"prefix"`` \| ``"eq"`` \| ``"neq"`` \| ``"suffix"`` \| ``"not_contains"``

Condition operator

##### Defined in

[journey-manager/src/index.ts:31](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L31)

___

#### value

• **value**: `string`

Condition value

##### Defined in

[journey-manager/src/index.ts:35](https://github.com/nlxai/sdk/blob/e6f65697e16134f7e08dae17f2a4ecc6197a3f32/packages/journey-manager/src/index.ts#L35)
