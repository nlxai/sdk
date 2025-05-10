import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-07-guide-managing-selection.md?raw";

export const navGroup = "Touchpoint Guides";
export const title = "Handling User Selection";

export const Content: FC<unknown> = () => {
  return <PageContent md={ContentRaw} />;
};
