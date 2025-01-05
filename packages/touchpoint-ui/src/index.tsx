/* eslint-disable accessor-pairs */
/* eslint-disable jsdoc/require-jsdoc */
import { type Root, createRoot } from "react-dom/client";
import { type ConversationHandler } from "@nlxai/chat-core";

import App, { type Props, type AppRef } from "./App";
import cssRaw from "./index.css?inline";

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
  return {
    expand: () => {
      // TODO: if the ref value is not yet available, setTimeout so it is
      refValue?.expand();
    },
    collapse: () => {
      // TODO: if the ref value is not yet available, setTimeout so it is
      refValue?.collapse();
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
