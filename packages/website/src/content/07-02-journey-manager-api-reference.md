
<a name="readmemd"></a>

# @nlxai/journey-manager

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

[journey-manager/src/configuration.ts:50](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L50)

___

### DeepPartial

Ƭ **DeepPartial**\<`T`\>: \{ [P in keyof T]?: T[P] extends (infer I)[] ? DeepPartial\<I\>[] : DeepPartial\<T[P]\> }

Makes every property optional recursively.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[journey-manager/src/configuration.ts:78](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L78)

___

### Method

Ƭ **Method**: ``"AltText"`` \| ``"DisplayValue"`` \| ``"LabelText"`` \| ``"PlaceholderText"`` \| ``"Role"`` \| ``"TestId"`` \| ``"Text"`` \| ``"Title"`` \| ``"QuerySelector"``

Matching method

#### Defined in

[journey-manager/src/queries.ts:10](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/queries.ts#L10)

___

### Triggers

Ƭ **Triggers**: `Record`\<[`StepId`](#stepid), [`Trigger`](#interfacestriggermd)\>

A record of triggers

#### Defined in

[journey-manager/src/trigger.ts:32](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/trigger.ts#L32)

___

### StepId

Ƭ **StepId**: `string`

Step ID

#### Defined in

[journey-manager/src/trigger.ts:61](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/trigger.ts#L61)

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

[journey-manager/src/index.ts:84](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/index.ts#L84)


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

[journey-manager/src/configuration.ts:62](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L62)

___

#### confirmation

• `Optional` **confirmation**: `string`

Button confirmation: if present, the button click handler only triggers after the confirmation button is hit

##### Defined in

[journey-manager/src/configuration.ts:66](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L66)

___

#### iconUrl

• `Optional` **iconUrl**: `string`

Icon URL

##### Defined in

[journey-manager/src/configuration.ts:70](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L70)

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

[journey-manager/src/configuration.ts:74](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L74)


<a name="interfacesencodedquerymd"></a>

## Interface: EncodedQuery

Encoded query

### Properties

#### name

• **name**: [`Method`](#method)

Query name

##### Defined in

[journey-manager/src/queries.ts:60](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/queries.ts#L60)

___

#### target

• **target**: `string` \| [`SerializedRegex`](#interfacesserializedregexmd)

Query target

##### Defined in

[journey-manager/src/queries.ts:64](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/queries.ts#L64)

___

#### options

• **options**: ``null`` \| `Record`\<`string`, `boolean` \| [`SerializedRegex`](#interfacesserializedregexmd)\>

Query options

##### Defined in

[journey-manager/src/queries.ts:68](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/queries.ts#L68)

___

#### parent

• **parent**: ``null`` \| [`EncodedQuery`](#interfacesencodedquerymd)

Query parent

##### Defined in

[journey-manager/src/queries.ts:72](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/queries.ts#L72)


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

[journey-manager/src/index.ts:72](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/index.ts#L72)

___

#### client

• **client**: `Client`

The regular multimodal SDK client

##### Defined in

[journey-manager/src/index.ts:76](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/index.ts#L76)


<a name="interfacesrunpropsmd"></a>

## Interface: RunProps

Configuration for the run method

### Properties

#### config

• **config**: `Config`

The regular multimodal configuration

##### Defined in

[journey-manager/src/index.ts:45](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/index.ts#L45)

___

#### ui

• `Optional` **ui**: [`UiConfig`](#interfacesuiconfigmd)

UI configuration

##### Defined in

[journey-manager/src/index.ts:49](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/index.ts#L49)

___

#### triggers

• `Optional` **triggers**: [`Triggers`](#triggers)

The triggers dictionary, downloaded from the Dialog Studio desktop app.
If triggers are not provided, they will be fetched from the CDN.

##### Defined in

[journey-manager/src/index.ts:54](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/index.ts#L54)

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

[journey-manager/src/index.ts:58](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/index.ts#L58)

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

[journey-manager/src/index.ts:62](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/index.ts#L62)


<a name="interfacesserializedregexmd"></a>

## Interface: SerializedRegex

Serialized regex

### Properties

#### regexp

• **regexp**: `string`

Regex body

##### Defined in

[journey-manager/src/queries.ts:46](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/queries.ts#L46)

___

#### flags

• **flags**: `string`

Regex flags

##### Defined in

[journey-manager/src/queries.ts:50](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/queries.ts#L50)


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

[journey-manager/src/configuration.ts:46](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L46)


<a name="interfacesthememd"></a>

## Interface: Theme

Visual theme for the UI

### Properties

#### colors

• **colors**: [`ThemeColors`](#interfacesthemecolorsmd)

UI colors

##### Defined in

[journey-manager/src/configuration.ts:28](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L28)

___

#### fontFamily

• **fontFamily**: `string`

Font family

##### Defined in

[journey-manager/src/configuration.ts:32](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L32)


<a name="interfacesthemecolorsmd"></a>

## Interface: ThemeColors

Theme colors

### Properties

#### primary

• **primary**: `string`

Primary color

##### Defined in

[journey-manager/src/configuration.ts:10](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L10)

___

#### primaryHover

• **primaryHover**: `string`

Primary color on hover

##### Defined in

[journey-manager/src/configuration.ts:14](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L14)

___

#### highlight

• **highlight**: `string`

Color for trigger highlights

##### Defined in

[journey-manager/src/configuration.ts:18](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L18)


<a name="interfacestriggermd"></a>

## Interface: Trigger

A single trigger

### Properties

#### event

• **event**: ``"click"`` \| ``"pageLoad"`` \| ``"appear"`` \| ``"enterViewport"``

Event

##### Defined in

[journey-manager/src/trigger.ts:14](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/trigger.ts#L14)

___

#### query

• `Optional` **query**: [`EncodedQuery`](#interfacesencodedquerymd)

A query identifying the element

##### Defined in

[journey-manager/src/trigger.ts:18](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/trigger.ts#L18)

___

#### once

• `Optional` **once**: `boolean`

A flag specifying whether the trigger should only fire a single time

##### Defined in

[journey-manager/src/trigger.ts:22](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/trigger.ts#L22)

___

#### urlCondition

• `Optional` **urlCondition**: [`UrlCondition`](#interfacesurlconditionmd)

URL condition

##### Defined in

[journey-manager/src/trigger.ts:26](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/trigger.ts#L26)


<a name="interfacestriggeredstepmd"></a>

## Interface: TriggeredStep

Represents a load step that has already been triggered.

### Properties

#### stepId

• **stepId**: `string`

step id

##### Defined in

[journey-manager/src/configuration.ts:38](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L38)

___

#### url

• **url**: `string`

the URL of the page it triggered on

##### Defined in

[journey-manager/src/configuration.ts:40](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L40)


<a name="interfacesuiconfigmd"></a>

## Interface: UiConfig

Full UI configuration

### Properties

#### title

• **title**: `string`

Drawer title

##### Defined in

[journey-manager/src/configuration.ts:96](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L96)

___

#### subtitle

• **subtitle**: `string`

Drawer subtitle

##### Defined in

[journey-manager/src/configuration.ts:100](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L100)

___

#### highlights

• `Optional` **highlights**: `boolean`

Render highlights

##### Defined in

[journey-manager/src/configuration.ts:104](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L104)

___

#### iconUrl

• `Optional` **iconUrl**: `string`

URL for the button icon

##### Defined in

[journey-manager/src/configuration.ts:108](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L108)

___

#### theme

• `Optional` **theme**: [`DeepPartial`](#deeppartial)\<[`Theme`](#interfacesthememd)\>

UI theme

##### Defined in

[journey-manager/src/configuration.ts:112](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L112)

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

[journey-manager/src/configuration.ts:116](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L116)

___

#### escalationButtonLabel

• `Optional` **escalationButtonLabel**: `string`

Escalation button label

##### Defined in

[journey-manager/src/configuration.ts:120](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L120)

___

#### escalationConfirmation

• `Optional` **escalationConfirmation**: `string`

Escalation confirmation

##### Defined in

[journey-manager/src/configuration.ts:124](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L124)

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

[journey-manager/src/configuration.ts:128](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L128)

___

#### endButtonLabel

• `Optional` **endButtonLabel**: `string`

End button label

##### Defined in

[journey-manager/src/configuration.ts:132](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L132)

___

#### endConfirmation

• `Optional` **endConfirmation**: `string`

End confirmation

##### Defined in

[journey-manager/src/configuration.ts:136](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L136)

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

[journey-manager/src/configuration.ts:140](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L140)

___

#### previousStepButtonLabel

• `Optional` **previousStepButtonLabel**: `string`

Previous step button label

##### Defined in

[journey-manager/src/configuration.ts:144](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L144)

___

#### buttons

• `Optional` **buttons**: [`ButtonConfig`](#interfacesbuttonconfigmd)[]

Custom buttons

##### Defined in

[journey-manager/src/configuration.ts:148](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L148)

___

#### nudgeContent

• `Optional` **nudgeContent**: `string`

If this is set, the journey manager will show a call-to-action tooltip to invite the user to interact with the overlay pin.
it will be shown only if the user never interacts with the overlay pin, after `tooltipShowAfterMs` milliseconds.

##### Defined in

[journey-manager/src/configuration.ts:153](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L153)

___

#### nudgeShowAfterMs

• `Optional` **nudgeShowAfterMs**: `number`

Show nudge tooltip after this many milliseconds

##### Defined in

[journey-manager/src/configuration.ts:157](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L157)

___

#### nudgeHideAfterMs

• `Optional` **nudgeHideAfterMs**: `number`

Hide nudge tooltip after it's been shown for this many milliseconds

##### Defined in

[journey-manager/src/configuration.ts:161](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/configuration.ts#L161)


<a name="interfacesurlconditionmd"></a>

## Interface: UrlCondition

URL match condition

### Properties

#### operator

• **operator**: ``"contains"`` \| ``"matches_regex"`` \| ``"smart_match"``

Condition operator

##### Defined in

[journey-manager/src/UrlCondition.ts:8](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/UrlCondition.ts#L8)

___

#### value

• **value**: `string`

Condition value

##### Defined in

[journey-manager/src/UrlCondition.ts:12](https://github.com/nlxai/sdk/blob/863439319237806e5abef4a80554f78d51b6285d/packages/journey-manager/src/UrlCondition.ts#L12)
