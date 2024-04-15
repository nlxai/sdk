import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./06-03-multimodal-api-reference.md?raw";

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const HeadlessApi = () => {
  return (
    <>
      <PageTitle pretitle="Headless API" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
