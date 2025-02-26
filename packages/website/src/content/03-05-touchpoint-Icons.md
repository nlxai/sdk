Touchpoint provides built-in icons that integrate with buttons and custom components. Each icon maintains consistent styling and accessibility features.

## Icon Properties

Each icon accepts these properties:

| Property  | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| size      | number | Icon size in pixels (default: 24) |
| color     | string | Icon color (inherits from parent) |
| className | string | Additional CSS classes            |

## Import and Basic Usage

You can import the Icons from touchpoint once the package has been installed or made available in your project.

The following examples use the Icons available from Touchpoint to construct an [IconButton](/touchpoint-Buttons).

### Import using `<script>`

Import the Icons from Touchpoint. Useful when adding touchpoint to your project via `<script>`:

```html
<script src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
<script>
  const { html, Icons } = nlxai.touchpointUi;
  const IconButtonExample = ({data, handler}) => {
  return html`
  <IconButton
      label=${data.buttonLabel}
      Icon=${Icons.ArrowForward}
      onClick=${() => handler.sendChoice(data.buttonId)}
      type="main"
  />`;
};
</script>
```

### Import using `import`

Import the elements to your project using import statements.

```javascript
import { useTouchpointContext, IconButton, Icons } from '@nlxai/touchpoint-ui';
const IconButtonExample = ({data, handler}) => {
  return(
  <IconButton
      label={data.buttonLabel}
      Icon={Icons.ArrowForward}
      onClick={() => handler.sendChoice(data.buttonId)}
      type="main"
  />);
};
```

## Available Icons

* Action
* Assistant
* AssistantOld
* Add
* ArrowDown
* ArrowLeft
* ArrowRight
* ArrowUp
* ArrowForward
* Attachment
* Camera
* Check
* Close
* Copy
* Date
* Delete
* Escalate
* Error
* FullScreen
* Mic
* MicOff
* Location
* Volume
* VolumeOff
* Translate
* OpenInNew
* Play
* Preview
* Reorder
* Restart
* Settings
* Search
* Share
* Warning
* ThumbDown
* ThumbUp
* Time
* Undo
* Refresh
* Help

## Related Components

- [Buttons](/touchpoint-Buttons)
- [CustomCards](/touchpoint-CustomCards)

For styling options, see [Theming Documentation](/touchpoint-ui-theming).
