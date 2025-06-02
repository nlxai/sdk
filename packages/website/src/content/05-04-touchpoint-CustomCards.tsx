import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import customCardContent from "./05-04-touchpoint-CustomCards.md?raw";

export const content = customCardContent;

export const navGroup: string = "Component Library";

export const title: string = "Custom Cards";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
