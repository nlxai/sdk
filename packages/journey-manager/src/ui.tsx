/* eslint-disable accessor-pairs,  react/prop-types */

import { type Client } from "@nlxai/multimodal";
import { autoUpdate, platform } from "@floating-ui/dom";
import { render, type FunctionComponent } from "preact";
import { useEffect, useState, useRef, useMemo } from "preact/hooks";
import tinycolor from "tinycolor2";

/**
 * Theme colors
 */
export interface ThemeColors {
  /**
   * Primary color
   */
  primary: string;
  /**
   * Primary color on hover
   */
  primaryHover: string;
  /**
   * Color for trigger highlights
   */
  highlight: string;
}

/**
 * Visual theme for the UI
 */
export interface Theme {
  /**
   * UI colors
   */
  colors: ThemeColors;
  /**
   * Font family
   */
  fontFamily: string;
}

interface HandlerArg {
  sendStep: Client["sendStep"];
  triggeredSteps: Array<{ stepId: string; url: string }>;
}

/**
 * Button configuration
 */
export interface ButtonConfig {
  /**
   * Button label
   */
  label: string;
  /**
   * Button confirmation: if present, the button click handler only triggers after the confirmation button is hit
   */
  confirmation?: string;
  /**
   * Icon URL
   */
  iconUrl?: string;
  /**
   * Click handler
   */
  onClick: (config: HandlerArg) => void;
}

/**
 * Deep partial variant of the UI theme, input by the library user
 */
export interface PartialTheme {
  /**
   * UI colors
   */
  colors?: Partial<ThemeColors>;
  /**
   * Font family
   */
  fontFamily?: string;
}

/**
 * Full UI configuration
 */
export interface UiConfig {
  /**
   * Drawer title
   */
  title: string;
  /**
   * Drawer subtitle
   */
  subtitle: string;
  /**
   * Render highlights
   */
  highlights?: boolean;
  /**
   * URL for the button icon
   */
  iconUrl?: string;
  /**
   * UI theme
   */
  theme?: PartialTheme;
  /**
   * Escalation handler
   */
  onEscalation?: (config: { sendStep: Client["sendStep"] }) => void;
  /**
   * Escalation button label
   */
  escalationButtonLabel?: string;
  /**
   * Escalation confirmation
   */
  escalationConfirmation?: string;
  /**
   * End handler
   */
  onEnd?: (config: { sendStep: Client["sendStep"] }) => void;
  /**
   * End button label
   */
  endButtonLabel?: string;
  /**
   * End confirmation
   */
  endConfirmation?: string;
  /**
   * On previous step
   */
  onPreviousStep?: (config: HandlerArg) => void;
  /**
   * Previous step button label
   */
  previousStepButtonLabel?: string;
  /**
   * Custom buttons
   */
  buttons?: ButtonConfig[];
  /**
   * If this is set, the journey manager will show a call-to-action tooltip to invite the user to interact with the overlay pin.
   * it will be shown only if the user never interacts with the overlay pin, after `tooltipShowAfterMs` milliseconds.
   */
  nudgeContent?: string;
  /**
   * Show nudge tooltip after this many milliseconds
   */
  nudgeShowAfterMs?: number;
  /**
   * Hide nudge tooltip after it's been shown for this many milliseconds
   */
  nudgeHideAfterMs?: number;
}

const defaultTheme: Theme = {
  colors: {
    primary: "rgba(38, 99, 218, 1)",
    primaryHover: "rgba(30, 86, 196, 1)",
    highlight: "rgba(38, 99, 218, 1)",
  },
  fontFamily: "sans-serif",
};

const mergeWithDefault = (partial?: PartialTheme): Theme => ({
  ...defaultTheme,
  ...(partial ?? {}),
  colors: {
    ...defaultTheme.colors,
    ...(partial?.colors ?? {}),
  },
});

const styles = (theme: Theme): string => {
  const highlight = tinycolor(theme.colors.highlight).toRgb();

  return `* {
  font-family: ${theme.fontFamily};
  font-size: 14px;
}

h1,
p {
  margin: 0;
}

.pin,
.drawer,
.highlights {
  --primary: ${theme.colors.primary};
  --primary-hover: ${theme.colors.primaryHover};
  --highlightR: ${highlight.r};
  --highlightG: ${highlight.g};
  --highlightB: ${highlight.b};
  z-index: 1000;
}

button {
  cursor: pointer;
}

@keyframes fadein {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

@keyframes slideup {
  0% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(0px);
  }
}

.pin {
  width: 48px;
  height: 48px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  padding: 8px;
  border-radius: 100%;
  background-color: var(--primary);
  transition: background-color 0.2s ease-in-out;
  color: white;
  position: fixed;
  border: none;
  bottom: 12px;
  right: 12px;
}

.pin:hover {
  background-color: var(--primary-hover);
}

.pin-bubble-content {
  line-height: 1.4;
  padding: 4px 6px;
}

.pin-bubble-container {
  position: fixed;
  bottom: 66px;
  right: 8px;
  border-radius: 6px;
  box-sizing: border-box;
  width: fit-content;
  max-width: calc(100% - 38px);
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 1001;
  padding: 4px;
  background-color: ${tinycolor(theme.colors.primary).darken(10).toRgbString()};
  color: #fff;
  transition: opacity 0.2s, transform 0.2s;
}

.pin-bubble-container::after {
  position: absolute;
  top: 100%;
  right: 22px;
  content: " ";
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid ${tinycolor(theme.colors.primary).darken(10).toRgbString()};
}

.pin-bubble-container.active {
  transform: translate3d(0, 0, 0);
  pointer-events: all;
}

.pin-bubble-container.inactive {
  opacity: 0;
  transform: translate3d(0, 10px, 0);
  pointer-events: none;
}

.pin-bubble-button {
  height: 32px;
  flex: 0 0 32px;
  border: 0;
  color: white;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align - items: center;
  justify - content: center;
  border - radius: 6px;
  background: none;
}
.pin-bubble-button svg {
  width: 100 %;
  height: 100 %;
  fill: white;
}
.pin-bubble-button:hover {
  background - color: rgba(255, 255, 255, 0.1);
}
.pin-bubble-button:focus {
  outline: none;
  box - shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.2);
}



.drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  transform: translateY(100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.drawer-open {
  transform: translateY(0%);
  animation: fadein 0.3s normal forwards ease-in-out;
}

.drawer-content {
  background-color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 20px;
}

.drawer-open .drawer-content {
  animation: slideup 0.3s normal forwards ease-in-out;
}

.drawer-content > * {
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}

.drawer-content > * + * {
  margin-top: 25px;
}

/* Header */

.drawer-header {
  text-align: center;
}

.drawer-header > * + * {
  margin-top: 4px;
}

.drawer-header h1 {
  font-size: 18px;
  font-weight: 500;
}

.drawer-header p {
  font-size: 14px;
  color: #777;
}

/* Buttons */

.drawer-buttons {
}

.drawer-buttons > * + * {
  margin-top: 10px;
}

.drawer-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: transparent;
  color: #333;
  transition: background-color 0.2s ease-in-out;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background-color: rgba(0,0,0,0.07);
}

.drawer-buttons button svg {
  flex: 0 0 14px;
  height: 14px;
  display: inline-block;
  margin-right: 4px;
}

.drawer-buttons button:hover {
  background-color: rgba(0,0,0,0.10);
}

.drawer-buttons button:disabled {
  opacity: 0.5;
}

.drawer-buttons button:disabled:hover {
  background-color: rgba(0,0,0,0.07);
}

/* Footer */

.drawer-footer {
  text-align: center;
}

.drawer-footer button {
  display: inline-flex;
  align-items: center;
  border: none;
  background: none;
  color: #777;
}

.drawer-footer button svg {
  flex: 0 0 14px;
  height: 14px;
  display: inline-block;
  margin-right: 4px;
}

.drawer-footer button:hover {
  color: #000;
}

/* Success message */

.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.success-message svg {
  color: green;
  width: 14px;
  height: 14px;
  display: inline-block;
  margin-right: 4px;
}

/** Error message */

.error-message {
  color: red;
  text-align: center;
}

/** Highlights */

@keyframes ping {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--highlightR), var(--highlightG), var(--highlightB), 0.8);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(var(--highlightR), var(--highlightG), var(--highlightB), 0);
  }
}

.highlight {
  position: absolute;
  pointer-events: none;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
`;
};

const MultimodalIcon: FunctionComponent<unknown> = () => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C11.4477 20 11 20.4477 11 21C11 21.5523 11.4477 22 12 22C16.456 22 20.2313 19.0855 21.5236 15.0587C22.3766 14.8106 23 14.0231 23 13.09V11.09C23 10.1795 22.4064 9.40764 21.5851 9.14028C20.3549 5.01091 16.5291 2 12 2C7.47091 2 3.64506 5.01091 2.41488 9.14028C1.59358 9.40764 1 10.1795 1 11.09V13.09C1 14.1666 1.82988 15.0493 2.88483 15.1334C2.92262 15.1378 2.96105 15.14 3 15.14C3.55228 15.14 4 14.6923 4 14.14V12Z"></path>
    <path d="M10.09 10.8L15.2453 6.27083L13.9005 13L8.74526 17.5292L10.09 10.8ZM12.8613 12.4C12.5851 12.8783 11.9735 13.0422 11.4953 12.766C11.017 12.4899 10.8531 11.8783 11.1292 11.4C11.4054 10.9217 12.017 10.7578 12.4953 11.034C12.9735 11.3101 13.1374 11.9217 12.8613 12.4Z"></path>
  </svg>
);

const SupportAgentIcon: FunctionComponent<unknown> = () => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62"></path>
    <circle cx="9" cy="13" r="1"></circle>
    <circle cx="15" cy="13" r="1"></circle>
    <path d="M18 11.03C17.52 8.18 15.04 6 12.05 6c-3.03 0-6.29 2.51-6.03 6.45 2.47-1.01 4.33-3.21 4.86-5.89 1.31 2.63 4 4.44 7.12 4.47"></path>
  </svg>
);

const ArrowBackIcon: FunctionComponent<unknown> = () => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
  </svg>
);

const CallEndIcon: FunctionComponent<unknown> = () => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9"></path>
  </svg>
);

const CloseIcon: FunctionComponent<unknown> = () => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </svg>
);

const CheckIcon: FunctionComponent<unknown> = () => (
  <svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
  </svg>
);

const Highlight: FunctionComponent<{ element: HTMLElement }> = ({
  element,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (ref.current != null) {
      const highlight = ref.current;

      // copy over computed styles from element so drop shadow looks right
      const computedStyles = window.getComputedStyle(element);

      for (const property of computedStyles) {
        if (!property.match(/^border/)) {
          continue;
        }

        highlight.style.setProperty(
          property,
          computedStyles.getPropertyValue(property),
        );
      }

      const moveHighlight = (): void => {
        void (async (): Promise<void> => {
          const { reference } = await platform.getElementRects({
            reference: element,
            floating: highlight,
            strategy: "absolute",
          });
          // platform.getElementRects is a `Promisable` rather than a `Promise` so we have to use await rather than .then
          setRect(reference);
        })();
      };

      return autoUpdate(element, highlight, moveHighlight);
    }
  }, [element]);
  return (
    <div
      className="highlight"
      ref={ref}
      style={
        rect != null
          ? {
              top: `${rect.y - 1}px`,
              left: `${rect.x - 1}px`,
              height: `${rect.height + 2}px`,
              width: `${rect.width + 2}px`,
            }
          : {}
      }
    ></div>
  );
};

type ControlCenterStatus =
  | null
  | "pending-escalation"
  | "pending-end"
  | "success-escalation"
  | "success-end";

const ControlCenter: FunctionComponent<{
  config: UiConfig;
  client: Client;
  triggeredSteps: TriggeredStep[];
  digression: boolean;
  highlightElements: HTMLElement[];
}> = ({ config, client, triggeredSteps, highlightElements, digression }) => {
  const [hasBeenOpened, setHasBeenOpened] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<ControlCenterStatus>(null);
  const drawerContentRef = useRef<HTMLDivElement | null>(null);
  const [isNudgeVisible, setIsNudgeVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) setHasBeenOpened(true);
  }, [isOpen]);

  useEffect(() => {
    if (hasBeenOpened || config.nudgeContent == null) {
      setIsNudgeVisible(false);
      return;
    }

    let hideTimeout: null | NodeJS.Timeout = null;
    const showTimeout = setTimeout(() => {
      setIsNudgeVisible(true);
      hideTimeout = setTimeout(() => {
        setIsNudgeVisible(false);
      }, config.nudgeHideAfterMs ?? 20_000);
    }, config.nudgeShowAfterMs ?? 3_000);
    return () => {
      clearTimeout(showTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [
    config.nudgeContent,
    config.nudgeShowAfterMs,
    config.nudgeHideAfterMs,
    hasBeenOpened,
  ]);

  const successMessage = useMemo<string | null>(() => {
    if (status === "success-escalation") {
      return "Your call is being transferred to an agent.";
    }
    if (status === "success-end") {
      return "Your call has ended.";
    }
    return null;
  }, [status]);

  const onPreviousStep = config.onPreviousStep
    ? () => {
        config.onPreviousStep?.({
          sendStep: client.sendStep,
          triggeredSteps,
        });
      }
    : () => {
        const lastTriggeredStep = triggeredSteps[triggeredSteps.length - 1];
        if (lastTriggeredStep != null) {
          client.sendStep(lastTriggeredStep.stepId).catch((err) => {
            // eslint-disable-next-line no-console
            console.warn(err);
          });
          // Redirect to previous page if the last triggered step occurred on it
          if (lastTriggeredStep.url !== window.location.toString()) {
            window.location.href = lastTriggeredStep.url;
          }
        }
      };

  return (
    <>
      <style>{styles(mergeWithDefault(config.theme))}</style>
      <PinBubble
        isActive={isNudgeVisible}
        onClick={() => {
          setIsNudgeVisible(false);
        }}
        content={config.nudgeContent ?? ""}
      />
      <button
        className="pin"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <MultimodalIcon />
      </button>
      <div
        className={`drawer ${isOpen ? "drawer-open" : ""} `}
        onClick={(event: any) => {
          if (
            event.target != null &&
            drawerContentRef.current != null &&
            !drawerContentRef.current.contains(event.target as Node)
          ) {
            setIsOpen(false);
          }
        }}
      >
        <div className="drawer-content" ref={drawerContentRef}>
          <div className="drawer-header">
            <h1>{config.title}</h1>
            <p>{config.subtitle}</p>
          </div>
          {digression ? (
            <p className="error-message">We detected a digression</p>
          ) : null}
          {successMessage != null ? (
            <div className="drawer-buttons">
              <p className="success-message">
                <span>
                  <CheckIcon />
                </span>
                {successMessage}
              </p>
            </div>
          ) : (
            <div className="drawer-buttons">
              <button
                onClick={() => {
                  onPreviousStep();
                  setIsOpen(false);
                }}
              >
                <ArrowBackIcon />
                {config.previousStepButtonLabel ?? "Previous Screen"}
              </button>

              {config.onEscalation != null ? (
                <button
                  disabled={status === "pending-escalation"}
                  onClick={() => {
                    config.onEscalation?.({ sendStep: client.sendStep });
                    setStatus("pending-escalation");
                    setTimeout(() => {
                      setStatus("success-escalation");
                    }, 800);
                    setTimeout(() => {
                      setIsOpen(false);
                    }, 5000);
                  }}
                >
                  <SupportAgentIcon />
                  {config.escalationButtonLabel ?? "Escalate to Agent"}
                </button>
              ) : null}

              {config.onEnd != null ? (
                <button
                  disabled={status === "pending-end"}
                  onClick={() => {
                    config.onEnd?.({ sendStep: client.sendStep });
                    setStatus("pending-end");
                    setTimeout(() => {
                      setStatus("success-end");
                    }, 800);
                    setTimeout(() => {
                      setIsOpen(false);
                    }, 5000);
                  }}
                >
                  <CallEndIcon />
                  {config.endButtonLabel ?? "End Call"}
                </button>
              ) : null}
              {(config.buttons ?? []).map((buttonConfig, buttonIndex) => (
                <button
                  key={buttonIndex}
                  onClick={() => {
                    buttonConfig.onClick({
                      sendStep: client.sendStep,
                      triggeredSteps,
                    });
                  }}
                >
                  {buttonConfig.label}
                </button>
              ))}
            </div>
          )}
          <div className="drawer-footer">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CloseIcon />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
      <div className="highlights">
        {highlightElements.map((element, index) => {
          return <Highlight key={index} element={element} />;
        })}
      </div>
    </>
  );
};

interface TriggeredStep {
  stepId: string;
  url: string;
}

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

// PinBubble

interface PinBubbleProps {
  isActive: boolean;
  content: string;
  onClick: () => void;
}
// eslint-disable-next-line jsdoc/require-returns, jsdoc/require-param
/** @hidden @internal */
export const PinBubble: FunctionComponent<PinBubbleProps> = ({
  isActive,
  content,
  onClick,
}) => (
  <div className={`pin-bubble-container ${isActive ? "active" : "inactive"}`}>
    <div className="pin-bubble-content">{content}</div>
    <button className="pin-bubble-button" onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  </div>
);
