/* eslint-disable jsdoc/require-jsdoc */
import { useEffect, useRef, type FC, Fragment } from "react";
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

export interface ChatMessagesProps {
  handler: ConversationHandler;
  responses: Response[];
}

export const MessageChoices: FC<{
  handler: ConversationHandler;
  message: BotMessage;
  responseIndex: number;
  messageIndex: number;
}> = ({ handler, message, responseIndex, messageIndex }) => {
  return message.choices.length > 0 ? (
    <div
      className={clsx(
        "absolute inset-x-2 pb-2 z-10",
        message.selectedChoiceId != null ? "bottom-0" : "bottom-16",
      )}
    >
      <ul className={"max-w-content mx-auto"}>
        {message.choices.map((choice, key) =>
          message.selectedChoiceId == null ||
          choice.choiceId === message.selectedChoiceId ? (
            <li key={key} className="mt-2 w-full">
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

const UserMessage: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex justify-end pl-10 text-base max-w-content mx-auto">
      <div className="text-primary-60 whitespace-pre-wrap">{text}</div>
    </div>
  );
};

export const ChatMessages: FC<ChatMessagesProps> = ({ responses }) => {
  const isWaiting = responses[responses.length - 1]?.type === "user";

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerNode = containerRef.current;
    if (containerNode == null) {
      return;
    }
    containerNode.scrollTop = containerNode.scrollHeight;
  }, [responses.length]);

  return (
    <div
      className="h-full p-3 overflow-y-auto no-scrollbar space-y-8"
      ref={containerRef}
    >
      {responses.map((response, responseIndex) => {
        // User response
        if (response.type === "user") {
          if (response.payload.type === "text") {
            return (
              <UserMessage key={responseIndex} text={response.payload.text} />
            );
          } else {
            return null;
          }
        }
        // Failure
        if (response.type === "failure") {
          return (
            <p
              key={responseIndex}
              className="text-error-primary text-base max-w-content mx-auto"
            >
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
                  <div
                    key={messageIndex}
                    className="text-base max-w-content mx-auto"
                  >
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
  );
};
