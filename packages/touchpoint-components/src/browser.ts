// Browser entry point that expects touchpoint-ui to be available globally
import { BaseCarouselComponent, BaseCardComponent } from './components/display';

// Extend the global window object
declare global {
  interface Window {
    TouchpointComponents: {
      BaseCarouselComponent: typeof BaseCarouselComponent;
      BaseCardComponent: typeof BaseCardComponent;
    };
  }
}

// Export for UMD build
export { BaseCarouselComponent, BaseCardComponent };

// Also attach to window for direct script access
if (typeof window !== 'undefined') {
  window.TouchpointComponents = {
    BaseCarouselComponent,
    BaseCardComponent
  };
}