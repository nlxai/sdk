import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { touchpointUiSetupSnippet } from "../snippets";
import configOptions from "./02-01-touchpoint-ui-setup.md?raw";

export const content = `
The NLX Touchpoint widget provides a customizable chat interface that you can embed in your web applications. This widget allows users to interact with your application and provides a seamless conversational experience.

## Quick Start

Add the following code to your HTML file:
~~~html
${touchpointUiSetupSnippet({
  config: { botUrl: "", languageCode: "en-US", headers: { "nlx-api-key": "" } },
})}
~~~
${configOptions}
`;

export const navGroup: string = "Touchpoint";

export const title: string = "Setup";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
