# Touchpoint

Touchpoint UI provides a customizable chat interface that you can embed in your web applications. Touchpoint UI allows users to interact with your application and provides a seamless conversational experience.

```bash
npm i --save @nlxai/touchpoint-ui
```

```js
import { create } from "@nlxai/touchpoint-ui";

const touchpoint = await create({
  config: {
    applicationUrl: "REPLACE_WITH_APPLICATION_URL",
    headers: {
      "nlx-api-key": "REPLACE_WITH_API_KEY",
    },
    languageCode: "en-US",
    userId: "REPLACE_WITH_USER_ID",
  },
  colorMode: "light",
  input: "voice",
  theme: { fontFamily: '"Neue Haas Grotesk", sans-serif', accent: "#AECAFF" },
});
```

<!-- include docs/README.md -->
## Basics

### create()

```ts
function create(props): Promise<TouchpointInstance>;
```

Creates a new Touchpoint UI instance and appends it to the document body

#### Parameters

##### props

[`TouchpointConfiguration`](#touchpointconfiguration)

Configuration props for Touchpoint

#### Returns

`Promise`\<[`TouchpointInstance`](#touchpointinstance)\>

A promise that resolves to a TouchpointInstance

---

### TouchpointConfiguration

Main Touchpoint creation properties object

#### Properties

##### config

```ts
config: Config;
```

Connection information for the @nlxai/core conversation handler

##### windowSize?

```ts
optional windowSize: "full" | "half";
```

Optional window size for the chat window, defaults to `half`

##### colorMode?

```ts
optional colorMode: "dark" | "light" | "light dark";
```

Optional color mode for the chat window, defaults to `dark`. Setting `light dark` enables automatic switching based on system settings.

##### brandIcon?

```ts
optional brandIcon: string;
```

URL of icon used to display the brand in the chat header

##### animate?

```ts
optional animate: boolean;
```

Include border animation. Currently only supported in Voice Mini.

##### launchIcon?

```ts
optional launchIcon:
  | string
  | boolean
  |
  | ComponentClass<{
  className?: string;
  onClick?: () => void;
}, any>
  | FunctionComponent<{
  className?: string;
  onClick?: () => void;
}>;
```

URL of icon used on the launch icon in the bottom right when the experience is collapsed.

When set to `false`, no launch button is shown at all. When not set or set to `true`, the default launch icon is rendered.

##### userMessageBubble?

```ts
optional userMessageBubble: boolean;
```

Specifies whether the user message has bubbles or not

##### agentMessageBubble?

```ts
optional agentMessageBubble: boolean;
```

Specifies whether the agent message has bubbles or not

##### chatMode?

```ts
optional chatMode: boolean;
```

Enables chat mode, a classic chat experience with inline loaders and the chat history visible at all times.

##### theme?

```ts
optional theme: Partial<Theme>;
```

Optional theme object to override default theme values

##### modalityComponents?

```ts
optional modalityComponents: Record<string, CustomModalityComponent<unknown>>;
```

Optional [custom modality components](#custommodalitycomponent) to render in Touchpoint

##### initializeConversation()?

```ts
optional initializeConversation: (handler, context?) => void;
```

Custom conversation init method. Defaults to sending the welcome flow.

###### Parameters

###### handler

`ConversationHandler`

the conversation handler.

###### context?

`Context`

the context object

###### Returns

`void`

##### input?

```ts
optional input: "text" | "voice" | "voiceMini";
```

Controls the ways in which the user can communicate with the application. Defaults to `"text"`

##### initialContext?

```ts
optional initialContext: Context;
```

Context sent with the initial request.

##### bidirectional?

```ts
optional bidirectional: BidirectionalConfig;
```

Enables bidirectional mode of voice+. Will automatically set the bidirectional flag in the config.

---

### TouchpointInstance

Instance of a Touchpoint UI component

#### Properties

##### expanded

```ts
expanded: boolean;
```

Controls whether the Touchpoint UI is expanded or collapsed

##### conversationHandler

```ts
conversationHandler: ConversationHandler;
```

The conversation handler instance for interacting with the application

##### teardown()

```ts
teardown: () => void;
```

Method to remove the Touchpoint UI from the DOM

###### Returns

`void`

##### setCustomBidirectionalCommands()

```ts
setCustomBidirectionalCommands: (commands) => void;
```

Sets currently available custom bidirectional commands.
This allows you to define custom commands that can be used in the voice bot.
The commands will be available in the voice bot and can be used to trigger actions.

Example:

```javascript
client.setCustomBidirectionalCommands([
  {
    action: "Meal",
    description: "add a meal to your flight",
    schema: {
      enum: ["standard", "vegetarian", "vegan", "gluten-free"],
    },
    handler: (value) => {
      console.log("Meal option:", value);
    },
  },
]);
```

This will allow the voice bot to use the command `Meal` with the value `standard`, `vegetarian`, `vegan`, or `gluten-free`.

When using more complex arguments, a library such as [Zod](https://zod.dev) can be useful:

```javascript
import * as z from "zod/v4";

const schema = z.object({
  name: z.string().describe("The customer's name, such as John Doe"),
  email: z.string().email().describe("The customer's email address"),
});

client.setCustomBidirectionalCommands([
  {
    action: "Meal",
    description: "add a meal to your flight",
    schema: z.toJSONSchema(schema, { io: "input" }),
    handler: (value) => {
      const result = z.safeParse(schema, value);
      if (result.success) {
        // result.data is now type safe and TypeScript can reason about it
        console.log("Meal option:", result.data);
      } else {
        console.error("Failed to parse Meal option:", result.error);
      }
    },
  },
]);
```

###### Parameters

###### commands

[`BidirectionalCustomCommand`](#bidirectionalcustomcommand)[]

A list containing the custom commands to set.

###### Returns

`void`

## Theming

### Theme

The full theme expressed as CSS custom properties.
This means that for instance colors can be made to switch automatically based on the system color mode by using the `light-dark()` CSS function.
Note also that not all colors need to be provided manually. For instance if only `primary80` is provided, the rest of the primary colors will be computed automatically based on it.
Therefore, for a fully custom but minimal theme, you only need to provide `accent`, `primary80`, `secondary80`, `background`, `overlay`, and potentially the warning and error colors.

#### Example

```typescript
const theme: Partial<Theme> = {
  primary80: "light-dark(rgba(0, 2, 9, 0.8), rgba(255, 255, 255, 0.8))",
  secondary80: "light-dark(rgba(255, 255, 255, 0.8), rgba(0, 2, 9, 0.8))",
  accent: "light-dark(rgb(28, 99, 218), rgb(174, 202, 255))",
  background: "light-dark(rgba(220, 220, 220, 0.9), rgba(0, 2, 9, 0.9))",
};
```

#### Properties

##### fontFamily

```ts
fontFamily: string;
```

Font family

##### primary80

```ts
primary80: string;
```

Primary color with 80% opacity

##### primary60

```ts
primary60: string;
```

Primary color with 60% opacity

##### primary40

```ts
primary40: string;
```

Primary color with 40% opacity

##### primary20

```ts
primary20: string;
```

Primary color with 20% opacity

##### primary10

```ts
primary10: string;
```

Primary color with 10% opacity

##### primary5

```ts
primary5: string;
```

Primary color with 5% opacity

##### primary1

```ts
primary1: string;
```

Primary color with 1% opacity

##### secondary80

```ts
secondary80: string;
```

Secondary color with 80% opacity

##### secondary60

```ts
secondary60: string;
```

Secondary color with 60% opacity

##### secondary40

```ts
secondary40: string;
```

Secondary color with 40% opacity

##### secondary20

```ts
secondary20: string;
```

Secondary color with 20% opacity

##### secondary10

```ts
secondary10: string;
```

Secondary color with 10% opacity

##### secondary5

```ts
secondary5: string;
```

Secondary color with 5% opacity

##### secondary1

```ts
secondary1: string;
```

Secondary color with 1% opacity

##### accent

```ts
accent: string;
```

Accent color used e.g. for prominent buttons, the loader animation as well as selected card outlines

##### accent20

```ts
accent20: string;
```

Accent color with 20% opacity

##### background

```ts
background: string;
```

The background color of the main Touchpoint interface

##### overlay

```ts
overlay: string;
```

The color of the overlay covering the visible portion of the website when the Touchpoint interface does not cover the full screen

##### warningPrimary

```ts
warningPrimary: string;
```

Primary warning color

##### warningSecondary

```ts
warningSecondary: string;
```

Secondary warning color

##### errorPrimary

```ts
errorPrimary: string;
```

Primary error color

##### errorSecondary

```ts
errorSecondary: string;
```

Secondary error color

##### innerBorderRadius

```ts
innerBorderRadius: string;
```

Inner border radius: used for most buttons

##### outerBorderRadius

```ts
outerBorderRadius: string;
```

Outer border radius: generally used for elements that contain buttons that have inner border radius. Also used by the launch button.

## Modality components

### Ripple

```ts
const Ripple: FC<{
  className?: string;
  style?: CSSProperties;
}>;
```

A ripple effect composed of expanding circles.

---

### Carousel

```ts
const Carousel: FC<{
  className?: string;
  children?: ReactNode;
}>;
```

Renders a carousel of cards.

#### Example

```tsx
import {
  Carousel,
  CustomCard,
  CustomCardImageRow,
  React,
} from "@nlx/touchpoint-ui";

const MyCarousel = ({ data }) => (
  <Carousel>
    {data.map((item) => (
      <CustomCard key={item.id}>
        <CustomCardImageRow src={item.image} alt={item.description} />
      </CustomCard>
    ))}
  </Carousel>
);
```

---

### CustomCard

```ts
const CustomCard: FC<{
  className?: string;
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  href?: string;
  newTab?: boolean;
}>;
```

A customizable card component that can function as a button or link.

#### Example

```tsx
import {
  CustomCard,
  CustomCardImageRow,
  CustomCardRow,
  React,
} from "@nlx/touchpoint-ui";

const MyCard = ({ data }) => (
  <CustomCard selected={data.active} onClick={() => alert("Card clicked!")}>
    <CustomCardImageRow
      src="https://example.com/image.jpg"
      alt="Example Image"
    />
    <CustomCardRow
      left={<div>Left Content</div>}
      right={<div>Right Content</div>}
      icon={MyIcon}
    />
  </CustomCard>
);
```

---

### CustomCardImageRow

```ts
const CustomCardImageRow: FC<{
  src: string;
  alt?: string;
}>;
```

A row within a CustomCard that displays an image.

---

### CustomCardRow

```ts
const CustomCardRow: FC<{
  left: ReactNode;
  right: ReactNode;
  icon?: Icon;
}>;
```

A row within a CustomCard that displays left and right content, with an optional centered icon.

#### Example

```tsx
import { CustomCardRow, Icons, BaseText, React } from "@nlx/touchpoint-ui";

const MyCardRow = () => (
  <CustomCardRow
    left={<BaseText>Left Content</BaseText>}
    right={<BaseText>Right Content</BaseText>}
    icon={Icons.ArrowRight}
  />
);
```

---

### DateInput

```ts
const DateInput: FC<{
  onSubmit?: (date) => void;
  className?: string;
}>;
```

A date input

#### Example

```tsx
import { DateInput, React } from "@nlx/touchpoint-ui";

const MyDateInput = ({ conversationHandler }) => (
  <DateInput
    onSubmit={(date) => conversationHandler.sendContext({ myDate: date })}
  />
);
```

---

### IconButtonType

```ts
type IconButtonType =
  | "main"
  | "ghost"
  | "activated"
  | "coverup"
  | "error"
  | "overlay";
```

Represents the different types of icon buttons available in the application.

- `main`: The primary icon button.
- `ghost`: A transparent or less prominent icon button.
- `activated`: An icon button that indicates an active state.
- `coverup`: An icon button used to cover up or mask something.
- `overlay`: An icon button that appears over other content.

---

### IconButton

```ts
const IconButton: FC<{
  onClick?: () => void;
  label: string;
  className?: string;
  type: IconButtonType;
  Icon: FC<IconProps>;
}>;
```

A button showing only an icon (textual label is provided for accessibility)

#### Example

```tsx
import { IconButton, Icons, React } from "@nlx/touchpoint-ui";

const MyIconButton = () => (
  <IconButton
    label="Send message"
    onClick={() => alert("Icon button clicked!")}
    type="main"
    Icon={Icons.ArrowForward}
  />
);
```

---

### TextButton

```ts
const TextButton: FC<{
  onClick?: () => void;
  label: string;
  className?: string;
  type?: "main" | "ghost";
  Icon: FC<IconProps>;
}>;
```

A button with a visible textual label

#### Example

```tsx
import { TextButton, ArrowForward, React } from "@nlx/touchpoint-ui";

const MyTextButton = ({ onClickHandler }) => (
  <TextButton onClick={onClickHandler} label="Continue" />
);
```

---

### BaseText

```ts
const BaseText: FC<{
  children: ReactNode;
  faded?: boolean;
  className?: string;
}>;
```

Standard text component with base typography styles applied.

#### Example

```tsx
import { BaseText, React } from "@nlx/touchpoint-ui";

const MyText = () => <BaseText faded>This is some standard text.</BaseText>;
```

---

### SmallText

```ts
const SmallText: FC<{
  children: ReactNode;
  className?: string;
}>;
```

Small text component with smaller typography styles applied.

---

### html()

```ts
const html: (strings, ...values) => unknown;
```

A tagged literal for creating reactive elements for custom modalities.
It already knows about all Touchpoint UI components, so you can use them directly without the need to import them.
Also very useful when using Touchpoint directly from CDN or in projects without a build step.

#### Parameters

##### strings

`TemplateStringsArray`

##### values

...`any`[]

#### Returns

`unknown`

#### Example

```ts
import { html, Icons } from "@nlx/touchpoint-ui";

const MyCustomModality = ({ data, conversationHandler }) =>
  html`<div style="display: flex; gap: 8px;">
    <IconButton
      label="Cancel"
      Icon=${Icons.Close}
      type="ghost"
      onClick=${cancel()}
    />
    <TextButton
      label="Submit"
      Icon=${Icons.ArrowForward}
      type="main"
      onClick=${() => conversationHandler.sendText("Button clicked!")}
    />
  </div>`;
```

---

### CustomModalityComponent

```ts
type CustomModalityComponent<Data> = ComponentType<{
  data: Data;
  conversationHandler: ConversationHandler;
  className?: string;
}>;
```

Custom Modalities allow rendering of rich user interfaces directly inside a conversation.
A custom modality component is a React component. It will receive the modality data as a
`data` prop, along with the conversation handler instance to interact with the conversation as
`conversationHandler` prop.

#### Type Parameters

##### Data

`Data`

The type of the modality being rendered by this component.

## Bidirectional Voice+

### InteractiveElementInfo

Accessibility information with ID

#### Indexable

```ts
[key: string]: any
```

#### Properties

##### id

```ts
id: string;
```

Form element ID (assigned by the analysis logic, not necessarily equal to the DOM ID)

---

### PageForms

Page forms with elements

#### Properties

##### context

```ts
context: InteractiveElementInfo[];
```

Page context

##### formElements

```ts
formElements: Record<string, Element>;
```

Form element references

---

### analyzePageForms()

```ts
function analyzePageForms(): PageForms;
```

Analyze page forms

#### Returns

[`PageForms`](#pageforms)

Context and state about all the form elements detected on the page using accessibility APIs.

---

### PageState

Internal state that the automatic context maintains.

#### Properties

##### formElements

```ts
formElements: Record<string, Element>;
```

Mapping from form element IDs to their DOM elements

##### links

```ts
links: Record<string, string>;
```

Mapping from link element names to their URLs

##### customCommands

```ts
customCommands: Map<string, (arg) => void>;
```

Mapping from custom commands to their handlers

---

### BidirectionalContext

Bidirectional context information that is sent to the LLM.

#### Properties

##### uri?

```ts
optional uri: string;
```

Identifier for which page you are currently on. This can be used to filter the relevant KB pages.

##### fields?

```ts
optional fields: InteractiveElementInfo[];
```

The active form fields that can be filled in.

##### destinations?

```ts
optional destinations: string[];
```

Human readable location names that can be navigated to.

##### actions?

```ts
optional actions: object[];
```

Custom actions that can be performed.

###### action

```ts
action: string;
```

The name of the command, used to invoke it.

###### description?

```ts
optional description: string;
```

A short description of the command

###### schema?

```ts
optional schema: any;
```

A schema for validating the command's input. Should follow the JSON Schema specification.

---

### BidirectionalConfig

```ts
type BidirectionalConfig =
  | {
      automaticContext?: true;
      navigation?: (action, destination, destinations) => void;
      input?: (fields, pageFields) => void;
      custom?: (action, payload) => void;
      customizeAutomaticContext?: (arg) => object;
    }
  | {
      automaticContext: false;
      navigation?: (action, destination?) => void;
      input?: (fields) => void;
      custom?: (action, payload) => void;
    };
```

Configuration for bidirectional mode of voice+.

#### Type Declaration

```ts
{
  automaticContext?: true;
  navigation?: (action, destination, destinations) => void;
  input?: (fields, pageFields) => void;
  custom?: (action, payload) => void;
  customizeAutomaticContext?: (arg) => object;
}
```

##### automaticContext?

```ts
optional automaticContext: true;
```

Attempt to gather and send page context automatically. This will work well on semantically coded pages without too many custom form controls.
This enables a number of automatic features.

Defaults to `true`.

##### navigation()?

```ts
optional navigation: (action, destination, destinations) => void;
```

Navigation handler for bidirectional mode.

The default implementation will navigate to those pages using standard `window.location` APIs.

###### Parameters

###### action

The navigation action to perform.

`"page_next"` | `"page_previous"` | `"page_custom"` | `"page_unknown"`

###### destination

The name of the destination to navigate to if `action` is `"page_custom"`.

`string` | `undefined`

###### destinations

`Record`\<`string`, `string`\>

A map of destination names to URLs for custom navigation.

###### Returns

`void`

##### input()?

```ts
optional input: (fields, pageFields) => void;
```

A callback for filling out form fields in bidirectional mode.

The default implementation will fill out the form fields using standard DOM APIs.

###### Parameters

###### fields

`object`[]

An array of field objects with `id` and `value` properties.

###### pageFields

`Record`\<`string`, `Element`\>

A map of field IDs to DOM elements for custom form filling.

###### Returns

`void`

##### ~~custom()?~~

```ts
optional custom: (action, payload) => void;
```

A callback for custom actions in bidirectional mode.

###### Parameters

###### action

`string`

The custom name of your action.

###### payload

`unknown`

The payload defined for the custom action.

###### Returns

`void`

###### Deprecated

Use [TouchpointInstance.setCustomBidirectionalCommands](#setcustombidirectionalcommands) instead.

##### customizeAutomaticContext()?

```ts
optional customizeAutomaticContext: (arg) => object;
```

A callback for customizing the automatic context gathering.

This allows you to modify the context and state before they are sent to the LLM.

###### Parameters

###### arg

###### context

[`BidirectionalContext`](#bidirectionalcontext)

###### state

[`PageState`](#pagestate)

###### Returns

The modified context and state. If the state is identical to the previous state, the call to the server will be skipped.

###### context

```ts
context: BidirectionalContext;
```

The current context being sent to the LLM

###### state

```ts
state: PageState;
```

The current state of the page - this is stuff not sent to the LLM, but needed to connect the results back to actions to take on the page.

```ts
{
  automaticContext: false;
  navigation?: (action, destination?) => void;
  input?: (fields) => void;
  custom?: (action, payload) => void;
}
```

##### automaticContext

```ts
automaticContext: false;
```

Disable gathering page context automatically.

##### navigation()?

```ts
optional navigation: (action, destination?) => void;
```

Navigation handler for bidirectional mode. Without automatic context there is no default implementation.

###### Parameters

###### action

The navigation action to perform.

`"page_next"` | `"page_previous"` | `"page_custom"` | `"page_unknown"`

###### destination?

`string`

The name of the destination to navigate to if `action` is `"page_custom"`.

###### Returns

`void`

##### input()?

```ts
optional input: (fields) => void;
```

A callback for filling out form fields in bidirectional mode. Without automatic context there is no default implementation.

###### Parameters

###### fields

`object`[]

An array of field objects with `id` and `value` properties.

###### Returns

`void`

##### custom()?

```ts
optional custom: (action, payload) => void;
```

A callback for custom actions in bidirectional mode.

###### Parameters

###### action

`string`

The custom name of your action.

###### payload

`unknown`

The payload defined for the custom action.

###### Returns

`void`

---

### BidirectionalCustomCommand

During a Voice+ bidirectional conversation, you can indicate to the application the availability of
custom commands that the user can invoke.

#### Properties

##### action

```ts
action: string;
```

The name of the command, used to invoke it. Should be unique and descriptive in the context of the LLM.

##### description?

```ts
optional description: string;
```

A short description of the command, used to help the LLM understand its purpose.

If omitted, then the command will not be sent to the application and must be triggered
from the application side.

##### schema?

```ts
optional schema: any;
```

A JSON Schema that defines the structure of the command's input.

Use descriptive names and `description` fields to give the underlying LLM plenty of context for
it to generate reasonable parameters. Note that the LLM output will be validated (and transformed)
with this schema, so you are guaranteed type safe inputs to your handler.

Should follow the JSONSchema specification.

##### handler()

```ts
handler: (value) => void;
```

A handler that will be called with an argument matching the schema when the command is invoked.

###### Parameters

###### value

`any`

###### Returns

`void`

## Other

- [Icons](@nlxai/namespaces/Icons.md)

## Utilities

### version

```ts
const version: string = packageJson.version;
```

Package version

<!-- /include -->

## Embedded mode

Touchpoint UI also registers a custom element called `<nlx-touchpoint>`, which you can include in your UI. This element has a writeable property `touchpointConfiguration` that accepts the same input as [`create`](#create).

This start touchpoint in embedded mode, in which there is no open button and touchpoint will follow whatever layout you give it, making it easier to integrate into various awkward situations.

Since it is a custom element, it by default isn't a block element, so you may want to give it:

```css
nlx-touchpoint {
  display: block;
  height: 100%;
}
```

or similar styling.
