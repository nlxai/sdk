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
 * The full theme expressed as CSS custom properties
 */
export interface Theme {
  /**
   * Font family
   */
  fontFamily: string;

  /**
   * Primary color with 80% opacity
   */
  primary80: string;
  /**
   * Primary color with 60% opacity
   */
  primary60: string;
  /**
   * Primary color with 40% opacity
   */
  primary40: string;
  /**
   * Primary color with 20% opacity
   */
  primary20: string;
  /**
   * Primary color with 10% opacity
   */
  primary10: string;
  /**
   * Primary color with 5% opacity
   */
  primary5: string;
  /**
   * Primary color with 1% opacity
   */
  primary1: string;

  /**
   * Secondary color with 80% opacity
   */
  secondary80: string;
  /**
   * Secondary color with 60% opacity
   */
  secondary60: string;
  /**
   * Secondary color with 40% opacity
   */
  secondary40: string;
  /**
   * Secondary color with 20% opacity
   */
  secondary20: string;
  /**
   * Secondary color with 10% opacity
   */
  secondary10: string;
  /**
   * Secondary color with 5% opacity
   */
  secondary5: string;
  /**
   * Secondary color with 1% opacity
   */
  secondary1: string;

  /**
   * Accent color used e.g. for prominent buttons, the loader animation as well as selected card outlines
   */
  accent: string;
  /**
   * Accent color with 20% opacity
   */
  accent20: string;
  /**
   * The background color of the main Touchpoint interface
   */
  background: string;
  /**
   * The color of the overlay covering the visible portion of the website when the Touchpoint interface does not cover the full screen
   */
  overlay: string;

  /**
   * Primary warning color
   */
  warningPrimary: string;
  /**
   * Secondary warning color
   */
  warningSecondary: string;
  /**
   * Primary error color
   */
  errorPrimary: string;
  /**
   * Secondary error color
   */
  errorSecondary: string;
}
