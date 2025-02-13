import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import buttonContent from "./03-04-touchpoint-Buttons.md?raw";

export const content = buttonContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "Buttons";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
