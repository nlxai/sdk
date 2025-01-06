/**
 * Window size configuration
 */
export type WindowSize = "half" | "full";

/**
 * Color mode configuration (light/dark modes)
 */
export type ColorMode = "light" | "dark";

/**
 * Logo URL if applicable. May be specified as a single image URL or as an object by color mode (light/dark)
 */
export type LogoUrl = string | Record<ColorMode, string>;
