
Touchpoint components work together with each other to create rich chat experiences. Touchpoint relies on [modalities](https://docs.studio.nlx.ai/1-build/resources/modalities) defined within the NLX application to send structured data from the NLX conversation flow to touchpoint. For each Modality defined in your conversational application that you wish to use with Touchpoint, you must create a component and explicitly enable that modality when creating your touchpoint instance.

Remember! Start Small - create a simple component first with a simple Modality schema in order to understand how data flows between touchpoint and NLX before building larger components.

### For User Input Components

All end-user input requests (button, card, date, etc...) must send the user-input back to NLX to continue the conversation. Touchpoint provides the `useTouchpointContext` function to access the [ConversationHandler](/headless-api-reference#interfacesconversationhandlermd) which contains the methods to send information back to NLX. 

## Understanding customModalities

When your bot sends a message with a specific modality, Touchpoint renders your corresponding component. This connection happens through the customModalities configuration.

For example, a Modality named "ProductCard" with schema: 

```json
{
  "name": "Product Name",
  "id": "Product UUID",
  "price": "Product Price"
}
```

Could be rendered as a [CustomCard](/touchpoint-CustomCards) within the conversation.

```javascript
import { create, CustomCard, BaseText, TextButton, useTouchpointContext, SmallText } from '@nlxai/touchpoint-ui';
// Get the ConversationHandler to sendChoice back to NLX
const { handler } = useTouchpointContext();

// Your component receives data that matches the schema define in the Modality
const ProductCardComponent = ({ data }) => (
  <CustomCard>
    <CustomCardRow
      left = {<BaseText>{data.name}</BaseText>}
      right = {<SmallText>{data.price}</SmallText>}
    />
    <CustomCardRow
      {<TextButton 
        label="Buy Now" 
        onClick={() => handler.sendChoice(data.id)}
      />}
    />
  </CustomCard>
);

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