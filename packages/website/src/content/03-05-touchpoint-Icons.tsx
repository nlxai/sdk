import { type FC, isValidElement } from "react";

import { PageContent } from "../components/PageContent";
import iconsContent from "./03-05-touchpoint-Icons.md?raw";

export const content = `${iconsContent}`;

export const navGroup: string = "Touchpoint components";

export const title: string = "Icons";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
