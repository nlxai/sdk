/* eslint-disable jsdoc/require-jsdoc */
import { type FC, Fragment, useEffect, useRef, useState } from "react";
import {
  type Response,
  type ConversationHandler,
  type BotMessage,
  type KnowledgeBaseResponseSource,
} from "@nlxai/chat-core";
import { clsx } from "clsx";
import { marked } from "marked";

import { ErrorMessage } from "./ErrorMessage";
import { LoaderAnimation, Loader } from "./ui/Loader";
import { TextButton } from "./ui/TextButton";
import { ArrowForward, ArrowRight, ArrowDown, OpenLink } from "./ui/Icons";
import { UnsemanticIconButton } from "./ui/IconButton";
import { type CustomModalityComponent, type ColorMode } from "../types";

export interface MessagesProps {
  isWaiting: boolean;
  handler: ConversationHandler;
  responses: Response[];
  userMessageBubble: boolean;
  agentMessageBubble: boolean;
  chatMode: boolean;
  colorMode: ColorMode;
  uploadedFiles: Record<string, File>;
  lastBotResponseIndex?: number;
  customModalities: Record<string, CustomModalityComponent<unknown>>;
  className?: string;
  enabled: boolean;
}

export const MessageChoices: FC<{
  handler: ConversationHandler;
  message: BotMessage;
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

const Sources: FC<{ sources: KnowledgeBaseResponseSource[] }> = ({
  sources,
}) => {
  const [open, setOpen] = useState<boolean>(false);
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
        {sources.map((source, sourceIndex) => {
          const displayName = source.fileName ?? "Source";
          const sharedClassName =
            "p-3 bg-primary-5 rounded-inner w-full flex items-center justify-between text-primary-80";
          return (
            <li key={sourceIndex}>
              {source.presignedUrl != null ? (
                <a
                  href={source.presignedUrl}
                  className={clsx(sharedClassName, "hover:bg-primary-10")}
                >
                  {displayName}
                  <OpenLink className="w-4 h-4 text-primary-60" />
                </a>
              ) : (
                <div className={sharedClassName}>{displayName}</div>
              )}
            </li>
          );
        })}
      </ol>
    </details>
  );
};

export const Messages: FC<MessagesProps> = ({
  responses,
  colorMode,
  chatMode,
  uploadedFiles,
  userMessageBubble,
  agentMessageBubble,
  lastBotResponseIndex,
  isWaiting,
  customModalities,
  handler,
  className,
  enabled,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const lastBotMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatMode && !isWaiting) {
      setTimeout(() => {
        lastBotMessageRef.current?.scrollIntoView({ behavior: "smooth" });
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
          "absolute inset-x-0 h-[1px] top-0 bg-background opacity-[0.01] backdrop-blur-md",
        )}
      />
      {!chatMode && isWaiting ? (
        <Loader label="Thinking" className="absolute inset-0" />
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
          if (response.type === "user") {
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
          if (response.type === "failure") {
            return (
              <ErrorMessage
                key={responseIndex}
                message={response.payload.text}
              />
            );
          }
          // Bot response
          const isLast =
            lastBotResponseIndex != null &&
            responseIndex === lastBotResponseIndex;
          return (
            <Fragment key={responseIndex}>
              <div
                className={clsx(
                  "space-y-2",
                  !chatMode && isLast ? "min-h-full" : "",
                )}
                ref={isLast ? lastBotMessageRef : undefined}
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
                {Object.entries(response.payload.modalities ?? {}).map(
                  ([key, value]) => {
                    const Component = customModalities[key];
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
          <div className="text-primary-60 flex items-center gap-1 text-base">
            <span className="w-5 h-5 block flex-none text-accent">
              <LoaderAnimation />
            </span>
            Thinking...
          </div>
        ) : null}
      </div>
    </div>
  );
};
