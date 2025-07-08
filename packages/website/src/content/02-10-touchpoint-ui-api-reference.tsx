import { type FC } from "react";
import { ApiDocContent } from "../components/PageContent";
import content from "./touchpoint-ui-api-reference.md?raw";

export const navGroup: string = "Touchpoint Setup";

export const title: string = "API reference";

export const Content: FC<unknown> = () => {
  return <ApiDocContent md={content} />;
};
