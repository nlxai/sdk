import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import markdownContent from "./03-01-touchpoint-ui-ConversationHandler.md?raw";

export const content = markdownContent;

export const navGroup: string = "Conversation Control";

export const title: string = "The Conversation Handler";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
