import { type Client } from "@nlxai/multimodal";
import { render } from "preact";
import { ControlCenter } from "./components";
import type { UiConfig, TriggeredStep } from "../configuration";
import type {
  ActiveTriggerEventType,
  StepWithQueryAndElements,
} from "../trigger";
import highlightBoxShadow, {
  teardown as teardownBoxShadowHighlight,
} from "./highlightBoxShadow";

/**
 * @hidden @internal
 */
export default class JourneyManagerElement extends HTMLElement {
  private _shadowRoot: ShadowRoot | null = null;
  private _client: Client | null = null;
  private _conversationId: string | null = null;
  private _triggeredSteps: TriggeredStep[] = [];
  private _config: UiConfig | null = null;
  private _digression: boolean = false;
  private _highlightElements: HTMLElement[] = [];
  private _findActiveTriggers: (
    eventType: ActiveTriggerEventType,
  ) => StepWithQueryAndElements[] = () => [];

  /**
   * Initialize the custom element.
   * @param options - The initialization options.
   */
  init({
    config,
    client,
    conversationId,
    findActiveTriggers,
  }: {
    config: UiConfig;
    client: Client;
    conversationId: string;
    findActiveTriggers: (
      eventType: ActiveTriggerEventType,
    ) => StepWithQueryAndElements[];
  }): void {
    this._config = config;
    this._client = client;
    this._conversationId = conversationId;
    this._findActiveTriggers = findActiveTriggers;
  }

  /**
   * Set digression attribute
   * @param value - The value to set
   */
  setDigression(value: boolean): void {
    if (this._digression !== value) {
      this._digression = value;
      this.render();
    }
  }

  /**
   * Set triggered steps
   * @param value - The value to set
   */
  setTriggeredSteps(value: TriggeredStep[]): void {
    this._triggeredSteps = value;
    this.updateHighlights(true);
    this.render();
  }

  /**
   * Update the highlights.
   * @param skipRender - Whether to skip rendering the highlights.
   */
  updateHighlights(skipRender: boolean = false): void {
    if (this._config?.highlights) {
      const highlightElements = this._findActiveTriggers("click")
        .filter(
          (step) =>
            step.highlight &&
            (!step.once ||
              !this._triggeredSteps.some(
                (triggered) => triggered.stepId === step.stepId,
              )),
        )
        .flatMap((activeTrigger) => activeTrigger.elements);
      if (this._config.highlightStrategy === "overlay") {
        this._highlightElements = highlightElements;
        if (!skipRender) this.render();
      } else {
        highlightBoxShadow(this._config, highlightElements);
      }
    }
  }

  /**
   * Render UI
   */
  private render(): void {
    this._shadowRoot = this._shadowRoot ?? this.attachShadow({ mode: "open" });
    if (
      this._config == null ||
      this._client == null ||
      this._conversationId == null
    ) {
      return;
    }
    render(
      <ControlCenter
        config={this._config}
        digression={this._digression}
        client={this._client}
        conversationId={this._conversationId}
        triggeredSteps={this._triggeredSteps}
        highlightElements={this._highlightElements}
      />,
      this._shadowRoot,
    );
  }

  /**
   * Teardown logic for custom element
   */
  /**
   * Teardown logic for custom element.
   */
  teardown(): void {
    document.body.removeChild(this);
    if (this._config?.highlightStrategy !== "overlay")
      teardownBoxShadowHighlight();
  }
}
