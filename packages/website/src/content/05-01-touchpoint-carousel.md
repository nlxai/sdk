- [About](#about)
- [Properties](#properties)
  - [Carousel Properties](#carousel-properties)
- [Import and Basic Usage](#import-and-basic-usage)
  - [Define onClick](#define-onclick)
- [Example](#example)
  - [Example Modality Schema](#example-modality-schema)
  - [Example Carousel Component](#example-carousel-component)
- [Related Components](#related-components)

<img src="/images/Touchpoint-Carousel.png" alt="Carousel Rendered Example" style="max-width: 40%;">

## About

The Carousel component provides a horizontally scrollable container for displaying multiple cards or items. It's designed to work seamlessly with CustomCard components to create interactive, scrollable content galleries.

## Properties

### Carousel Properties

The Carousel component accepts these properties:

| Property | Type      | Required | Description                                |
| -------- | --------- | -------- | ------------------------------------------ |
| children | ReactNode | Yes      | Content to be rendered inside the carousel |

## Import and Basic Usage

You can import the Carousel component from touchpoint once the package has been installed or made available in your project.

### Define onClick

When using Carousel with CustomCard components, define click handlers on the individual cards to handle user interactions. The Carousel itself is a container component.

Access the [ConversationHandler](/headless-api-reference#interface-conversationhandler) method `sendChoice` via `conversationHandler.sendChoice` to send the user's choice back to NLX.

Read more details about building Custom Components with Touchpoint in the [Getting started with Touchpoint components](/guide-building-custom-components) documentation page.

## Example

The Carousel component is best used with multiple CustomCard components to create a scrollable interface.

### Example Modality Schema

```json
[
  {
    "id": "uuid",
    "thumbnail": "imageUrl",
    "label": "Label text",
    "value": "Value text"
  }
]
```

### Example Carousel Component

**Javascript**

```javascript
import {
  Carousel,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
  BaseText,
  React,
} from "@nlxai/touchpoint-ui";

const ItemsCarousel = ({ data, conversationHandler }) => {
  const [selectedItemId, setSelectedItemId] = React.useState(null);

  return (
    <Carousel>
      {data.map((item) => (
        <CustomCard
          key={item.id}
          selected={item.id === selectedItemId}
          onClick={() => {
            setSelectedItemId(item.id);
            conversationHandler.sendChoice(item.id);
          }}
        >
          <CustomCardImageRow src={item.thumbnail} alt="Image" />
          <CustomCardRow
            left={<BaseText faded>Label</BaseText>}
            right={<BaseText>Value</BaseText>}
          />
          <CustomCardRow
            left={<BaseText faded>Label</BaseText>}
            right={<BaseText>Value</BaseText>}
          />
        </CustomCard>
      ))}
    </Carousel>
  );
};
```

**HTML**

```html
<script
  defer
  src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"
></script>
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
    const { html, React } = nlxai.touchpointUi;

    const ItemsCarousel = ({ data, conversationHandler }) => {
      const [selectedItemId, setSelectedItemId] = React.useState(null);

      return html`
        <Carousel>
          ${data.map(
            (item) => html`
              <CustomCard
                key=${item.id}
                selected=${item.id === selectedItemId}
                onClick=${() => {
                  setSelectedItemId(item.id);
                  conversationHandler.sendChoice(item.id);
                }}
              >
                <CustomCardImageRow src=${item.thumbnail} alt="Image" />
                <CustomCardRow
                  left=${html`<BaseText faded>Label</BaseText>`}
                  right=${html`<BaseText>Value</BaseText>`}
                />
                <CustomCardRow
                  left=${html`<BaseText faded>Label</BaseText>`}
                  right=${html`<BaseText>Value</BaseText>`}
                />
              </CustomCard>
            `,
          )}
        </Carousel>
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
        ItemsCarouselModality: ItemsCarousel,
      },
    });
  });
</script>
```

## Related Components

- [Custom Cards](/touchpoint-CustomCards) for card components used within carousels
- [Typography](/touchpoint-Typography) for text styling within cards
- [Icons](/touchpoint-Icons) for visual elements in cards
- [Building Components without JSX](/guide-html-components)
