/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/chat-core";
import { createContext, useContext } from "react";
import { type ColorMode, type WindowSize } from "./types";

export interface ContextValue {
  windowSize: WindowSize;
  colorMode: ColorMode;
  handler: ConversationHandler | null;
}

export const Context = createContext<ContextValue>({
  colorMode: "dark",
  windowSize: "half",
  handler: null,
});

export const useTouchpointContext = (): ContextValue => {
  return useContext(Context);
};
