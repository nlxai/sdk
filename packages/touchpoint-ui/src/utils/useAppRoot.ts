/* eslint-disable jsdoc/require-jsdoc */
import { createContext, type RefObject, useContext } from "react";

const AppRootContext = createContext<RefObject<HTMLElement> | null>(null);

export const AppRootProvider = AppRootContext.Provider;

export const useAppRoot = (): RefObject<HTMLElement> | null =>
  useContext(AppRootContext);
