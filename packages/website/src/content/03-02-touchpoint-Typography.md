
Touchpoint provides two typography elements, BaseText and SmallText, to provide consistent styling and theme integration for text within Custom Components.

* **BaseText** - Primary text component in Touchpoint, used for main content, titles, and important information. 
* **SmallText** - Styling for secondary and supporting information in your interface. It uses reduced size and opacity to create visual hierarchy with BaseText.

## Import and Basic Usage

You can import the typography elements from touchpoint once the package has been installed or made available in your project. 

The following examples use both the BaseText and SmallText typography components to construct a [CustomCard](/touchpoint-CustomCards) with the "primary" (BaseText) information left aligned and "secondary" (SmallText) right aligned.

### Import using `<script>`

Import the elements via `html` from Touchpoint. Useful when adding touchpoint to your project via `<script>`.

```html
<script src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
<script>
  const { html } = nlxai.touchpointUi;
  const ProductDetails = ({data, conversationHandler}) => {
    return html`
    <CustomCard>
      <CustomCardRow
        left=${html`<BaseText>${data.PrimaryInformation}</BaseText>`}
        right=${html`<SmallText>${data.SecondaryInformation}</SmallText>`}
      />
    </CustomCard>`; 
  };
</script>
```

### Import using `import`

Import the elements to your project using import statements.

```javascript
import { BaseText, SmallText, CustomCard, CustomCardRow } from '@nlxai/touchpoint-ui';
const ProductDetails = ({data, conversationHandler}) => {
  return (
  <CustomCard>
    <CustomCardRow
      left={<BaseText>{data.PrimaryInformation}</BaseText>}
      right={<SmallText>{data.SecondaryInformation}</SmallText>}
    />
  </CustomCard>); 
};
```

## Related Components
- [CustomCards](/touchpoint-CustomCards) 
- [Buttons](/touchpoint-Buttons)
