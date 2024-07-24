/* eslint-disable accessor-pairs,  react/prop-types */

import { type Client } from "@nlxai/multimodal";
import { autoUpdate, platform } from "@floating-ui/dom";
import { render, type FunctionComponent } from "preact";
import { useEffect, useState, useRef, useMemo } from "preact/hooks";
import tinycolor from "tinycolor2";
import style from "./style.css";
import {
  MultimodalIcon,
  SupportAgentIcon,
  ArrowBackIcon,
  CallEndIcon,
  CloseIcon,
  CheckIcon,
} from "./icons";

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
  --primary: ${theme.colors.primary};
  --primary-hover: ${theme.colors.primaryHover};
  --primary-darker: ${tinycolor(theme.colors.primary).darken(10).toRgbString()};
  --highlightR: ${highlight.r};
  --highlightG: ${highlight.g};
  --highlightB: ${highlight.b};
  
} ${style}`;
};

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
