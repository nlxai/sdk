/* eslint-disable jsdoc/require-jsdoc */
import { type FC, Fragment, useEffect, useRef } from "react";
import {
  type Response,
  type ConversationHandler,
  type BotMessage,
} from "@nlxai/chat-core";
import { clsx } from "clsx";
import { marked } from "marked";

import { Loader } from "./ui/Loader";
import { TextButton } from "./ui/TextButton";
import { ArrowForward } from "./ui/Icons";
import { type ColorMode } from "../types";

export interface ChatMessagesProps {
  isWaiting: boolean;
  handler: ConversationHandler;
  responses: Response[];
  colorMode: ColorMode;
  uploadedFiles: Record<string, File>;
  lastBotResponseIndex?: number;
  className?: string;
}

export const MessageChoices: FC<{
  handler: ConversationHandler;
  message: BotMessage;
  responseIndex: number;
  messageIndex: number;
  className?: string;
}> = ({ handler, message, responseIndex, messageIndex, className }) => {
  return message.choices.length > 0 ? (
    <div className={className}>
      <ul className="space-y-2">
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
    </div>
  ) : null;
};

const UserMessage: FC<{ text: string; files?: File[] }> = ({ text, files }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-end pl-10 text-base">
        <div className="text-primary-60 p-3 rounded-base bg-primary-5 whitespace-pre-wrap">
          {text}
        </div>
      </div>
      {files != null ? (
        <div className="flex flex-wrap justify-end gap-2">
          {files.map((file, index) => (
            // TODO: style, add file name as alt text
            <img
              className="rounded-base h-20"
              key={index}
              src={URL.createObjectURL(file)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export const ChatMessages: FC<ChatMessagesProps> = ({
  responses,
  colorMode,
  uploadedFiles,
  lastBotResponseIndex,
  isWaiting,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const lastBotMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isWaiting) {
      // TODO: the smooth scrolling consistently scrolls from the top of the conversation, looks like the scroll position is lost
      setTimeout(() => {
        lastBotMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [isWaiting]);

  return (
    <div className={clsx("relative", className)}>
      <div
        data-theme={colorMode === "dark" ? "light" : "dark"}
        className={clsx(
          "absolute inset-x-0 h-[1px] top-0 bg-background opacity-[0.01] backdrop-blur-md",
        )}
      />
      {isWaiting ? (
        <Loader label="Thinking" className="absolute inset-0" />
      ) : null}
      <div
        key="messages"
        className={clsx(
          "absolute inset-0 p-2 md:p-3 overflow-y-auto no-scrollbar space-y-8",
          isWaiting ? "opacity-0" : "opacity-100",
        )}
        ref={containerRef}
      >
        {responses.map((response, responseIndex) => {
          // User response
          if (response.type === "user") {
            if (response.payload.type === "text") {
              return (
                <UserMessage key={responseIndex} text={response.payload.text} />
              );
            } else if (
              response.payload.type === "structured" &&
              response.payload.utterance != null &&
              response.payload.uploadIds != null
            ) {
              return (
                <UserMessage
                  key={responseIndex}
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
              <p key={responseIndex} className="text-error-primary text-base">
                {response.payload.text}
              </p>
            );
          }
          // Bot response
          const isLast =
            lastBotResponseIndex != null &&
            responseIndex === lastBotResponseIndex;
          return (
            <Fragment key={responseIndex}>
              <div
                className={clsx("space-y-2", isLast ? "min-h-full" : "")}
                ref={isLast ? lastBotMessageRef : undefined}
              >
                {response.payload.messages.map((message, messageIndex) => {
                  return (
                    <div key={messageIndex} className="text-base">
                      <div
                        className="pr-10"
                        dangerouslySetInnerHTML={{
                          __html: marked(message.text),
                        }}
                      />
                    </div>
                  );
                })}
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
                    />
                  );
                }
                return null;
              })}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
