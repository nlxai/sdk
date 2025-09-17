/* eslint-disable jsdoc/require-jsdoc */
import type { ConversationHandler } from "@nlxai/core";
import type { PageState, BidirectionalConfig, InputField } from "../interface";
import { debug } from "./debug";

export const commandHandler = (
  handler: ConversationHandler,
  bidirectional: BidirectionalConfig,
  pageState: {
    current: PageState;
  },
) => {
  const impl = (event: any): void => {
    debug("Command received", event);
    switch (event.classification) {
      case "navigation":
        if (bidirectional.navigation != null) {
          bidirectional.navigation(
            event.action as
              | "page_next"
              | "page_previous"
              | "page_custom"
              | "page_unknown",
            event.destination as string | undefined,
            pageState.current.links,
          );
        } else if (bidirectional.automaticContext !== false) {
          switch (event.action) {
            case "page_next":
              window.history.forward();
              break;
            case "page_previous":
              window.history.back();

              break;
            case "page_custom":
              if (event.destination != null) {
                const url = pageState.current.links[event.destination];
                if (url != null) {
                  window.location.href = url;
                } else {
                  try {
                    // eslint-disable-next-line no-new -- Throws an error if the URL is invalid
                    new URL(event.destination as string);
                    window.location.href = event.destination as string;
                  } catch (error) {
                    debug(
                      `Custom page navigation action received, but no URL found for destination".`,
                      event.destination,
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
            event.fields as InputField[],
            pageState.current.formElements,
          );
        } else if (bidirectional?.automaticContext !== false) {
          event.fields.forEach((field: InputField) => {
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
      case "custom":
        if (pageState.current.customCommands.has(event.action as string)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const handler = pageState.current.customCommands.get(
            event.action as string,
          )!;
          handler(event.payload);
        }
        if (bidirectional?.custom != null) {
          if (bidirectional.automaticContext !== false) {
            // eslint-disable-next-line no-console
            console.warn(
              "bidirectional.custom is deprecated in automatic context mode. Please use `setCustomBidirectionalCommands` instead.",
            );
          }
          bidirectional.custom(event.action as string, event.payload);
        }
        break;
    }
  };
  handler.addEventListener("voicePlusCommand", impl);

  return () => {
    handler.removeEventListener("voicePlusCommand", impl);
  };
};
