import { type FC } from "react";
import dateContent from "./05-06-touchpoint-DateInput.md?raw";

import { PageContent } from "../components/PageContent";

export const content = dateContent;

export const navGroup: string = "Component Library";

export const title: string = "DateInput";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
