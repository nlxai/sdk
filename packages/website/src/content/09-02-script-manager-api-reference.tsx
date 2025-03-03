import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import content from "./script-manager-api-reference.md?raw";

export const navGroup: string = "Script manager";

export const title: string = "API reference";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
    </>
  );
};
