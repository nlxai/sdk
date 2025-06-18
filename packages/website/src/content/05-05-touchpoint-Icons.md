- [About](#about)
- [Icon Properties](#icon-properties)
- [Import and Basic Usage](#import-and-basic-usage)
- [Example](#example)
- [Available Icons](#available-icons)
- [Related Components](#related-components)

## About

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

## Example

Example IconButton using the Icons from Touchpoint

```touchpointui
const IconButtonExample = ({ data, conversationHandler }) => {
  return html`
    <IconButton
      label=${data.buttonLabel}
      Icon=${Icons.ArrowForward}
      onClick=${() => conversationHandler.sendChoice(data.buttonId)}
      type="main"
    />
  `;
};

// Register component when creating touchpoint
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  customModalities: {
    IconButtonModality: IconButtonExample,
  },
});
```

## Available Icons

- Action
- Assistant
- AssistantOld
- Add
- ArrowDown
- ArrowLeft
- ArrowRight
- ArrowUp
- ArrowForward
- Attachment
- Camera
- Check
- Close
- Copy
- Date
- Delete
- Escalate
- Error
- FullScreen
- Mic
- MicOff
- Location
- Volume
- VolumeOff
- Translate
- OpenInNew
- Play
- Preview
- Reorder
- Restart
- Settings
- Search
- Share
- Warning
- ThumbDown
- ThumbUp
- Time
- Undo
- Refresh
- Help

## Related Components

- [Buttons](/touchpoint-Buttons)
- [CustomCards](/touchpoint-CustomCards)
- [Theming Touchpoint](/touchpoint-ui-theming)
