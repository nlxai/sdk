
SmallText provides styling for secondary and supporting information in your interface. It uses reduced size and opacity to create visual hierarchy with BaseText.

## Import
```javascript
import { SmallText } from '@nlxai/touchpoint-ui';
```

## Basic Usage
```javascript
// Simple supporting text
<SmallText>Additional details</SmallText>

// With custom styling
<SmallText className="custom-class">More information</SmallText>
```

## Usage with customModalities

SmallText works alongside BaseText in custom components:

```javascript
import { 
  SmallText, 
  BaseText,
  CustomCard, 
  CustomCardRow 
} from '@nlxai/touchpoint-ui';

const InfoCard = ({ data }) => (
  <CustomCard>
    <CustomCardRow>
      <BaseText>{data.title}</BaseText>
      <SmallText>{data.timestamp}</SmallText>
    </CustomCardRow>
    <CustomCardRow>
      <SmallText>{data.details}</SmallText>
    </CustomCardRow>
  </CustomCard>
);

// Register with Touchpoint
const touchpoint = TouchpointUI.create({
  customModalities: {
    "info": InfoCard
  }
});
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| children | ReactNode | The text content to display |
| className | string | Additional CSS classes |

## Common Use Cases

SmallText is ideal for:
- Timestamps
- Metadata
- Prices
- Secondary descriptions
- Supporting details
- Status information

## Example with Other Components

```javascript
import { 
  SmallText,
  BaseText,
  CustomCard,
  CustomCardRow,
  Warning
} from '@nlxai/touchpoint-ui';

const StatusCard = ({ data }) => (
  <CustomCard>
    <CustomCardRow>
      <BaseText>{data.title}</BaseText>
      <SmallText>{data.date}</SmallText>
    </CustomCardRow>
    <CustomCardRow>
      <Warning className="w-4 h-4" />
      <SmallText>{data.status}</SmallText>
    </CustomCardRow>
  </CustomCard>
);
```

## Best Practices

- Use for secondary information that supports the main content
- Maintain clear visual hierarchy with BaseText
- Keep content brief and focused
- Use consistently across your interface

## Related Components
- [BaseText](/touchpoint-BaseText) for primary text
- [CustomCardRow](/touchpoint-CustomCards) for text layout
- [Icons](/touchpoint-Icons) for visual indicators