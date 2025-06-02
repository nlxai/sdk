import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-04-guide-subscribing-to-events.md?raw";

export const navGroup = "Conversation Control";
export const title = "Subscribing to Events";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
