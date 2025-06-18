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

```touchpointui
const ProductDetails = ({ data, conversationHandler }) => {
  return html`
    <CustomCard>
      <CustomCardRow
        left=${html`<BaseText>${data.PrimaryInformation}</BaseText>`}
        right=${html`<SmallText>${data.SecondaryInformation}</SmallText>`}
      />
    </CustomCard>
  `;
};

// Register component when creating touchpoint
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  customModalities: {
    ProductDetailsModality: ProductDetails,
  },
});
```

## Related Documents

- [CustomCards](/touchpoint-CustomCards)
- [Buttons](/touchpoint-Buttons)
