import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import content from "./react-api-reference.md?raw";

export const navGroup: string = "Custom widgets";

export const title: string = "React API reference";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
    </>
  );
};
