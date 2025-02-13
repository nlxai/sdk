import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import iconContent from "./03-06-touchpoint-Icons.md?raw";

export const content = iconContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "Icons";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
