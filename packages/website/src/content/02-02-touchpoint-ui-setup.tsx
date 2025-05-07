import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import configOptions from "./02-02-touchpoint-ui-setup.md?raw";

export const content = `
The NLX Touchpoint widget provides a customizable chat interface that you can embed in your web applications. This widget allows users to interact with your application and provides a seamless conversational experience.

${configOptions}
`;

export const navGroup: string = "Touchpoint";

export const title: string = "Configuration";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
