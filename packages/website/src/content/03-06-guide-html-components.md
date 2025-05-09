- [Best Practices and Limitations with HTML Templates](#best-practices-and-limitations-with-html-templates)
- [Basic Usage](#basic-usage)
- [Syntax Guidelines](#syntax-guidelines)
- [Example: Creating a Carousel](#example-creating-a-carousel)
- [Related Resources](#related-resources)

Touchpoint UI provides a powerful way to create components without requiring JSX transpilation or complex build systems through the `html` template literal tag. This approach, powered by the [htm](https://github.com/developit/htm) library, lets you build interactive components using familiar HTML syntax directly in JavaScript.

- **No Build Step Required**: Create components without JSX transpilation
- **Easy Integration**: Add to existing JavaScript codebases with minimal setup

## Best Practices and Limitations with HTML Templates

1. **Maintain proper nesting**: The template must have properly nested components and tags
2. **Use string interpolation for dynamic values**: `${expression}` for dynamic values
3. **Wrap nested components**: Use `${html`<Component>...</Component>`}` for nesting
4. **Keys for lists**: Always provide unique `key` props when mapping arrays
5. **Flow Control**: Cannot use JavaScript control flow (if/else, loops) directly in the template
6. **Verbose**: Slightly more verbose than JSX for complex nested structures

## Basic Usage

The `html` template literal tag allows you to write HTML-like syntax directly in JavaScript:

```javascript
import { html } from "@nlxai/touchpoint-ui";

const MyComponent = ({ data }) => {
  return html`<BaseText>Hello ${data.name}</BaseText>`;
};
```

## Syntax Guidelines

When using the `html` template tag, follow these patterns:

1. **Basic Component Rendering**:

   ```javascript
   html`<BaseText>Hello World</BaseText>`;
   ```

2. **Dynamic Content with Expressions**:

   ```javascript
   html`<BaseText>Hello ${userName}</BaseText>`;
   ```

3. **Component Nesting**:

   ```javascript
   html`<CustomCard>
     ${html`<BaseText>Nested content</BaseText>`}
   </CustomCard>`;
   ```

4. **Props and Attributes**:

   ```javascript
   html`<TextButton onClick=${handleClick}>
     Click me
   </TextButton>`;
   ```

5. **Rendering Arrays**:
   ```javascript
   html`${items.map(
       (item) => html`<BaseText key=${item.id}>${item.text}</BaseText>`,
     )}`;
   ```


## Example: Creating a Carousel

Here's an example of creating a carousel component with the `html` tag and leveraging  [React's state management](/guide-managing-selection)


```javascript
const CarouselExample = ({ data, conversationHandler }) => {
  const [selected, setSelected] = React.useState(null);

  return html`<Carousel>
    ${data.map(
      (cardData, cardIndex) =>
        html`<CustomCard
          key=${cardIndex}
          selected=${selected === cardIndex}
          onClick=${() => {
            setSelected(cardIndex);
            conversationHandler.sendChoice(cardData.id);
          }}
        >
          <CustomCardImageRow src=${cardData.imageUrl} alt="Product image" />
          <CustomCardRow
            left=${html`<BaseText>${cardData.name}</BaseText>`}
            right=${html`<BaseText>$${cardData.price}</BaseText>`}
          />
        </CustomCard>`,
    )}
  </Carousel>`;
};
```

## Related Resources

- [Touchpoint Components](/guide-building-custom-components) - Available components to use with HTML syntax
- [Building custom components](/guide-building-custom-components) - How to implement custom components
- [Advanced Theming](/touchpoint-ui-theming) - Styling your components
