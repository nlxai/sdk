
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

[index.ts:22](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L22)

___

### Triggers

Ƭ **Triggers**: `Record`\<[`StepId`](#stepid), [`Trigger`](#interfacestriggermd)\>

A record of triggers

#### Defined in

[index.ts:64](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L64)

___

### ActiveTriggerEventType

Ƭ **ActiveTriggerEventType**: ``"click"``

Active trigger event type.

#### Defined in

[index.ts:143](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L143)

___

### Method

Ƭ **Method**: ``"AltText"`` \| ``"DisplayValue"`` \| ``"LabelText"`` \| ``"PlaceholderText"`` \| ``"Role"`` \| ``"TestId"`` \| ``"Text"`` \| ``"Title"`` \| ``"QuerySelector"``

Matching method

#### Defined in

[queries.ts:10](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L10)

## Functions

### run

▸ **run**(`props`): [`RunOutput`](#interfacesrunoutputmd)

Run the multimodal journey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`RunProps`](#interfacesrunpropsmd) | The run configuration object |

#### Returns

[`RunOutput`](#interfacesrunoutputmd)

an object containing a teardown function and the multimodal client.

#### Defined in

[index.ts:213](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L213)


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

[index.ts:150](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L150)

___

#### elements

• **elements**: `HTMLElement`[]

The matched elements

##### Defined in

[index.ts:152](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L152)


<a name="interfacesclickstepmd"></a>

## Interface: ClickStep

Click step

### Properties

#### stepId

• **stepId**: `string`

Step ID

##### Defined in

[index.ts:79](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L79)

___

#### query

• **query**: [`Query`](#interfacesquerymd)

Element query

##### Defined in

[index.ts:83](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L83)

___

#### once

• `Optional` **once**: `boolean`

Controls whether the step should only trigger the first time it is clicked, or on all subsequent clicks as well

##### Defined in

[index.ts:87](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L87)

___

#### urlCondition

• `Optional` **urlCondition**: [`UrlCondition`](#interfacesurlconditionmd)

URL condition for the click

##### Defined in

[index.ts:91](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L91)


<a name="interfacesencodedquerymd"></a>

## Interface: EncodedQuery

Encoded query

### Properties

#### name

• **name**: [`Method`](#method)

Query name

##### Defined in

[queries.ts:60](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L60)

___

#### target

• **target**: `string` \| [`SerializedRegex`](#interfacesserializedregexmd)

Query target

##### Defined in

[queries.ts:64](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L64)

___

#### options

• **options**: ``null`` \| `Record`\<`string`, `boolean` \| [`SerializedRegex`](#interfacesserializedregexmd)\>

Query options

##### Defined in

[queries.ts:68](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L68)

___

#### parent

• **parent**: ``null`` \| [`EncodedQuery`](#interfacesencodedquerymd)

Query parent

##### Defined in

[queries.ts:72](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L72)


<a name="interfacespartialthememd"></a>

## Interface: PartialTheme

Deep partial variant of the UI theme, input by the library user

### Properties

#### colors

• `Optional` **colors**: `Partial`\<[`ThemeColors`](#interfacesthemecolorsmd)\>

UI colors

##### Defined in

[ui.ts:39](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L39)

___

#### fontFamily

• `Optional` **fontFamily**: `string`

Font family

##### Defined in

[ui.ts:43](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L43)


<a name="interfacesquerymd"></a>

## Interface: Query

Query

### Properties

#### queryName

• **queryName**: [`Method`](#method)

Query name

##### Defined in

[queries.ts:28](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L28)

___

#### queryArgs

• **queryArgs**: [`string` \| `RegExp`, Record\<string, boolean \| RegExp\>?]

Query arguments

##### Defined in

[queries.ts:32](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L32)

___

#### parent

• `Optional` **parent**: [`Query`](#interfacesquerymd)

Parent query

##### Defined in

[queries.ts:36](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L36)


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

[index.ts:162](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L162)

___

#### findActiveTriggers

• **findActiveTriggers**: (`eventType`: ``"click"``) => [`ActiveTrigger`](#interfacesactivetriggermd)[]

Find active triggers on the page

##### Type declaration

▸ (`eventType`): [`ActiveTrigger`](#interfacesactivetriggermd)[]

###### Parameters

| Name | Type |
| :------ | :------ |
| `eventType` | ``"click"`` |

###### Returns

[`ActiveTrigger`](#interfacesactivetriggermd)[]

##### Defined in

[index.ts:166](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L166)

___

#### client

• **client**: `Client`

The regular multimodal SDK client

##### Defined in

[index.ts:170](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L170)


<a name="interfacesrunpropsmd"></a>

## Interface: RunProps

Configuration for the run method

### Properties

#### config

• **config**: `Config`

The regular multimodal configuration

##### Defined in

[index.ts:180](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L180)

___

#### ui

• `Optional` **ui**: [`UiConfig`](#interfacesuiconfigmd)

UI configuration

##### Defined in

[index.ts:184](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L184)

___

#### triggers

• **triggers**: [`Triggers`](#triggers)

The triggers dictionary, downloaded from the Dialog Studio desktop app

##### Defined in

[index.ts:188](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L188)

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

[index.ts:192](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L192)


<a name="interfacesserializedregexmd"></a>

## Interface: SerializedRegex

Serialized regex

### Properties

#### regexp

• **regexp**: `string`

Regex body

##### Defined in

[queries.ts:46](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L46)

___

#### flags

• **flags**: `string`

Regex flags

##### Defined in

[queries.ts:50](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/queries.ts#L50)


<a name="interfacesthememd"></a>

## Interface: Theme

Visual theme for the UI

### Properties

#### colors

• **colors**: [`ThemeColors`](#interfacesthemecolorsmd)

UI colors

##### Defined in

[ui.ts:25](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L25)

___

#### fontFamily

• **fontFamily**: `string`

Font family

##### Defined in

[ui.ts:29](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L29)


<a name="interfacesthemecolorsmd"></a>

## Interface: ThemeColors

Theme colors

### Properties

#### primary

• **primary**: `string`

Primary color

##### Defined in

[ui.ts:11](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L11)

___

#### primaryHover

• **primaryHover**: `string`

Primary color on hover

##### Defined in

[ui.ts:15](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L15)


<a name="interfacestriggermd"></a>

## Interface: Trigger

A single trigger

### Properties

#### event

• **event**: ``"click"`` \| ``"pageLoad"``

Event

##### Defined in

[index.ts:46](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L46)

___

#### query

• `Optional` **query**: [`EncodedQuery`](#interfacesencodedquerymd)

A query identifying the element

##### Defined in

[index.ts:50](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L50)

___

#### once

• `Optional` **once**: `boolean`

A flag specifying whether the trigger should only fire a single time

##### Defined in

[index.ts:54](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L54)

___

#### urlCondition

• `Optional` **urlCondition**: [`UrlCondition`](#interfacesurlconditionmd)

URL condition

##### Defined in

[index.ts:58](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L58)


<a name="interfacesuiconfigmd"></a>

## Interface: UiConfig

Full UI configuration

### Properties

#### title

• **title**: `string`

Drawer title

##### Defined in

[ui.ts:53](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L53)

___

#### subtitle

• **subtitle**: `string`

Drawer subtitle

##### Defined in

[ui.ts:57](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L57)

___

#### theme

• `Optional` **theme**: [`PartialTheme`](#interfacespartialthememd)

UI theme

##### Defined in

[ui.ts:61](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L61)

___

#### escalationStep

• `Optional` **escalationStep**: `string`

Escalation step ID

##### Defined in

[ui.ts:65](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L65)

___

#### endStep

• `Optional` **endStep**: `string`

End step ID

##### Defined in

[ui.ts:69](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/ui.ts#L69)


<a name="interfacesurlconditionmd"></a>

## Interface: UrlCondition

URL match condition

### Properties

#### operator

• **operator**: ``"contains"`` \| ``"prefix"`` \| ``"eq"`` \| ``"neq"`` \| ``"suffix"`` \| ``"not_contains"``

Condition operator

##### Defined in

[index.ts:31](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L31)

___

#### value

• **value**: `string`

Condition value

##### Defined in

[index.ts:35](https://github.com/nlxai/sdk/blob/3c739af84a7dcfbf232764b56f4562fed8077085/packages/journey-manager/src/index.ts#L35)
