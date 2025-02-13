
BaseText is the primary text component in Touchpoint, used for main content, titles, and important information. It provides consistent styling and proper theme integration.

## Import
```javascript
import { BaseText } from '@nlxai/touchpoint-ui';
```

## Basic Usage
```javascript
// Simple text display
<BaseText>Main content text</BaseText>

// With custom styling
<BaseText className="custom-class">Styled text</BaseText>
```

## Usage with customModalities

BaseText is commonly used as the main text component in custom modalities:

```javascript
import { 
  BaseText, 
  CustomCard, 
  CustomCardRow 
} from '@nlxai/touchpoint-ui';

const MessageComponent = ({ data }) => (
  <CustomCard>
    <CustomCardRow>
      <BaseText>{data.title}</BaseText>
    </CustomCardRow>
    <CustomCardRow>
      <BaseText>{data.message}</BaseText>
    </CustomCardRow>
  </CustomCard>
);

// Register with Touchpoint
const touchpoint = TouchpointUI.create({
  customModalities: {
    "message": MessageComponent
  }
});
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| children | ReactNode | The text content to display |
| className | string | Additional CSS classes |

## Common Use Cases

BaseText is ideal for:
- Message titles
- Primary content
- Card headings
- Button labels
- Important information

## Example with Other Components

```javascript
import { 
  BaseText,
  SmallText,
  CustomCard,
  CustomCardRow,
  TextButton,
  ArrowForward
} from '@nlxai/touchpoint-ui';

const ProductCard = ({ data }) => (
  <CustomCard>
    <CustomCardRow>
      <BaseText>{data.name}</BaseText>
      <SmallText>{data.price}</SmallText>
    </CustomCardRow>
    <CustomCardRow>
      <BaseText>{data.description}</BaseText>
    </CustomCardRow>
    <CustomCardRow>
      <TextButton
        Icon={ArrowForward}
        label="View Details"
      />
    </CustomCardRow>
  </CustomCard>
);
```

## Best Practices

- Use for primary content that users need to read first
- Combine with SmallText to create clear content hierarchy
- Maintain consistent usage patterns across your interface
- Use theme settings for consistent styling

## Related Components
- [SmallText](/touchpoint-SmallText) for supporting text
- [CustomCardRow](/touchpoint-CustomCards) for text layout
- [TextButton](/touchpoint-Buttons) for interactive text