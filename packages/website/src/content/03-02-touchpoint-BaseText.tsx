import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import baseTextContent from "./03-02-touchpoint-BastText.md?raw";

export const content = baseTextContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "BaseText";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
