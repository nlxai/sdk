Touchpoint components work together with each other to create rich chat experiences. Touchpoint relies on [modalities](https://docs.studio.nlx.ai/1-build/resources/modalities) defined within the NLX application to send structured data from the NLX conversation flow to touchpoint. For each Modality defined in your conversational application that you wish to use with Touchpoint, you must create a component and explicitly enable that modality when creating your touchpoint instance.

## Building Custom Components

Basic context for custom components is available through the `data` and `handler` objects.

* `data`: Can be any type. It will match the schema set in the modality within NLX once set in the Node.
* `handler`: The [ConversationHandler](/headless-api-reference#interface-conversationhandler). Functions to access the conversational context and send data back to NLX.

Add the Component to the `customModalities` configuration option paired with the name of Modality in NLX. In the example below the [modality](https://docs.studio.nlx.ai/1-build/resources/modalities) is named "MyComponentModality".

### Basic Component Structure

```js
/**
 * @param {Object} props - The properties object.
 * @param {Object} props.data - The data object - Defined in NLX as a modality and set within the Node
 * @param {Function} props.handler - The ConversationHandler
 *
 * @returns {JSX.Element} The rendered component.
 */
const Component = ({data, handler}) => {
  const myComponent = ();
  return myComponent;
}

const touchpointOptions = {
  config: {
    botUrl: "YOUR_BOT_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US"
  },
  theme: {"fontFamily":"\"Neue Haas Grotesk\", sans-serif","accent":"#2663DA"},
  customModalities: {
    "MyComponentModality": Component,
  }
};

// Register components with specific modality keys
const touchpoint = create(touchpointOptions);
```

### Example Button Modality

Create a [modality](https://docs.studio.nlx.ai/1-build/resources/modalities) named `TextButtonExample` within NLX and attach to a User Choice Node. Then custom slots or a static data request to set any value for buttonLabel and buttonId for this example. 

```json
{
  "buttonLabel": "Label to be displayed on the button",
  "buttonId": "Id of the 'choice' to send back to NLX"
}
```

### Example Button Component

```js
import { create, TextButton } from '@nlxai/touchpoint-ui';
/**
 * MyFirstButtonComponent is a functional component that renders a TextButton with a label, icon, and click handler.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.data - The data object - Defined in NLX as a modality and set within the Node
 * @param {string} props.data.buttonLabel - Label to be displayed on the button
 * @param {string} props.data.buttonId - Id of the 'choice' to send back to NLX.
 * @param {Function} props.handler - The handler object that contains the function sendChoice to be called on button click
 *
 * @returns {JSX.Element} The rendered TextButton component.
 */
const MyFirstButtonComponent = ({data, handler}) => {
  const myTextButton = <TextButton
      label=${data.buttonLabel}
      Icon=${Icons.ArrowForward}
      onClick=${() => handler.sendChoice(data.buttonId)}
    />
  ); 
  return myTextButton;
}

const touchpointOptions = {
  config: {
    botUrl: "YOUR_BOT_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US"
  },
  theme: {"fontFamily":"\"Neue Haas Grotesk\", sans-serif","accent":"#2663DA"},
  customModalities: {
    "TextButtonExample": MyFirstButtonComponent,
  }
};

// Register components with specific modality keys
const touchpoint = create(touchpointOptions);
```

### Example CustomCard Modality


For example, a Modality named "ProductCard" with schema:

```json
{
  "name": "Product Name",
  "id": "Product UUID",
  "price": "Product Price",
  "productImageUrl": "Product Image URL"
}
```

### Example CustomCard Component


```javascript
import { create, CustomCard, BaseText, TextButton, SmallText } from '@nlxai/touchpoint-ui';


/**
 * ProductCardComponent is a React functional component that renders a custom card for a product.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.data - The data object containing product details.
 * @param {string} props.data.id - The unique identifier for the product.
 * @param {string} props.data.productImageUrl - The URL of the product image.
 * @param {string} props.data.name - The name of the product.
 * @param {string} props.data.price - The price of the product.
 * @param {Function} props.handler - The handler object with a sendChoice method.
 * 
 * @returns {JSX.Element} A custom card component displaying product details.
 */
const ProductCardComponent = ({ data, handler }) => {
  const [selected, setSelected] = React.useState(null);
  console.log(data);
  return (
  <CustomCard
      key="0"
      selected=${selected === 0}
      onClick={() => {
        setSelected(0);
        handler.sendChoice(data.id);
      }}
  >
    <CustomCardImageRow
      src=${data.productImageUrl}
      alt=${data.name}
    />
    <CustomCardRow
      left=${<BaseText>${data.name}</BaseText>}
      right=${<BaseText>${data.price}</BaseText>}
    />
  </CustomCard>
  );
};

const touchpointOptions = {
  config: {
    botUrl: "YOUR_BOT_URL",
    headers: {
      "nlx-api-key": "YOUR_API_KEY"
    },
    languageCode: "en-US"
  },
  theme: {"fontFamily":"\"Neue Haas Grotesk\", sans-serif","accent":"#2663DA"},
  customModalities: {
    "ProductCard": ProductCardComponent,
  }
};

// Register components with specific modality keys
const touchpoint = create(touchpointOptions);
```

## Component Categories

Touchpoint provides different types of components that work together:

- [Typography](/touchpoint-Typography) - Text components to create consistent text presentation:
- [Carousel & CustomCards](/touchpoint-CustomCards) - Structure your content with Card collections
- [Buttons](/touchpoint-Buttons) - Handle user actions with text or icon based buttons
- [Icons](/touchpoint-Icons) - Add graphical elements with consistent iconography
