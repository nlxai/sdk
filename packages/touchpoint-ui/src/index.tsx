/* eslint-disable accessor-pairs */
import { type Root, createRoot } from "react-dom/client";
import htm from "htm";
import { type ConversationHandler } from "@nlxai/chat-core";

import App, { type AppRef } from "./App";
import cssRaw from "./index.css?inline";
import * as Icons from "./components/ui/Icons";
import { TextButton } from "./components/ui/TextButton";
import { IconButton } from "./components/ui/IconButton";
import { BaseText, SmallText } from "./components/ui/Typography";
import {
  CustomCard,
  CustomCardRow,
  CustomCardImageRow,
} from "./components/ui/CustomCard";
import { Carousel } from "./components/ui/Carousel";
import { DateInput } from "./components/ui/DateInput";

import { createElement, type FC } from "react";
import type { TouchpointConfiguration } from "./types";
import { equals } from "ramda";
export {
  analyzePageForms,
  type InteractiveElementInfo,
  type PageForms,
  type AccessibilityInformation,
} from "./analyzePageForms";
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
export {
  type InitializeConversation,
  type ColorMode,
  type Input,
  type Theme,
  type WindowSize,
  type CustomModalityComponent,
  type TouchpointConfiguration,
} from "./types";

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
   */
  onRef: ((ref: AppRef) => void) | null = null;

  /**
   * When set to false, will render a button that opens the touchpoint in a separate DOM location.
   *
   * When set to true, you get the touchpoint directly, and can control its size and placement.
   */
  embedded: boolean = true;

  /**
   * What does the close button in touchpoint do:
   * - If set to null, the close button will not be rendered
   * - If set to a function, the function will be called when the close button is clicked
   *  You may call `preventDefault` to prevent the touchpoint from closing and handle closing yourself.
   */
  onClose: ((event: Event) => void) | null = null;
  /** Render the settings button  */
  enableSettings: boolean = false;

  // TODO: revisit enabled vs. enableSettings naming
  #enabled: boolean = true;

  /** Disable the whole UI */
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
      this.#root.render(
        <>
          <style>{cssRaw}</style>
          <App
            {...this.#touchpointConfiguration}
            embedded={this.embedded}
            initializeConversation={
              this.#touchpointConfiguration.initializeConversation ??
              ((handler, context) => {
                if ((this.#touchpointConfiguration?.input ?? "text") === "text")
                  handler.sendWelcomeFlow(context);
              })
            }
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
      });
    };
    element.onClose = () => {};
    element.enableSettings = true;
    element.touchpointConfiguration = props;
    document.body.appendChild(element);
  });
};

export { Container as PreviewContainer } from "./preview";
