import { type FC } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Environment, multimodalSetupSnippet } from "../snippets";

export const content = `
The [@nlxai/multimodal](https://www.npmjs.com/package/@nlxai/multimodal) package is used to implement multimodal conversational applications. By installing the SDK and creating a client instance specific to a journey, you can send steps in response to any user interaction, triggering voice feedback on a second channel (e.g. voice).

## Setup

On a webpage:

~~~html
${multimodalSetupSnippet({ environment: Environment.Html })}
~~~

In a bundled JavaScript application or Node.js:

~~~js
${multimodalSetupSnippet({ environment: Environment.Bundle })}
~~~
`;

export const MultimodalGettingStarted: FC<unknown> = () => {
  return (
    <>
      <PageTitle pretitle="Multimodal" title="Getting started" />
      <PageContent md={content} />
    </>
  );
};
