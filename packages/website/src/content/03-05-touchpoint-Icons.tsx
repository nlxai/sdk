import { type FC } from "react";
import customCardContent from "./03-05-touchpoint-Icons.md?raw";

import { PageContent } from "../components/PageContent";

export const content = customCardContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "Icons";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
