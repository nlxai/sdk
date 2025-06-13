import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./05-00-guide-building-custom-components.md?raw";

export const navGroup = "Custom Components";
export const title = "Getting Started";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
