- [Example Selection within a Carousel](#example-selection-within-a-carousel)
- [Related Resources](#related-resources)

Touchpoint-UI provides useState from the [React package](https://react.dev/reference/react/useState) to manage highlights and tracking user selections within custom components.

## Example Selection within a Carousel

The most common selection pattern allows users to select one item from a group:

```javascript
import {
  Carousel,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
  React,
} from "@nlxai/touchpoint-ui";

const CarouselExample = ({ data, conversationHandler }) => {
  // leverage react's useState
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

## Related Resources

- [React Documentation](https://react.dev/reference/react/useState) - Full details from React documentation
- [Touchpoint Components](/guide-building-custom-components) - Components used in selection patterns
- [HTML Components Guide](/guide-html-components) - More on using HTML template syntax
- [Building custom components](/guide-building-custom-components) - Creating custom interactive components
