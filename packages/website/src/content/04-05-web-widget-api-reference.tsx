import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import content from "./web-widget-api-reference.md?raw";

export const navGroup: string = "Web widget";

export const title: string = "API reference";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
