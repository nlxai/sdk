import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./04-02-guide-managing-selection.md?raw";

export const navGroup = "Custom Components";
export const title = "Component Patterns";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
