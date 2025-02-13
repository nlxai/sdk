import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import carouselContent from "./03-07-touchpoint-Carousel.md?raw";

export const content = carouselContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "Carousel with Touchpoint";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
