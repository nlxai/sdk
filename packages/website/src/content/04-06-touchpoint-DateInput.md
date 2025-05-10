- [About](#about)
- [Properties](#properties)
- [Import and Basic Usage](#import-and-basic-usage)
  - [Define onSumbit](#define-onsumbit)
- [Example](#example)
  - [Example Modality](#example-modality)
  - [Example Date Input Component](#example-date-input-component)
- [Related Documents](#related-documents)

### Date Input Example

<img src="/images/Touchpoint-Date-Input.png" alt="Date Input Example" style="max-width: 40%;">

## About

The Date Input component provides a user-friendly interface for entering and submitting dates in a standardized format. It combines input masking, validation, and submission capabilities in a single component.

## Properties

| Property | Type     | Required | Description                                                        |
| -------- | -------- | -------- | ------------------------------------------------------------------ |
| onSubmit | function | No       | Handler function that receives the parsed date string (YYYY-MM-DD) |

## Import and Basic Usage

You can import the DateInput component once the package has been installed or made available in your project.

### Define onSumbit

The Date Input Component expect a function passed via `onSubmit` that be called when the user finalizes their date selection.

The [ConversationHandler](/headless-api-reference#interface-conversationhandler) method [sendSlots](/headless-api-reference#sendslots) is available through the `conversationHandler.sendSlots` to send the user's choice back to NLX.

The `sendSlots` method expects the Slot to previously be defined within NLX. For example, when the User Choice node is resolving a slot named "TouchpointDateInputResult" with the DatePicker, the SlotResponse should be `{"TouchpointDateInputResult": date}`.

## Example

The DateInput component is best triggered in a [User Choice Node](https://docs.studio.nlx.ai/1-build/intents/flows/nodes#user-choice) on NLX with a modality attached to trigger the DateInput component. The date selection should be sent back to NLX to fill the [slot in the User Choice Node](https://docs.studio.nlx.ai/1-build/intents/attach-slots) and **NOT** as a choice. This is different than the typical [CustomCard](/touchpoint-CustomCards) or [Button](/touchpoint-Buttons) components where the choice back to NLX it typically a 'choice'.

### Example Modality

In the examples below, the modality is named `DateInputExample` with a single string as the schema.

### Example Date Input Component

```javascript
import { DateInput } from "@nlxai/touchpoint-ui";

const DateInputExample = ({ data, conversationHandler }) => {
  return (
    <DateInput
      onSubmit={(date) =>
        conversationHandler.sendSlots({ TouchpointDateInputResult: date })
      }
    />
  );
};
```

## Related Documents

- [Theming Touchpoint](/touchpoint-ui-theming)
- [Building Components without JSX](/guide-html-components)
