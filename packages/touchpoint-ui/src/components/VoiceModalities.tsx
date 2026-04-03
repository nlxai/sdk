/* eslint-disable jsdoc/require-jsdoc */
import {
  type RefObject,
  type ReactNode,
  type FC,
  useEffect,
  useRef,
} from "react";
import { type CustomModalityComponent } from "../interface";
import {
  type Response,
  type ConversationHandler,
  ResponseType,
} from "@nlxai/core";
import { SafeMarkdown } from "./SafeMarkdown";
import { ErrorBoundary } from "react-error-boundary";
import { UserMessage } from "./Messages";
import { ErrorMessage } from "./ErrorMessage";

interface ModalityEntry {
  key: string;
  value: any;
  Component: CustomModalityComponent<unknown>;
}

const useScrollToBottom = <T,>(
  // Container element - scrolling always happens to the last child
  containerRef: RefObject<HTMLElement>,
  // Dependency controlling when scrolling should take place
  dependency: T,
): void => {
  useEffect(() => {
    const container = containerRef.current;
    if (container == null) {
      return;
    }
    const lastChild = container.lastChild;
    if (lastChild instanceof HTMLElement) {
      lastChild.scrollIntoView({ behavior: "smooth" });
    }
  }, [containerRef, dependency]);
};

// Extract valid modality components from a response, along with the value for the `data` prop.
const toModalityEntries = (
  response: Response,
  modalityComponents: Record<string, CustomModalityComponent<unknown>>,
): Array<{
  key: string;
  value: unknown;
  Component: CustomModalityComponent<unknown>;
}> => {
  const modalities =
    (response.type === ResponseType.Application
      ? response.payload.modalities
      : undefined) ?? {};

  return Object.entries(modalities)
    .map(([key, value]) => {
      const Component = modalityComponents[key];
      if (Component == null) {
        return null;
      }
      return { key, value, Component };
    })
    .filter((entry): entry is ModalityEntry => entry != null);
};

export const VoiceModalities: FC<{
  className?: string;
  responses: Response[];
  modalityComponents: Record<string, CustomModalityComponent<unknown>>;
  renderedAsOverlay: boolean;
  showTranscript: boolean;
  handler: ConversationHandler;
}> = ({
  className,
  responses,
  renderedAsOverlay,
  showTranscript,
  modalityComponents,
  handler,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Assemble a list of rendered components. If the list is empty (e.g. a voice transcript isn't shown and there are no modalities),
   * the component must render `null` out of layout constraints.
   */
  const displayElements: ReactNode[] = responses
    .map((response) => {
      const modalityEntries = toModalityEntries(response, modalityComponents);

      // If nothing is to be rendered, return an explicit `null` so rendering the container can be completely skipped as well
      if (!showTranscript && modalityEntries.length === 0) {
        return null;
      }
      return (
        <div className="space-y-2" key={response.receivedAt}>
          {showTranscript && response.type === ResponseType.Application
            ? response.payload.messages.map((message, messageIndex) => {
                return (
                  <div key={messageIndex} className="text-base">
                    <SafeMarkdown
                      className="space-y-6 markdown"
                      contents={message.text}
                    />
                  </div>
                );
              })
            : null}
          {showTranscript &&
          response.type === ResponseType.User &&
          response.payload.type === "text" ? (
            <UserMessage text={response.payload.text} bubble={false} />
          ) : null}
          {modalityEntries.map(({ key, value, Component }) => {
            return (
              <Component
                key={key}
                renderedAsOverlay={renderedAsOverlay}
                data={value}
                conversationHandler={handler}
                enabled={true}
              />
            );
          })}
        </div>
      );
    })
    .filter(Boolean);

  useScrollToBottom(containerRef, displayElements.length);

  if (displayElements.length === 0) {
    return null;
  }

  return (
    <div className={className} ref={containerRef}>
      <ErrorBoundary fallback={<ErrorMessage message="Something went wrong" />}>
        {displayElements}
      </ErrorBoundary>
    </div>
  );
};
