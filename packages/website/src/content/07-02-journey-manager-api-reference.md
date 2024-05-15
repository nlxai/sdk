
<a name="readmemd"></a>

# @nlxai/journey-manager

## Interfaces

- [UrlCondition](#interfacesurlconditionmd)
- [Trigger](#interfacestriggermd)
- [RunOutput](#interfacesrunoutputmd)
- [SerializedRegex](#interfacesserializedregexmd)
- [EncodedQuery](#interfacesencodedquerymd)

## Type Aliases

### StepId

Ƭ **StepId**: `string`

Step ID

#### Defined in

[index.ts:12](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L12)

___

### Triggers

Ƭ **Triggers**: `Record`\<[`StepId`](#stepid), [`Trigger`](#interfacestriggermd)\>

A record of triggers

#### Defined in

[index.ts:54](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L54)

___

### Method

Ƭ **Method**: ``"AltText"`` \| ``"DisplayValue"`` \| ``"LabelText"`` \| ``"PlaceholderText"`` \| ``"Role"`` \| ``"TestId"`` \| ``"Text"`` \| ``"Title"``

Matching method

#### Defined in

[queries.ts:180](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/queries.ts#L180)

## Functions

### run

▸ **run**(`config`, `triggers`): [`RunOutput`](#interfacesrunoutputmd)

Run the multimodal journey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Config` | The voice compass configuration |
| `triggers` | [`Triggers`](#triggers) | The triggers dictionary, downloaded from the Dialog Studio desktop app |

#### Returns

[`RunOutput`](#interfacesrunoutputmd)

an object containing a teardown function and the multimodal client.

#### Defined in

[index.ts:135](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L135)


<a name="indexmd"></a>


# Interfaces


<a name="interfacesencodedquerymd"></a>

## Interface: EncodedQuery

Encoded query

### Properties

#### name

• **name**: [`Method`](#method) \| ``"QuerySelector"``

Query name

##### Defined in

[queries.ts:47](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/queries.ts#L47)

___

#### target

• **target**: `string` \| [`SerializedRegex`](#interfacesserializedregexmd)

Query target

##### Defined in

[queries.ts:51](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/queries.ts#L51)

___

#### options

• **options**: ``null`` \| `Record`\<`string`, `boolean` \| [`SerializedRegex`](#interfacesserializedregexmd)\>

Query options

##### Defined in

[queries.ts:55](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/queries.ts#L55)

___

#### parent

• **parent**: ``null`` \| [`EncodedQuery`](#interfacesencodedquerymd)

Query parent

##### Defined in

[queries.ts:59](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/queries.ts#L59)


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

[index.ts:122](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L122)

___

#### client

• **client**: `Client`

The regular multimodal SDK client

##### Defined in

[index.ts:126](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L126)


<a name="interfacesserializedregexmd"></a>

## Interface: SerializedRegex

Serialized regex

### Properties

#### regexp

• **regexp**: `string`

Regex body

##### Defined in

[queries.ts:33](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/queries.ts#L33)

___

#### flags

• **flags**: `string`

Regex flags

##### Defined in

[queries.ts:37](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/queries.ts#L37)


<a name="interfacestriggermd"></a>

## Interface: Trigger

A single trigger

### Properties

#### event

• **event**: ``"click"`` \| ``"pageLoad"``

Event

##### Defined in

[index.ts:36](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L36)

___

#### query

• `Optional` **query**: [`EncodedQuery`](#interfacesencodedquerymd)

A query identifying the element

##### Defined in

[index.ts:40](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L40)

___

#### once

• `Optional` **once**: `boolean`

A flag specifying whether the trigger should only fire a single time

##### Defined in

[index.ts:44](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L44)

___

#### urlCondition

• `Optional` **urlCondition**: [`UrlCondition`](#interfacesurlconditionmd)

URL condition

##### Defined in

[index.ts:48](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L48)


<a name="interfacesurlconditionmd"></a>

## Interface: UrlCondition

URL match condition

### Properties

#### operator

• **operator**: ``"contains"`` \| ``"prefix"`` \| ``"eq"`` \| ``"neq"`` \| ``"suffix"`` \| ``"not_contains"``

Condition operator

##### Defined in

[index.ts:21](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L21)

___

#### value

• **value**: `string`

Condition value

##### Defined in

[index.ts:25](https://github.com/nlxai/sdk/blob/e519c2db5afe99adfaa84971e6150f60bcb6daed/packages/journey-manager/src/index.ts#L25)
