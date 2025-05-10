import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-05-guide-custom-launch.md?raw";

export const navGroup = "Touchpoint Guides";
export const title = "Customizing Launch Behavior";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
