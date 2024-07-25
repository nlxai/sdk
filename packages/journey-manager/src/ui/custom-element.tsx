/* eslint-disable accessor-pairs */
import { type Client } from "@nlxai/multimodal";
import { render } from "preact";
import { ControlCenter } from "./components";
import type { UiConfig, TriggeredStep } from "../configuration";

/**
 * @hidden @internal
 */
export default class JourneyManagerElement extends HTMLElement {
  private _shadowRoot: ShadowRoot | null = null;
  private _client: Client | null = null;
  private _triggeredSteps: TriggeredStep[] | null = null;
  private _config: UiConfig | null = null;
  private _digression: boolean = false;
  private _highlightElements: HTMLElement[] = [];

  /**
   * Set digression attribute
   */
  set digression(value: boolean) {
    if (this._digression !== value) {
      this._digression = value;
      this.render();
    }
  }

  /**
   * Add highlights to DOM elements
   */
  set highlightElements(elements: HTMLElement[]) {
    this._highlightElements = elements;
    this.render();
  }

  /**
   * Set SDK client
   */
  set client(value: Client) {
    this._client = value;
    this.render();
  }

  /**
   * Set triggered steps
   */
  set triggeredSteps(value: TriggeredStep[]) {
    this._triggeredSteps = value;
    this.render();
  }

  /**
   * Set UI configuration
   */
  set config(config: UiConfig) {
    this._config = config;
    this.render();
  }

  /**
   * Render UI
   */
  private render(): void {
    this._shadowRoot = this._shadowRoot ?? this.attachShadow({ mode: "open" });
    if (
      this._config == null ||
      this._client == null ||
      this._triggeredSteps == null
    ) {
      return;
    }
    render(
      <ControlCenter
        config={this._config}
        digression={this._digression}
        client={this._client}
        triggeredSteps={this._triggeredSteps}
        highlightElements={this._highlightElements}
      />,
      this._shadowRoot,
    );
  }

  /**
   * Teardown logic for custom element
   */
  disconnectedCallback(): void {
    if (this._shadowRoot != null) {
      render(null, this._shadowRoot);
    }
  }
}
