Touchpoint provides two types of button components for handling user interactions: TextButton and IconButton. These components offer consistent styling and behavior while serving different interaction needs.

- **TextButton** - Text-based interactive element with optional icon support. It's ideal for primary actions and menu items.
- **IconButton** - Icon-only interactive element. It's ideal for compact actions and toolbars.

## Properties

Both TextButton and IconButton have required properties to render the elements correctly in the conversations flow.

### TextButton Properties

| Property | Type                                                                                                                           | Required | Description          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- | -------------------- |
| label    | string                                                                                                                         | Yes      | Button text          |
| Icon     | [Icon](/touchpoint-Icons)                                                                                                      | Yes      | Icon component       |
| onClick  | function                                                                                                                       | No       | Click handler        |
| type     | <ul><li>main: Primary action button with full background</li><li>ghost: Secondary action with transparent background</li></ul> | No       | Button style variant |

### IconButton Properties

| Property | Type                                                                                                                                                                                                                                                                                                                                                                | Required | Description                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------- |
| Icon     | [Icon](/touchpoint-Icons)                                                                                                                                                                                                                                                                                                                                           | Yes      | Icon component to render              |
| label    | string                                                                                                                                                                                                                                                                                                                                                              | Yes      | Accessible label (for screen readers) |
| type     | <ul><li>main: Primary action button with full background color.</li><li>ghost: Secondary action with transparent background.</li><li>activated: Accent colored background with light text.</li><li>coverup: Semi-transparent button with backdrop blur effect.</li><li>overlay: Similar to coverup but with background color matching the app background.</li></ul> | Yes      | Button style variant                  |
| onClick  | function                                                                                                                                                                                                                                                                                                                                                            | No       | Click handler                         |

## Import and Basic Usage

You can import the buttons elements from touchpoint once the package has been installed or made available in your project.

The examples below require a [modality](https://docs.studio.nlx.ai/1-build/resources/modalities) defined in your NLX application as an object with at least `buttonLabel` and `buttonId` properties.

```json
{
  "buttonLabel": "Label passed to button Component",
  "buttonId": "Id of the 'choice' to send back to NLX"
}
```

### Define onClick

The Button Component expect a function passed via `onClick` to define the actions to take when a user clicks the button.

Access the [ConversationHandler](/headless-api-reference#interface-conversationhandler) method `sendChoice` via `conversationHandler.sendChoice` to send the user's choice back to NLX.

Read more details about building Custom Components with Touchpoint in the [Getting started with Touchpoint components](/touchpoint-components) documentation page.

### Import using `<script>`

Import the elements via `html` from Touchpoint. Useful when adding touchpoint to your project via `<script>`

The snippet below:

- Uses `html` to create the buttons.
- Imports Touchpoint Icons to use in the IconButton.

```html
<script src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
<script>
  const { html, Icons } = nlxai.touchpointUi;
  const TextButtonExample = ({ data, conversationHandler }) => {
    return html`
      <TextButton
        label=${data.buttonLabel}
        Icon=${Icons.ArrowForward}
        onClick=${() => conversationHandler.sendChoice(data.buttonId)}
      />
    `;
  };

  const IconButtonExample = ({ data, conversationHandler }) => {
    return html` <IconButton
      label=${data.buttonLabel}
      Icon=${Icons.ArrowForward}
      onClick=${() => conversationHandler.sendChoice(data.buttonId)}
      type="main"
    />`;
  };
</script>
```

### Import using `import`

Import the elements to your project using import statements.

The snippet below:

- Imports Touchpoint, Icons, and Context to use in the IconButton.

```javascript
import { TextButton, IconButton, Icons } from "@nlxai/touchpoint-ui";

const TextButtonExample = ({ data, conversationHandler }) => {
  return (
    <TextButton
      label={data.buttonLabel}
      Icon={Icons.ArrowForward}
      onClick={() => conversationHandler.sendChoice(data.buttonId)}
    />
  );
};

const IconButtonExample = ({ data, conversationHandler }) => {
  return (
    <IconButton
      label={data.buttonLabel}
      Icon={Icons.ArrowForward}
      onClick={() => conversationHandler.sendChoice(data.buttonId)}
      type="main"
    />
  );
};
```

## Related Components

- [Icons](/touchpoint-Icons) for list of Icons available in Touchpoint

For theme customization options, see the [Theming Documentation](/touchpoint-ui-theming).
