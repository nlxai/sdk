import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import baseTextContent from "./04-02-touchpoint-Typography.md?raw";

export const content = baseTextContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "Typography";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
