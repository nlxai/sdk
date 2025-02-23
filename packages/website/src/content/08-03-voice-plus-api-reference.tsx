import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import content from "./voice-plus-api-reference.md?raw";

export const navGroup: string = "Voice+";

export const title: string = "API reference";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
    </>
  );
};
