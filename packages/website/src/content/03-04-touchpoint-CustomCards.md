
The Custom Cards system provides a structured way to present information in your chat interface. The system consists of four components that work together: Carousel, CustomCard, CustomCardRow, and CustomCardImageRow..

* **Carousel** - Top Level component, acts as a container for multiple horizontally scrolled cards. A Carousel has at least 1 CustomCard. 
* **CustomCard** - Primary component, is a 'card' made up of multiple rows. A CustomCard has at least 1 of CustomCardRow or CustomCardImageRow. CustomCard can be used outside Carousel.
* **CustomCardRow** - Basic component for horizontal layouts within cards. Can have multiple rows in a CustomCard.
* **CustomCardImageRow** - Basic component for specialized image layouts within a CustomCard.

## Component Structure

The Custom Cards components follows a nested structure where components build upon each other to create rich layouts. A Carousel container holds one or more CustomCard components. Each CustomCard contains CustomCardRow or CustomCardImageRow components that organize the content within the card.

```javascript
<Carousel>                                         // Container for all cards
  <CustomCard>                                     // First card
    <CustomCardImageRow>...</CustomCardImageRow>   // Image content
    <CustomCardRow>...</CustomCardRow>             // Text content
    <CustomCardRow>...</CustomCardRow>             // Button row
  </CustomCard>
  <CustomCard>                                     // Second card
    ...
  </CustomCard>
</Carousel>
```

### Visualization

<img src="../images/CustomCard-Touchpoint.svg" alt="Custom Card Diagram" style="max-width: 40%;">

## Properties

Each component in the CustomCard system has specific properties that control its rendering and behavior.

### CustomCard Properties

| Property  | Type       | Required | Description                                    |
|-----------|------------|----------|------------------------------------------------|
| selected  | boolean    | No       | Controls whether the card appears selected     |
| onClick   | function   | No       | Handler function for click events             |

### CustomCardImageRow Properties

| Property  | Type    | Required | Description                                    |
|-----------|---------|----------|------------------------------------------------|
| src       | string  | Yes      | Source URL for the image                      |
| alt       | string  | No       | Alternative text for the image                |

### CustomCardRow Properties

| Property  | Type      | Required | Description                                    |
|-----------|-----------|----------|------------------------------------------------|
| left      | ReactNode | Yes      | Content to be rendered in the left section    |
| right     | ReactNode | Yes      | Content to be rendered in the right section   |
| icon      | Icon      | No       | Optional icon component to display centrally   |

## Import and Basic Usage

You can import the CustomCard components from touchpoint once the package has been installed or made available in your project.

### Example Modality Schema

In order to use the Carousel and CustomCard components you will need to have a [modality](https://docs.studio.nlx.ai/1-build/resources/modalities)  defined in your NLX application that is a list of objects.

Here is an example leveraged in the code-snips below. 

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

### Define onClick

The CustomCard component expects a function passed via `onClick` to define the actions to take when a user clicks the button.

In order to send the data back to NLX, you need to leverage the `useTouchpointContext` function to access the [ConversationHandler](/headless-api-reference#interfacesconversationhandlermd) method `sendChoice` to properly relay the user's choice back to NLX to continue the conversation.

Read more details about building Custom Components with Touchpoint in the [Getting started with Touchpoint components](/touchpoint-components) documentation page.

### Import using `<script>`

Import the elements via `html` from Touchpoint. Useful when adding touchpoint to your project via `<script>` tags.

The snippet below: 

* Uses `html` to import and create the Carousel and CustomCard.
* Leverages `useTouchpointContext` to set the onClick behavior.
* Imports React from the Touchpoint package to track user selection state.

```javascript
<script src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
<script>
const { useTouchpointContext, html, React } = nlxai.touchpointUi;
const carouselExample = ({ data }) => {
  const { handler } = useTouchpointContext();
  const [selected, setSelected] = React.useState(null);
  return html`
      <Carousel>
        ${data.map((cardData, cardIndex) => html`
          <CustomCard
            key=${cardIndex}
            selected=${selected === cardIndex}
            onClick=${() => {
              setSelected(cardIndex);
              handler.sendChoice(cardData.id);
            }}
          >
            <CustomCardImageRow
              src=${cardData.imageUrl}
              alt="Alt Text"
            />
            <CustomCardRow
              left=${html`
                <BaseText>${cardData.leftText}</BaseText>
              `}
              right=${html`
                <BaseText>${cardData.rightText}</BaseText>
              `}
            />
          </CustomCard>`
      )}
    </Carousel>`;
};
</script>
```

### Import using `import`

Import the elements to your project using import statements. 

The snippet below: 

* Uses `import` to import the components to construct the Carousel.
* Leverages `useTouchpointContext` to set the onClick behavior.
* Imports React from the Touchpoint package to track user selection state.

```javascript
import { 
  Carousel,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
  useTouchpointContext,
  React
} from '@nlxai/touchpoint-ui';

const showButtonExampleWithContext = ({ data }) => {
  const { handler } = useTouchpointContext();
  const [selected, setSelected] = React.useState(null);
  return(
    <Carousel>
      {data.map((cardData, cardIndex) =>
          <CustomCard
            key={cardIndex}
            selected={selected === cardIndex}
            onClick={() => {
              setSelected(cardIndex);
              handler.sendChoice(cardData.id);
            }}
          >
            <CustomCardImageRow
              src={cardData.imageUrl}
              alt="Alt Text"
            />
            <CustomCardRow
              left={
                <BaseText>{cardData.leftText}</BaseText>
              }
              right={
                <BaseText>{cardData.rightText}</BaseText>
              }
            />
          </CustomCard>
      )}
    </Carousel>
  );
};
```

## Related Components
- [Typography](/touchpoint-Typography) for Typography components
- [TextButton](/touchpoint-Buttons) for card actions
- [Icons](/touchpoint-Icons) for visual elements

For theme customization options, see the [Theming Documentation](/touchpoint-ui-themeing).