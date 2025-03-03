import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import content from "./headless-api-reference.md?raw";

export const navGroup: string = "Headless API";

export const title: string = "API reference";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
    </>
  );
};
