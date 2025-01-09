/* eslint-disable jsdoc/require-jsdoc */
import { type FC, Fragment, useEffect, useRef, useState } from "react";
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
  handler: ConversationHandler;
  responses: Response[];
  colorMode: ColorMode;
  uploadedFiles: Record<string, File>;
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
    <>
      <div className="flex justify-end pl-10 text-base">
        <div className="text-primary-60 whitespace-pre-wrap">{text}</div>
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
    </>
  );
};

export const ChatMessages: FC<ChatMessagesProps> = ({
  responses,
  colorMode,
  uploadedFiles,
  className,
}) => {
  const isWaiting = responses[responses.length - 1]?.type === "user";

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollAtBottom, setScrollAtBottom] = useState<boolean>(false);

  useEffect(() => {
    const containerNode = containerRef.current;
    if (containerNode == null) {
      return;
    }
    setTimeout(() => {
      containerNode.scrollTop = containerNode.scrollHeight;
    });
  }, [responses]);

  return (
    <div className={clsx("h-full relative", className)}>
      {isWaiting || scrollAtBottom || responses.length < 3 ? null : (
        <div
          data-theme={colorMode === "dark" ? "light" : "dark"}
          className={clsx(
            "absolute inset-x-0 h-[1px] top-0 bg-background opacity-[0.01] backdrop-blur-md",
          )}
        />
      )}
      <div
        className="h-full p-2 md:p-3 overflow-y-auto no-scrollbar space-y-8"
        ref={containerRef}
        onScroll={() => {
          const containerNode = containerRef.current;
          if (containerNode == null) {
            return;
          }
          const isAtBottom =
            containerNode.scrollHeight - containerNode.scrollTop ===
            containerNode.clientHeight;
          if (!isAtBottom && scrollAtBottom) {
            setScrollAtBottom(false);
          }
          if (isAtBottom && !scrollAtBottom) {
            setScrollAtBottom(true);
          }
        }}
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
          const isLast = responseIndex === responses.length - 1;
          return (
            <Fragment key={responseIndex}>
              <div className={clsx("space-y-2", isLast ? "min-h-full" : "")}>
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
        {isWaiting ? <Loader label="Thinking" /> : null}
      </div>
    </div>
  );
};
