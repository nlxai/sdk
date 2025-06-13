- [Quick Customization Essentials](#quick-customization-essentials)
- [Launch and Brand Icons](#launch-and-brand-icons)
  - [Launch Icon Guidance](#launch-icon-guidance)
  - [Brand Icon Guidance](#brand-icon-guidance)
  - [Custom Launch Implementation](#custom-launch-implementation)
- [Dark Mode Support](#dark-mode-support)
  - [Defining Distinct Light and Dark Themes](#defining-distinct-light-and-dark-themes)
- [Comprehensive Color System](#comprehensive-color-system)
  - [Primary Colors](#primary-colors)
  - [Secondary Colors](#secondary-colors)
  - [Accent and Additional Colors](#accent-and-additional-colors)
  - [Status Colors](#status-colors)
- [Layout Customization](#layout-customization)
  - [Border Radius Properties](#border-radius-properties)
- [Complete Theme Example](#complete-theme-example)

## Quick Customization Essentials

For many applications, adjusting just two key properties will create a cohesive branded experience:

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
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

## Launch and Brand Icons

Icons are critical for maintaining brand consistency and ensuring a polished user experience. Touchpoint provides two key icon customization points: the launch icon (chat button) and the brand icon (header logo).

### Launch Icon Guidance

The `launchIcon` is displayed on the floating action button when the Touchpoint UI is collapsed. This is often the first interaction point for the user.

**Design Guidance:**

| Guidance               | Details                                     | Reference                                                                                                                                            |
| ---------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button and Icon Size   | Icon is 32x32 within the launch button      | Your `launchIcon` image will be displayed at 32x32 pixels within this 64x64 button                                                                   |
| File Format            | SVG or PNG                                  | A single-color SVG is ideal                                                                                                                          |
| Color and Contrast     | Single Color                                | Should contrast well with background color. (Check both light and dark mode)                                                                         |
| Background and Borders | Icon **must have a transparent background** | The icon should not have any embedded borders; the button handles its own border and rounding (`rounded-outer` which uses `theme.outerBorderRadius`) |
| Shape and Proportions  | 32x32 pixels                                | Encuse the icon is clear and recognizable at this size                                                                                               |

**Configuration:**

Provide the URL to your custom icon via the `launchIcon` property.

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
  launchIcon: "https://yourdomain.com/path/to/your-launch-icon.svg",
  theme: {
    background: "rgb(0, 100, 255)", // Example: Ensure your icon contrasts with this
  },
});
```

### Brand Icon Guidance

The `brandIcon` appears in the header of the expanded Touchpoint UI, reinforcing your brand's presence.

**Design Guidelines:**

| Guidance               | Details                                     | Reference                                     |
| ---------------------- | ------------------------------------------- | --------------------------------------------- |
| Size                   | 40x40 pixels                                | Ensure design is clear at this size           |
| File Format            | SVG or PNG                                  | A SVG is ideal, High Quality PNG will work    |
| Background and Borders | Icon **must have a transparent background** | The icon should not have any embedded borders |

**Configuration:**

Pass the URL of your icon to the `brandIcon` property in the Touchpoint configuration.

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
  brandIcon: "https://yourdomain.com/path/to/your-brand-icon.svg",
});
```

### Custom Launch Implementation

You can implement a fully custom launch experience if the default launch button constraints don't meet your needs.

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
  brandIcon: "https://yourdomain.com/path/to/your-brand-icon.svg",
  launchIcon: false,
});

// Create your own launch button
document.getElementById("my-custom-button").addEventListener("click", () => {
  touchpoint.expanded = true;
});
```

**HTML**

```html
<!-- Your custom button -->
<button id="my-custom-button" class="my-brand-button">Chat with us</button>
```

This approach gives you complete control over the launch button's appearance, position, and behavior. See the [Showing and Hiding Touchpoint](/guide-show-hide-touchpoint) guide for more details.

## Dark Mode Support

Touchpoint automatically adapts your theme for both light and dark modes. Use the `light-dark()` method to provide different accent colors for each mode:

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
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

```touchpointui
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

const userColorModePreference = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches
  ? "dark"
  : "light";

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(),
  },
  colorMode: userColorModePreference,
  theme: userColorModePreference === "dark" ? darkTheme : lightTheme,
});
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

```touchpointui
const theme = {
  // Other theme properties...
  innerBorderRadius: "4px", // Slightly rounded buttons and inputs
  outerBorderRadius: "12px", // More rounded cards and main window
};
```

## Complete Theme Example

Here's a complete theme configuration showing all available properties:

```touchpointui
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
    userId: crypto.randomUUID(),
  },
  theme: completeTheme,
  launchIcon: "https://yoursite.com/chat-icon.svg",
  brandIcon: "https://yoursite.com/logo.png",
});
```
