

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
