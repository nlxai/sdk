import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { setupSnippet } from "../snippets";

export const content = `
The chat widget supports fully custom embeddable components to augment the out-of-the-box chat bubbles and choice buttons. Embeddable components represent the best-of-both-worlds combination of a fully built widget and one custom-engineered from the ground up.

## How it works

As the widget is built in [React](https://react.dev), it exposes the React instance that allows the user to define embeddable components that not only support fully custom styling but can interact with the conversation in a granular way. This component is included in the \`customModalities\` field of the widget configuration, and is rendered whenever the modality by the same key is triggered:

~~~html
${setupSnippet({
  config: { botUrl: "", languageCode: "en-US", headers: { "nlx-api-key": "" } },
  titleBar: { title: "Support chat" },
  customModalitiesExample: true,
})}
~~~
`;

export const navGroup: string = "Web widget components";

export const title: string = "Getting started";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
