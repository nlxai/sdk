# Configuration Options

## Required Fields

| Field                           | Type   | Description                       |
|---------------------------------|--------|-----------------------------------|
| `config.botUrl`                 | string | The URL endpoint for your NLX bot |
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

| Field               | Description                                     |
|----------------------------|-------------------------------------------------|
| `customModalities` | Maps modality types to their handling components |

### Available Components

These components can be imported and used within your custom modality components:

#### Display Components

| Component   |   Description                               |
|--------------|-------------------------------------------|
| `BaseText`    |   Primary text component for main content   |
| `SmallText`   |  Secondary text for supporting information |

#### Layout Components
| Component            |  Description                          |
|----------------------|---------------------------------------|
| `Carousel`           |  Container for multiple card elements |
| `CustomCard`         |  Individual card component            |
| `CustomCardRow`      |  Horizontal layout within cards       |
| `CustomCardImageRow` |  Specialized row for image content    |

#### Interactive Components

| Component    | Description                          |
|--------------|--------------------------------------|
| `TextButton` | Text-based button with optional icon |
| `IconButton` | Icon-only button for compact actions |

## Instance Methods

The `create()` function returns a `TouchpointInstance` with these methods:

| Method                     | Description                              | Returns             |
|----------------------------|------------------------------------------|---------------------|
| `expand()`                 | Expands the chat widget                  | void                |
| `collapse()`               | Collapses the chat widget                | void                |
| `getConversationHandler()` | Returns the current conversation handler | ConversationHandler |
| `teardown()`               | Removes the widget from the DOM          | void                |

See the component-specific documentation for detailed usage information:
- [Getting Started with Components](/touchpoint-ComponentsIntro)
- [Typography](/touchpoint-Typography)
- [Custom Cards](/touchpoint-CustomCards)
- [Button Components](/touchpoint-Buttons)
- [Icons](/touchpoint-Icons)