- [About](#about)
- [Component Structure \& Recommended Pattern](#component-structure--recommended-pattern)
- [Properties](#properties)
  - [CustomCard Properties](#customcard-properties)
  - [CustomCardImageRow Properties](#customcardimagerow-properties)
  - [CustomCardRow Properties](#customcardrow-properties)
- [Import and Basic Usage](#import-and-basic-usage)
  - [Define onClick](#define-onclick)
- [Example](#example)
  - [Example Modality Schema](#example-modality-schema)
  - [Example Card Component](#example-card-component)
- [Related Components](#related-components)

<img src="/images/Touchpoint-Carousel.png" alt="Carousel Rendered Example" style="max-width: 40%;">

## About

The Custom Card system provides a structured way to present information in your chat interface. The system consists of four components that work together:

- **CustomCard** - Primary component, is a 'card' made up of multiple rows. A CustomCard has at least 1 of CustomCardRow or CustomCardImageRow. CustomCard can be used outside Carousel.
- **CustomCardRow** - Basic component for horizontal layouts within cards. Can have multiple rows in a CustomCard.
- **CustomCardImageRow** - Basic component for specialized image layouts within a CustomCard.

## Component Structure & Recommended Pattern

The Custom Cards components follows a nested structure where components build upon each other to create rich layouts. Each CustomCard contains CustomCardRow or CustomCardImageRow components that organize the content within the card.

Recommended Card Structure:

1. **CustomCardImageRow** at the top (optional)
2. **CustomCardRow** elements with:
   - Left side: Faded BaseText for labels
   - Right side: Normal BaseText for values
3. **Selection state** managed with React.useState
4. **onClick handler** that updates state and sends choice to NLX

This pattern provides a consistent, professional appearance across all card-based components in your Touchpoint UI.

## Properties

Each component in the CustomCard system has specific properties that control its rendering and behavior.

### CustomCard Properties

| Property | Type     | Required | Description                                |
| -------- | -------- | -------- | ------------------------------------------ |
| selected | boolean  | No       | Controls whether the card appears selected |
| onClick  | function | No       | Handler function for click events          |

### CustomCardImageRow Properties

| Property | Type   | Required | Description                    |
| -------- | ------ | -------- | ------------------------------ |
| src      | string | Yes      | Source URL for the image       |
| alt      | string | No       | Alternative text for the image |

### CustomCardRow Properties

| Property | Type      | Required | Description                                  |
| -------- | --------- | -------- | -------------------------------------------- |
| left     | ReactNode | Yes      | Content to be rendered in the left section   |
| right    | ReactNode | Yes      | Content to be rendered in the right section  |
| icon     | Icon      | No       | Optional icon component to display centrally |

## Import and Basic Usage

You can import the CustomCard components from touchpoint once the package has been installed or made available in your project.

### Define onClick

The CustomCard component expects a function passed via `onClick` to define the actions to take when a user clicks the button.

Access the [ConversationHandler](/headless-api-reference#interface-conversationhandler) method `sendChoice` via `conversationHandler.sendChoice` to send the user's choice back to NLX to continue the conversation.

Read more details about building Custom Components with Touchpoint in the [Getting started with Touchpoint components](/guide-building-custom-components) documentation page.

## Example

In order to use the Carousel and CustomCard components you will need to have a [modality](https://docs.studio.nlx.ai/1-build/resources/modalities) defined in your NLX application that is a list of objects.

### Example Modality Schema

```json
{
  "id": "uuid",
  "thumbnail": "imageUrl",
  "label": "Label text",
  "value": "Value text"
}
```

### Example Card Component

This defines a component `ItemCard` that takes `data` (representing `cardItemData`) and an optional `initialSelectedId` and `onSelect` handler.

```touchpointui
const ItemCard = ({ data, conversationHandler }) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const handleClick = () => {
    setIsSelected(true);
    conversationHandler.sendChoice(data.id);
  };

  return html`
    <CustomCard selected=${isSelected} onClick=${handleClick}>
      <CustomCardImageRow
        src=${data.thumbnail}
        alt="Information Card Image"
      />
      <CustomCardRow
        left=${html`<BaseText faded>${data.label}</BaseText>`}
        right=${html`<BaseText>${data.value}</BaseText>`}
      />
    </CustomCard>
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
    ItemCardModality: ItemCard,
  },
});
```

## Related Components

- [Typography](/touchpoint-Typography) for Typography components
- [Icons](/touchpoint-Icons) for visual elements
- [Theming Touchpoint](/touchpoint-ui-theming)
