import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import customCardContent from "./04-04-touchpoint-CustomCards.md?raw";

export const content = customCardContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "Custom Cards";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
