- [About](#about)
- [Component Structure](#component-structure)
  - [Visualization](#visualization)
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

### Carousel Example

<img src="/images/Touchpoint-Carousel.png" alt="Carousel Rendered Example" style="max-width: 40%;">

## About

The Custom Cards system provides a structured way to present information in your chat interface. The system consists of four components that work together:

- **Carousel** - Top Level component, acts as a container for multiple horizontally scrolled cards. A Carousel has at least 1 CustomCard.
- **CustomCard** - Primary component, is a 'card' made up of multiple rows. A CustomCard has at least 1 of CustomCardRow or CustomCardImageRow. CustomCard can be used outside Carousel.
- **CustomCardRow** - Basic component for horizontal layouts within cards. Can have multiple rows in a CustomCard.
- **CustomCardImageRow** - Basic component for specialized image layouts within a CustomCard.

## Component Structure

The Custom Cards components follows a nested structure where components build upon each other to create rich layouts. A Carousel container holds one or more CustomCard components. Each CustomCard contains CustomCardRow or CustomCardImageRow components that organize the content within the card.

```jsx
{
  /* Container for all cards*/
}
<Carousel>
  {/* First card */}
  <CustomCard>
    {/* Image content */}
    <CustomCardImageRow>...</CustomCardImageRow>
    {/* Text content */}
    <CustomCardRow>...</CustomCardRow>
  </CustomCard>
  {/* Second card */}
  <CustomCard>...</CustomCard>
</Carousel>;
```

### Visualization

<img src="/images/CustomCard-Touchpoint.svg" alt="Custom Card Diagram" style="max-width: 40%;">

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
[
  {
    "id": "uuid",
    "imageUrl": "imageUrl",
    "leftText": "leftAlignedText",
    "rightText": "rightAlignedText"
  }
]
```

### Example Card Component

The snippet below:

- Uses `import` to import the components to construct the Carousel.
- Imports React from the Touchpoint package to track user selection state.

```javascript
import {
  Carousel,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
  React,
} from "@nlxai/touchpoint-ui";

const CarouselExample = ({ data, conversationHandler }) => {
  const [selected, setSelected] = React.useState(null);
  return (
    <Carousel>
      {data.map((cardData, cardIndex) => (
        <CustomCard
          key={cardIndex}
          selected={selected === cardIndex}
          onClick={() => {
            setSelected(cardIndex);
            conversationHandler.sendChoice(cardData.id);
          }}
        >
          <CustomCardImageRow src={cardData.imageUrl} alt="Alt Text" />
          <CustomCardRow
            left={<BaseText>{cardData.leftText}</BaseText>}
            right={<BaseText>{cardData.rightText}</BaseText>}
          />
        </CustomCard>
      ))}
    </Carousel>
  );
};
```

## Related Components

- [Typography](/touchpoint-Typography) for Typography components
- [Icons](/touchpoint-Icons) for visual elements
- [Theming Touchpoint](/touchpoint-ui-theming)
- [Building Components without JSX](/guide-html-components)
- [Managing Selection State](/guide-managing-selection) for handling selection in cards and carousels
