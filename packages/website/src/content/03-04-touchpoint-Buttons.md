
Touchpoint provides two types of button components for handling user interactions: TextButton and IconButton. These components offer consistent styling and behavior while serving different interaction needs.

## TextButton Component

TextButton provides a text-based interactive element with optional icon support. It's ideal for primary actions and menu items.

### Usage

```javascript
import { TextButton } from '@nlxai/touchpoint-ui';

// Basic usage
<TextButton
  label="Click Me"
  onClick={() => handleClick()}
/>

// With icon
<TextButton
  label="Send Message"
  Icon={ArrowForward}
  onClick={() => sendMessage()}
/>
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| label | string | Yes | Button text |
| onClick | function | No | Click handler |
| Icon | Component | No | Optional icon component |
| type | 'main' \| 'ghost' \| 'overlay' | No | Button style variant |
| className | string | No | Additional CSS classes |

### Button Types

- `main`: Primary action button with full background
- `ghost`: Secondary action with transparent background
- `overlay`: Similar to ghost but optimized for overlay contexts

## IconButton Component

IconButton provides a icon-only interactive element. It's perfect for compact actions and toolbars.

### Usage

```javascript
import { IconButton } from '@nlxai/touchpoint-ui';
import { Close, Settings } from './Icons';

// Basic usage
<IconButton
  Icon={Close}
  label="Close Dialog"
  onClick={() => closeDialog()}
/>

// With specific type
<IconButton
  Icon={Settings}
  label="Open Settings"
  type="ghost"
  onClick={() => openSettings()}
/>
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| Icon | Component | Yes | Icon component to render |
| label | string | Yes | Accessible label (for screen readers) |
| onClick | function | No | Click handler |
| type | 'main' \| 'ghost' \| 'overlay' | No | Button style variant |
| className | string | No | Additional CSS classes |

## Complete Example

Here's an example showing both button types working together:

```javascript
const ToolbarExample = () => (
  <CustomCard>
    <CustomCardRow>
      <BaseText>Message Settings</BaseText>
      <IconButton
        Icon={Close}
        label="Close Settings"
        type="ghost"
        onClick={() => closeSettings()}
      />
    </CustomCardRow>
    <CustomCardRow>
      <TextButton
        label="Save Changes"
        Icon={Check}
        type="main"
        onClick={() => saveChanges()}
      />
      <TextButton
        label="Cancel"
        type="ghost"
        onClick={() => cancel()}
      />
    </CustomCardRow>
  </CustomCard>
);
```

## HTML Implementation

```html
<script>
contentLoaded().then(() => {
  const touchpointInstance = nlxai.touchpointUi.create({
    config: {
      // Base configuration
    },
    customModalities: {
      "action-card": () => html`
        <${CustomCard}>
          <${CustomCardRow}>
            <${TextButton}
              label="Primary Action"
              type="main"
              onClick=${() => handleAction()}
            />
            <${IconButton}
              Icon=${Close}
              label="Close"
              type="ghost"
              onClick=${() => handleClose()}
            />
          </${CustomCardRow}>
        </${CustomCard}>
      `
    }
  });
});
</script>
```

## Accessibility Features

Both button components include:
- Proper ARIA roles and labels
- Keyboard navigation support
- Focus management
- High contrast ratios
- Touch target sizing

## Best Practices

1. Button Choice
   - Use TextButton for primary actions
   - Use IconButton for toolbar actions
   - Maintain consistent button types across similar actions

2. Labels
   - Write clear, action-oriented labels
   - Use sentence case for button text
   - Provide descriptive aria-labels for IconButtons

3. Layout
   - Group related buttons together
   - Maintain consistent spacing
   - Align buttons logically in their container

4. Interaction
   - Provide visual feedback on hover/focus
   - Handle loading states appropriately
   - Disable buttons when actions are unavailable

5. Icon Usage
   - Use recognizable, standard icons
   - Maintain consistent icon sizing
   - Pair icons with labels when meaning isn't clear

## Related Components

- [CustomCard](/touchpoint-CustomCards) for button containers
- [CustomCardRow](/touchpoint-CustomCards#customcardrow) for button layouts
- [BaseText](/touchpoint-BaseText) for button labels

For theme customization options, see the [Theming Documentation](/touchpoint-ui-themeing).