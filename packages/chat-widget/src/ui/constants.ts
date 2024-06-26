import { type Theme } from "../theme";

export const bottomHeight = 60;

export const largeFontSize = 16;

export const fontSize = 15;

export const smallFontSize = 12;

export const extraSmallFontSize = 11;

export const largeZIndex = 2147483000;

/** the default theme */
export const defaultTheme: Theme = {
  primaryColor: "#2663da",
  darkMessageColor: "#2663da",
  lightMessageColor: "#EFEFEF",
  white: "#FFFFFF",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  spacing: 12,
  borderRadius: 8,
  chatWindowMaxHeight: 640,
};
