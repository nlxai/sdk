
<a name="readmemd"></a>

# @nlxai/voice-plus-web

## Interfaces

- [UrlCondition](#interfacesurlconditionmd)
- [ThemeColors](#interfacesthemecolorsmd)
- [Theme](#interfacesthememd)
- [TriggeredStep](#interfacestriggeredstepmd)
- [SimpleHandlerArg](#interfacessimplehandlerargmd)
- [ButtonConfig](#interfacesbuttonconfigmd)
- [UiConfig](#interfacesuiconfigmd)
- [RunProps](#interfacesrunpropsmd)
- [RunOutput](#interfacesrunoutputmd)
- [SerializedRegex](#interfacesserializedregexmd)
- [EncodedQuery](#interfacesencodedquerymd)
- [Trigger](#interfacestriggermd)

## References

### default

Renames and re-exports [run](#run)

## Type Aliases

### HandlerArg

Ƭ **HandlerArg**: [`SimpleHandlerArg`](#interfacessimplehandlerargmd) & \{ `triggeredSteps`: [`TriggeredStep`](#interfacestriggeredstepmd)[]  }

Used for some more advanced callbacks

#### Defined in

voice-plus-web/src/configuration.ts:50

___

### Method

Ƭ **Method**: ``"AltText"`` \| ``"DisplayValue"`` \| ``"LabelText"`` \| ``"PlaceholderText"`` \| ``"Role"`` \| ``"TestId"`` \| ``"Text"`` \| ``"Title"`` \| ``"QuerySelector"``

Matching method

#### Defined in

voice-plus-web/src/queries.ts:10

___

### Triggers

Ƭ **Triggers**: `Record`\<[`StepId`](#stepid), [`Trigger`](#interfacestriggermd)\>

A record of triggers

#### Defined in

voice-plus-web/src/trigger.ts:36

___

### StepId

Ƭ **StepId**: `string`

Step ID

#### Defined in

voice-plus-web/src/trigger.ts:65

## Variables

### iconUrls

• `Const` **iconUrls**: `Object`

Icon URL's

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `supportAgent` | `string` | Support agent icon |
| `callEnd` | `string` | Call end icon |
| `multimodal` | `string` | Multimodal icon |

#### Defined in

voice-plus-web/src/ui/components/icons.tsx:12

## Functions

### run

▸ **run**(`props`): `Promise`\<[`RunOutput`](#interfacesrunoutputmd)\>

Run the Voice+ script

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`RunProps`](#interfacesrunpropsmd) | The run configuration object |

#### Returns

`Promise`\<[`RunOutput`](#interfacesrunoutputmd)\>

an promise of an object containing a teardown function and the Voice+ client.

#### Defined in

voice-plus-web/src/index.ts:84


<a name="indexmd"></a>


# Interfaces


<a name="interfacesbuttonconfigmd"></a>

## Interface: ButtonConfig

Button configuration

### Properties

#### label

• **label**: `string`

Button label

##### Defined in

voice-plus-web/src/configuration.ts:62

___

#### confirmation

• `Optional` **confirmation**: `string`

Button confirmation: if present, the button click handler only triggers after the confirmation button is hit

##### Defined in

voice-plus-web/src/configuration.ts:66

___

#### iconUrl

• `Optional` **iconUrl**: `string`

Icon URL

##### Defined in

voice-plus-web/src/configuration.ts:70

___

#### onClick

• **onClick**: (`config`: [`HandlerArg`](#handlerarg)) => `void`

Click handler

##### Type declaration

▸ (`config`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`HandlerArg`](#handlerarg) |

###### Returns

`void`

##### Defined in

voice-plus-web/src/configuration.ts:74


<a name="interfacesencodedquerymd"></a>

## Interface: EncodedQuery

Encoded query

### Properties

#### name

• **name**: [`Method`](#method)

Query name

##### Defined in

voice-plus-web/src/queries.ts:60

___

#### target

• **target**: `string` \| [`SerializedRegex`](#interfacesserializedregexmd)

Query target

##### Defined in

voice-plus-web/src/queries.ts:64

___

#### options

• **options**: ``null`` \| `Record`\<`string`, `boolean` \| [`SerializedRegex`](#interfacesserializedregexmd)\>

Query options

##### Defined in

voice-plus-web/src/queries.ts:68

___

#### parent

• **parent**: ``null`` \| [`EncodedQuery`](#interfacesencodedquerymd)

Query parent

##### Defined in

voice-plus-web/src/queries.ts:72


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

voice-plus-web/src/index.ts:72

___

#### client

• **client**: `Client`

The regular Voice+ SDK client

##### Defined in

voice-plus-web/src/index.ts:76


<a name="interfacesrunpropsmd"></a>

## Interface: RunProps

Configuration for the run method

### Properties

#### config

• **config**: `Config`

The regular Voice+ configuration

##### Defined in

voice-plus-web/src/index.ts:45

___

#### ui

• `Optional` **ui**: [`UiConfig`](#interfacesuiconfigmd)

UI configuration

##### Defined in

voice-plus-web/src/index.ts:49

___

#### triggers

• `Optional` **triggers**: [`Triggers`](#triggers)

The triggers dictionary, downloaded from the Dialog Studio desktop app.
If triggers are not provided, they will be fetched from the CDN.

##### Defined in

voice-plus-web/src/index.ts:54

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

voice-plus-web/src/index.ts:58

___

#### onStep

• `Optional` **onStep**: (`stepId`: `string`) => `void`

Runs when a step is triggered, used primarily for debugging

##### Type declaration

▸ (`stepId`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `stepId` | `string` |

###### Returns

`void`

##### Defined in

voice-plus-web/src/index.ts:62


<a name="interfacesserializedregexmd"></a>

## Interface: SerializedRegex

Serialized regex

### Properties

#### regexp

• **regexp**: `string`

Regex body

##### Defined in

voice-plus-web/src/queries.ts:46

___

#### flags

• **flags**: `string`

Regex flags

##### Defined in

voice-plus-web/src/queries.ts:50


<a name="interfacessimplehandlerargmd"></a>

## Interface: SimpleHandlerArg

The argument for callbacks

### Properties

#### sendStep

• **sendStep**: (`stepId`: `string`, `context?`: `Context`) => `Promise`\<`void`\>

A function to send steps to NLX.

##### Type declaration

▸ (`stepId`, `context?`): `Promise`\<`void`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `stepId` | `string` |
| `context?` | `Context` |

###### Returns

`Promise`\<`void`\>

##### Defined in

voice-plus-web/src/configuration.ts:46


<a name="interfacesthememd"></a>

## Interface: Theme

Visual theme for the UI

### Properties

#### colors

• `Optional` **colors**: [`ThemeColors`](#interfacesthemecolorsmd)

UI colors

##### Defined in

voice-plus-web/src/configuration.ts:28

___

#### fontFamily

• `Optional` **fontFamily**: `string`

Font family

##### Defined in

voice-plus-web/src/configuration.ts:32


<a name="interfacesthemecolorsmd"></a>

## Interface: ThemeColors

Theme colors

### Properties

#### primary

• `Optional` **primary**: `string`

Primary color

##### Defined in

voice-plus-web/src/configuration.ts:10

___

#### primaryHover

• `Optional` **primaryHover**: `string`

Primary color on hover

##### Defined in

voice-plus-web/src/configuration.ts:14

___

#### highlight

• `Optional` **highlight**: `string`

Color for trigger highlights

##### Defined in

voice-plus-web/src/configuration.ts:18


<a name="interfacestriggermd"></a>

## Interface: Trigger

A single trigger

### Properties

#### event

• **event**: ``"click"`` \| ``"pageLoad"`` \| ``"appear"`` \| ``"enterViewport"``

Event

##### Defined in

voice-plus-web/src/trigger.ts:14

___

#### query

• `Optional` **query**: [`EncodedQuery`](#interfacesencodedquerymd)

A query identifying the element

##### Defined in

voice-plus-web/src/trigger.ts:18

___

#### once

• `Optional` **once**: `boolean`

A flag specifying whether the trigger should only fire a single time

##### Defined in

voice-plus-web/src/trigger.ts:22

___

#### highlight

• `Optional` **highlight**: `boolean`

A flag specifying whether the trigger should highlight. Only applicable to click triggers.

##### Defined in

voice-plus-web/src/trigger.ts:26

___

#### urlCondition

• `Optional` **urlCondition**: [`UrlCondition`](#interfacesurlconditionmd)

URL condition

##### Defined in

voice-plus-web/src/trigger.ts:30


<a name="interfacestriggeredstepmd"></a>

## Interface: TriggeredStep

Represents a load step that has already been triggered.

### Properties

#### stepId

• **stepId**: `string`

step id

##### Defined in

voice-plus-web/src/configuration.ts:38

___

#### url

• **url**: `string`

the URL of the page it triggered on

##### Defined in

voice-plus-web/src/configuration.ts:40


<a name="interfacesuiconfigmd"></a>

## Interface: UiConfig

Full UI configuration

### Properties

#### title

• **title**: `string`

Drawer title

##### Defined in

voice-plus-web/src/configuration.ts:84

___

#### subtitle

• **subtitle**: `string`

Drawer subtitle

##### Defined in

voice-plus-web/src/configuration.ts:88

___

#### highlights

• `Optional` **highlights**: `boolean`

Render highlights

##### Defined in

voice-plus-web/src/configuration.ts:92

___

#### iconUrl

• `Optional` **iconUrl**: `string`

URL for the button icon

##### Defined in

voice-plus-web/src/configuration.ts:101

___

#### theme

• `Optional` **theme**: [`Theme`](#interfacesthememd)

UI theme

##### Defined in

voice-plus-web/src/configuration.ts:105

___

#### onEscalation

• `Optional` **onEscalation**: (`config`: [`SimpleHandlerArg`](#interfacessimplehandlerargmd)) => `void`

Escalation handler

##### Type declaration

▸ (`config`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SimpleHandlerArg`](#interfacessimplehandlerargmd) |

###### Returns

`void`

##### Defined in

voice-plus-web/src/configuration.ts:109

___

#### escalationButtonLabel

• `Optional` **escalationButtonLabel**: `string`

Escalation button label

##### Defined in

voice-plus-web/src/configuration.ts:113

___

#### escalationConfirmation

• `Optional` **escalationConfirmation**: `string`

Escalation confirmation

##### Defined in

voice-plus-web/src/configuration.ts:117

___

#### onEnd

• `Optional` **onEnd**: (`config`: [`SimpleHandlerArg`](#interfacessimplehandlerargmd)) => `void`

End handler

##### Type declaration

▸ (`config`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SimpleHandlerArg`](#interfacessimplehandlerargmd) |

###### Returns

`void`

##### Defined in

voice-plus-web/src/configuration.ts:121

___

#### endButtonLabel

• `Optional` **endButtonLabel**: `string`

End button label

##### Defined in

voice-plus-web/src/configuration.ts:125

___

#### endConfirmation

• `Optional` **endConfirmation**: `string`

End confirmation

##### Defined in

voice-plus-web/src/configuration.ts:129

___

#### onPreviousStep

• `Optional` **onPreviousStep**: (`config`: [`HandlerArg`](#handlerarg)) => `void`

On previous step

##### Type declaration

▸ (`config`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`HandlerArg`](#handlerarg) |

###### Returns

`void`

##### Defined in

voice-plus-web/src/configuration.ts:133

___

#### previousStepButtonLabel

• `Optional` **previousStepButtonLabel**: `string`

Previous step button label

##### Defined in

voice-plus-web/src/configuration.ts:137

___

#### buttons

• `Optional` **buttons**: [`ButtonConfig`](#interfacesbuttonconfigmd)[]

Custom buttons

##### Defined in

voice-plus-web/src/configuration.ts:141

___

#### nudgeContent

• `Optional` **nudgeContent**: `string`

If this is set, the journey manager will show a call-to-action tooltip to invite the user to interact with the overlay pin.
it will be shown only if the user never interacts with the overlay pin, after `tooltipShowAfterMs` milliseconds.

##### Defined in

voice-plus-web/src/configuration.ts:146

___

#### nudgeShowAfterMs

• `Optional` **nudgeShowAfterMs**: `number`

Show nudge tooltip after this many milliseconds

##### Defined in

voice-plus-web/src/configuration.ts:150

___

#### nudgeHideAfterMs

• `Optional` **nudgeHideAfterMs**: `number`

Hide nudge tooltip after it's been shown for this many milliseconds

##### Defined in

voice-plus-web/src/configuration.ts:154


<a name="interfacesurlconditionmd"></a>

## Interface: UrlCondition

URL match condition

### Properties

#### operator

• **operator**: ``"contains"`` \| ``"matches_regex"`` \| ``"smart_match"``

Condition operator

##### Defined in

voice-plus-web/src/UrlCondition.ts:8

___

#### value

• **value**: `string`

Condition value

##### Defined in

voice-plus-web/src/UrlCondition.ts:12
