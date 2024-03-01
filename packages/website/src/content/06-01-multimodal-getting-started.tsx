import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Environment, voiceCompassSetupSnippet } from "../snippets";

export const content = `
The [@nlxai/voice-compass](https://www.npmjs.com/package/@nlxai/voice-compass) package allows integrating custom out-of-band interactions into bots using voice channels.

## How it works

From a bot's voice [flow][flow]
1. send a link to a user's device to your voice-compass-enabled destination
2. From your destination (presumably a website)...
    1. The user will use your interaction
    2. (Optionally) Use the voice compass API to communicate over the voice channel
    3. When the interaction is complete, use the voice compass API to return to the voice flow.
3. in the _flow_, use a [MultiModal node][multimodal-node] to handle the completion.

The Voice Compass API interacts with an intent using a [step id][step-id] from a [journey][journey], with an optional payload.

The step ID is found in dialog studio under journeys.

## An example
In this example, the user will be booking a seat on the train.

our journey will have four steps:

| Description           | Action   | Step ID                              |
| --------------------- | -------- | ------------------------------------ |
| Greet the user        | none     | aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa |
| Confirm Seat Selection| Continue | bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb |
| Get Help              | Escalate | cccccccc-cccc-cccc-cccc-cccccccccccc |
| Cancel                | End      | dddddddd-dddd-dddd-dddd-dddddddddddd |

When the user reaches the train booking website, we
1. setup the voice compass client
2. send a message over audio confirming the user has connected
3. based on the decision of the user, return to the voice flow.


~~~js
const GREET_STEP_ID = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const CONFIRM_SEAT_STEP_ID = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
const GET_HELP_STEP_ID = 'cccccccc-cccc-cccc-cccc-cccccccccccc';
const CANCEL_STEP_ID = 'dddddddd-dddd-dddd-dddd-dddddddddddd';

${voiceCompassSetupSnippet({ environment: Environment.Bundle, config: { testStepId: "GREET_STEP_ID" } })}

// show a dialog asking the user to choose a seat
try {
  chosenSeat = await showSeatSelectionDialog();
} catch (e) {
  reportError(e);
  chosenSeat = { type: 'error' }
}

// report results back to the flow
switch (chosenSeat.type) {
  case 'selected':
    // successful seat selection, continue
    client.sendStep(CONFIRM_SEAT_STEP_ID, chosenSeat);
  break;

  case 'cancelled':
    client.sendStep(CANCEL_STEP_ID, chosenSeat);
  break;

  default:
    client.sendStep(GET_HELP_STEP_ID, chosenSeat);
  break;
}
~~~

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
<!--
TODO: add proper links...
-->
[multimodal-node]: https://docs.studio.nlx.ai/intentflows/documentation-flows/flows-build-mode/nodes
[step-id]: <>
[journey]: <>
`;

export const MultimodalGettingStarted = () => {
  return (
    <>
      <PageTitle pretitle="Voice Compass" title="Getting started" />
      <PageContent md={content} />
    </>
  );
};
