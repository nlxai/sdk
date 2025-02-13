
Touchpoint components work together to create rich chat experiences. The system uses customModalities to connect your components with bot responses, letting you create dynamic, interactive interfaces.

## Understanding customModalities

When your bot sends a message with a specific modality, Touchpoint renders your corresponding component. This connection happens through the customModalities configuration:

```javascript
import { TouchpointUI, CustomCard, BaseText, TextButton, ShoppingCart } from '@nlxai/touchpoint-ui';

// Register components with specific modality keys
const touchpoint = TouchpointUI.create({
  customModalities: {
    "product-card": ProductCardComponent,
    "welcome-message": WelcomeComponent
  }
});

// Your component receives data from the bot
const ProductCardComponent = ({ data }) => (
  <CustomCard>
    <CustomCardRow>
      <BaseText>{data.name}</BaseText>
      <TextButton 
        label="Buy Now" 
        Icon={ShoppingCart}
        onClick={() => handlePurchase(data.id)} 
      />
    </CustomCardRow>
  </CustomCard>
);
```

## Component Categories

Touchpoint provides four types of components that work together:

### Display Components
Create consistent text presentation:
- [BaseText](/touchpoint-BaseText) - Primary content
- [SmallText](/touchpoint-SmallText) - Supporting information

### Layout Components
Structure your content:
- [CustomCards](/touchpoint-CustomCards) - Card collections
- [CustomCard](/touchpoint-CustomCards) - Individual cards
- [CustomCardRow](/touchpoint-CustomCards) - Horizontal layouts
- [CustomCardImageRow](/touchpoint-CustomCards) - Image containers

### Interactive Components
Handle user actions:
- [TextButton](/touchpoint-Buttons) - Text-based buttons
- [IconButton](/touchpoint-Buttons) - Icon-only buttons

### Visual Components
Add graphical elements:
- [Icons](/touchpoint-Icons) - Consistent iconography

## Creating Custom Components

Here's a practical example combining multiple components:

```javascript
import { 
  CustomCard, 
  CustomCardRow, 
  BaseText, 
  SmallText,
  TextButton,
  ArrowForward 
} from '@nlxai/touchpoint-ui';

const ProductComponent = ({ data }) => (
  <CustomCard>
    <CustomCardRow>
      <BaseText>{data.name}</BaseText>
      <SmallText>{data.price}</SmallText>
    </CustomCardRow>
    <CustomCardRow>
      <TextButton 
        label="View Details"
        Icon={ArrowForward}
        onClick={() => showDetails(data.id)}
      />
    </CustomCardRow>
  </CustomCard>
);

// Register with Touchpoint
const touchpoint = TouchpointUI.create({
  customModalities: {
    "product": ProductComponent
  }
});
```

## Best Practices

1. Component Organization: Keep components focused on a single purpose and compose them together for complex interfaces.

2. Data Handling: Components receive data through the modality system. Structure your bot responses to match your component needs.

3. Consistent Patterns: Use similar patterns across your components for a cohesive experience. Use BaseText for primary content, SmallText for supporting details, CustomCardRow for consistent layouts, and Icons with buttons for clear actions.

4. Performance: Register only the components you need in customModalities to keep your application efficient.

See individual component documentation for detailed usage information.