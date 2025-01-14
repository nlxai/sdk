import { type FC } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./headless-api-reference.md?raw";

export const HeadlessApi: FC<unknown> = () => {
  return (
    <>
      <PageTitle pretitle="Headless API" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
