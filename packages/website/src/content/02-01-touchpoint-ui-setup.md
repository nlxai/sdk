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

## Instance Methods

The async `create()` function returns promise that will be fulfilled with a `TouchpointInstance` with these methods:

| Method                | Description                              | Returns                                                                      |
|-----------------------|------------------------------------------|------------------------------------------------------------------------------|
| `expand()`            | Expands the chat widget                  | void                                                                         |
| `collapse()`          | Collapses the chat widget                | void                                                                         |
| `conversationHandler` | Returns the current conversation handler | [ConversationHandler](/headless-api-reference#interface-conversationhandler) |
| `teardown()`          | Removes the widget from the DOM          | void                                                                         |
