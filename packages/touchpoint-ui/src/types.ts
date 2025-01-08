import { type BotMessage } from "@nlxai/chat-core";
import { type FC } from "react";

/**
 * Various component overrides
 */
export interface Overrides {
  /**
   * Override the loader animation
   */
  loader?: FC<unknown>;
}

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
