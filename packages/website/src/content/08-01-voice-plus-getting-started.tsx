import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { Environment, voicePlusSetupSnippet } from "../snippets";

export const content = `
The [@nlxai/voice-plus-core](https://www.npmjs.com/package/@nlxai/voice-plus-core) package is used to implement Voice+ conversational applications. By installing the SDK and creating a client instance specific to a journey, you can send steps in response to any user interaction, triggering voice feedback on a second channel (e.g. voice).

## Setup

On a webpage:

~~~html
${voicePlusSetupSnippet({ environment: Environment.Html })}
~~~

In a bundled JavaScript application or Node.js:

~~~js
${voicePlusSetupSnippet({ environment: Environment.Bundle })}
~~~
`;

export const navGroup: string = "Voice+";

export const title: string = "Getting started";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
    </>
  );
};
