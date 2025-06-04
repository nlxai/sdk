import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import markdownContent from "./02-05-touchpoint-ui-voice.md?raw";

export const content = markdownContent;

export const navGroup: string = "Touchpoint Setup";

export const title: string = "Native Voice Input";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
