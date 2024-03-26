import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { setupSnippet } from "../snippets";

export const content = `
The simplest way to talk to a bot is to include an out-of-the-box chat widget on your existing website.

~~~html
${setupSnippet({
  config: { botUrl: "", languageCode: "en-US" },
  titleBar: { title: "Support chat" }
})}
~~~

In this snippet, the script is deferred in order to reduce impact on page speed. After the script is initialized, we use the \`nlxai.chatWidget\` global to instantiate the widget. The following parameters are used:
- \`config\`: the bot configuration, including the bot URL obtained and headers obtained from the deployment of your bot.
- \`titleBar\`: configuration for the header bar of the widget, containing the following fields:
  - \`title\`: the text content of the title, e.g. "Support chat".
  - \`logo\`: the static URL of a logo image that appears left of the title.
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const WebWidgetSetup = () => {
  return (
    <>
      <PageTitle pretitle="Web widget" title="Setup" />
      <PageContent md={content} />
    </>
  );
};
