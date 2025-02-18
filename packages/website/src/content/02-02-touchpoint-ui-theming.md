
NLX Touchpoint provides powerful theming capabilities that let you match your brand's visual identity. While the system offers comprehensive customization options, most applications can achieve a cohesive look by adjusting just two key properties.

## Quick Customization

For most applications, customizing `accent` and `fontFammily` properties will create a branded experience:

* Example: **accent** to `rgb(28, 99, 218)`
* Example: **fontFamily** to `"Helvetica Neue", sans-serif`

```javascript
const touchpointInstance = nlxai.touchpointUi.create({
  config: {
    // Your base configuration
  },
  theme: {
    // The primary color for buttons and highlights
    accent: "rgb(28, 99, 218)",  // Use your brand's primary color
    
    // The font for all text in the interface
    fontFamily: '"Helvetica Neue", sans-serif'  // Use your brand's font
  }
});
```

The accent color is used for:
- Interactive buttons
- Selected state highlights
- Important UI elements
- Focus indicators

The font family affects all text in the interface, ensuring consistent typography throughout your chat experience.

## Dark Mode Support

Touchpoint automatically adapts your theme for both light and dark modes. Set your preferred mode using the `colorMode` prop:

```javascript
const touchpointInstance = nlxai.touchpointUi.create({
  config: {
    // Your base configuration
  },
  colorMode: "dark",  // or "light"
  theme: {
    accent: "rgb(28, 99, 218)",
    fontFamily: '"Helvetica Neue", sans-serif'
  }
});
```

## Advanced Customization

For applications needing more detailed control, Touchpoint provides extensive customization options. These advanced settings let you fine-tune every aspect of the interface's appearance.

### Primary Colors
Primary colors control text and interactive elements, with variants for different opacity levels:

| Property | Type | Description |
|----------|------|-------------|
| `primary80` | string | Primary color at 80% opacity |
| `primary60` | string | Primary color at 60% opacity |
| `primary40` | string | Primary color at 40% opacity |
| `primary20` | string | Primary color at 20% opacity |
| `primary10` | string | Primary color at 10% opacity |
| `primary5` | string | Primary color at 5% opacity |
| `primary1` | string | Primary color at 1% opacity |

### Secondary Colors
Secondary colors are used for backgrounds and supporting elements:

| Property | Type | Description |
|----------|------|-------------|
| `secondary80` | string | Secondary color at 80% opacity |
| `secondary60` | string | Secondary color at 60% opacity |
| `secondary40` | string | Secondary color at 40% opacity |
| `secondary20` | string | Secondary color at 20% opacity |
| `secondary10` | string | Secondary color at 10% opacity |
| `secondary5` | string | Secondary color at 5% opacity |
| `secondary1` | string | Secondary color at 1% opacity |

### Additional Colors
| Property | Type | Description |
|----------|------|-------------|
| `accent20` | string | Accent color at 20% opacity |
| `background` | string | Main background color |
| `overlay` | string | Color for the overlay behind the chat window |

### Status Colors
| Property | Type | Description |
|----------|------|-------------|
| `warningPrimary` | string | Primary warning color |
| `warningSecondary` | string | Secondary warning color |
| `errorPrimary` | string | Primary error color |
| `errorSecondary` | string | Secondary error color |

### Layout
| Property | Type | Description |
|----------|------|-------------|
| `innerBorderRadius` | string | Border radius for inner elements (buttons) |
| `outerBorderRadius` | string | Border radius for outer elements (cards) |

See the [Setup Documentation](/touchpoint-ui-setup) for more information about configuration options.# Theming Your Touchpoint Interface