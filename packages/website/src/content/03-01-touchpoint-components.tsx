import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import touchpointComponentContent from "./03-01-touchpoint-components.md?raw";

export const content = touchpointComponentContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "Getting started with Touchpoint components";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
