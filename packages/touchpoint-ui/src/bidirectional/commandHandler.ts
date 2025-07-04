/* eslint-disable jsdoc/require-jsdoc */
import type { ConversationHandler } from "@nlxai/chat-core";
import type { BidirectionalConfig } from "../types";

export const commandHandler = (
  handler: ConversationHandler,
  bidirectional: BidirectionalConfig,
  pageState: {
    current: {
      formElements: Record<string, Element>;
      links: Record<string, string>;
    };
  },
) => {
  const impl = (event: any): void => {
    switch (event.classification) {
      case "navigation":
        if (bidirectional.navigation != null) {
          bidirectional.navigation(
            event.action as "page_next" | "page_previous" | "page_custom",
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
                }
              }
              break;
          }
        }
        break;
      case "input":
        if (bidirectional?.input != null) {
          bidirectional.input(
            event.fields as Array<{ id: string; value: string }>,
            pageState.current.formElements,
          );
        } else if (bidirectional?.automaticContext !== false) {
          event.fields.forEach((field: { id: string; value: string }) => {
            if (pageState.current.formElements[field.id] != null) {
              const element = pageState.current.formElements[field.id] as
                | HTMLInputElement
                | HTMLTextAreaElement
                | HTMLSelectElement;
              element.value = field.value;
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
        if (bidirectional?.custom != null) {
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
