import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import themeContent from "./02-02-touchpoint-ui-theming.md?raw";

export const content = themeContent;

export const navGroup: string = "Touchpoint";

export const title: string = "Theming";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
