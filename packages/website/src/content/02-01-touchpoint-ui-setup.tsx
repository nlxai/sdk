import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { touchpointUiSetupSnippet } from "../snippets";

export const content = `
The simplest way to talk to an application is to include an out-of-the-box Touchpoint widget on your existing website.

~~~html
${touchpointUiSetupSnippet({
  config: { botUrl: "", languageCode: "en-US", headers: { "nlx-api-key": "" } },
})}
~~~

In this snippet, the script is deferred in order to reduce impact on page speed. After the script is initialized, we use the \`nlxai.touchpointUi\` global to instantiate the widget. The following parameters are used:
- \`config\`: the [bot configuration](/headless-api-reference#interfacesconfigmd), including the bot URL obtained and headers obtained from the deployment of your bot.
`;

export const navGroup: string = "Touchpoint";

export const title: string = "Setup";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
