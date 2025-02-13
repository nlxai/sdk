
Touchpoint provides built-in icons that integrate with buttons and custom components. Each icon maintains consistent styling and accessibility features.

## Available Icons

Import icons individually to optimize bundle size:

```javascript
import { 
  ArrowForward,
  Attachment,
  Close,
  Delete,
  Check,
  Error,
  Escalate,
  Restart,
  Settings,
  Warning
} from '@nlxai/touchpoint-ui/Icons';
```

## Using with Buttons

Icons enhance button clarity and visual appeal:

```javascript
import { TextButton, IconButton, Settings, ArrowForward } from '@nlxai/touchpoint-ui';

// IconButton for toolbar actions
<IconButton
  Icon={Settings}
  label="Settings"
  onClick={openSettings}
/>

// TextButton with supporting icon
<TextButton
  Icon={ArrowForward}
  label="Continue"
  onClick={continue}
/>
```

## Using in Custom Components

Icons work within your customModalities components:

```javascript
import { CustomCard, BaseText, Warning } from '@nlxai/touchpoint-ui';

const AlertComponent = ({ data }) => (
  <CustomCard>
    <CustomCardRow>
      <Warning className="w-4 h-4" />
      <BaseText>{data.message}</BaseText>
    </CustomCardRow>
  </CustomCard>
);

// Register with Touchpoint
const touchpoint = TouchpointUI.create({
  customModalities: {
    "alert": AlertComponent
  }
});
```

## Icon Properties

Each icon accepts these properties:

| Property | Type | Description |
|----------|------|-------------|
| size | number | Icon size in pixels (default: 24) |
| color | string | Icon color (inherits from parent) |
| className | string | Additional CSS classes |

## Best Practices

1. Choose Appropriate Icons
   Select icons that clearly represent their actions and maintain consistency across your interface.

2. Handle Accessibility
   Always provide aria-labels for interactive icons and consider users who rely on screen readers.

3. Maintain Visual Consistency
   - Use consistent sizes within similar contexts
   - Follow your theme's color system
   - Keep padding and spacing consistent

4. Bundle Optimization
   Import only the icons you need to keep your application efficient.

## Related Components
- [IconButton](/touchpoint-Buttons#iconbutton)
- [TextButton](/touchpoint-Buttons#textbutton)
- [CustomCardRow](/touchpoint-CustomCards#customcardrow)

For styling options, see [Theming Documentation](/touchpoint-ui-themeing).