import { type Theme as ThemeType } from "./theme";
import "@emotion/react";

declare module "@emotion/react" {
  // Duplicate of theme declaration at src/theme.ts, plus extra fields
  export interface Theme {
    /** Primary color for interactive UI elements like buttons */
    primaryColor: string;
    /** Background color for the dark chat bubbles (sent by the user) */
    darkMessageColor: string;
    /** Background color for the light chat bubbles (sent by the bot) */
    lightMessageColor: string;
    /** Customized shade of white */
    white: string;
    /** Customized shade of off-white, used in the widget top and bottom bar */
    fontFamily: string;
    /** Main spacing unit */
    spacing: number;
    /** Chat border radius */
    borderRadius: number;
    /** Max height of the chat window */
    chatWindowMaxHeight: number;
    // Extra fields
    windowInnerHeight: number | null;
  }
}
