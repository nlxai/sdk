# @nlxai/touchpoint-components

Pre-built custom components for NLX Touchpoint UI.

## Installation

### NPM/Yarn (for build tools)
```bash
npm install @nlxai/touchpoint-components
```

### CDN (for script tags)
```html
<!-- Load after touchpoint-ui -->
<script src="https://unpkg.com/@nlxai/touchpoint-components/dist/touchpoint-components.umd.js"></script>
```


## Usage

### With Build Tools (Webpack, Vite, etc.)

Import components directly - your build system will handle compilation:

```typescript
import { create } from '@nlxai/touchpoint-ui';
import { 
  BaseCarouselComponent, 
  BaseCardComponent 
} from '@nlxai/touchpoint-components';

const touchpoint = await create({
  config: {
    applicationId: 'your-YOUR_APPLICATION_ID-id',
    apiKey: 'your-api-key',
  },
  customModalities: {
    BaseCarouselComponent,
    BaseCardComponent
  }
});
```

### With Script Tags (No Build Tools)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Touchpoint with Custom Components</title>
</head>
<body>
  <!-- 1. Load Touchpoint UI -->
  <script src="https://unpkg.com/@nlxai/touchpoint-ui/dist/touchpoint-ui.umd.js"></script>
  
  <!-- 2. Load Touchpoint Components -->
  <script src="https://unpkg.com/@nlxai/touchpoint-components/dist/touchpoint-components.umd.js"></script>
  
  <!-- 3. Initialize with components -->
  <script>
    nlxai.touchpointUi.create({
      config: {
        applicationId: 'YOUR_APPLICATION_ID',
        apiKey: 'YOUR_API_KEY',
      },
      customModalities: {
        // Components are available globally
        BaseCarouselComponent: TouchpointComponents.BaseCarouselComponent,
        BaseCardComponent: TouchpointComponents.BaseCardComponent
      }
    });
  </script>
</body>
</html>
```

## Available Components

### BaseCarouselComponent
A carousel component for displaying multiple items with selection capability.

**Data Structures:**
```typescript
interface BaseCarouselCardData {
  id: string;
  name: string;
  imageUrl: string;
  endDate: string;
}

type BaseCarouselComponentData = BaseCarouselCardData[];
```

### BaseCardComponent
A card component for displaying detailed information with image gallery.

**Data Structure:**
```typescript
interface BaseCardComponentData {
  id: string;
  name: string;
  imageUrl: string;
  detailImageUrls: string[];
  endDate: string;
  galleryLocation: string;
  summary: string;
}
```

## Package Details

- **Source code**: TypeScript/JSX (for bundlers)
- **Browser build**: UMD bundle (for CDN usage)
- **Size**: ~47KB minified
- **Dependencies**: None (uses peer dependencies)

## License

MIT