import { type FC } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./06-03-voice-plus-api-reference.md?raw";

export const VoicePlusApiReference: FC<unknown> = () => {
  return (
    <>
      <PageTitle pretitle="Voice+" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
