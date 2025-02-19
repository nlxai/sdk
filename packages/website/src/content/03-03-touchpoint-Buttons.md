
Touchpoint provides two types of button components for handling user interactions: TextButton and IconButton. These components offer consistent styling and behavior while serving different interaction needs.

* **TextButton** - Text-based interactive element with optional icon support. It's ideal for primary actions and menu items.
* **IconButton** - Icon-only interactive element. It's ideal for compact actions and toolbars.

## Properties

Both TextButton and IconButton have required properties to render the elements correctly in the conversations flow.

### TextButton Properties 

| Property | Type                                                                                                                           | Required | Description             |
|----------|--------------------------------------------------------------------------------------------------------------------------------|----------|-------------------------|
| label    | string                                                                                                                         | Yes      | Button text             |
| onClick  | function                                                                                                                       | No       | Click handler           |
| Icon     | Component                                                                                                                      | No       | Optional icon component |
| type     | <ul><li>main: Primary action button with full background</li><li>ghost: Secondary action with transparent background</li></ul> | No       | Button style variant    |


### IconButton Properties

| Property | Type                                                                                                                                                                                                                                                                                                                                                                | Required | Description                           |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------|
| Icon     | [Icon](/touchpoint-Icons)                                                                                                                                                                                                                                                                                                                                           | Yes      | Icon component to render              |
| label    | string                                                                                                                                                                                                                                                                                                                                                              | Yes      | Accessible label (for screen readers) |
| onClick  | function                                                                                                                                                                                                                                                                                                                                                            | No       | Click handler                         |
| type     | <ul><li>main: Primary action button with full background color.</li><li>ghost: Secondary action with transparent background.</li><li>activated: Accent colored background with light text.</li><li>coverup: Semi-transparent button with backdrop blur effect.</li><li>overlay: Similar to coverup but with background color matching the app background.</li></ul> | No       | Button style variant                  |

## Import and Basic Usage

You can import the buttons elements from touchpoint once the package has been installed or made available in your project.

### Define onClick

The Button Elements expect a function passed via `onClick` to define the actions to take when a user clicks the button.

In order to send the data back to NLX, you need to leverage the `useTouchpointContext` function to access the [ConversationHandler](/headless-api-reference#interfacesconversationhandlermd) method `sendChoice` to properly relay the user's choice back to NLX to continue the conversation.

Read more details about building Custom Components with Touchpoint in the [Getting started with Touchpoint components](/touchpoint-components) documentation page.

### Import using `<script>`

Import the elements via `html` from Touchpoint. Useful when adding touchpoint to your project via `<script>`

The snippet below: 

* Uses `html` to create the buttons.
* Leverages `useTouchpointContext` to set the onClick behavior.
* Imports Touchpoint Icons to use in the IconButton.
* Assumes a [modality](https://docs.studio.nlx.ai/1-build/resources/modalities) defined in your NLX application as an object with at least `buttonLabel` and `buttonId` properties.

```javascript
<script src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
<script>
  const { html, useTouchpointContext, Icons } = nlxai.touchpointUi;
  const showButtonExampleWithContext = ({ data }) => {
    const { handler } = useTouchpointContext();
    return html`
      <TextButton
        label=${data.buttonLabel}
        onClick=${() => handler.sendChoice(data.buttonId)}
      />
      <IconButton
        label=${data.buttonLabel}
        icon=${Icons.ThumbUp}
        onClick=${handler.sendChoice(data.buttonId)}
      /> 
    `; 
  };
</script>
```

### Import using `import`

Import the elements to your project using import statements. 

The snippet below: 

* Leverages `useTouchpointContext` to set the onClick behavior.
* Imports Touchpoint, Icons, and Context to use in the IconButton.
* Assumes a [modality](https://docs.studio.nlx.ai/1-build/resources/modalities) defined in your NLX application as an object with at least `buttonLabel` and `buttonId` properties.

```javascript
import { useTouchpointContext, TextButton, IconButton, Icons } from '@nlxai/touchpoint-ui';

const showButtonExampleWithContext = ({ data }) => {
  const { handler } = useTouchpointContext();
  return(
    <TextButton
      label=${data.buttonLabel}
      onClick=${() => handler.sendChoice(data.buttonId)}
    />
    <IconButton
      label=${data.buttonLabel}
      icon=${Icons.ThumbUp}
      onClick=${() => handler.sendChoice(data.buttonId)}
    /> 
  ); 
};
```


## Related Components

- [CustomCard](/touchpoint-CustomCards) for button containers
- [CustomCardRow](/touchpoint-CustomCards#customcardrow) for button layouts
- [Typography](/touchpoint-Typography) for button labels

For theme customization options, see the [Theming Documentation](/touchpoint-ui-themeing).