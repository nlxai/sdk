// Browser entry point that expects touchpoint-ui to be available globally
import { MuseumExhibitCarousel, MuseumExhibitDetails } from './components/display';

// Extend the global window object
declare global {
  interface Window {
    TouchpointComponents: {
      MuseumExhibitCarousel: typeof MuseumExhibitCarousel;
      MuseumExhibitDetails: typeof MuseumExhibitDetails;
    };
  }
}

// Export for UMD build
export { MuseumExhibitCarousel, MuseumExhibitDetails };

// Also attach to window for direct script access
if (typeof window !== 'undefined') {
  window.TouchpointComponents = {
    MuseumExhibitCarousel,
    MuseumExhibitDetails
  };
}