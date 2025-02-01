import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { packageUrls } from "../constants";

export const content = `
This is the official JavaScript SDK to communicate with conversational bots created using NLX Dialog Studio. It contains the following packages:
* [@nlxai/touchpoint-ui](${packageUrls.touchpointUi}): Beta - the modern and themeable chat widget for NLX applications.
* [@nlxai/chat-widget](${packageUrls.chatWidget}): the previous out-of-the-box, themeable NLX widget; it will be deprecated in Q1 2025 - use Touchpoint UI for new projects.
* [@nlxai/chat-react](${packageUrls.chatReact}): React custom hook for building chat widgets.
* [@nlxai/chat-preact](${packageUrls.chatPreact}): Preact custom hook for building chat widgets.
* [@nlxai/chat-core](${packageUrls.chatCore}): vanilla JavaScript SDK for creating fully custom chat widgets.
* [@nlxai/voice-plus-core](${packageUrls.voicePlusCore}): Voice+ capabilities.
`;

export const navGroup: string = "Introduction";

export const title: string = "Getting started";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
