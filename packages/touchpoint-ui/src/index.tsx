/* eslint-disable accessor-pairs */
import { createElement, type FC } from "react";
import { type Root, createRoot } from "react-dom/client";
import htm from "htm";
import { equals } from "ramda";

import { type ConversationHandler } from "@nlxai/core";

import packageJson from "../package.json";
import App, { type AppRef } from "./App";
import cssRaw from "./index.css?inline";
import * as Icons from "./components/ui/Icons";
import { TextButton } from "./components/ui/TextButton";
import { IconButton } from "./components/ui/IconButton";
import { Ripple } from "./components/Ripple";
import { BaseText, SmallText } from "./components/ui/Typography";
import {
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
} from "./components/ui/CustomCard";
import { Carousel } from "./components/ui/Carousel";
import { DateInput } from "./components/ui/DateInput";
import { DefaultDateInput } from "./components/defaultModalities/DefaultDateInput";
import { DefaultCard } from "./components/defaultModalities/DefaultCard";
import { DefaultCarousel } from "./components/defaultModalities/DefaultCarousel";

import type {
  TouchpointConfiguration,
  CustomModalityComponent,
  BidirectionalCustomCommand,
} from "./interface";
import type { NormalizedTouchpointConfiguration } from "./types";
export {
  analyzePageForms,
  type InteractiveElementInfo,
  type PageForms,
  type AccessibilityInformation,
} from "./bidirectional/analyzePageForms";
/**
 * If you wish to build custom modalities using JSX, you will want to
 *
 * ```javascript
 * import { React } from "@nlx/touchpoint-ui";
 * ```
 *
 * instead of importing from "react" directly. This ensures that the custom modalities will
 * be running in the same React context as the Touchpoint UI using the correct version of React.
 */
export { default as React } from "react";

/**
 * Package version
 */
export const version: string = packageJson.version;

// Create a htm instance where components can be used
const createHtml = (
  components: Record<string, FC<any>>,
): ReturnType<typeof htm.bind> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  htm.bind((type, ...rest) => createElement(components[type] ?? type, ...rest));

export const html = createHtml({
  TextButton,
  IconButton,
  BaseText,
  SmallText,
  DateInput,
  Carousel,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
  Ripple,
  ...Icons,
});

export {
  TextButton,
  IconButton,
  BaseText,
  SmallText,
  DateInput,
  Carousel,
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
  Icons,
  Ripple,
};

// Export types for all components
export {
  type CustomCardProps,
  type CustomCardRowProps,
} from "./components/ui/CustomCard";
export { type DateInputProps } from "./components/ui/DateInput";
export {
  type IconButtonProps,
  type IconButtonType,
} from "./components/ui/IconButton";
export { type TextButtonProps } from "./components/ui/TextButton";
export type {
  WindowSize,
  ColorMode,
  ChoiceMessage,
  CustomModalityComponent,
  Theme,
  InitializeConversation,
  CustomLaunchButton,
  Input,
  PageState,
  BidirectionalContext,
  BidirectionalConfig,
  TouchpointConfiguration,
  BidirectionalCustomCommand,
  BidirectionalCustomCommands,
} from "./interface";

const defaultConversationId = (): string => {
  const id = crypto.randomUUID();
  sessionStorage.setItem("nlxConversationId", id);
  return id;
};

const defaultUserId = (): string => {
  const id = crypto.randomUUID();
  localStorage.setItem("nlxUserId", id);
  return id;
};

const normalizeConfiguration = (
  configuration: TouchpointConfiguration,
): NormalizedTouchpointConfiguration => {
  const applicationUrl =
    configuration.config.applicationUrl ??
    // Make this not break and require a major version bump
    ("botUrl" in configuration.config
      ? (configuration.config.botUrl as string)
      : undefined);
  if ("botUrl" in configuration.config) {
    // eslint-disable-next-line no-console
    console.warn(
      "The 'botUrl' configuration option is deprecated. Use 'applicationUrl' instead.",
    );
  }
  const customModalities: Record<string, CustomModalityComponent<unknown>> = {
    ...(configuration.customModalities ?? {}),
    DefaultDateInput: DefaultDateInput as CustomModalityComponent<unknown>,
    DefaultCard: DefaultCard as CustomModalityComponent<unknown>,
    DefaultCarousel: DefaultCarousel as CustomModalityComponent<unknown>,
  };
  return {
    ...configuration,
    config: {
      ...configuration.config,
      applicationUrl,
      conversationId:
        configuration.config.conversationId ??
        sessionStorage.getItem("nlxConversationId") ??
        defaultConversationId(),
      userId:
        configuration.config.userId ??
        localStorage.getItem("nlxUserId") ??
        defaultUserId(),
      bidirectional:
        configuration.bidirectional == null
          ? configuration.config.bidirectional ?? false
          : true,
    },
    input: configuration.input ?? "text",
    customModalities,
    initializeConversation:
      configuration.initializeConversation ??
      ((handler, context) => {
        if ((configuration?.input ?? "text") === "text")
          handler.sendWelcomeFlow(context);
      }),
  };
};

/**
 * Injects some sane default styling for embedded toucbhpoints.
 * This is only done once, so if you create multiple touchpoints, they will all share the same styles.
 * Done using a style tag so that there is low specificity and it can be overridden by the user.
 */
let injectDefaultStyles: () => void = () => {
  const style = document.createElement("style");
  style.textContent = `:where(nlx-touchpoint.nlx-text, nlx-touchpoint.nlx-voice) {
    display: block;
    height: 350px;
  }
  :where(nlx-touchpoint.nlx-voiceMini) {
   display: inline-block;

  }`;
  document.head.appendChild(style);
  injectDefaultStyles = () => {};
};

/**
 * A custom element implementing touchpoint.
 *
 * Note that when you create this element using the `create` function, it will have different defaults.
 */
class NlxTouchpointElement extends HTMLElement {
  #root: Root | null = null;
  #shadowRoot: ShadowRoot | null = null;
  #touchpointConfiguration: TouchpointConfiguration | null = null;

  /**
   * Returns an imperative reference allowing control over the application
   * @internal
   */
  onRef: ((ref: AppRef) => void) | null = null;

  /**
   * When set to false, will render a button that opens the touchpoint in a separate DOM location.
   *
   * When set to true, you get the touchpoint directly, and can control its size and placement.
   * @internal
   */
  embedded: boolean = true;

  /**
   * What does the close button in touchpoint do:
   * - If set to null, the close button will not be rendered
   * - If set to a function, the function will be called when the close button is clicked
   *  You may call `preventDefault` to prevent the touchpoint from closing and handle closing yourself.
   */
  onClose: ((event: Event) => void) | null = null;
  /**
   * Render the settings button
   * @internal
   */
  enableSettings: boolean = false;

  // TODO: revisit enabled vs. enableSettings naming
  #enabled: boolean = true;

  /**
   * Disable the whole UI
   * @internal
   */
  set enabled(value: boolean) {
    if (this.#enabled === value) {
      return;
    }
    this.#enabled = value;
    this.#render();
  }

  /** The touchpoint configuration */
  set touchpointConfiguration(value: TouchpointConfiguration) {
    if (equals(this.#touchpointConfiguration, value)) {
      return;
    }
    this.#touchpointConfiguration = value;
    this.#render();
  }

  #render(): void {
    this.#shadowRoot ??= this.attachShadow({ mode: "closed" });
    this.#root ??= createRoot(this.#shadowRoot);
    if (this.#touchpointConfiguration != null) {
      const configuration = normalizeConfiguration(
        this.#touchpointConfiguration,
      );

      this.#root.render(
        <>
          <style>{cssRaw}</style>
          <App
            {...configuration}
            embedded={this.embedded}
            onClose={this.onClose}
            enableSettings={this.enableSettings}
            enabled={this.#enabled}
            ref={(ref) => {
              if (ref != null) {
                this.onRef?.(ref);
              }
            }}
          />
        </>,
      );
    }
  }

  connectedCallback(): void {
    if (
      this.#touchpointConfiguration == null &&
      this.getAttribute("configuration") != null
    ) {
      try {
        this.touchpointConfiguration = JSON.parse(
          this.getAttribute("configuration") ?? "",
        );
      } catch (error) {
        throw new Error(
          "Failed to parse touchpoint configuration: " +
            (error instanceof Error ? error.message : String(error)),
        );
      }
    }
    if (this.embedded) {
      injectDefaultStyles();
      this.classList.add(
        `nlx-${this.#touchpointConfiguration?.input ?? "text"}`,
      );
    }
  }

  disconnectedCallback(): void {
    this.#root?.unmount();
  }
}

// Avoid defining multiple instances in case the script is loaded multiple times
const customElementsDefine: typeof customElements.define = (
  name,
  constructor,
): void => {
  if (customElements.get(name) == null) {
    customElements.define(name, constructor);
  }
};

customElementsDefine("nlx-touchpoint", NlxTouchpointElement);

/**
 * Instance of a Touchpoint UI component
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
   *       name: "Meal",
   *       description: "add a meal to your flight",
   *       values: ["standard", "vegetarian", "vegan", "gluten-free"],
   *       multipleValues: false,
   *       handler: (value) => {
   *         console.log("Meal option:", value);
   *       },
   *     },
   *   ]);
   * ```
   * This will allow the voice bot to use the command `myCommand` with the values `value1` and `value2`.
   * @param commands - A list containing the custom commands to set.
   */
  setCustomBidirectionalCommands: <T extends unknown[]>(commands: {
    [I in keyof T]: BidirectionalCustomCommand<T[I]>;
  }) => void;
}

/**
 * Creates a new Touchpoint UI instance and appends it to the document body
 * @param props - Configuration props for Touchpoint
 * @returns A promise that resolves to a TouchpointInstance
 */
export const create = (
  props: TouchpointConfiguration,
  // eslint-disable-next-line @typescript-eslint/promise-function-async
): Promise<TouchpointInstance> => {
  return new Promise((resolve) => {
    const element: any = document.createElement("nlx-touchpoint");
    element.embedded = false;
    element.onRef = (ref: AppRef) => {
      resolve({
        set expanded(val) {
          ref.setExpanded(val);
        },
        get expanded() {
          return ref.getExpanded();
        },
        get conversationHandler() {
          return ref.getConversationHandler();
        },
        teardown: () => {
          document.body.removeChild(element);
        },
        setCustomBidirectionalCommands(commands) {
          ref.setCustomBidirectionalCommands(commands);
        },
      });
    };
    element.onClose = () => {};
    element.enableSettings = true;
    element.touchpointConfiguration = props;
    document.body.appendChild(element);
  });
};

export { Container as PreviewContainer } from "./preview";
