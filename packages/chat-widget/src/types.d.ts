import "@emotion/react";
import type { Theme as WidgetTheme } from "./theme";

declare module "@emotion/react" {
  // Private theme properties
  interface Theme extends WidgetTheme {
    windowInnerHeight: number | null;
  }
}
