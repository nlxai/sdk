/* eslint-disable jsdoc/require-jsdoc */
import { createContext, useContext } from "react";
import { type Copy, defaultCopy } from "../copy";

const CopyContext = createContext<Copy>(defaultCopy("en-US"));

export const CopyProvider = CopyContext.Provider;

export const useCopy = (): Copy => useContext(CopyContext);
