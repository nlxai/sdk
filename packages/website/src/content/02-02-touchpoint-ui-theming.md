
Touchpoint provides powerful theming capabilities that let you match your brand's visual identity. While the system offers comprehensive customization options, most applications can achieve a cohesive look by adjusting just two key properties.

## Quick Customization

For most applications, customizing `accent` and `fontFamily` properties will create a branded experience:

* Example: **accent** to `rgb(28, 99, 218)`
* Example: **fontFamily** to `"Helvetica Neue", sans-serif`

```javascript
const touchpointInstance = await nlxai.touchpointUi.create({
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

Touchpoint automatically adapts your theme for both light and dark modes. Use the `light-dark()` method for accent colors to provide accents for either mode. Set your preferred mode using the `colorMode` prop:

```javascript
const touchpointInstance = await nlxai.touchpointUi.create({
  config: {
    // Your base configuration
  },
  colorMode: "dark",  // or "light"
  theme: {
    accent: "light-dark(rgb(28, 99, 218), rgb(38, 99, 118))", // provide accent for both dark and light mode.
    fontFamily: '"Helvetica Neue", sans-serif'
  }
});
```

## Advanced Customization

For applications needing more detailed control, Touchpoint provides extensive customization options. These advanced settings let you fine-tune every aspect of the interface's appearance.

### Primary Colors
Primary colors control text and interactive elements, with variants for different opacity levels:

| Property    | Description                  |
|-------------|------------------------------|
| `primary80` | Primary color at 80% opacity |
| `primary60` | Primary color at 60% opacity |
| `primary40` | Primary color at 40% opacity |
| `primary20` | Primary color at 20% opacity |
| `primary10` | Primary color at 10% opacity |
| `primary5`  | Primary color at 5% opacity  |
| `primary1`  | Primary color at 1% opacity  |

### Secondary Colors
Secondary colors are used for backgrounds and supporting elements:

| Property      | Description                    |
|---------------|--------------------------------|
| `secondary80` | Secondary color at 80% opacity |
| `secondary60` | Secondary color at 60% opacity |
| `secondary40` | Secondary color at 40% opacity |
| `secondary20` | Secondary color at 20% opacity |
| `secondary10` | Secondary color at 10% opacity |
| `secondary5`  | Secondary color at 5% opacity  |
| `secondary1`  | Secondary color at 1% opacity  |

### Additional Colors
| Property     | Description                                  |
|--------------|----------------------------------------------|
| `accent20`   | Accent color at 20% opacity                  |
| `background` | Main background color                        |
| `overlay`    | Color for the overlay behind the chat window |

### Status Colors
| Property           | Description             |
|--------------------|-------------------------|
| `warningPrimary`   | Primary warning color   |
| `warningSecondary` | Secondary warning color |
| `errorPrimary`     | Primary error color     |
| `errorSecondary`   | Secondary error color   |

### Layout

| Property            | Description                                |
|---------------------|--------------------------------------------|
| `innerBorderRadius` | Border radius for inner elements (buttons) |
| `outerBorderRadius` | Border radius for outer elements (cards)   |

See the [Setup Documentation](/touchpoint-ui-setup) for more information about configuration options.