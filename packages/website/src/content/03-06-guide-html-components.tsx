import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-06-guide-html-components.md?raw";

export const navGroup = "Touchpoint Guides";
export const title = "HTML Components without JSX";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
