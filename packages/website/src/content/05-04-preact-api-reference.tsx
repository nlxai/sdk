import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import content from "./preact-api-reference.md?raw";

export const navGroup: string = "Custom widgets";

export const title: string = "Preact API reference";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
    </>
  );
};
