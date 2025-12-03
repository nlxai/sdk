import type {
  Config,
  ApplicationMessage,
  ConversationHandler,
  Context,
} from "@nlxai/core";
import { type ComponentType } from "react";
import type { InteractiveElementInfo } from "./bidirectional/analyzePageForms";

/**
 * Window size configuration
 * @inline @hidden
 */
export type WindowSize = "half" | "full";

/**
 * Color mode configuration (light/dark modes)
 * @inline @hidden
 */
export type ColorMode = "light" | "dark" | "light dark";

/**
 * Choice message with metadata
 * @internal
 */
export interface ChoiceMessage {
  /**
   * Message contents
   */
  message: ApplicationMessage;
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
 * Custom Modalities allow rendering of rich user interfaces directly inside a conversation.
 * A custom modality component is a React component. It will receive the modality data as a
 * `data` prop, along with the conversation handler instance to interact with the conversation as
 * `conversationHandler` prop.
 * @category Modality components
 * @typeParam Data - The type of the modality being rendered by this component.
 */
export type CustomModalityComponent<Data> = ComponentType<{
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
  /**
   * Class name to propagate to the container
   */
  className?: string;
}>;

/**
 * Custom conversation init method. Defaults to sending the welcome intent
 * @param handler - the conversation handler.
 * @param context - context set via TouchpointConfiguration.initialContext
 * @inline @hidden
 */
export type InitializeConversation = (
  handler: ConversationHandler,
  context?: Context,
) => void;

/**
 * Fully custom launch icon
 * @inline @hidden
 */
export type CustomLaunchButton = ComponentType<{
  /**
   * Class name injected into the component mainly to take care of positioning and z-index. Can be combined with more presentational and sizing-related class names.
   */
  className?: string;
  /**
   * Click handler that expands Touchpoint, without the caller having to implement this based on Touchpoint instance methods.
   */
  onClick?: () => void;
}>;

/**
 * Input type for the experience
 * @inline @hidden
 */
export type Input = "text" | "voice" | "voiceMini";

/**
 * Input field value
 * @inline @hidden
 */
export interface InputField {
  /**
   * Field ID
   */
  id: string;
  /**
   * Field value
   */
  value: string | boolean;
}

/**
 * Internal state that the automatic context maintains.
 * @category Bidirectional Voice+
 */
export interface PageState {
  /** Mapping from form element IDs to their DOM elements */
  formElements: Record<string, Element>;
  /** Mapping from link element names to their URLs */
  links: Record<string, string>;
  /** Mapping from custom commands to their handlers */
  customCommands: Map<string, (arg: any) => void>;
}

/**
 * Bidirectional context information that is sent to the LLM.
 * @category Bidirectional Voice+
 */
export interface BidirectionalContext {
  /** Identifier for which page you are currently on. This can be used to filter the relevant KB pages. */
  uri?: string;
  /** The active form fields that can be filled in. */
  fields?: InteractiveElementInfo[];
  /** Human readable location names that can be navigated to. */
  destinations?: string[];
  /**
   * Custom actions that can be performed.
   */
  actions?: Array<{
    /** The name of the command, used to invoke it. */
    action: string;
    /** A short description of the command */
    description?: string;
    /** A schema for validating the command's input. Should follow the JSON Schema specification. */
    schema?: any;
  }>;
}

/**
 * Configuration for bidirectional mode of voice+.
 * @category Bidirectional Voice+
 */
export type BidirectionalConfig =
  | {
      /**
       * Attempt to gather and send page context automatically. This will work well on semantically coded pages without too many custom form controls.
       * This enables a number of automatic features.
       *
       * Defaults to `true`.
       */
      automaticContext?: true;

      /**
       * Navigation handler for bidirectional mode.
       *
       * The default implementation will navigate to those pages using standard `window.location` APIs.
       * @param action - The navigation action to perform.
       * @param destination - The name of the destination to navigate to if `action` is `"page_custom"`.
       * @param destinations - A map of destination names to URLs for custom navigation.
       */
      navigation?: (
        action: "page_next" | "page_previous" | "page_custom" | "page_unknown",
        destination: string | undefined,
        destinations: Record<string, string>,
      ) => void;

      /**
       * A callback for filling out form fields in bidirectional mode.
       *
       * The default implementation will fill out the form fields using standard DOM APIs.
       * @param fields - An array of field objects with `id` and `value` properties.
       * @param pageFields - A map of field IDs to DOM elements for custom form filling.
       */
      input?: (
        fields: InputField[],
        pageFields: Record<string, Element>,
      ) => void;

      /**
       * A callback for custom actions in bidirectional mode.
       * @param action - The custom name of your action.
       * @param payload - The payload defined for the custom action.
       * @deprecated Use {@link TouchpointInstance.setCustomBidirectionalCommands} instead.
       * @returns
       */
      custom?: (action: string, payload: unknown) => void;

      /**
       * A callback for customizing the automatic context gathering.
       *
       * This allows you to modify the context and state before they are sent to the LLM.
       * @returns The modified context and state. If the state is identical to the previous state, the call to the server will be skipped.
       */
      customizeAutomaticContext?: (arg: {
        context: BidirectionalContext;
        state: PageState;
      }) => {
        /**
         * The current context being sent to the LLM
         */
        context: BidirectionalContext;
        /**
         * The current state of the page - this is stuff not sent to the LLM, but needed to connect the results back to actions to take on the page.
         */
        state: PageState;
      };
    }
  | {
      /**
       * Disable gathering page context automatically.
       */
      automaticContext: false;

      /**
       * Navigation handler for bidirectional mode. Without automatic context there is no default implementation.
       * @param action - The navigation action to perform.
       * @param destination - The name of the destination to navigate to if `action` is `"page_custom"`.
       */
      navigation?: (
        action: "page_next" | "page_previous" | "page_custom" | "page_unknown",
        destination?: string,
      ) => void;
      /**
       * A callback for filling out form fields in bidirectional mode.  Without automatic context there is no default implementation.
       * @param fields - An array of field objects with `id` and `value` properties.
       */
      input?: (fields: InputField[]) => void;
      /**
       * A callback for custom actions in bidirectional mode.
       * @param action - The custom name of your action.
       * @param payload - The payload defined for the custom action.
       */
      custom?: (action: string, payload: unknown) => void;
    };

/**
 * Main Touchpoint creation properties object
 * @category Basics
 */
export interface TouchpointConfiguration {
  /**
   * Connection information for the \@nlxai/core conversation handler
   */
  config: Config;
  /**
   * Optional window size for the chat window, defaults to `half`
   */
  windowSize?: WindowSize;
  /**
   * Optional color mode for the chat window, defaults to `dark`. Setting `light dark` enables automatic switching based on system settings.
   */
  colorMode?: ColorMode;
  /**
   * URL of icon used to display the brand in the chat header
   */
  brandIcon?: string;
  /**
   * Include border animation. Currently only supported in Voice Mini.
   */
  animate?: boolean;
  /**
   * URL of icon used on the launch icon in the bottom right when the experience is collapsed.
   *
   * When set to `false`, no launch button is shown at all. When not set or set to `true`, the default launch icon is rendered.
   */
  launchIcon?: string | boolean | CustomLaunchButton;
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
   * Optional {@link CustomModalityComponent | custom modality components} to render in Touchpoint
   */
  modalityComponents?: Record<string, CustomModalityComponent<unknown>>;
  /**
   * Optional custom modality components to render in Touchpoint
   * @deprecated use {@link TouchpointConfiguration.modalityComponents} instead.
   * @hidden
   */
  customModalities?: Record<string, CustomModalityComponent<unknown>>;
  /**
   * Custom conversation init method. Defaults to sending the welcome flow.
   * @param handler - the conversation handler.
   * @param context - the context object
   */
  initializeConversation?: InitializeConversation;
  /**
   * Controls the ways in which  the user can communicate with the application. Defaults to `"text"`
   */
  input?: Input;
  /**
   * Context sent with the initial request.
   */
  initialContext?: Context;

  /**
   * Enables bidirectional mode of voice+. Will automatically set the bidirectional flag in the config.
   *
   */
  bidirectional?: BidirectionalConfig;
}

/**
 * The full theme expressed as CSS custom properties.
 * This means that for instance colors can be made to switch automatically based on the system color mode by using the `light-dark()` CSS function.
 * Note also that not all colors need to be provided manually. For instance if only `primary80` is provided, the rest of the primary colors will be computed automatically based on it.
 * Therefore, for a fully custom but minimal theme, you only need to provide `accent`, `primary80`, `secondary80`, `background`, `overlay`, and potentially the warning and error colors.
 * @example
 * ```typescript
 * const theme : Partial<Theme> = {
 *   primary80: "light-dark(rgba(0, 2, 9, 0.8), rgba(255, 255, 255, 0.8))",
 *   secondary80: "light-dark(rgba(255, 255, 255, 0.8), rgba(0, 2, 9, 0.8))",
 *   accent: "light-dark(rgb(28, 99, 218), rgb(174, 202, 255))",
 *   background: "light-dark(rgba(220, 220, 220, 0.9), rgba(0, 2, 9, 0.9))",
 * }
 * ```
 * @category Theming
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
 * During a Voice+ bidirectional conversation, you can indicate to the application the availability of
 * custom commands that the user can invoke.
 * @category Bidirectional Voice+
 */
export interface BidirectionalCustomCommand {
  /**
   * The name of the command, used to invoke it. Should be unique and descriptive in the context of the LLM.
   */
  action: string;
  /**
   * A short description of the command, used to help the LLM understand its purpose.
   *
   * If omitted, then the command will not be sent to the application and must be triggered
   * from the application side.
   */
  description?: string;

  /**
   * A JSON Schema that defines the structure of the command's input.
   *
   * Use descriptive names and `description` fields to give the underlying LLM plenty of context for
   * it to generate reasonable parameters. Note that the LLM output will be validated (and transformed)
   * with this schema, so you are guaranteed type safe inputs to your handler.
   *
   * Should follow the JSONSchema specification.
   */
  schema?: any;
  /**
   * A handler that will be called with an argument matching the schema when the command is invoked.
   */
  handler: (value: any) => void;
}

/**
 * Instance of a Touchpoint UI component
 * @category Basics
 */
export interface TouchpointInstance {
  /**
   * Controls whether the Touchpoint UI is expanded or collapsed
   */
  expanded: boolean;
  /**
   * The conversation handler instance for interacting with the application
   */
  conversationHandler: ConversationHandler;
  /**
   * Method to remove the Touchpoint UI from the DOM
   */
  teardown: () => void;

  /**
   * Sets currently available custom bidirectional commands.
   * This allows you to define custom commands that can be used in the voice bot.
   * The commands will be available in the voice bot and can be used to trigger actions.
   *
   * Example:
   * ```javascript
   * client.setCustomBidirectionalCommands([
   *     {
   *       action: "Meal",
   *       description: "add a meal to your flight",
   *       schema: {
   *         enum: ["standard", "vegetarian", "vegan", "gluten-free"],
   *       },
   *       handler: (value) => {
   *         console.log("Meal option:", value);
   *       },
   *     },
   *   ]);
   * ```
   *
   * This will allow the voice bot to use the command `Meal` with the value `standard`, `vegetarian`, `vegan`, or `gluten-free`.
   *
   * When using more complex arguments, a library such as [Zod](https://zod.dev) can be useful:
   *
   * ```javascript
   * import * as z from "zod/v4";
   *
   * const schema = z.object({
   *   "name": z.string().describe("The customer's name, such as John Doe"),
   *   "email": z.string().email().describe("The customer's email address"),
   * });
   *
   * client.setCustomBidirectionalCommands([
   *     {
   *       action: "Meal",
   *       description: "add a meal to your flight",
   *       schema: z.toJSONSchema(schema, {io: "input"}),
   *       handler: (value) => {
   *         const result = z.safeParse(schema, value);
   *         if (result.success) {
   *           // result.data is now type safe and TypeScript can reason about it
   *           console.log("Meal option:", result.data);
   *         } else {
   *           console.error("Failed to parse Meal option:", result.error);
   *         }
   *       },
   *     },
   *   ]);
   * ```
   * @param commands - A list containing the custom commands to set.
   */
  setCustomBidirectionalCommands: (
    commands: BidirectionalCustomCommand[],
  ) => void;
}
