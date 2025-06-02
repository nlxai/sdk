import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import buttonContent from "./05-03-touchpoint-Buttons.md?raw";

export const content = buttonContent;

export const navGroup: string = "Custom Components";

export const title: string = "Buttons";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
