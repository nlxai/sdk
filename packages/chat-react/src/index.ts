import { useState, useEffect, useRef, useMemo } from "react";

// Code from here on out is identical in the React and Preact packages
import { last } from "ramda";
import {
  createConversation,
  type Config,
  type ConversationHandler,
  shouldReinitialize,
  type Response,
} from "@nlxai/chat-core";

/**
 * Created by {@link useChat}.
 */
export interface ChatHook {
  /**
   * Contains the full conversation handler object from the [the \@nlxai/chat-core package](https://github.com/nlxai/chat-sdk/blob/master/packages/chat-core/README.md).
   * This is mostly used for the `send*` methods like `sendText` or `sendStructured`, as the response subscription is
   * handled by the hook automatically.
   */
  conversationHandler: ConversationHandler;
  /**
   * Hold the value of the chat input field, which is auto-cleared whenever a message is sent.
   *
   * Using this field is optional and you can hold input state separately.
   */
  inputValue: string;
  /**
   * Modify the value of the chat input field.
   * @param val - The new value of the input field.
   */
  setInputValue: (val: string) => void;
  /**
   * The reactive full history of the chat messages.
   * It contains the `type: "user" | "bot"` field and an associated payload.
   * Please refer to [the type definitions](https://developers.nlx.ai/headless-api-reference#response) for a complete structure.
   */
  responses: Response[];
  /**
   * A reactive value that is `true` whenever a response from the bot is in progress, used to render a message
   * bubble with loading dots.
   */
  waiting: boolean;
}

/**
 * A [custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks)
 * used to create fully custom chat widgets for web and mobile.
 * @param config - The configuration object for the chatbot.
 * @returns the hook object containing the chat state and methods.
 */
export const useChat = (config: Config): ChatHook => {
  const prevConversationHandler = useRef<ConversationHandler | null>(null);
  const prevConfig = useRef<Config | null>(null);

  useEffect(() => {
    prevConfig.current = config;
  }, [config]);

  const conversationHandler: ConversationHandler = useMemo(() => {
    // Prevent re-initialization if backend-related props have not changed
    if (
      prevConfig.current != null &&
      prevConversationHandler.current != null &&
      !shouldReinitialize(prevConfig.current, config)
    ) {
      return prevConversationHandler.current;
    }
    const newHandler = createConversation(config);
    prevConversationHandler.current = newHandler;
    return newHandler;
  }, [config]);

  const [responses, setResponses] = useState<Response[]>(
    config.responses ?? [],
  );

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    conversationHandler.subscribe(setResponses);
    return () => {
      conversationHandler.destroy();
    };
  }, [conversationHandler]);

  const lastMessage = last<Response>(responses);
  const isWaiting = lastMessage?.type === "user";

  return {
    conversationHandler,
    inputValue,
    responses,
    waiting: isWaiting,
    setInputValue,
  };
};

export default useChat;
