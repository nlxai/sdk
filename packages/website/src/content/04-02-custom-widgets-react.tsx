import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { customWidgetSnippet } from "../snippets";

export const content = `
The React and Preact packages expose a single custom hook called [useChat]().

The following code snippet shows a few features easily implemented using this hook:
- set up a controlled input field.
- send a message when the enter key is pressed.
- render text messages from both the user and the bot.
- render a loading element when a bot response is expected to arrive.

~~~jsx
${customWidgetSnippet}
~~~
`;

export const CustomWidgetsReact = () => {
  return (
    <>
      <PageTitle pretitle="Custom widgets" title="React & Preact" />
      <PageContent md={content} />
    </>
  );
};
