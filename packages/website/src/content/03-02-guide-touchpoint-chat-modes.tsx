import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-02-guide-touchpoint-chat-modes.md?raw";

export const navGroup = "Touchpoint Guides";
export const title = "Changing Chat Modes";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
