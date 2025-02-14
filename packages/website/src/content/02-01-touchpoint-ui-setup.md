# Configuration Options

## Required Fields

| Field                           | Type   | Description                       |
|---------------------------------|--------|-----------------------------------|
| `config.botUrl`                 | string | The URL endpoint for your NLX bot |
| `config.headers["nlx-api-key"]` | string | Your NLX API key                  |

## Core Optional Fields

| Field                 | Type                                    | Default                   | Description                                                   |
|-----------------------|-----------------------------------------|---------------------------|---------------------------------------------------------------|
| `config.languageCode` | string                                  | "en-US"                   | The language code for the chat interface                      |
| `windowSize`          | "half" \| "full"                        | "half"                    | Controls whether the chat window takes up half or full screen |
| `colorMode`           | "light" \| "dark"                       | "dark"                    | Sets the color theme of the widget                            |
| `brandIcon`           | string                                  | undefined                 | URL for your brand icon in the chat header                    |
| `launchIcon`          | string                                  | undefined                 | URL for the icon shown on the launch button                   |
| `theme`               | Theme                                   | See [Theming](/touchpoint-ui-theming) | Custom theme configuration                                    |

## Component Configuration

The `customModalities` field connects your custom components to specific bot responses. Each key in this object maps to a component that handles that modality type.

| Field              | Type                                    | Default | Description                                     |
|-------------------|----------------------------------------|---------|-------------------------------------------------|
| `customModalities` | Record<string, CustomModalityComponent> | {}      | Maps modality types to their handling components |

### Available Components

These components can be imported and used within your custom modality components:

#### Display Components
| Component     | Import Path              | Description                               |
|--------------|-------------------------|-------------------------------------------|
| `BaseText`    | '@nlxai/touchpoint-ui' | Primary text component for main content   |
| `SmallText`   | '@nlxai/touchpoint-ui' | Secondary text for supporting information |

#### Layout Components
| Component          | Import Path              | Description                                |
|-------------------|-------------------------|--------------------------------------------|
| `Carousel`      | '@nlxai/touchpoint-ui' | Container for multiple card elements       |
| `CustomCard`       | '@nlxai/touchpoint-ui' | Individual card component                  |
| `CustomCardRow`    | '@nlxai/touchpoint-ui' | Horizontal layout within cards            |
| `CustomCardImageRow`| '@nlxai/touchpoint-ui'| Specialized row for image content         |

#### Interactive Components
| Component    | Import Path              | Description                               |
|-------------|-------------------------|-------------------------------------------|
| `TextButton` | '@nlxai/touchpoint-ui' | Text-based button with optional icon      |
| `IconButton` | '@nlxai/touchpoint-ui' | Icon-only button for compact actions      |

#### Visual Components
| Component      | Import Path                  | Description                           |
|---------------|-----------------------------|-----------------------------------------|
| `ArrowForward` | '@nlxai/touchpoint-ui/Icons'| Forward/next action indicator         |
| `Check`        | '@nlxai/touchpoint-ui/Icons'| Success/completion indicator          |
| `Close`        | '@nlxai/touchpoint-ui/Icons'| Close/dismiss action indicator        |
| `Delete`       | '@nlxai/touchpoint-ui/Icons'| Delete/remove action indicator        |
| `Error`        | '@nlxai/touchpoint-ui/Icons'| Error state indicator                 |
| `Warning`      | '@nlxai/touchpoint-ui/Icons'| Warning state indicator               |
| `Settings`     | '@nlxai/touchpoint-ui/Icons'| Settings/configuration indicator      |
| `Attachment`   | '@nlxai/touchpoint-ui/Icons'| File attachment indicator             |

## Instance Methods

The `create()` function returns a `TouchpointInstance` with these methods:

| Method                     | Description                              | Returns                  |
|----------------------------|------------------------------------------|--------------------------|
| `expand()`                 | Expands the chat widget                  | void                     |
| `collapse()`               | Collapses the chat widget                | void                     |
| `getConversationHandler()` | Returns the current conversation handler | ConversationHandler      |
| `teardown()`              | Removes the widget from the DOM          | void                     |

See the component-specific documentation for detailed usage information:
- [Getting Started with Components](/touchpoint-ComponentsIntro)
- [BaseText Component](/touchpoint-BaseText)
- [SmallText Component](/touchpoint-SmallText)
- [Custom Cards](/touchpoint-CustomCards)
- [Button Components](/touchpoint-Buttons)
- [Icons](/touchpoint-Icons)