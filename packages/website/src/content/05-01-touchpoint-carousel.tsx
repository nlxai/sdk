import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import baseTextContent from "./05-01-touchpoint-carousel.md?raw";

export const content = baseTextContent;

export const navGroup: string = "Custom Components";

export const title: string = "Carousel";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
