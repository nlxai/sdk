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

Ƭ **HandlerArg**: [`SimpleHandlerArg`](#interfacessimplehandlerargmd) & \{ `triggeredSteps`: [`TriggeredStep`](#interfacestriggeredstepmd)[] }

Used for some more advanced callbacks

#### Defined in

[voice-plus-web/src/configuration.ts:50](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L50)

---

### Method

Ƭ **Method**: `"AltText"` \| `"DisplayValue"` \| `"LabelText"` \| `"PlaceholderText"` \| `"Role"` \| `"TestId"` \| `"Text"` \| `"Title"` \| `"QuerySelector"`

Matching method

#### Defined in

[voice-plus-web/src/queries.ts:10](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/queries.ts#L10)

---

### Triggers

Ƭ **Triggers**: `Record`\<[`StepId`](#stepid), [`Trigger`](#interfacestriggermd)\>

A record of triggers

#### Defined in

[voice-plus-web/src/trigger.ts:36](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/trigger.ts#L36)

---

### StepId

Ƭ **StepId**: `string`

Step ID

#### Defined in

[voice-plus-web/src/trigger.ts:65](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/trigger.ts#L65)

## Variables

### iconUrls

• `Const` **iconUrls**: `Object`

Icon URL's

#### Type declaration

| Name           | Type     | Description        |
| :------------- | :------- | :----------------- |
| `supportAgent` | `string` | Support agent icon |
| `callEnd`      | `string` | Call end icon      |
| `multimodal`   | `string` | Multimodal icon    |

#### Defined in

[voice-plus-web/src/ui/components/icons.tsx:12](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/ui/components/icons.tsx#L12)

## Functions

### run

▸ **run**(`props`): `Promise`\<[`RunOutput`](#interfacesrunoutputmd)\>

Run the Voice+ script

#### Parameters

| Name    | Type                                | Description                  |
| :------ | :---------------------------------- | :--------------------------- |
| `props` | [`RunProps`](#interfacesrunpropsmd) | The run configuration object |

#### Returns

`Promise`\<[`RunOutput`](#interfacesrunoutputmd)\>

an promise of an object containing a teardown function and the Voice+ client.

#### Defined in

[voice-plus-web/src/index.ts:85](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/index.ts#L85)

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

[voice-plus-web/src/configuration.ts:62](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L62)

---

#### confirmation

• `Optional` **confirmation**: `string`

Button confirmation: if present, the button click handler only triggers after the confirmation button is hit

##### Defined in

[voice-plus-web/src/configuration.ts:66](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L66)

---

#### iconUrl

• `Optional` **iconUrl**: `string`

Icon URL

##### Defined in

[voice-plus-web/src/configuration.ts:70](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L70)

---

#### onClick

• **onClick**: (`config`: [`HandlerArg`](#handlerarg)) => `void`

Click handler

##### Type declaration

▸ (`config`): `void`

###### Parameters

| Name     | Type                        |
| :------- | :-------------------------- |
| `config` | [`HandlerArg`](#handlerarg) |

###### Returns

`void`

##### Defined in

[voice-plus-web/src/configuration.ts:74](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L74)

<a name="interfacesencodedquerymd"></a>

## Interface: EncodedQuery

Encoded query

### Properties

#### name

• **name**: [`Method`](#method)

Query name

##### Defined in

[voice-plus-web/src/queries.ts:60](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/queries.ts#L60)

---

#### target

• **target**: `string` \| [`SerializedRegex`](#interfacesserializedregexmd)

Query target

##### Defined in

[voice-plus-web/src/queries.ts:64](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/queries.ts#L64)

---

#### options

• **options**: `null` \| `Record`\<`string`, `boolean` \| [`SerializedRegex`](#interfacesserializedregexmd)\>

Query options

##### Defined in

[voice-plus-web/src/queries.ts:68](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/queries.ts#L68)

---

#### parent

• **parent**: `null` \| [`EncodedQuery`](#interfacesencodedquerymd)

Query parent

##### Defined in

[voice-plus-web/src/queries.ts:72](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/queries.ts#L72)

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

[voice-plus-web/src/index.ts:73](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/index.ts#L73)

---

#### client

• **client**: `Client`

The regular Voice+ SDK client

##### Defined in

[voice-plus-web/src/index.ts:77](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/index.ts#L77)

<a name="interfacesrunpropsmd"></a>

## Interface: RunProps

Configuration for the run method

### Properties

#### config

• **config**: `Config`

The regular Voice+ configuration

##### Defined in

[voice-plus-web/src/index.ts:46](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/index.ts#L46)

---

#### ui

• `Optional` **ui**: [`UiConfig`](#interfacesuiconfigmd)

UI configuration

##### Defined in

[voice-plus-web/src/index.ts:50](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/index.ts#L50)

---

#### triggers

• `Optional` **triggers**: [`Triggers`](#triggers)

The triggers dictionary, downloaded from the Dialog Studio desktop app.
If triggers are not provided, they will be fetched from the CDN.

##### Defined in

[voice-plus-web/src/index.ts:55](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/index.ts#L55)

---

#### onDigression

• `Optional` **onDigression**: (`client`: `Client`) => `void`

Digression detection callback

##### Type declaration

▸ (`client`): `void`

###### Parameters

| Name     | Type     |
| :------- | :------- |
| `client` | `Client` |

###### Returns

`void`

##### Defined in

[voice-plus-web/src/index.ts:59](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/index.ts#L59)

---

#### onStep

• `Optional` **onStep**: (`stepId`: `string`) => `void`

Runs when a step is triggered, used primarily for debugging

##### Type declaration

▸ (`stepId`): `void`

###### Parameters

| Name     | Type     |
| :------- | :------- |
| `stepId` | `string` |

###### Returns

`void`

##### Defined in

[voice-plus-web/src/index.ts:63](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/index.ts#L63)

<a name="interfacesserializedregexmd"></a>

## Interface: SerializedRegex

Serialized regex

### Properties

#### regexp

• **regexp**: `string`

Regex body

##### Defined in

[voice-plus-web/src/queries.ts:46](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/queries.ts#L46)

---

#### flags

• **flags**: `string`

Regex flags

##### Defined in

[voice-plus-web/src/queries.ts:50](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/queries.ts#L50)

<a name="interfacessimplehandlerargmd"></a>

## Interface: SimpleHandlerArg

The argument for callbacks

### Properties

#### sendStep

• **sendStep**: (`step`: `StepInfo`, `context?`: `Context`) => `Promise`\<`void`\>

A function to send steps to NLX.

##### Type declaration

▸ (`step`, `context?`): `Promise`\<`void`\>

###### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `step`     | `StepInfo` |
| `context?` | `Context`  |

###### Returns

`Promise`\<`void`\>

##### Defined in

[voice-plus-web/src/configuration.ts:46](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L46)

<a name="interfacesthememd"></a>

## Interface: Theme

Visual theme for the UI

### Properties

#### colors

• `Optional` **colors**: [`ThemeColors`](#interfacesthemecolorsmd)

UI colors

##### Defined in

[voice-plus-web/src/configuration.ts:28](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L28)

---

#### fontFamily

• `Optional` **fontFamily**: `string`

Font family

##### Defined in

[voice-plus-web/src/configuration.ts:32](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L32)

<a name="interfacesthemecolorsmd"></a>

## Interface: ThemeColors

Theme colors

### Properties

#### primary

• `Optional` **primary**: `string`

Primary color

##### Defined in

[voice-plus-web/src/configuration.ts:10](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L10)

---

#### primaryHover

• `Optional` **primaryHover**: `string`

Primary color on hover

##### Defined in

[voice-plus-web/src/configuration.ts:14](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L14)

---

#### highlight

• `Optional` **highlight**: `string`

Color for trigger highlights

##### Defined in

[voice-plus-web/src/configuration.ts:18](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L18)

<a name="interfacestriggermd"></a>

## Interface: Trigger

A single trigger

### Properties

#### event

• **event**: `"click"` \| `"pageLoad"` \| `"appear"` \| `"enterViewport"`

Event

##### Defined in

[voice-plus-web/src/trigger.ts:14](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/trigger.ts#L14)

---

#### query

• `Optional` **query**: [`EncodedQuery`](#interfacesencodedquerymd)

A query identifying the element

##### Defined in

[voice-plus-web/src/trigger.ts:18](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/trigger.ts#L18)

---

#### once

• `Optional` **once**: `boolean`

A flag specifying whether the trigger should only fire a single time

##### Defined in

[voice-plus-web/src/trigger.ts:22](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/trigger.ts#L22)

---

#### highlight

• `Optional` **highlight**: `boolean`

A flag specifying whether the trigger should highlight. Only applicable to click triggers.

##### Defined in

[voice-plus-web/src/trigger.ts:26](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/trigger.ts#L26)

---

#### urlCondition

• `Optional` **urlCondition**: [`UrlCondition`](#interfacesurlconditionmd)

URL condition

##### Defined in

[voice-plus-web/src/trigger.ts:30](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/trigger.ts#L30)

<a name="interfacestriggeredstepmd"></a>

## Interface: TriggeredStep

Represents a load step that has already been triggered.

### Properties

#### stepId

• **stepId**: `string`

step id

##### Defined in

[voice-plus-web/src/configuration.ts:38](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L38)

---

#### url

• **url**: `string`

the URL of the page it triggered on

##### Defined in

[voice-plus-web/src/configuration.ts:40](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L40)

<a name="interfacesuiconfigmd"></a>

## Interface: UiConfig

Full UI configuration

### Properties

#### title

• **title**: `string`

Drawer title

##### Defined in

[voice-plus-web/src/configuration.ts:84](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L84)

---

#### subtitle

• **subtitle**: `string`

Drawer subtitle

##### Defined in

[voice-plus-web/src/configuration.ts:88](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L88)

---

#### highlights

• `Optional` **highlights**: `boolean`

Render highlights

##### Defined in

[voice-plus-web/src/configuration.ts:92](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L92)

---

#### iconUrl

• `Optional` **iconUrl**: `string`

URL for the button icon

##### Defined in

[voice-plus-web/src/configuration.ts:101](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L101)

---

#### theme

• `Optional` **theme**: [`Theme`](#interfacesthememd)

UI theme

##### Defined in

[voice-plus-web/src/configuration.ts:105](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L105)

---

#### onEscalation

• `Optional` **onEscalation**: (`config`: [`SimpleHandlerArg`](#interfacessimplehandlerargmd)) => `void`

Escalation handler

##### Type declaration

▸ (`config`): `void`

###### Parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `config` | [`SimpleHandlerArg`](#interfacessimplehandlerargmd) |

###### Returns

`void`

##### Defined in

[voice-plus-web/src/configuration.ts:109](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L109)

---

#### escalationButtonLabel

• `Optional` **escalationButtonLabel**: `string`

Escalation button label

##### Defined in

[voice-plus-web/src/configuration.ts:113](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L113)

---

#### escalationConfirmation

• `Optional` **escalationConfirmation**: `string`

Escalation confirmation

##### Defined in

[voice-plus-web/src/configuration.ts:117](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L117)

---

#### onEnd

• `Optional` **onEnd**: (`config`: [`SimpleHandlerArg`](#interfacessimplehandlerargmd)) => `void`

End handler

##### Type declaration

▸ (`config`): `void`

###### Parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `config` | [`SimpleHandlerArg`](#interfacessimplehandlerargmd) |

###### Returns

`void`

##### Defined in

[voice-plus-web/src/configuration.ts:121](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L121)

---

#### endButtonLabel

• `Optional` **endButtonLabel**: `string`

End button label

##### Defined in

[voice-plus-web/src/configuration.ts:125](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L125)

---

#### endConfirmation

• `Optional` **endConfirmation**: `string`

End confirmation

##### Defined in

[voice-plus-web/src/configuration.ts:129](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L129)

---

#### onPreviousStep

• `Optional` **onPreviousStep**: (`config`: [`HandlerArg`](#handlerarg)) => `void`

On previous step

##### Type declaration

▸ (`config`): `void`

###### Parameters

| Name     | Type                        |
| :------- | :-------------------------- |
| `config` | [`HandlerArg`](#handlerarg) |

###### Returns

`void`

##### Defined in

[voice-plus-web/src/configuration.ts:133](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L133)

---

#### previousStepButtonLabel

• `Optional` **previousStepButtonLabel**: `string`

Previous step button label

##### Defined in

[voice-plus-web/src/configuration.ts:137](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L137)

---

#### buttons

• `Optional` **buttons**: [`ButtonConfig`](#interfacesbuttonconfigmd)[]

Custom buttons

##### Defined in

[voice-plus-web/src/configuration.ts:141](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L141)

---

#### nudgeContent

• `Optional` **nudgeContent**: `string`

If this is set, the journey manager will show a call-to-action tooltip to invite the user to interact with the overlay pin.
it will be shown only if the user never interacts with the overlay pin, after `tooltipShowAfterMs` milliseconds.

##### Defined in

[voice-plus-web/src/configuration.ts:146](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L146)

---

#### nudgeShowAfterMs

• `Optional` **nudgeShowAfterMs**: `number`

Show nudge tooltip after this many milliseconds

##### Defined in

[voice-plus-web/src/configuration.ts:150](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L150)

---

#### nudgeHideAfterMs

• `Optional` **nudgeHideAfterMs**: `number`

Hide nudge tooltip after it's been shown for this many milliseconds

##### Defined in

[voice-plus-web/src/configuration.ts:154](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/configuration.ts#L154)

<a name="interfacesurlconditionmd"></a>

## Interface: UrlCondition

URL match condition

### Properties

#### operator

• **operator**: `"contains"` \| `"matches_regex"` \| `"smart_match"`

Condition operator

##### Defined in

[voice-plus-web/src/UrlCondition.ts:8](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/UrlCondition.ts#L8)

---

#### value

• **value**: `string`

Condition value

##### Defined in

[voice-plus-web/src/UrlCondition.ts:12](https://github.com/nlxai/sdk/blob/0ffb6c1566a0c22d1f12b3a120556d8931f7df65/packages/voice-plus-web/src/UrlCondition.ts#L12)
