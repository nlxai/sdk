import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-08-guide-advanced-touchpoint-management.md?raw";

export const navGroup = "Touchpoint Guides";
export const title = "Visibility Management";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
