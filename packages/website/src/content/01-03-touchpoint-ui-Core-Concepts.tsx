import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import markdownContent from "./01-03-touchpoint-ui-Core-Concepts.md?raw";


export const navGroup: string = "Introduction";

export const title: string = "Core Concepts";

export const content = `
Touchpoint UI provides the interface for conversations between your users and your NLX applications. Understanding these core concepts will help you effectively integrate and customize the experience.
${markdownContent}`;

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
