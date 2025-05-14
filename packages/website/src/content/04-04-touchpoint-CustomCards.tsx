import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import customCardContent_p1 from "./04-04-touchpoint-CustomCards.md?raw";

export const content = customCardContent_p1;

export const navGroup: string = "Touchpoint components";

export const title: string = "Custom Cards";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
    </>
  );
};
