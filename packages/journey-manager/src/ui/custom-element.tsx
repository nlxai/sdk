import { type Client } from "@nlxai/multimodal";
import { render } from "preact";
import { ControlCenter } from "./components";
import type { UiConfig } from "../configuration";
import { TriggeredStep } from ".";

/**
 * @hidden @internal
 */

export class JourneyManagerElement extends HTMLElement {
  _shadowRoot: ShadowRoot | null = null;
  _client: Client | null = null;
  _triggeredSteps: TriggeredStep[] | null = null;
  _config: UiConfig | null = null;
  _digression: boolean = false;
  _highlightElements: HTMLElement[] = [];

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
  render(): void {
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
