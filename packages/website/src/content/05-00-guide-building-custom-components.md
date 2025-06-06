- [Modalities](#modalities)
- [Defining your Component](#defining-your-component)
- [Basic Component Structure](#basic-component-structure)
- [HTML Template Syntax](#html-template-syntax)
  - [How the `html` Template Tag Works](#how-the-html-template-tag-works)
  - [Accessing Components in HTML](#accessing-components-in-html)
  - [HTML vs JSX Quick Reference](#html-vs-jsx-quick-reference)
  - [Key Differences from JSX](#key-differences-from-jsx)
  - [Example Component in JSX and HTML](#example-component-in-jsx-and-html)
- [Managing State, Events, User Selection within Components](#managing-state-events-user-selection-within-components)
  - [useState in Touchpoint Components](#usestate-in-touchpoint-components)
  - [Event Handler Pattern](#event-handler-pattern)
- [Complete Carousel Example](#complete-carousel-example)
  - [JavaScript Example](#javascript-example)
  - [HTML Example](#html-example)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
  - [HTML-Specific Issues](#html-specific-issues)
  - [General Issues](#general-issues)

## Modalities

Touchpoint relies on [modalities](https://docs.studio.nlx.ai/1-build/resources/modalities) defined within the NLX application to send structured data from the NLX conversation flow to touchpoint. For each Modality defined in your conversational application that you wish to use with Touchpoint, you must create a component and explicitly enable that modality when creating your touchpoint instance.

## Defining your Component

Each component should accept an object with `data` and `conversationHandler` to access the conversation context sent from the NLX Application.

- `data`: Can be any type. It will match the schema set in the modality within NLX.
- `conversationHandler`: The [ConversationHandler](/headless-api-reference#interface-conversationhandler). Functions to access the conversational context and send data back to NLX.

Add the Component to the `customModalities` configuration option paired with the name of Modality in NLX. In the example below the [modality](https://docs.studio.nlx.ai/1-build/resources/modalities) is named "MyComponentModality".

## Basic Component Structure

Every custom component follows the same pattern. Here's a simple example in both JavaScript and HTML formats:

```touchpointui
const SimpleComponent = ({ data, conversationHandler }) => {
  return html`<BaseText>${data.message}</BaseText>`;
};

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  customModalities: {
    SimpleModality: SimpleComponent,
  },
});
```

## HTML Template Syntax

The `html` template literal tag allows you to create components without requiring JSX transpilation or build systems. This approach is powered by the [htm](https://github.com/developit/htm) library.

### How the `html` Template Tag Works

The `html` tag is a template literal function that:

- Parses HTML-like syntax at runtime
- Automatically imports all Touchpoint UI components

### Accessing Components in HTML

When using HTML, always destructure the components you need from `nlxai.touchpointUi`:

**HTML**

```javascript
const { html, React, Icons } = nlxai.touchpointUi;
```

This gives you access to:

- `html` - The template tag for creating components
- `React` - React utilities like useState
- `Icons` - All available icon components
- All other Touchpoint components (BaseText, CustomCard, etc.)

### HTML vs JSX Quick Reference

| Feature       | JSX                                           | HTML Template                         |
| ------------- | --------------------------------------------- | ------------------------------------- |
| Import        | `import { html } from "@nlxai/touchpoint-ui"` | `const { html } = nlxai.touchpointUi` |
| Component     | `<BaseText>Hello</BaseText>`                  | `html\`<BaseText>Hello</BaseText>\``  |
| Props         | `label="Click me"`                            | `label="Click me"`                    |
| Dynamic Props | `onClick={() => console.log()}`               | `onClick=${() => console.log()}`      |

### Key Differences from JSX

- No build step required
- Use `${}` for interpolation instead of `{}`
- Nested components require nested `html` templates
- All Touchpoint components are automatically available
- Ideal for adding components to existing JavaScript codebases

### Example Component in JSX and HTML

**JavaScript**

```javascript
import { React, BaseText, TextButton, Icons } from "@nlxai/touchpoint-ui";

const MyComponent = ({ data }) => (
  <>
    <BaseText>{data.title}</BaseText>
    <TextButton
      label="Click me"
      Icon={Icons.ArrowForward}
      onClick={() => console.log("Clicked!")}
    />
  </>
);
```

**HTML**

```html
<script>
  const MyComponent = ({ data }) => {
    const { html, Icons } = nlxai.touchpointUi;

    return html`
      <BaseText>${data.title}</BaseText>
      <TextButton
        label="Click me"
        Icon=${Icons.ArrowForward}
        onClick=${() => console.log("Clicked!")}
      />
    `;
  };
</script>
```

## Managing State, Events, User Selection within Components

Components often need to track state (like which item is selected) and handle user interactions (like clicks). Touchpoint provides React's state management and event handling patterns.

### useState in Touchpoint Components

`useState` returns an array with two elements:

1. The current state value
2. A function to update the state

When you call the update function, React will re-render the component with the new state value.

```touchpointui
const SelectableCard = ({ data, conversationHandler }) => {
  // Declare state variable with initial value of false
  const [isSelected, setIsSelected] = React.useState(false);

  return html`
    <CustomCard
      selected=${isSelected}
      onClick=${() => {
        // Update the state when clicked
        setIsSelected(true);
        // Send the selection to NLX
        conversationHandler.sendChoice(data.id);
      }}
    >
      <CustomCardRow
        left=${html`<BaseText faded>Status</BaseText>`}
        right=${html`<BaseText
          >${isSelected ? "Selected" : "Not Selected"}</BaseText
        >`}
      />
    </CustomCard>
  `;
};
```

### Event Handler Pattern

Always use arrow functions for event handlers in both JavaScript and HTML:

```js
// Correct - arrow function
onClick=${() => conversationHandler.sendChoice(data.id)}

// Incorrect - immediate execution
onClick=${conversationHandler.sendChoice(data.id)}
```

This ensures the function is called when the user clicks, not when the component renders.

## Complete Carousel Example

Here's a complete carousel implementation following the standard pattern with CustomCardImageRow at the top and faded labels:

```touchpointui
const ItemsCarousel = ({ data, conversationHandler }) => {
  // Track which item is selected
  const [selectedItemId, setSelectedItemId] = React.useState(null);

  return html`
    <Carousel>
      ${data.map(
        (item) => html`
          <CustomCard
            key=${item.id}
            selected=${item.id === selectedItemId}
            onClick=${() => {
              // Update selected state
              setSelectedItemId(item.id);
              // Send choice to NLX
              conversationHandler.sendChoice(item.id);
            }}
          >
            <!-- Image at the top -->
            <CustomCardImageRow src=${item.thumbnail} alt=${item.name} />

            <!-- Faded label on left, normal text on right -->
            <CustomCardRow
              left=${html`<BaseText faded>Name</BaseText>`}
              right=${html`<BaseText>${item.name}</BaseText>`}
            />

            <CustomCardRow
              left=${html`<BaseText faded>Price</BaseText>`}
              right=${html`<BaseText>${item.price}</BaseText>`}
            />

            <CustomCardRow
              left=${html`<BaseText faded>Status</BaseText>`}
              right=${html`<BaseText>${item.status}</BaseText>`}
            />
          </CustomCard>
        `,
      )}
    </Carousel>
  `;
};

// Register the component
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
  },
  customModalities: {
    ItemsCarouselModality: ItemsCarousel,
  },
});
```

## Troubleshooting Common Issues

### HTML-Specific Issues

**"nlxai is not defined"**

- **Cause**: Script running before Touchpoint UI loads
- **Solution**: Ensure the script tag has `defer` attribute and wrap code in `contentLoaded()`:

```html
<script
  defer
  src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"
></script>
<script>
  contentLoaded().then(() => {
    // Your code here
  });
</script>
```

**Components not rendering**

- **Cause**: Using JSX syntax instead of template syntax
- **Solution**: Use `${html`...`}` for nested components:

```javascript
// Wrong
left={<Carousel>...</Carousel>}

// Correct
left=${html`<Carousel>...</Carousel>`}
```

**"React.useState is not a function"**

- **Cause**: React not properly imported
- **Solution**: Destructure React from nlxai.touchpointUi:

```javascript
const { React } = nlxai.touchpointUi;
```

### General Issues

**Component receives undefined data**

- **Cause**: Modality schema doesn't match expected data structure
- **Solution**: Log the data to check structure. See [Subscribing to events](/guide-subscribing-to-events#example-use-case-reacting-to-modalities) for methods to check data outside components.

```touchpointui
const MyComponent = ({ data }) => {
  console.log("Received data:", data);
  // Component code
};
```

**Choice not sent to NLX**

- **Cause**: Missing or incorrect conversationHandler call
- **Solution**: Ensure you're calling the correct method. See [Sending Messages and Data](/touchpoint-ui-ConversationHandler#sending-messages-and-data) for more information.
-

```js
// For choices
conversationHandler.sendChoice(choiceId);

// For slots
conversationHandler.sendSlots({ slotName: value });
```

**React Version Mismatch Error**

- **Cause**: Importing React from the parent project instead of from the touchpoint-ui package
- **Solution**: Import React directly from the `"@nlx/touchpoint-ui"` package when using JSX to build custom components. This ensures that the components will be running in the same React context as the Touchpoint UI using the correct version of React.

```js
// React is available as React in touchpointui
const [state, setState] = React.useState(initialValue);
```
