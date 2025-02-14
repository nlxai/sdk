
The Custom Cards system provides a structured way to present information in your chat interface. The system consists of four components that work together: Carousel (a container for multiple cards), CustomCard (individual content cards), CustomCardRow (horizontal layouts within cards), and CustomCardImageRow (specialized image layouts).

## Import
```javascript
import { 
  Carousel,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow
} from '@nlxai/touchpoint-ui';
```

## Component Structure

The Custom Cards system follows a nested structure where components build upon each other to create rich layouts. A Carousel container holds one or more CustomCard components. Each CustomCard contains CustomCardRow or CustomCardImageRow components that organize the content within the card.

```javascript
<Carousel>                        // Container for all cards
  <CustomCard>                       // First card
    <CustomCardImageRow>...</CustomCardImageRow>   // Image content
    <CustomCardRow>...</CustomCardRow>             // Text content
    <CustomCardRow>...</CustomCardRow>             // Button row
  </CustomCard>
  <CustomCard>                       // Second card
    ...
  </CustomCard>
</Carousel>
```

## Usage with customModalities

The Custom Cards system is particularly powerful when used within custom modalities. Here's how you might create a product catalog:

```javascript
import { 
  Carousel,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
  BaseText,
  SmallText,
  TextButton,
  ShoppingCart
} from '@nlxai/touchpoint-ui';

const ProductCatalog = ({ data }) => (
  <Carousel>
    {data.products.map(product => (
      <CustomCard key={product.id}>
        <CustomCardImageRow>
          <img src={product.image} alt={product.name} />
        </CustomCardImageRow>
        <CustomCardRow>
          <BaseText>{product.name}</BaseText>
          <SmallText>{product.price}</SmallText>
        </CustomCardRow>
        <CustomCardRow>
          <TextButton 
            label="Add to Cart"
            Icon={ShoppingCart}
            onClick={() => handlePurchase(product.id)}
          />
        </CustomCardRow>
      </CustomCard>
    ))}
  </Carousel>
);

// Register with Touchpoint
const touchpoint = TouchpointUI.create({
  customModalities: {
    "product-catalog": ProductCatalog
  }
});
```

## Individual Components

### Carousel Container
The outer container that manages card collection layout and scrolling behavior.

```javascript
<Carousel>
  {/* Cards are arranged horizontally and scroll when needed */}
  <CustomCard>...</CustomCard>
  <CustomCard>...</CustomCard>
</Carousel>
```

### CustomCard
Individual card components that provide structure for content.

```javascript
<CustomCard>
  {/* Content is organized in rows */}
  <CustomCardRow>...</CustomCardRow>
</CustomCard>
```

### CustomCardRow
Organizes content horizontally within a card. Ideal for text, buttons, and other non-image content.

```javascript
<CustomCardRow>
  {/* Content is arranged horizontally with proper spacing */}
  <BaseText>Title</BaseText>
  <SmallText>Details</SmallText>
</CustomCardRow>
```

### CustomCardImageRow
Specialized row component for handling images with proper scaling and positioning.

```javascript
<CustomCardImageRow>
  {/* Images are scaled and positioned automatically */}
  <img src="product.jpg" alt="Product" />
</CustomCardImageRow>
```

## Common Patterns

Here are some effective ways to combine Custom Card components:

### Product Display
```javascript
const ProductCard = ({ data }) => (
  <CustomCard>
    <CustomCardImageRow>
      <img src={data.image} alt={data.name} />
    </CustomCardImageRow>
    <CustomCardRow>
      <BaseText>{data.name}</BaseText>
      <SmallText>${data.price}</SmallText>
    </CustomCardRow>
  </CustomCard>
);
```

### Message with Actions
```javascript
const MessageCard = ({ data }) => (
  <CustomCard>
    <CustomCardRow>
      <BaseText>{data.message}</BaseText>
    </CustomCardRow>
    <CustomCardRow>
      <TextButton label="Accept" Icon={Check} onClick={data.onAccept} />
      <TextButton label="Decline" Icon={Close} onClick={data.onDecline} />
    </CustomCardRow>
  </CustomCard>
);
```

## Best Practices

For creating effective card layouts:

### Structure and Organization
Use a consistent internal structure for similar types of cards. Place the most important content at the top, followed by supporting details and actions.

### Content Flow
Organize content logically within cards. Use CustomCardRow for related items that should appear together, and separate distinct content sections into different rows.

### Visual Hierarchy
Combine text components effectively:
- Use BaseText for primary content
- Use SmallText for supporting details
- Group related information in the same CustomCardRow

### Responsive Design
Consider how cards will display at different screen sizes:
- Test scrolling behavior with various content lengths
- Ensure touch targets are large enough for mobile users
- Use appropriate image sizes in CustomCardImageRow

## Related Components
- [BaseText](/touchpoint-BaseText) for primary text content
- [SmallText](/touchpoint-SmallText) for supporting text
- [TextButton](/touchpoint-Buttons) for card actions
- [Icons](/touchpoint-Icons) for visual elements

For theme customization options, see the [Theming Documentation](/touchpoint-ui-themeing).