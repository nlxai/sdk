/* eslint-disable jsdoc/require-jsdoc */
import type { Client } from "@nlxai/multimodal";
import type { TriggeredStep, UiConfig } from "../configuration";
import JourneyManagerElement from "./custom-element";
import type {
  ActiveTriggerEventType,
  StepWithQueryAndElements,
} from "../trigger";
import highlightBoxShadow, {
  teardown as teardownBoxShadowHighlight,
} from "./highlightBoxShadow";

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
    uiElement.style.zIndex = "1000";
    uiElement.config = config;
    uiElement.client = client;
    uiElement.conversationId = conversationId;
    document.body.appendChild(uiElement);

    const updateHighlights = config.highlights
      ? () => {
          const highlightElements = findActiveTriggers("click").flatMap(
            (activeTrigger) => activeTrigger.elements,
          );
          if (uiElement != null && config.highlightStrategy === "overlay") {
            uiElement.highlightElements = highlightElements;
          } else {
            highlightBoxShadow(config, highlightElements);
          }
        }
      : () => {};

    updateHighlights();

    return {
      updateHighlights,
      setTriggeredSteps: (steps) => {
        uiElement.triggeredSteps = steps;
      },
      setDigression: (value) => {
        uiElement.digression = value;
      },
      teardown() {
        document.body.removeChild(uiElement);
        if (config.highlightStrategy !== "overlay")
          teardownBoxShadowHighlight();
      },
    };
  }
};

export default create;
