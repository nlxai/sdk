
The Date Input component provides a user-friendly interface for entering and submitting dates in a standardized format. It combines input masking, validation, and submission capabilities in a single component.


## Properties

| Property | Type     | Required | Description                                                       |
| -------- | -------- | -------- | ----------------------------------------------------------------- |
| onSubmit | function | No       | Handler function that receives the parsed date string (YYYY-MM-DD) |

## Import and Basic Usage

You can import the DateInput component once the package has been installed or made available in your project.

### Define the Modality in NLX

The DateInput component is best triggered in a UserSelection Node on NLX with a specific modality attached to trigger the DateInput component. The date selection should be sent back to NLX as text and **NOT** as a choice. This is different than the typical [CustomCard](/touchpoint-CustomCards) or [Button](/touchpoint-Buttons) components where the choice back to NLX it typically a 'choice'.

In the examples below, the modality is named `DateInputExample` with a single string as the schema.

### Define onSumbit

The Date Input Component expect a function passed via `onSubmit` that be called when the user finalizes their date selection.

In order to send the data back to NLX, you need to leverage the `useTouchpointContext` function to access the [ConversationHandler](/headless-api-reference#interfacesconversationhandlermd) method `sendText` to properly relay the user's choice back to NLX to continue the conversation.

### Import using `<script>`

Import the elements via `html` from Touchpoint. Useful when adding touchpoint to your project via `<script>`

The snippet below: 

* Uses `html` to create the Date Input component.
* Leverages `useTouchpointContext` to set the onSubmit behavior.

```html
<script src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
<script>
  const { html, useTouchpointContext, Icons } = nlxai.touchpointUi;
  const DateInputExample = ({ data }) => {
    const { handler } = useTouchpointContext();
    return html`
      <DateInput
        onSubmit=${(date) => handler.sendText(date)}
      />
    `;
  };
</script>
```

### Import using `import`

Import the elements to your project using import statements. 

The snippet below: 

* Leverages `useTouchpointContext` to set the onClick behavior.

```javascript
import { useTouchpointContext, DateInput } from '@nlxai/touchpoint-ui';

const DateInputExample = ({ data }) => {
  const { handler } = useTouchpointContext();
  return(
    <DateInput
      onSubmit=${(date) => handler.sendText(date)}
    />
  );
};
```

Read more details about building Custom Components with Touchpoint in the [Getting started with Touchpoint components](/touchpoint-components) documentation page.