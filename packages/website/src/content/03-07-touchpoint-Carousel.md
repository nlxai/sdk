
This example demonstrates how to create an interactive carousel using Touchpoint components. The carousel displays a scrollable collection of documents, each with a title, image, and description. Users can select individual documents, with visual feedback showing their selection.

## Data Structure

The carousel works with an array of document objects. When NLX sends a message containing a carousel, it provides data in this format:

```json
{
  "type": "document-carousel",
  "data": [
    {
      "id": "doc1",
      "name": "Getting Started Guide",
      "imageUrl": "/images/guide.jpg",
      "description": "Learn the basics of our platform"
    },
    {
      "id": "doc2",
      "name": "API Documentation",
      "imageUrl": "/images/api.jpg",
      "description": "Technical reference for developers"
    }
  ]
}
```

## Component Implementation

Here's a complete implementation of the interactive document carousel:

```typescript
import React, { useState } from 'react';
import {
  CustomCards,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
  BaseText,
  SmallText
} from '@nlxai/touchpoint-ui';

interface Document {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

interface CarouselProps {
  data: Document[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <CustomCards>
      {data.map(document => (
        <CustomCard 
          key={document.id}
          onClick={() => setSelectedId(document.id)}
          className={`cursor-pointer transition-all duration-200 ${
            selectedId === document.id 
              ? 'border-2 border-accent shadow-lg' 
              : 'border border-primary-20'
          }`}
        >
          <CustomCardRow>
            <BaseText>{document.name}</BaseText>
          </CustomCardRow>

          <CustomCardImageRow>
            <div 
              className="w-full h-48 bg-center bg-cover"
              style={{ backgroundImage: `url(${document.imageUrl})` }}
              role="img"
              aria-label={document.name}
            />
          </CustomCardImageRow>

          <CustomCardRow>
            <SmallText>{document.description}</SmallText>
          </CustomCardRow>
        </CustomCard>
      ))}
    </CustomCards>
  );
};

export default Carousel;
```

## Component Registration

Register the carousel component with Touchpoint to make it available for use:

```typescript
import { TouchpointUI } from '@nlxai/touchpoint-ui';
import Carousel from './Carousel';

const touchpoint = TouchpointUI.create({
  customModalities: {
    "document-carousel": Carousel
  }
});
```

## How It Works

The carousel uses Touchpoint's component system to create an interactive document viewer:

CustomCards provides a horizontally scrolling container that holds all the document cards. Each document is rendered as a CustomCard, which contains three main sections arranged vertically:

1. A title section using BaseText for the document name
2. An image section using CustomCardImageRow for the document's visual
3. A description section using SmallText for additional details

The component manages selection state using React's useState hook. When a user clicks a card, it updates the selected state and provides visual feedback through styling changes. The selected card is highlighted using the theme's accent color.

## Styling and Interactions

The component uses a combination of Touchpoint's theme system and utility classes to create a polished interface:

- Cards are clickable (cursor-pointer)
- Selection is shown through border color and shadow
- Transitions are smooth (transition-all)
- Images maintain consistent sizing and cover their container
- Text is properly hierarchical (BaseText for titles, SmallText for descriptions)

## Best Practices

When implementing or extending this carousel:

1. Data Management: Keep your data structure flat and simple, following the established pattern of id, name, imageUrl, and description.

2. Selection Handling: Use state management to track selected items. This allows for easy addition of features like multi-select or detailed views.

3. Visual Hierarchy: Use BaseText for primary content like titles and SmallText for supporting content like descriptions.

4. Image Handling: Always provide proper aria-labels for images and maintain consistent aspect ratios.

## Related Components
- [CustomCards](/touchpoint-CustomCards)
- [CustomCard](/touchpoint-CustomCards#customcard)
- [BaseText](/touchpoint-BaseText)
- [SmallText](/touchpoint-SmallText)