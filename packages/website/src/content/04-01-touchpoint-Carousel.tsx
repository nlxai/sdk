import { type FC } from "react";

import { PageContent } from "../components/PageContent";

import customCardContent from "./04-01-touchpoint-Carousel.md?raw";

export const content = customCardContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "Carousel";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
    </>
  );
};