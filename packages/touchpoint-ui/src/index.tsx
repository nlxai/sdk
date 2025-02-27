/* eslint-disable accessor-pairs */
/* eslint-disable jsdoc/require-jsdoc */
import { type Root, createRoot } from "react-dom/client";
import htm from "htm";
import { type ConversationHandler } from "@nlxai/chat-core";

import App, { type Props, type AppRef } from "./App";
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

class NlxTouchpointElement extends HTMLElement {
  _root: Root | null = null;
  _shadowRoot: ShadowRoot | null = null;
  onRef: ((ref: AppRef) => void) | null = null;

  set props(value: Props) {
    this._shadowRoot =
      this._shadowRoot ?? this.attachShadow({ mode: "closed" });
    this._root = createRoot(this._shadowRoot);
    this._root.render(
      <>
        <style>{cssRaw}</style>
        <App
          {...value}
          ref={(ref) => {
            if (ref != null) {
              this.onRef?.(ref);
            }
          }}
        />
      </>,
    );
  }

  disconnectedCallback(): void {
    this._root?.unmount();
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

export interface TouchpointInstance {
  expanded: boolean;
  conversationHandler: ConversationHandler;
  teardown: () => void;
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const create = (props: Props): Promise<TouchpointInstance> => {
  return new Promise((resolve) => {
    const element: any = document.createElement("nlx-touchpoint");
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
    element.props = props;
    document.body.appendChild(element);
  });
};
