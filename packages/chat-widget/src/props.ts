import { type FC } from "react";
import { type Config, type ConversationHandler } from "@nlxai/chat-core";
import { type Theme } from "./theme";

/**
 * Configures the Title Bar of the Chat Widget.
 * This is visible at the top of the widget when it is open / expanded.
 */
export interface TitleBar {
  /**
   * Optional URL to a logo image to be displayed on to the left of the title.
   */
  logo?: string;
  /**
   * The title string.
   */
  title: string;
  /**
   * Setting this to true shows the collapse button ("_").
   * Pressing the collapse button will hide the chat overlay but keep it active.
   */
  withCollapseButton?: boolean;
  /**
   * Setting this to true shows the close button ("X").
   * Pressing the close button will
   * - hide the chat overlay
   * - terminate the ongoing conversation
   * - call the chat's onClose handler if provided.
   */
  withCloseButton?: boolean;
}

/**
 * When this option is set to `"localStorage"` or `"sessionStorage"`,
 * the state of the chat conversation is persisted in [local](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
 * or [session](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) storage respectively.
 *
 * This allows the state and history of the conversation to persist between
 * full page refreshes.
 *
 * \> When using the session storage feature, it is your responsibility
 * \> to make sure that your website complies with your data protection
 * \> and privacy policy requirements.
 */
export type StorageType = "localStorage" | "sessionStorage";

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

/**
 * When set, a dismissable call-to-action will appear above the chat icon with the given text.
 *
 * By default, the call-to-action will be displayed after 3 seconds, and will automatically dismiss after 20 seconds.
 *
 * It will be dissapear when the chat is opened, but until dismissed, will reappear whenever the chat is minimized or closed.
 */
export interface Nudge {
  /**
   * The text content of the nudge
   */
  content: string;
  /**
   * Show the nudge after a specific time, measured in milliseconds.
   * Defaults to 3000 (3s) if not set.
   */
  showAfter?: number;
  /**
   * Hide the nudge after a specific time after it appears, measured in milliseconds.
   * Defaults to 20000 (20s) if not set.
   */
  hideAfter?: number;
}

/**
 * The properties for creating the Chat Widget.
 */
export interface Props {
  /**
   * The configuration to create a conversation.
   */
  config: Config;
  /**
   * The theme to apply to the chat widget.
   */
  theme?: Partial<Theme>;
  /**
   * How to configure the title bar. When missing, the widget will not have a title bar.
   */
  titleBar?: TitleBar;
  /**
   * If you want a custom chat icon, set this to the URL of an image to use.
   */
  chatIcon?: string;
  /**
   * An optional {@link Nudge} configuration object.
   */
  nudge?: Nudge;
  /**
   * The placeholder in the input field. When not set, the default placeholder is "Type something..."
   */
  inputPlaceholder?: string;
  /**
   * A message to display to the user while the bot is still processing the previous message from the user.
   */
  loaderMessage?: string;
  /**
   * How long to wait, in milliseconds, before the loader message is displayed. Default is 2,500ms.
   */
  showLoaderMessageAfter?: number;
  /**
   * If set to true, previously selected choices in the chat can be changed.
   */
  allowChoiceReselection?: boolean;
  /**
   * When set, chat history & conversation will be stored in the browser.
   */
  storeIn?: StorageType;
  /**
   * Optional callback to be called when the chat is expanded.
   */
  onExpand?: (conversationHandler: ConversationHandler) => void;
  /**
   * Optional callback to be called when the chat is collapsed. This is also called when the chat is closed.
   */
  onCollapse?: (conversationHandler: ConversationHandler) => void;
  /**
   * Optional callback to be called when the chat is closed via the close button.
   */
  onClose?: () => void;
  /**
   * Optional callback to be called when the nudge element is closed.
   */
  onNudgeClose?: (conversationHandler: ConversationHandler) => void;
  /**
   * Set this to render a {@link CustomModalityComponent} for a given modality name
   * See: https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/advanced-messaging-+-functionality#modalities
   *
   */
  customModalities?: Record<string, CustomModalityComponent>;
}
