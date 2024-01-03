import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Environment, voiceCompassSetupSnippet } from "../snippets";

export const content = `
The [@nlxai/voice-compass]() package allows users to enhance existing visual assets (websites, mobile apps) with multimodal capabilities.

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

export const MultimodalSetup = () => {
  return (
    <>
      <PageTitle pretitle="Voice Compass" title="Getting started" />
      <PageContent md={content} />
    </>
  );
};
