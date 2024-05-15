import { type FC } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Environment, voiceCompassSetupSnippet } from "../snippets";

export const content = `
The [@nlxai/voice-compass](https://www.npmjs.com/package/@nlxai/voice-compass) package is used to implement multimodal conversational applications. By installing the SDK and creating a client instance specific to a journey, you can send steps in response to any user interaction, triggering voice feedback on a second channel (e.g. voice).

## Setup

On a webpage:

~~~html
${voiceCompassSetupSnippet({ environment: Environment.Html })}
~~~

In a bundled JavaScript application or Node.js:

~~~js
${voiceCompassSetupSnippet({ environment: Environment.Bundle })}
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
