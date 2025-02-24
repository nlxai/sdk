import { type FC } from "react";
import dateContent from "./03-06-touchpoint-DateInput.md?raw";

import { PageContent } from "../components/PageContent";

export const content = dateContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "DateInput";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
