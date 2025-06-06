import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./02-04-guide-touchpoint-chat-modes.md?raw";

export const navGroup = "Touchpoint Setup";
export const title = "Chat Modes";

export const content = `
Touchpoint UI offers two distinct chat input modes ('Assistant Style' and 'Classic Chat Style') each designed for different use cases and user experiences.

${ContentRaw}`;

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
