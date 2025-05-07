import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import markdownContent from "./01-03-touchpoint-ui-Core-Concepts.md?raw";

export const content = markdownContent;

export const navGroup: string = "Introduction";

export const title: string = "Core Concepts";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
