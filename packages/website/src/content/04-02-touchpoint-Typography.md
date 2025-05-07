- [About](#about)
- [Import and Basic Usage](#import-and-basic-usage)
  - [Example](#example)
- [Related Documents](#related-documents)

## About

Touchpoint provides two typography elements, BaseText and SmallText, to provide consistent styling and theme integration for text within Custom Components.

- **BaseText** - Primary text component in Touchpoint, used for main content, titles, and important information.
- **SmallText** - Styling for secondary and supporting information in your interface. It uses reduced size and opacity to create visual hierarchy with BaseText.

## Import and Basic Usage

You can import the typography elements from touchpoint once the package has been installed or made available in your project.

### Example

- Uses both the BaseText and SmallText typography components to construct a [CustomCard](/touchpoint-CustomCards) with the "primary" (BaseText) information left aligned and "secondary" (SmallText) right aligned.

```javascript
import {
  BaseText,
  SmallText,
  CustomCard,
  CustomCardRow,
} from "@nlxai/touchpoint-ui";
const ProductDetails = ({ data, conversationHandler }) => {
  return (
    <CustomCard>
      <CustomCardRow
        left={<BaseText>{data.PrimaryInformation}</BaseText>}
        right={<SmallText>{data.SecondaryInformation}</SmallText>}
      />
    </CustomCard>
  );
};
```

## Related Documents

- [CustomCards](/touchpoint-CustomCards)
- [Buttons](/touchpoint-Buttons)
- [Building Components without JSX](/guide-building-custom-components#building-html-components-without-transpiling)
