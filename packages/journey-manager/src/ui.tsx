/* eslint-disable accessor-pairs,  react/prop-types */

import { type Client } from "@nlxai/multimodal";
import { autoUpdate, platform } from "@floating-ui/dom";
import {
  render,
  type FunctionComponent as FC,
  type ComponentChildren,
} from "preact";
import {
  useEffect,
  useState,
  useRef,
  useMemo,
  type MutableRef,
} from "preact/hooks";
import { createPortal } from "preact/compat";
import {
  ArrowBackIcon,
  CallEndIcon,
  CheckIcon,
  CloseIcon,
  MultimodalIcon,
  SupportAgentIcon,
} from "./ui/icons";
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

interface SimpleHandlerArg {
  sendStep: Client["sendStep"];
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
  onEscalation?: (config: SimpleHandlerArg) => void;
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
  onEnd?: (config: SimpleHandlerArg) => void;
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

/** Pin */

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

/** Drawer */

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

.drawer-dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  z-index: 20;
  gap: 20px;
}

/** Only add spacing margins from the third child onwards (as the first child is the dialog container) */
.drawer-content > * + * + * {
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

/** Discrete button */

.discrete-button {
  display: inline-flex;
  align-items: center;
  border: none;
  background: none;
  color: #777;
}

.discrete-button svg {
  flex: 0 0 14px;
  height: 14px;
  display: inline-block;
  margin-right: 4px;
}

.discrete-button:hover {
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
 
/** Confirmation */

.confirmation {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.confirmation-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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

const Highlight: FC<{ element: HTMLElement }> = ({ element }) => {
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

const SuccessMessage: FC<{ message: string }> = ({ message }) => {
  return (
    <p className="success-message">
      <span>
        <CheckIcon />
      </span>
      {message}
    </p>
  );
};

const CloseButton: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <button className="discrete-button" onClick={onClose}>
      <CloseIcon />
      <span>Close</span>
    </button>
  );
};

const DrawerDialog: FC<{ children: ComponentChildren }> = ({ children }) => {
  return <div className="drawer-dialog">{children}</div>;
};

const Confirmation: FC<{
  content: string;
  onConfirm: () => void;
  pending?: boolean;
  onCancel: () => void;
}> = ({ content, onConfirm, onCancel, pending }) => {
  return (
    <div className="confirmation">
      <p>{content}</p>
      <div className="confirmation-buttons">
        <button disabled={pending} onClick={onConfirm}>
          Confirm
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const EscalationButton: FC<{
  onEscalation: (config: SimpleHandlerArg) => void;
  escalationButtonLabel?: string;
  escalationConfirmation?: string;
  client: Client;
  onClose: () => void;
  drawerDialogRef: MutableRef<HTMLDivElement | null>;
}> = ({
  onEscalation,
  drawerDialogRef,
  onClose,
  client,
  escalationButtonLabel,
  escalationConfirmation,
}) => {
  const [status, setStatus] = useState<
    "confirming" | "pending" | "success" | null
  >(null);

  const onSubmit = () => {
    setStatus("pending");
    onEscalation?.({ sendStep: client.sendStep });
    setTimeout(() => {
      setStatus("success");
    }, 800);
    setTimeout(() => {
      onClose();
    }, 5000);
  };

  return (
    <>
      {status === "confirming" ||
      (status === "pending" && escalationConfirmation != null)
        ? createPortal(
            <DrawerDialog>
              <Confirmation
                content={escalationConfirmation ?? ""}
                onConfirm={onSubmit}
                pending={status === "pending"}
                onCancel={() => {
                  setStatus(null);
                }}
              />
            </DrawerDialog>,
            drawerDialogRef.current!,
          )
        : status === "success"
          ? createPortal(
              <DrawerDialog>
                <SuccessMessage message="Your call has been transferred to an agent." />
                <CloseButton onClose={onClose} />
              </DrawerDialog>,
              drawerDialogRef.current!,
            )
          : null}
      <button
        disabled={status === "pending"}
        onClick={() => {
          if (escalationConfirmation != null) {
            setStatus("confirming");
            return;
          }
          onSubmit();
        }}
      >
        <SupportAgentIcon />
        {escalationButtonLabel ?? "Escalate to Agent"}
      </button>
    </>
  );
};

const ControlCenter: FC<{
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
  const drawerDialogRef = useRef<HTMLDivElement | null>(null);
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
        title="Toggle control center"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {config.iconUrl != null ? (
          <img
            src={config.iconUrl}
            role="presentation"
            className="block w-full h-full"
          />
        ) : (
          <MultimodalIcon />
        )}
      </button>
      <div
        className={`drawer ${isOpen ? "drawer-open" : ""} `}
        onClick={(event: any) => {
          if (
            event.target != null &&
            drawerContentRef.current != null &&
            !drawerContentRef.current.contains(event.target as Node)
          ) {
            // Does not work due to portal component bubbling
            // setIsOpen(false);
          }
        }}
      >
        <div className="drawer-content" ref={drawerContentRef}>
          <div ref={drawerDialogRef} />
          <div className="drawer-header">
            <h1>{config.title}</h1>
            <p>{config.subtitle}</p>
          </div>
          {digression ? (
            <p className="error-message">We detected a digression</p>
          ) : null}
          {successMessage != null ? (
            <div className="drawer-buttons">
              <SuccessMessage message={successMessage} />
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
                <EscalationButton
                  onEscalation={config.onEscalation}
                  client={client}
                  escalationButtonLabel={config.escalationButtonLabel}
                  escalationConfirmation={config.escalationConfirmation}
                  onClose={() => {
                    setIsOpen(false);
                  }}
                  drawerDialogRef={drawerDialogRef}
                />
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
            <CloseButton
              onClose={() => {
                setIsOpen(false);
              }}
            />
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

const PinBubble: FC<PinBubbleProps> = ({ isActive, content, onClick }) => (
  <div className={`pin-bubble-container ${isActive ? "active" : "inactive"}`}>
    <div className="pin-bubble-content">{content}</div>
    <button className="pin-bubble-button" onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  </div>
);
