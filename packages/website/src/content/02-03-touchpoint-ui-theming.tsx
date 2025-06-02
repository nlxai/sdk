import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import themeContent from "./02-03-touchpoint-ui-theming.md?raw";

export const content = themeContent;

export const navGroup: string = "Touchpoint Setup";

export const title: string = "Theming and Styling";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
