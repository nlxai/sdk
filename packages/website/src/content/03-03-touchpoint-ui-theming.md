- [Quick Customization Essentials](#quick-customization-essentials)
- [Dark Mode Support](#dark-mode-support)
  - [Defining Distinct Light and Dark Themes](#defining-distinct-light-and-dark-themes)
- [Comprehensive Color System](#comprehensive-color-system)
  - [Primary Colors](#primary-colors)
  - [Secondary Colors](#secondary-colors)
  - [Accent and Additional Colors](#accent-and-additional-colors)
  - [Status Colors](#status-colors)
- [Layout Customization](#layout-customization)
  - [Border Radius Properties](#border-radius-properties)
  - [Visual Impact of Different Border Radius Values](#visual-impact-of-different-border-radius-values)
- [Complete Theme Example](#complete-theme-example)

Touchpoint UI provides a powerful and flexible theming system that allows you to seamlessly integrate the chat widget with your application's visual identity. This guide explores both basic and advanced theming techniques to give you complete control over the appearance of your Touchpoint implementation.

## Quick Customization Essentials

For many applications, adjusting just two key properties will create a cohesive branded experience:

```javascript
const touchpointInstance = await nlxai.touchpointUi.create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  theme: {
    // The primary color for buttons and highlights
    accent: "rgb(28, 99, 218)", // Use your brand's primary color

    // The font for all text in the interface
    fontFamily: '"Helvetica Neue", sans-serif', // Use your brand's font
  },
});
```

The `accent` color is used throughout the interface for:

- Interactive buttons
- Selected state highlights
- Important UI elements
- Focus indicators

The `fontFamily` property affects all text in the interface, ensuring typographic consistency.

## Dark Mode Support

Touchpoint automatically adapts your theme for both light and dark modes. Use the `light-dark()` method to provide different accent colors for each mode:

```javascript
const touchpointInstance = await nlxai.touchpointUi.create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  colorMode: "dark", // or "light"
  theme: {
    accent: "light-dark(rgb(28, 99, 218), rgb(38, 99, 118))", // Light mode, Dark mode
    fontFamily: '"Helvetica Neue", sans-serif',
  },
});
```

### Defining Distinct Light and Dark Themes

For maximum control, you can create entirely separate theme objects for light and dark modes:

```javascript
import { create } from "@nlxai/touchpoint-ui";

const lightTheme = {
  fontFamily: '"Inter", sans-serif',
  accent: "#007AFF",
  primary80: "#1C1C1E", // Dark text on light backgrounds
  secondary80: "#F2F2F7", // Light gray message bubbles
  background: "#FFFFFF", // White background
  // ... other light theme properties
};

const darkTheme = {
  fontFamily: '"Inter", sans-serif',
  accent: "#0A84FF",
  primary80: "#FFFFFF", // White text on dark backgrounds
  secondary80: "#1C1C1E", // Dark gray message bubbles
  background: "#000000", // Black background
  // ... other dark theme properties
};

const initializeTouchpoint = async (
  userColorModePreference /* 'light' or 'dark' */,
) => {
  const touchpoint = await create({
    config: {
      applicationUrl: "YOUR_APPLICATION_URL",
      headers: { "nlx-api-key": "YOUR_API_KEY" },
      languageCode: "en-US",
    },
    colorMode: userColorModePreference,
    theme: userColorModePreference === "dark" ? darkTheme : lightTheme,
  });
};
```

## Comprehensive Color System

Touchpoint uses a sophisticated color system with opacity variants to create visual hierarchy and ensure readability. Understanding this system lets you fine-tune every aspect of the interface.

### Primary Colors

Primary colors are used for text, icons, and important UI elements. The opacity variants help create visual hierarchy:

| Property    | Opacity | Common Uses                                 |
| ----------- | ------- | ------------------------------------------- |
| `primary80` | 80%     | Main body text, prominent labels            |
| `primary60` | 60%     | Secondary text, less emphasized information |
| `primary40` | 40%     | Supporting text, subtitles                  |
| `primary20` | 20%     | Placeholder text, disabled states           |
| `primary10` | 10%     | Subtle highlights, hover states             |
| `primary5`  | 5%      | Very subtle backgrounds, separators         |
| `primary1`  | 1%      | Barely visible dividers                     |

### Secondary Colors

Secondary colors are typically used for backgrounds, containers, and supporting elements:

| Property      | Opacity | Common Uses                                  |
| ------------- | ------- | -------------------------------------------- |
| `secondary80` | 80%     | Message bubble backgrounds, card backgrounds |
| `secondary60` | 60%     | Container backgrounds                        |
| `secondary40` | 40%     | Input field backgrounds                      |
| `secondary20` | 20%     | Hover states on elements                     |
| `secondary10` | 10%     | Subtle container backgrounds                 |
| `secondary5`  | 5%      | Very subtle fills, pressed states            |
| `secondary1`  | 1%      | Barely visible backgrounds                   |

### Accent and Additional Colors

| Property     | Description                                  | Usage                                     |
| ------------ | -------------------------------------------- | ----------------------------------------- |
| `accent`     | Main branding color                          | Buttons, active states, focus indicators  |
| `accent20`   | Accent color at 20% opacity                  | Hover states, subtle highlights           |
| `background` | Main background color                        | Chat window background                    |
| `overlay`    | Color for the overlay behind the chat window | Modal overlay when using half-screen mode |

### Status Colors

| Property           | Description             | Usage                       |
| ------------------ | ----------------------- | --------------------------- |
| `warningPrimary`   | Primary warning color   | Warning text and icons      |
| `warningSecondary` | Secondary warning color | Warning message backgrounds |
| `errorPrimary`     | Primary error color     | Error text and icons        |
| `errorSecondary`   | Secondary error color   | Error message backgrounds   |

## Layout Customization

Two key properties control the roundness of UI elements:

### Border Radius Properties

| Property            | Controls                          |
| ------------------- | --------------------------------- |
| `innerBorderRadius` | Buttons, inputs, message bubbles  |
| `outerBorderRadius` | Main window frame, cards, dialogs |

For example:

```javascript
const theme = {
  // Other theme properties...
  innerBorderRadius: "4px", // Slightly rounded buttons and inputs
  outerBorderRadius: "12px", // More rounded cards and main window
};
```

### Visual Impact of Different Border Radius Values

- **Sharp corners**: `innerBorderRadius: "0px"`, `outerBorderRadius: "0px"`

  - Creates a very geometric, angular appearance

- **Slightly rounded**: `innerBorderRadius: "4px"`, `outerBorderRadius: "8px"`

  - Provides subtle rounding for a modern look

- **Very rounded**: `innerBorderRadius: "20px"`, `outerBorderRadius: "20px"`
  - Creates pill-shaped elements with a friendly, approachable feel

## Complete Theme Example

Here's a complete theme configuration showing all available properties:

```javascript
import { create } from "@nlxai/touchpoint-ui";

const completeTheme = {
  // Typography
  fontFamily: '"Roboto", sans-serif',

  // Primary colors (text)
  primary80: "rgba(0, 0, 0, 0.8)",
  primary60: "rgba(0, 0, 0, 0.6)",
  primary40: "rgba(0, 0, 0, 0.4)",
  primary20: "rgba(0, 0, 0, 0.2)",
  primary10: "rgba(0, 0, 0, 0.1)",
  primary5: "rgba(0, 0, 0, 0.05)",
  primary1: "rgba(0, 0, 0, 0.01)",

  // Secondary colors (backgrounds)
  secondary80: "rgba(255, 255, 255, 0.8)",
  secondary60: "rgba(255, 255, 255, 0.6)",
  secondary40: "rgba(255, 255, 255, 0.4)",
  secondary20: "rgba(255, 255, 255, 0.2)",
  secondary10: "rgba(255, 255, 255, 0.1)",
  secondary5: "rgba(255, 255, 255, 0.05)",
  secondary1: "rgba(255, 255, 255, 0.01)",

  // Accent and additional colors
  accent: "#FF5733",
  accent20: "rgba(255, 87, 51, 0.2)",
  background: "rgba(245, 245, 245, 0.95)",
  overlay: "rgba(0, 0, 0, 0.4)",

  // Status colors
  warningPrimary: "#FFA500",
  warningSecondary: "rgba(255, 165, 0, 0.1)",
  errorPrimary: "#FF0000",
  errorSecondary: "rgba(255, 0, 0, 0.1)",

  // Layout
  innerBorderRadius: "4px",
  outerBorderRadius: "12px",
};

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  theme: completeTheme,
});
```
