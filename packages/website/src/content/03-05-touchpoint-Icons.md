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

### Import using `<script>`

Import the Icons from Touchpoint. Useful when adding touchpoint to your project via `<script>`:

```html
<script src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
<script>
  const { Icons } = nlxai.touchpointUi;
  const myArrowForward = Icons.ArrowForward;
</script>
```

### Import using `import`

Import the elements to your project using import statements.

```javascript
import { Icons } from "@nlxai/touchpoint-ui";
const myArrowForward = Icons.ArrowForward;
```

## Related Components

- [IconButton](/touchpoint-Buttons#iconbutton)
- [TextButton](/touchpoint-Buttons#textbutton)
- [CustomCardRow](/touchpoint-CustomCards#customcardrow)

For styling options, see [Theming Documentation](/touchpoint-ui-theming).
