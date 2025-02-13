import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import smallTextContent from "./03-03-touchpoint-SmallText.md?raw";

export const content = smallTextContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "SmallText";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
