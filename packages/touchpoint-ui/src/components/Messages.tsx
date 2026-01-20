/* eslint-disable jsdoc/require-jsdoc */
import { type FC, Fragment, useEffect, useRef, useState, useMemo } from "react";
import {
  type Response,
  type ConversationHandler,
  type ApplicationMessage,
  type KnowledgeBaseResponseSource,
  ResponseType,
  type FeedbackConfiguration,
} from "@nlxai/core";
import { clsx } from "clsx";
import { marked } from "marked";

import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./ui/Loader";
import { TextButton } from "./ui/TextButton";
import {
  ArrowForward,
  ArrowRight,
  ArrowDown,
  OpenLink,
  ThumbUp,
  ThumbDown,
  BotMessage,
} from "./ui/Icons";
import { UnsemanticIconButton } from "./ui/IconButton";
import { type CustomModalityComponent, type ColorMode } from "../interface";
import { ErrorBoundary } from "react-error-boundary";
import { MessageButton } from "./ui/MessageButton";
import * as Feedback from "../feedback";

export interface MessagesProps {
  isWaiting: boolean;
  interimMessage?: string;
  handler: ConversationHandler;
  responses: Response[];
  userMessageBubble: boolean;
  agentMessageBubble: boolean;
  chatMode: boolean;
  colorMode: ColorMode;
  uploadedFiles: Record<string, File>;
  lastApplicationResponseIndex?: number;
  modalityComponents: Record<string, CustomModalityComponent<unknown>>;
  className?: string;
  enabled: boolean;
  feedbackState: Feedback.State;
  feedbackActions: Feedback.Actions;
}

export const MessageChoices: FC<{
  handler: ConversationHandler;
  message: ApplicationMessage;
  responseIndex: number;
  messageIndex: number;
}> = ({ handler, message, responseIndex, messageIndex }) => {
  return message.choices.length > 0 ? (
    <ul className="space-y-2 max-h-[40vh] overflow-auto no-scrollbar">
      {message.choices.map((choice, key) =>
        message.selectedChoiceId == null ||
        choice.choiceId === message.selectedChoiceId ? (
          <li key={key} className="w-full">
            <TextButton
              type="ghost"
              Icon={ArrowForward}
              onClick={
                message.selectedChoiceId == null
                  ? () => {
                      handler.sendChoice(
                        choice.choiceId,
                        {},
                        { responseIndex, messageIndex },
                      );
                    }
                  : undefined
              }
              label={choice.choiceText}
            />
          </li>
        ) : null,
      )}
    </ul>
  ) : null;
};

const UserMessage: FC<{ text: string; files?: File[]; bubble: boolean }> = ({
  text,
  bubble,
  files,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-end pl-10 text-base">
        <div
          className={clsx(
            "text-primary-60 rounded-inner whitespace-pre-wrap",
            bubble ? "bg-primary-5 p-3" : "",
          )}
        >
          {text}
        </div>
      </div>
      {files != null ? (
        <div className="flex flex-wrap justify-end gap-2">
          {files.map((file, index) => (
            // TODO: style, add file name as alt text
            <img
              className="rounded-inner h-20"
              key={index}
              src={URL.createObjectURL(file)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const NumberPill: FC<{ text: string; number: number | string }> = ({
  text,
  number,
}) => {
  return (
    <span className="flex items-center gap-2">
      <span className="bg-primary-10 text-primary-60 text-xs px-1.5 py-0.5 rounded-inner">
        {number}
      </span>
      {text}
    </span>
  );
};

interface SourceWithIndices {
  source: KnowledgeBaseResponseSource;
  indices: number[];
}

/**
 * The NLU currently sends multiple sources that are identical. This is because eventually there will be differences in page numbers,
 * but these are neither surfaced nor designed for, hence the need to de-duplicate it for the user while persisting the index (this is then
 * matched with [i] source index markers in the message body)
 * @param sources - Sources as returned by the application
 * @returns sources with indices
 */
const consolidateSources = (
  sources: KnowledgeBaseResponseSource[],
): SourceWithIndices[] => {
  const map = new Map<string, SourceWithIndices>();

  sources.forEach((source, index) => {
    const normalizedSource = {
      fileName: source.fileName,
      content: source.content,
      presignedUrl: source.presignedUrl,
      // These fields are currently ignored (also the reason why duplicates show up)
      metadata: undefined,
      pageNumber: undefined,
    };
    const key = JSON.stringify(normalizedSource);
    const existingEntry = map.get(key);
    map.set(
      key,
      existingEntry == null
        ? { source: normalizedSource, indices: [index] }
        : {
            ...existingEntry,
            indices: [...existingEntry.indices, index],
          },
    );
  });
  return [...map.values()];
};

const Sources: FC<{ sources: KnowledgeBaseResponseSource[] }> = ({
  sources,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const consolidatedSources = useMemo(
    () => consolidateSources(sources),
    [sources],
  );
  if (consolidatedSources.length === 0) {
    return null;
  }
  return (
    <details
      className="space-y-2"
      open={open}
      onToggle={(ev) => {
        setOpen(ev.currentTarget.open);
      }}
    >
      <summary className="flex cursor-pointer items-center gap-2 rounded-inner hover:bg-primary-5 text-primary-80">
        <UnsemanticIconButton
          type="ghost"
          Icon={open ? ArrowDown : ArrowRight}
        />
        Sources
      </summary>
      <ol className="space-y-2">
        {consolidatedSources.map(({ source, indices }, sourceIndex) => {
          const displayName = source.fileName ?? source.content ?? "Source";
          const sharedClassName =
            "p-3 bg-primary-5 rounded-inner w-full flex items-center justify-between text-primary-80";
          const indicesDisplay = indices
            .map((index) => String(index + 1))
            .join(", ");
          return (
            <li key={sourceIndex}>
              {source.presignedUrl != null ? (
                <a
                  href={source.presignedUrl}
                  className={clsx(sharedClassName, "hover:bg-primary-10")}
                >
                  <NumberPill text={displayName} number={indicesDisplay} />
                  <OpenLink className="w-4 h-4 text-primary-60" />
                </a>
              ) : (
                <div className={sharedClassName}>
                  <NumberPill text={displayName} number={indicesDisplay} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </details>
  );
};

const FeedbackCollection: FC<{
  feedbackUrl: string;
  feedbackConfig: FeedbackConfiguration;
  feedbackState: Feedback.State;
  feedbackActions: Feedback.Actions;
}> = ({ feedbackUrl, feedbackConfig, feedbackState, feedbackActions }) => {
  const localState = Feedback.getFeedbackInfo(feedbackState, feedbackUrl);

  /* Currently only binary feedback is supported */
  if (feedbackConfig.feedbackType.type === "binary") {
    const { positiveValue, negativeValue } = feedbackConfig.feedbackType.config;

    return (
      <div className="mt-4">
        <div className="flex items-center gap-0.5">
          <span className="text-sm text-primary-60">
            {feedbackConfig.question ?? "Was this response helpful?"}
          </span>

          {localState.rating == null || localState.rating === positiveValue ? (
            <MessageButton
              type={localState.rating === positiveValue ? "activated" : "main"}
              label={feedbackConfig.labels.positive ?? "Yes"}
              onClick={
                localState.rating === positiveValue && localState.pending
                  ? undefined
                  : () => {
                      feedbackActions.clickRating(feedbackUrl, positiveValue);
                    }
              }
              Icon={ThumbUp}
            />
          ) : null}
          {localState.rating == null || localState.rating === negativeValue ? (
            <MessageButton
              type={localState.rating === negativeValue ? "activated" : "main"}
              label={feedbackConfig.labels.negative ?? "No"}
              onClick={
                localState.rating === negativeValue && localState.pending
                  ? undefined
                  : () => {
                      feedbackActions.clickRating(feedbackUrl, negativeValue);
                    }
              }
              Icon={ThumbDown}
            />
          ) : null}
          {feedbackConfig.commentsEnabled ? (
            <MessageButton
              type={localState.commentSubmitted ? "activated" : "main"}
              label={feedbackConfig.labels.comment ?? "Add comment"}
              onClick={() => {
                feedbackActions.clickCommentButton(
                  feedbackUrl,
                  feedbackConfig.labels.comment ?? "Provide feedback",
                );
              }}
              Icon={BotMessage}
            />
          ) : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export const Messages: FC<MessagesProps> = ({
  responses,
  colorMode,
  chatMode,
  uploadedFiles,
  userMessageBubble,
  agentMessageBubble,
  lastApplicationResponseIndex,
  interimMessage,
  isWaiting,
  modalityComponents,
  handler,
  className,
  enabled,
  feedbackState,
  feedbackActions,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const lastApplicationMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatMode && !isWaiting) {
      setTimeout(() => {
        lastApplicationMessageRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  }, [isWaiting, chatMode]);

  useEffect(() => {
    if (chatMode) {
      const lastChild = containerRef.current?.lastChild;
      if (lastChild instanceof HTMLElement) {
        lastChild.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [responses.length, chatMode]);

  return (
    <div className={clsx("relative", className)}>
      <div
        data-theme={colorMode === "dark" ? "light" : "dark"}
        className={clsx(
          "absolute inset-x-0 h-px top-0 bg-background opacity-[0.01] backdrop-blur-md",
        )}
      />
      {!chatMode && isWaiting ? (
        <Loader
          label={interimMessage ?? "Thinking"}
          className="absolute inset-0"
        />
      ) : null}
      <div
        key="messages"
        className={clsx(
          "absolute inset-0 p-2 md:p-3 overflow-y-auto no-scrollbar space-y-8",
          !chatMode && isWaiting ? "opacity-0" : "opacity-100",
        )}
        ref={containerRef}
      >
        {responses.map((response, responseIndex) => {
          // User response
          if (response.type === ResponseType.User) {
            if (response.payload.type === "text") {
              return (
                <UserMessage
                  key={responseIndex}
                  text={response.payload.text}
                  bubble={userMessageBubble}
                />
              );
            } else if (
              response.payload.type === "structured" &&
              response.payload.utterance != null &&
              response.payload.uploadIds != null
            ) {
              return (
                <UserMessage
                  key={responseIndex}
                  bubble={userMessageBubble}
                  text={response.payload.utterance}
                  files={response.payload.uploadIds
                    .map((uploadId) => uploadedFiles[uploadId])
                    .filter((file) => file != null)}
                />
              );
            } else {
              return null;
            }
          }
          // Failure
          if (response.type === ResponseType.Failure) {
            return (
              <ErrorMessage
                key={responseIndex}
                message={response.payload.text}
              />
            );
          }
          // Application response
          const isLast =
            lastApplicationResponseIndex != null &&
            responseIndex === lastApplicationResponseIndex;
          return (
            <Fragment key={responseIndex}>
              <div
                className={clsx(
                  "space-y-2",
                  !chatMode && isLast ? "min-h-full" : "",
                )}
                ref={isLast ? lastApplicationMessageRef : undefined}
              >
                {response.payload.messages.map((message, messageIndex) => {
                  return (
                    <div key={messageIndex} className="text-base">
                      <div
                        className={clsx(
                          "space-y-6 markdown",
                          agentMessageBubble
                            ? "p-3 w-fit bg-secondary-40 mr-10 rounded-inner"
                            : "",
                        )}
                        dangerouslySetInnerHTML={{
                          __html: marked(message.text, { async: false }),
                        }}
                      />
                    </div>
                  );
                })}
                {response.payload.metadata?.sources != null ? (
                  <Sources sources={response.payload.metadata.sources} />
                ) : null}
                <ErrorBoundary
                  fallback={<ErrorMessage message="Something went wrong" />}
                >
                  {Object.entries(response.payload.modalities ?? {}).map(
                    ([key, value]) => {
                      const Component = modalityComponents[key];
                      if (Component == null) {
                        // eslint-disable-next-line no-console
                        console.warn(
                          `Custom component implementation missing for the ${key} modality.`,
                        );
                        return null;
                      }
                      return (
                        <Component
                          key={key}
                          data={value}
                          conversationHandler={handler}
                          enabled={enabled}
                        />
                      );
                    },
                  )}
                </ErrorBoundary>
                {response.payload.metadata?.feedbackConfig != null &&
                response.payload.metadata?.feedbackUrl != null ? (
                  <FeedbackCollection
                    feedbackUrl={response.payload.metadata.feedbackUrl}
                    feedbackConfig={response.payload.metadata.feedbackConfig}
                    feedbackState={feedbackState}
                    feedbackActions={feedbackActions}
                  />
                ) : null}
              </div>
              {/* Render the selected choice text as a user message */}
              {response.payload.messages.map((message, messageIndex) => {
                if (message.selectedChoiceId != null) {
                  const selectedChoice = message.choices.find(
                    (choice) => choice.choiceId === message.selectedChoiceId,
                  );
                  if (selectedChoice == null) {
                    return null;
                  }
                  return (
                    <UserMessage
                      key={messageIndex}
                      text={selectedChoice.choiceText}
                      bubble={userMessageBubble}
                    />
                  );
                }
                return null;
              })}
            </Fragment>
          );
        })}
        {chatMode && isWaiting ? (
          <div className="text-primary-40 text-base shimmer w-fit">
            {interimMessage ?? "Thinking"}
          </div>
        ) : null}
      </div>
    </div>
  );
};
