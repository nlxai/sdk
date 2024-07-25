/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { type Client } from "@nlxai/multimodal";
import { autoUpdate, platform } from "@floating-ui/dom";
import { type FunctionComponent as FC, type ComponentChildren } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import {
  MultimodalIcon,
  SupportAgentIcon,
  ArrowBackIcon,
  CallEndIcon,
  CloseIcon,
  CheckIcon,
} from "./icons";
import type {
  SimpleHandlerArg,
  UiConfig,
  PartialTheme,
  Theme,
  TriggeredStep,
} from "../../configuration";

import tinycolor from "tinycolor2";

import style from "../style.css";

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
const defaultTheme: Theme = {
  colors: {
    primary: "rgba(38, 99, 218, 1)",
    primaryHover: "rgba(30, 86, 196, 1)",
    highlight: "rgba(38, 99, 218, 1)",
  },
  fontFamily: "sans-serif",
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
        <button
          className="confirm-button"
          disabled={pending}
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
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
}> = ({
  onEscalation,
  onClose,
  client,
  escalationButtonLabel,
  escalationConfirmation,
}) => {
  const [status, setStatus] = useState<
    "confirming" | "pending" | "success" | null
  >(null);

  const onSubmit = (): void => {
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
      (status === "pending" && escalationConfirmation != null) ? (
        <DrawerDialog>
          <Confirmation
            content={escalationConfirmation ?? ""}
            onConfirm={onSubmit}
            pending={status === "pending"}
            onCancel={() => {
              setStatus(null);
            }}
          />
        </DrawerDialog>
      ) : status === "success" ? (
        <DrawerDialog>
          <SuccessMessage message="Your call has been transferred to an agent." />
          <CloseButton onClose={onClose} />
        </DrawerDialog>
      ) : null}
      <button
        className="drawer-button"
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

const EndButton: FC<{
  onEnd: (config: SimpleHandlerArg) => void;
  endButtonLabel?: string;
  endConfirmation?: string;
  client: Client;
  onClose: () => void;
}> = ({ onEnd, onClose, client, endButtonLabel, endConfirmation }) => {
  const [status, setStatus] = useState<
    "confirming" | "pending" | "success" | null
  >(null);

  const onSubmit = (): void => {
    setStatus("pending");
    onEnd?.({ sendStep: client.sendStep });
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
      (status === "pending" && endConfirmation != null) ? (
        <DrawerDialog>
          <Confirmation
            content={endConfirmation ?? ""}
            onConfirm={onSubmit}
            pending={status === "pending"}
            onCancel={() => {
              setStatus(null);
            }}
          />
        </DrawerDialog>
      ) : status === "success" ? (
        <DrawerDialog>
          <SuccessMessage message="Your call has been transferred to an agent." />
          <CloseButton onClose={onClose} />
        </DrawerDialog>
      ) : null}
      <button
        className="drawer-button"
        disabled={status === "pending"}
        onClick={() => {
          if (endConfirmation != null) {
            setStatus("confirming");
            return;
          }
          onSubmit();
        }}
      >
        <CallEndIcon />
        {endButtonLabel ?? "End Call"}
      </button>
    </>
  );
};

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

export const ControlCenter: FC<{
  config: UiConfig;
  client: Client;
  triggeredSteps: TriggeredStep[];
  digression: boolean;
  highlightElements: HTMLElement[];
}> = ({ config, client, triggeredSteps, highlightElements, digression }) => {
  const [hasBeenOpened, setHasBeenOpened] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      }, config.nudgeHideAfterMs ?? 20000);
    }, config.nudgeShowAfterMs ?? 3000);
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
          <div className="drawer-buttons">
            <button
              className="drawer-button"
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
              />
            ) : null}

            {config.onEnd != null ? (
              <EndButton
                onEnd={config.onEnd}
                client={client}
                endButtonLabel={config.endButtonLabel}
                endConfirmation={config.endConfirmation}
                onClose={() => {
                  setIsOpen(false);
                }}
              />
            ) : null}

            {(config.buttons ?? []).map((buttonConfig, buttonIndex) => (
              <button
                className="drawer-button"
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
