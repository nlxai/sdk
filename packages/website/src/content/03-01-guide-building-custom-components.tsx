import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-01-guide-building-custom-components.md?raw";

export const navGroup = "Touchpoint Guides";
export const title = "Custom Components";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
