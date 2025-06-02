import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-02-guide-sending-messages-and-choices.md?raw";

export const navGroup = "Conversation Control";
export const title = "Sending Messages and Choices";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
