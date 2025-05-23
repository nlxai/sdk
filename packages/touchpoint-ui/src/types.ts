import type {
  Config,
  BotMessage,
  ConversationHandler,
  Context,
} from "@nlxai/chat-core";
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
 * See: https://docs.studio.nlx.ai/build/resources/modalities
 */
export type CustomModalityComponent<Data> = FC<{
  /**
   * The payload of the Custom Modality. The schema is defined in Dialog Studio settings.
   */
  data: Data;
  /**
   * Conversation handler instance
   */
  conversationHandler: ConversationHandler;

  /**
   * Whether the component is enabled
   * We should probably use context and handle disabling interactive components automatically for the user
   * @internal
   */
  enabled: boolean;
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

  /**
   * Inner border radius: used for most buttons
   */
  innerBorderRadius: string;
  /**
   * Outer border radius: generally used for elements that contain buttons that have inner border radius. Also used by the launch button.
   */
  outerBorderRadius: string;
}

/**
 * Custom conversation init method. Defaults to sending the welcome intent
 * @param handler - the conversation handler.
 * @param context - context set via TouchpointConfiguration.initialContext
 */
export type InitializeConversation = (
  handler: ConversationHandler,
  context?: Context,
) => void;

/**
 * Main Touchpoint creation properties object
 */
export interface TouchpointConfiguration {
  /**
   * Connection information for the \@nlxai/chat-core conversation handler
   */
  config: Config;
  /**
   * Optional window size for the chat window, defaults to `half`
   */
  windowSize?: WindowSize;
  /**
   * Optional color mode for the chat window, defaults to `dark`
   */
  colorMode?: ColorMode;
  /**
   * URL of icon used to display the brand in the chat header
   */
  brandIcon?: string;
  /**
   * URL of icon used on the launch icon in the bottom right when the experience is collapsed.
   *
   * When set to `false`, no launch button is shown at all. When not set or set to `true`, the default launch icon is rendered.
   */
  launchIcon?: string | boolean;
  /**
   * Specifies whether the user message has bubbles or not
   */
  userMessageBubble?: boolean;
  /**
   * Specifies whether the agent message has bubbles or not
   */
  agentMessageBubble?: boolean;
  /**
   * Enables chat mode, a classic chat experience with inline loaders and the chat history visible at all times.
   */
  chatMode?: boolean;
  /**
   * Optional theme object to override default theme values
   */
  theme?: Partial<Theme>;
  /**
   * Optional custom modality components to render in Touchpoint
   */
  customModalities?: Record<string, CustomModalityComponent<any>>;
  /**
   * Custom conversation init method. Defaults to sending the welcome intent
   * @param handler - the conversation handler.
   * @param context - the context object
   */
  initializeConversation?: InitializeConversation;
  /**
   * Controls the ways in which the user can communicate with the application. Defaults to `"text"`
   */
  input?: "text" | "voice" | "voiceMini";
  /**
   * Context sent with the initial request.
   */
  initialContext?: Context;
}
