import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import themeContent from "./03-03-touchpoint-ui-theming.md?raw";

export const content = themeContent;

export const navGroup: string = "Touchpoint Guides";

export const title: string = "Advanced Theming";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
