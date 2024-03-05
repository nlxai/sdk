import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";

export const content = `
In this example, the user will be booking a seat on the train.

The [journey][journey] will have four steps:

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

// fetch the conversation from the url search params
const conversationId = new URLSearchParams(window.location.search).get("cid")

const client = nlxai.voiceCompass.create({
  apiKey: "REPLACE_WITH_API_KEY",
  workspaceId: "REPLACE_WITH_WORKSPACE_ID",
  journeyId: "REPLACE_WITH_JOURNEY_ID",
  languageCode: "REPLACE_WITH_LANGUAGE_CODE",
  conversationId,
});

client.sendStep(GREET_STEP_ID);

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


[//]: <> (TODO: add proper links...)

[journey]: <>
[journey]: <>

`;

export const MultimodalOnASPA = () => {
  return (
    <>
      <PageTitle pretitle="Voice Compass" title="Usage on a single page app" />
      <PageContent md={content} />
    </>
  );
};
