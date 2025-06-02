- [Modalities](#modalities)
- [Defining your Component](#defining-your-component)
- [Basic Component Structure](#basic-component-structure)
- [HTML Template Syntax](#html-template-syntax)
  - [How the `html` Template Tag Works](#how-the-html-template-tag-works)
  - [Key Differences from JSX](#key-differences-from-jsx)
- [How useState Works for User Input](#how-usestate-works-for-user-input)
  - [useState in Touchpoint Components](#usestate-in-touchpoint-components)
- [Complete Carousel Example](#complete-carousel-example)
  - [JavaScript Example](#javascript-example)
  - [HTML Example](#html-example)
- [CustomCard Component Pattern](#customcard-component-pattern)


## Modalities

Touchpoint relies on [modalities](https://docs.studio.nlx.ai/1-build/resources/modalities) defined within the NLX application to send structured data from the NLX conversation flow to touchpoint. For each Modality defined in your conversational application that you wish to use with Touchpoint, you must create a component and explicitly enable that modality when creating your touchpoint instance.


## Defining your Component

Each component should accept an object with `data` and `conversationHandler` to access the conversation context sent from the NLX Application.

- `data`: Can be any type. It will match the schema set in the modality within NLX.
- `conversationHandler`: The [ConversationHandler](/headless-api-reference#interface-conversationhandler). Functions to access the conversational context and send data back to NLX.

Add the Component to the `customModalities` configuration option paired with the name of Modality in NLX. In the example below the [modality](https://docs.studio.nlx.ai/1-build/resources/modalities) is named "MyComponentModality".
## Basic Component Structure

Every custom component follows the same pattern. Here's a simple example in both JavaScript and HTML formats:

**JavaScript**
```javascript
import { create, BaseText } from "@nlxai/touchpoint-ui";

const SimpleComponent = ({ data, conversationHandler }) => {
  return <BaseText>{data.message}</BaseText>;
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
    const SimpleComponent = ({ data, conversationHandler }) => {
      return nlxai.touchpointUi.html`<BaseText>${data.message}</BaseText>`;
    };
    
    return nlxai.touchpointUi.create({
      config: {
        applicationUrl: "YOUR_APPLICATION_URL",
        headers: { "nlx-api-key": "YOUR_API_KEY" },
        languageCode: "en-US",
      },
      customModalities: {
        SimpleModality: SimpleComponent,
      },
    });
  });
</script>
```

## HTML Template Syntax

The `html` template literal tag allows you to create components without requiring JSX transpilation or build systems. This approach is powered by the [htm](https://github.com/developit/htm) library.

### How the `html` Template Tag Works

The `html` tag is a template literal function that:
1. Parses HTML-like syntax at runtime
2. Converts it into React elements
3. Handles interpolation of JavaScript expressions using `${}`
4. Automatically imports all Touchpoint UI components

**JavaScript**
```javascript
import { html, BaseText, Icons } from "@nlxai/touchpoint-ui";

const MyComponent = ({ data }) => {
  return html`
    <BaseText>${data.title}</BaseText>
    <TextButton 
      label="Click me" 
      Icon=${Icons.ArrowForward}
      onClick=${() => console.log('Clicked!')}
    />
  `;
};
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
        onClick=${() => console.log('Clicked!')}
      />
    `;
  };
</script>
```

### Key Differences from JSX

- No build step required
- Use `${}` for interpolation instead of `{}`
- All Touchpoint components are automatically available
- Ideal for adding components to existing JavaScript codebases

## How useState Works for User Input

`useState` returns an array with two elements:
1. The current state value
2. A function to update the state

When you call the update function, React will re-render the component with the new state value.

### useState in Touchpoint Components

Touchpoint provides React.useState for managing component state. Here's how it works:

**JavaScript**
```javascript
import { React, CustomCard, BaseText } from "@nlxai/touchpoint-ui";

const SelectableCard = ({ data, conversationHandler }) => {
  // Declare state variable with initial value of null
  const [isSelected, setIsSelected] = React.useState(false);
  
  return (
    <CustomCard
      selected={isSelected}
      onClick={() => {
        // Update the state when clicked
        setIsSelected(true);
        // Send the selection to NLX
        conversationHandler.sendChoice(data.id);
      }}
    >
      <CustomCardRow
        left={<BaseText faded>Status</BaseText>}
        right={<BaseText>{isSelected ? "Selected" : "Not Selected"}</BaseText>}
      />
    </CustomCard>
  );
};
```

**HTML**
```html
<script>
  const SelectableCard = ({ data, conversationHandler }) => {
    const { React, html, CustomCard, CustomCardRow, BaseText } = nlxai.touchpointUi;
    
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
          right=${html`<BaseText>${isSelected ? "Selected" : "Not Selected"}</BaseText>`}
        />
      </CustomCard>
    `;
  };
</script>
```

## Complete Carousel Example

Here's a complete carousel implementation following the standard pattern with CustomCardImageRow at the top and faded labels:

### JavaScript Example

```javascript
import {
  create,
  Carousel,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
  BaseText,
  React,
} from "@nlxai/touchpoint-ui";

const ItemsCarousel = ({ data, conversationHandler }) => {
  // Track which item is selected
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  
  return (
    <Carousel>
      {data.map((item) => (
        <CustomCard
          key={item.id}
          selected={item.id === selectedItemId}
          onClick={() => {
            // Update selected state
            setSelectedItemId(item.id);
            // Send choice to NLX
            conversationHandler.sendChoice(item.id);
          }}
        >
          {/* Image at the top */}
          <CustomCardImageRow src={item.thumbnail} alt={item.name} />
          
          {/* Faded label on left, normal text on right */}
          <CustomCardRow
            left={<BaseText faded>Name</BaseText>}
            right={<BaseText>{item.name}</BaseText>}
          />
          
          <CustomCardRow
            left={<BaseText faded>Price</BaseText>}
            right={<BaseText>{item.price}</BaseText>}
          />
          
          <CustomCardRow
            left={<BaseText faded>Status</BaseText>}
            right={<BaseText>{item.status}</BaseText>}
          />
        </CustomCard>
      ))}
    </Carousel>
  );
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

### HTML Example

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
    const ItemsCarousel = ({ data, conversationHandler }) => {
      const { html, React } = nlxai.touchpointUi;
      
      // Track which item is selected
      const [selectedItemId, setSelectedItemId] = React.useState(null);
      
      return html`
        <Carousel>
          ${data.map((item) => html`
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
          `)}
        </Carousel>
      `;
    };
    
    // Register the component
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

## CustomCard Component Pattern

The standard CustomCard pattern includes:

1. **CustomCardImageRow** at the top (optional)
2. **CustomCardRow** elements with:
   - Left side: Faded BaseText for labels
   - Right side: Normal BaseText for values
3. **Selection state** managed with React.useState
4. **onClick handler** that updates state and sends choice to NLX

This pattern provides a consistent, professional appearance across all card-based components in your Touchpoint UI.