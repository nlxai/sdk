/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/chat-core";
import { createContext, useContext } from "react";

export interface ContextValue {
  handler: ConversationHandler | null;
}

export const Context = createContext<ContextValue>({
  handler: null,
});

export const useTouchpointContext = (): ContextValue => {
  return useContext(Context);
};
