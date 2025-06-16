# @nlxai/touchpoint-components

Pre-built custom components for NLX Touchpoint UI that provide rich, interactive experiences for conversational interfaces.

## Installation

```bash
npm install @nlxai/touchpoint-components
```

## Usage

Import the components you need and register them as custom modalities when creating your touchpoint:

```javascript
import { create } from '@nlxai/touchpoint-ui';
import { 
  MuseumExhibitCarousel, 
  MuseumExhibitDetails 
} from '@nlxai/touchpoint-components';

const touchpoint = await create({
  config: {
    botId: 'your-bot-id',
    apiKey: 'your-api-key',
    // ... other config
  },
  customModalities: {
    MuseumExhibitCarousel,
    MuseumExhibitDetails
  }
});
```

## Available Components

### Display Components

#### MuseumExhibitCarousel
A carousel component for displaying multiple museum exhibits with images, names, and dates.

**Data Structure:**
```typescript
interface ExhibitData {
  id: string;
  name: string;
  imageUrl: string;
  endDate: string;
}
```

**Features:**
- Horizontal scrollable carousel
- Selection state tracking
- Sends selected exhibit ID back to the conversation

#### MuseumExhibitDetails
A detailed view component for displaying comprehensive information about a single museum exhibit.

**Data Structure:**
```typescript
interface MuseumExhibitDetailsData {
  id: string;
  name: string;
  imageUrl: string;
  detailImageUrls: string[];
  endDate: string;
  galleryLocation: string;
  summary: string;
}
```

**Features:**
- Image carousel with main and detail images
- Formatted exhibit information display
- Structured layout for dates, location, and description

## Component Development

All components follow the standard NLX custom modality pattern:

```typescript
const MyComponent = ({ data, conversationHandler }) => {
  // Component implementation
  return html`<!-- Your component markup -->`;
};
```

### Props

- `data`: The modality data sent from your NLX bot
- `conversationHandler`: Object for sending data back to the conversation
  - `sendChoice(choiceId)`: Send a user selection
  - `sendSlots(slots)`: Send slot values
  - `sendText(text)`: Send a text message

## Contributing

We welcome contributions! Please follow these guidelines:

1. Components should be reusable and configurable
2. Include TypeScript types for all data structures
3. Follow the existing code style
4. Add documentation for new components
5. Test components thoroughly

## License

MIT