import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-05-guide-show-hide-touchpoint.md?raw";

export const navGroup = "Conversation Control";
export const title = "Showing and Hiding Touchpoint";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
