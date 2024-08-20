/* eslint-disable jsdoc/require-jsdoc */
import type { Client } from "@nlxai/multimodal";
import type { TriggeredStep, UiConfig } from "../configuration";
import JourneyManagerElement from "./custom-element";
import type {
  ActiveTriggerEventType,
  StepWithQueryAndElements,
} from "../trigger";

customElements.define("journey-manager", JourneyManagerElement);

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
