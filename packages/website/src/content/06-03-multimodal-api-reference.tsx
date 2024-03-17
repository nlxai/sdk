import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./06-03-multimodal-api-reference.md?raw";

export const MultimodalApiReference = () => {
  return (
    <>
      <PageTitle pretitle="Voice Compass" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
