# Configuration Options

## Required Fields

| Field                           | Type   | Description                       |
|---------------------------------|--------|-----------------------------------|
| `config.applicationUrl`         | string | The URL endpoint for your NLX bot |
| `config.headers["nlx-api-key"]` | string | Your NLX API key                  |

## Core Optional Fields

| Field                 | Type              | Default                               | Description                                                   |
|-----------------------|-------------------|---------------------------------------|---------------------------------------------------------------|
| `config.languageCode` | string            | "en-US"                               | The language code for the chat interface                      |
| `windowSize`          | "half" \| "full"  | "half"                                | Controls whether the chat window takes up half or full screen |
| `colorMode`           | "light" \| "dark" | "dark"                                | Sets the color theme of the widget                            |
| `brandIcon`           | string            | undefined                             | URL for your brand icon in the chat header                    |
| `launchIcon`          | string            | undefined                             | URL for the icon shown on the launch button                   |
| `theme`               | Theme             | See [Theming](/touchpoint-ui-theming) | Custom theme configuration                                    |

## Component Configuration

The `customModalities` field connects your custom components to specific bot responses. Each key in this object maps to a component that handles that modality type.

| Field              | Description                                      |
|--------------------|--------------------------------------------------|
| `customModalities` | Maps modality types to their handling components |

### HTML Template Syntax

You can use the provided `html` function to create components in a more readable syntax. This function supports all available components listed below:

```javascript
import { html } from '@nlxai/touchpoint';

const MyComponent = () => {
  return html`
    <BaseText>Hello World</BaseText>
  `;
}
```

### Available Components

These components can be imported and used within your custom modality components:

#### Display Components

| Component                             | Description                               |
|---------------------------------------|-------------------------------------------|
| [`BaseText`](/touchpoint-Typography)  | Primary text component for main content   |
| [`SmallText`](/touchpoint-Typography) | Secondary text for supporting information |
| [`Icons`](/touchpoint-Icons)          | Stylized Icons                            |

#### Layout Components
| Component                                       | Description                          |
|-------------------------------------------------|--------------------------------------|
| [`Carousel`](/touchpoint-CustomCards)           | Container for multiple card elements |
| [`CustomCard`](/touchpoint-CustomCards)         | Individual card component            |
| [`CustomCardRow`](/touchpoint-CustomCards)      | Horizontal layout within cards       |
| [`CustomCardImageRow`](/touchpoint-CustomCards) | Specialized row for image content    |

#### Interactive Components

| Component                           | Description                          |
|-------------------------------------|--------------------------------------|
| [`TextButton`](/touchpoint-Buttons) | Text-based button with optional icon |
| [`IconButton`](/touchpoint-Buttons) | Icon-only button for compact actions |
| [`DateInput`](/touchpoint-DateInput)| Component for date selection         |

## Instance Methods and Properties

The async `create()` function returns a promise that will be fulfilled with a `TouchpointInstance` with these methods and properties:

| Method/Property       | Type                | Description                                           |
|-----------------------|---------------------|-------------------------------------------------------|
| `expanded`            | boolean (property)  | Gets or sets the expanded state of the chat widget    |
| `conversationHandler` | object (property)   | Returns the current conversation handler              |
| `teardown()`          | function            | Removes the widget from the DOM                       |

Example usage:

```javascript
import { create } from '@nlxai/touchpoint';

const touchpoint = await create({
  config: {
    applicationUrl: 'YOUR_APPLICATION_URL"',
    headers: {
      'nlx-api-key': 'your-api-key'
    }
  }
});

// Toggle expanded state
touchpoint.expanded = true;

// Access conversation handler
const conversationHandler = touchpoint.conversationHandler;

// Remove widget
touchpoint.teardown();
```