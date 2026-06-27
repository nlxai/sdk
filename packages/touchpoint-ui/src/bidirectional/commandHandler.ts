/* eslint-disable jsdoc/require-jsdoc */
import type { ConversationHandler } from "@nlxai/core";
import type { PageState, BidirectionalConfig, InputField } from "../interface";
import { debug } from "./debug";

type BidirectionalEvent =
  | {
      classification: "navigation";
      payload: {
        action: "page_next" | "page_previous" | "page_custom" | "page_unknown";
        destination: string | undefined;
      };
    }
  | {
      classification: "input";
      payload: {
        fields: InputField[];
      };
    }
  | {
      classification: "custom";
      action: string;
      payload: unknown;
    };

export const commandHandler = (
  handler: ConversationHandler,
  bidirectional: BidirectionalConfig,
  pageState: {
    current: PageState;
  },
) => {
  const impl = (event: BidirectionalEvent): void => {
    debug("Command received", event);
    switch (event.classification) {
      case "navigation":
        if (bidirectional.navigation != null) {
          bidirectional.navigation(
            event.payload.action,
            event.payload.destination,
            pageState.current.links,
          );
        } else if (bidirectional.automaticContext !== false) {
          switch (event.payload.action) {
            case "page_next":
              window.history.forward();
              break;
            case "page_previous":
              window.history.back();

              break;
            case "page_custom":
              if (event.payload.destination != null) {
                const url = pageState.current.links[event.payload.destination];
                if (url != null) {
                  window.location.href = url;
                } else {
                  try {
                    new URL(event.payload.destination);
                    window.location.href = event.payload.destination;
                  } catch (_error) {
                    debug(
                      `Custom page navigation action received, but no URL found for destination".`,
                      event.payload.destination,
                    );
                  }
                }
              }
              break;
            case "page_unknown":
              debug(
                "Unknown page navigation action received, no automatic handling available.",
              );
          }
        }
        break;
      case "input":
        if (bidirectional?.input != null) {
          bidirectional.input(
            event.payload.fields,
            pageState.current.formElements,
          );
        } else if (bidirectional?.automaticContext !== false) {
          event.payload.fields.forEach((field) => {
            if (pageState.current.formElements[field.id] != null) {
              const element = pageState.current.formElements[field.id] as
                | HTMLInputElement
                | HTMLTextAreaElement
                | HTMLSelectElement;
              if (typeof field.value === "string") {
                element.value = field.value;
              } else if (
                element instanceof HTMLInputElement &&
                element.type === "checkbox"
              ) {
                element.checked = field.value;
              }
              element.classList.add("voice-updated");

              // Trigger events for frameworks that listen to them
              element.dispatchEvent(new Event("input", { bubbles: true }));
              element.dispatchEvent(new Event("change", { bubbles: true }));

              setTimeout(() => {
                element.classList.remove("voice-updated");
              }, 2000);
            }
          });
        }
        break;
      case "custom": {
        const customHandler = pageState.current.customCommands.get(
          event.action,
        );
        if (customHandler != null) {
          customHandler(event.payload);
        }
        debug(
          `No custom command handler was defined for the %o action.\n\n%cTip: Set up a handler with \nsetCustomBidirectionalCommands([{ action: "${event.action}", handler() { }}])`,
          event.action,
          "font-style: italic; font-size: 90%",
        );
        if (bidirectional?.custom != null) {
          if (bidirectional.automaticContext !== false) {
            // eslint-disable-next-line no-console
            console.warn(
              "bidirectional.custom is deprecated in automatic context mode. Please use `setCustomBidirectionalCommands` instead.",
            );
          }
          bidirectional.custom(event.action, event.payload);
        }
        break;
      }
    }
  };
  handler.addEventListener("voicePlusCommand", impl);

  return () => {
    handler.removeEventListener("voicePlusCommand", impl);
  };
};
