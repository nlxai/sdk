import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-06-guide-persisting-history.md?raw";

export const navGroup = "Conversation Control";
export const title = "Persisting History";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
