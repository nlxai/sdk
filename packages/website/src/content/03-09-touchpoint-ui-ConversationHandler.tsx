import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import markdownContent from "./03-09-touchpoint-ui-ConversationHandler.md?raw";

export const content = markdownContent;

export const navGroup: string = "Touchpoint Guides";

export const title: string = "Conversation Handler";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
