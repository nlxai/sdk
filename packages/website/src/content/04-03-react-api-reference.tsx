import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./04-03-react-api-reference.md?raw";

export const ReactApi = (): JSX.Element => {
  return (
    <>
      <PageTitle pretitle="React API" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
