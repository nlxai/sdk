import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-03-guide-custom-launch.md?raw";

export const navGroup = "Conversation Control";
export const title = "Launching with Context";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
