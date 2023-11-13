// Colors may be in any CSS-compatible format like rgb(50, 50, 50) or #aaa
export interface Theme {
  /** Primary color for interactive UI elements like buttons */
  primaryColor: string; 
  /** Background color for the dark chat bubbles (sent by the user) */
  darkMessageColor: string; 
  /** Background color for the light chat bubbles (sent by the bot) */
  lightMessageColor: string;
  /** Customized shade of white */
  white: string;
   /** Widget font family */
  fontFamily: string;
  /** Main spacing unit */
  spacing: number;
  /** Chat border radius */
  borderRadius: number;
  /** Max height of the chat window */
  chatWindowMaxHeight: number;
}
