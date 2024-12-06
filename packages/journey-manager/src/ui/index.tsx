/* eslint-disable jsdoc/require-jsdoc */
import type { Client } from "@nlxai/voice-plus";
import type { TriggeredStep, UiConfig } from "../configuration";
import JourneyManagerElement from "./custom-element";
import type {
  ActiveTriggerEventType,
  StepWithQueryAndElements,
} from "../trigger";

// this is a workaround because most of JourneyManager we want to only use in the browser, but some of it we want to render server side.
// where the customElements API is not available.
if (typeof customElements !== "undefined") {
  customElements.define("journey-manager", JourneyManagerElement);
}

export interface Ui {
  teardown: () => void;
  updateHighlights: () => void;
  setTriggeredSteps: (steps: TriggeredStep[]) => void;
  setDigression: (value: boolean) => void;
}

const create = (
  conversationId: string,
  config: UiConfig | undefined,
  client: Client,
  findActiveTriggers: (
    eventType: ActiveTriggerEventType,
  ) => StepWithQueryAndElements[],
): Ui => {
  if (config == null) {
    return {
      teardown() {},
      updateHighlights() {},
      setTriggeredSteps() {},
      setDigression() {},
    };
  } else {
    const uiElement = document.createElement(
      "journey-manager",
    ) as JourneyManagerElement;
    uiElement.init({ config, client, conversationId, findActiveTriggers });
    document.body.appendChild(uiElement);

    return uiElement;
  }
};

export default create;
