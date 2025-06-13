import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-06-guide-persisting-history.md?raw";

export const navGroup = "Conversation Control";
export const title = "Persist Conversation History";

export const content = `
Persisting conversation history allows users to continue their conversations across page reloads, navigation, or browser sessions. You can use browser storage APIs to save and restore conversation state.

${ContentRaw}`;

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
