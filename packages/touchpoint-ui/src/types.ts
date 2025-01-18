import { type BotMessage } from "@nlxai/chat-core";
import { type FC } from "react";

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

/**
 * Choice message with metadata
 */
export interface ChoiceMessage {
  /**
   * Message contents
   */
  message: BotMessage;
  /**
   * Index in the response transcript history
   */
  responseIndex: number;
  /**
   * Message index in the current response
   */
  messageIndex: number;
}

/**
 * Custom Modalities allow rendering of rich components from nodes.
 * See: https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/advanced-messaging-+-functionality#modalities
 */
export type CustomModalityComponent<Data> = FC<{
  /**
   * The payload of the Custom Modality. The schema is defined in Dialog Studio settings.
   */
  data: Data;
}>;

/**
 * Theme setting by color mode
 */
export type ThemeSettingByColorMode = Record<ColorMode, Partial<Theme>>;

/**
 * Theme setting as specified by the user
 */
export type ThemeSetting = Partial<Theme> | ThemeSettingByColorMode;

/**
 * The full theme expressed as CSS custom properties
 */
export interface Theme {
  /**
   * Font family
   */
  "--font-family": string;

  /**
   * Primary color with 80% opacity
   */
  "--primary-80": string;
  /**
   * Primary color with 60% opacity
   */
  "--primary-60": string;
  /**
   * Primary color with 40% opacity
   */
  "--primary-40": string;
  /**
   * Primary color with 20% opacity
   */
  "--primary-20": string;
  /**
   * Primary color with 10% opacity
   */
  "--primary-10": string;
  /**
   * Primary color with 5% opacity
   */
  "--primary-5": string;
  /**
   * Primary color with 1% opacity
   */
  "--primary-1": string;

  /**
   * Secondary color with 80% opacity
   */
  "--secondary-80": string;
  /**
   * Secondary color with 60% opacity
   */
  "--secondary-60": string;
  /**
   * Secondary color with 40% opacity
   */
  "--secondary-40": string;
  /**
   * Secondary color with 20% opacity
   */
  "--secondary-20": string;
  /**
   * Secondary color with 10% opacity
   */
  "--secondary-10": string;
  /**
   * Secondary color with 5% opacity
   */
  "--secondary-5": string;
  /**
   * Secondary color with 1% opacity
   */
  "--secondary-1": string;

  /**
   * Accent color
   */
  "--accent": string;
  /**
   * Accent color with 20% opacity
   */
  "--accent-20": string;
  /**
   * Background color
   */
  "--background": string;
  /**
   * Overlay color
   */
  "--overlay": string;

  /**
   * Primary warning color
   */
  "--warning-primary": string;
  /**
   * Secondary warning color
   */
  "--warning-secondary": string;
  /**
   * Primary error color
   */
  "--error-primary": string;
  /**
   * Secondary error color
   */
  "--error-secondary": string;
}
