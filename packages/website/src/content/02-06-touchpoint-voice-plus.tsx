import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import configOptions from "./02-06-touchpoint-voice-plus.md?raw";

export const content = `

Bidirectional Voice Plus enables voice-driven web experiences through bidirectional communication between your application and NLX. Users can navigate pages, fill forms, and interact with your site using natural voice commands.
${configOptions}
`;

export const navGroup: string = "Touchpoint Setup";

export const title: string = "Bidirectional Voice+";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
