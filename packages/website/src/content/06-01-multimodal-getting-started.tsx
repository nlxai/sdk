import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Environment, voiceCompassSetupSnippet } from "../snippets";

export const content = `
The [@nlxai/voice-compass](https://www.npmjs.com/package/@nlxai/voice-compass) package is used to implement multimodal conversational applications.

## How it works

From a bot's voice [flow][flow]
1. send a link to a user's device to your voice-compass-enabled destination
2. From your destination (presumably a website)...
    1. The user will use your interaction
    2. (Optionally) Use the voice compass API to communicate over the voice channel
    3. When the interaction is complete, use the voice compass API to return to the voice flow.
3. in the _flow_, use a [multimodal node][multimodal-node] to handle the completion.

The Voice Compass API interacts with an intent using a [step ID][step-id] from a [journey][journey], with an optional payload.

The step ID is found in Dialog Studio under journeys.

## Setup

On a webpage:

~~~html
${voiceCompassSetupSnippet({ environment: Environment.Html })}
~~~

In a bundled JavaScript application or Node.js:

~~~js
${voiceCompassSetupSnippet({ environment: Environment.Bundle })}
~~~

[flow]: https://docs.studio.nlx.ai/intentflows/overview

[//]: <> (TODO: add proper links...)

[multimodal-node]: https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/nodes
[step-id]: <>
[journey]: <>
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const MultimodalGettingStarted = () => {
  return (
    <>
      <PageTitle pretitle="Voice Compass" title="Getting started" />
      <PageContent md={content} />
    </>
  );
};
