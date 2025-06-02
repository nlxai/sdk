import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./04-04-guide-html-components.md?raw";

export const navGroup = "Custom Components";
export const title = "HTML Template Syntax";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
