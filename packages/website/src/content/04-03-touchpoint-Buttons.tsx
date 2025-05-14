import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import buttonContent from "./04-03-touchpoint-Buttons.md?raw";
import { LaunchTouchpointButton } from "../components/LaunchTouchpointButton";

export const content = buttonContent;

export const navGroup: string = "Touchpoint components";

export const title: string = "Buttons";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
