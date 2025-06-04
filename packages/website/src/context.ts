import { createContext, type Dispatch, type SetStateAction } from "react";

import { type SnippetEnv } from "./types";

export interface Context {
  snippetEnv: SnippetEnv;
  setSnippetEnv: Dispatch<SetStateAction<SnippetEnv>>;
}

export const ReactContext = createContext<Context>({
  snippetEnv: "html",
  setSnippetEnv: () => {},
});
