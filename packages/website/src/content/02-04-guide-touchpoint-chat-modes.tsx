import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./02-04-guide-touchpoint-chat-modes.md?raw";

export const navGroup = "Touchpoint Setup";
export const title = "Chat Modes";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
