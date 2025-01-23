import { type FC } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./script-manager-api-reference.md?raw";

export const navGroup: string = "Script manager";

export const title: string = "API reference";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageTitle pretitle="Script manager" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
