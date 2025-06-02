import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./04-01-guide-building-custom-components.md?raw";

export const navGroup = "Custom Components";
export const title = "Building Components";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
