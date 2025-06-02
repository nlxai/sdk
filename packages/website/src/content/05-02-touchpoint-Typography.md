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

**Javascript**

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

**HTML**

```html
<script defer src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
<script>
  const contentLoaded = () => {
    if (document.readyState === "loading") {
      return new Promise((resolve) => {
        window.addEventListener("DOMContentLoaded", () => {
          resolve();
        });
      });
    } else {
      return Promise.resolve();
    }
  };

  contentLoaded().then(() => {
    const { html } = nlxai.touchpointUi;

    const ProductDetails = ({ data, conversationHandler }) => {
      return html`
        <CustomCard>
          <CustomCardRow
            left=${<BaseText>${data.PrimaryInformation}</BaseText>}
            right=${<SmallText>${data.SecondaryInformation}</SmallText>}
          />
        </CustomCard>
      `;
    };

    // Register component when creating touchpoint
    return nlxai.touchpointUi.create({
      config: {
        applicationUrl: "YOUR_APPLICATION_URL",
        headers: { "nlx-api-key": "YOUR_API_KEY" },
        languageCode: "en-US",
      },
      customModalities: {
        ProductDetailsModality: ProductDetails,
      },
    });
  });
</script>
```

## Related Documents

- [CustomCards](/touchpoint-CustomCards)
- [Buttons](/touchpoint-Buttons)
- [Building Components without JSX](/guide-html-components)
