import { type FC } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./web-widget-api-reference.md?raw";

export const WebWidgetApi: FC<unknown> = () => {
  return (
    <>
      <PageTitle pretitle="Web Widget API" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
