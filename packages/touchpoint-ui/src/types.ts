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

/**
 * Custom Modalities allow rendering of rich components from nodes.
 * See: https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/advanced-messaging-+-functionality#modalities
 */
export type CustomModalityComponent = FC<{
  /**
   * The name of the Modality as defined in Dialog Studio settings.
   */
  key: string;
  /**
   * The payload of the Custom Modality. The schema is defined in Dialog Studio settings.
   */
  data: any;
}>;
