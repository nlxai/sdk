/* eslint-disable accessor-pairs */
/* eslint-disable jsdoc/require-jsdoc */
import { type Root, createRoot } from "react-dom/client";
import { type ConversationHandler } from "@nlxai/chat-core";

import App, { type Props, type AppRef } from "./App";
import cssRaw from "./index.css?inline";

export { useTouchpointContext } from "./context";
export { html } from "htm/react";
export { default as React } from "react";

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
