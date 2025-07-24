import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { packageUrls } from "../constants";

export const content = `
This is the official JavaScript SDK to communicate with conversational applications created using the NLX Platform. It contains the following packages:
* [@nlxai/touchpoint-ui](${packageUrls.touchpointUi}): The modern and themeable chat widget for NLX applications.
* [@nlxai/core](${packageUrls.core}): vanilla JavaScript SDK for creating fully custom chat widgets.
* [@nlxai/voice-plus-core](${packageUrls.voicePlusCore}): Voice+ capabilities.
`;

export const navGroup: string = "Introduction";

export const title: string = "Getting started";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
