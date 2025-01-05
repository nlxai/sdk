/* eslint-disable jsdoc/require-jsdoc */
import { createContext, useContext } from "react";
import { type ColorMode } from "./types";

export interface ContextValue {
  mode: ColorMode;
}

export const Context = createContext<ContextValue>({ mode: "dark" });

export const useContextValue = (): ContextValue => {
  return useContext(Context);
};
