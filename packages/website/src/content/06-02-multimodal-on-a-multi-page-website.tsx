import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";

export const content = `
In this example, we will collect the user's birthday.

The [journey][journey] will have four steps:

| Description           | Action   | Step ID                              |
| --------------------- | -------- | ------------------------------------ |
| Greet the user        | none     | aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa |
| Confirm Birthday Acquisition| Continue | bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb |
| Get Help              | Escalate | cccccccc-cccc-cccc-cccc-cccccccccccc |
| Cancel                | End      | dddddddd-dddd-dddd-dddd-dddddddddddd |

When the user reaches the train booking website, we
1. setup the voice compass client
2. send a message over audio confirming the user has connected
3. based on the decision of the user, return to the voice flow.

Between pages, the voice compass client will be re-initialized using a saved conversation id

The setup code differs from SPA because in a multi-page app we need to

~~~js
const VOICE_COMPASS_SESSION_KEY = 'voiceCompassSession';


// load session if it exists
const session_string = localStorage.getItem(VOICE_COMPASS_SESSION_KEY);
const session =  session_string ? JSON.parse(session_string) : null;

// fetch the conversation from the url search params, or from local storage if it's not on the URL
const conversationId = new URLSearchParams(window.location.search).get("cid") ?? session.conversationId;

const client = nlxai.voiceCompass.create({
  apiKey: "REPLACE_WITH_API_KEY",
  workspaceId: "REPLACE_WITH_WORKSPACE_ID",
  journeyId: "REPLACE_WITH_JOURNEY_ID",
  languageCode: "REPLACE_WITH_LANGUAGE_CODE",

  // note: the next line loads any existing session from local storage
  localUpdate: session?.lastUpdate
  // and this line ensures that between pages
  onSessionUpdate: (session) => {
    localStorage.setItem(VOICE_COMPASS_SESSION_KEY, JSON.stringify(session));
  },
  conversationId
});


const GREET_STEP_ID = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
// send greeting
client.sendStep(GREET_STEP_ID);

<form>
~~~


[//]: <> (TODO: add proper links...)

[journey]: <>

`;

export const MultimodalOnAMultiPageWebsite = () => {
  return (
    <>
      <PageTitle
        pretitle="Voice Compass"
        title="Usage on a multi-page website"
      />
      <PageContent md={content} />
    </>
  );
};
