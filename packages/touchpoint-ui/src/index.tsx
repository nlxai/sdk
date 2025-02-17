/* eslint-disable accessor-pairs */
/* eslint-disable jsdoc/require-jsdoc */
import { type Root, createRoot } from "react-dom/client";
import { type ConversationHandler } from "@nlxai/chat-core";
import htm from "htm";

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

export { useTouchpointContext } from "./context";
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
            this.dispatchEvent(
              new CustomEvent("reactRef", {
                detail: ref,
              }),
            );
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
  expand: () => void;
  collapse: () => void;
  getConversationHandler: () => ConversationHandler | null;
  teardown: () => void;
}

export const create = (props: Props): TouchpointInstance => {
  const element: any = document.createElement("nlx-touchpoint");
  element.props = props;
  document.body.appendChild(element);
  let refValue: AppRef | null = null;
  const handleRef = (event: CustomEvent<AppRef>): void => {
    refValue = event.detail;
  };
  element.addEventListener("reactRef", handleRef);
  // Since the React ref instance might not be synchronously set exactly when the experience is initialized, this helper allows the user
  // to use methods, either immediately or with a setTimeout. Only applicable to methods that don't return anything.
  // (for example, conversation handler availability is not guaranteed anyway)
  const handleRefWithDelay = (fn: (appRef: AppRef) => void): void => {
    if (refValue != null) {
      fn(refValue);
      return;
    }
    setTimeout(() => {
      if (refValue != null) {
        fn(refValue);
      }
    });
  };
  return {
    expand: () => {
      handleRefWithDelay((appRef) => {
        appRef.expand();
      });
    },
    collapse: () => {
      handleRefWithDelay((appRef) => {
        appRef.collapse();
      });
    },
    getConversationHandler: () => {
      return refValue?.getConversationHandler() ?? null;
    },
    teardown: () => {
      element.removeEventListener("reactRef", handleRef);
      document.body.removeChild(element);
    },
  };
};
