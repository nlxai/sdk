import React, { useState } from "react";
import { umdScriptTags } from "../constants";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { RadioList } from "../components/RadioList";

const header = `
The Multimodal client is initiated with _dynamic_ params and _hard-coded_ parameters.

### Hard-Coded params

Hard-coded params should be simply copied and pasted from the NLX console. They are

- \`workspaceId\` for your workspace
- \`journeyId\` where the step(s) exists
- \`apiKey\` every journey has a correlated api key

### Dynamic Params

Dynamic params should be set based on the user's context. They are

- \`conversationId\` should be passed to your multimodal from the intent (via, for instance, a URL param)
- \`languageCode\` should be set based on the user's language. If you don't support internationalization you can hard-code this to the language you support.

## Examples
Here are some examples for different usages:
`;

enum Usage {
  SimpleHTML,
  WithPersitanceHTML,
  WithPersistanceBundled,
  Node,
}

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function getUsageFrom(usageFrom: Usage): string {
  const withPersistanceContent = `The \`conversationID\` and the \`languageCode\` must be set dynamically.
In this example,
- Initially, the \`conversationId\` comes from a URL search param (\`CID\`, e.g. \`http://example.com?cid=123\`).
    - then it is stored in \`localStorage\`
    - on on subsequent pages, if the URL search param is missing, it will fetch the value from  \`localStorage\`
- the \`languageCode\` comes from the browser's language settings. (\`navigator.language\`)

Storing the \`conversationId\` in local storage allows for navigation between pages without passing the CID in a search param.`;

  const withPersitanceJavascript = (
    clientName: string,
    indentSpaces: number = 0,
  ) => {
    const content = `let conversationId = new URLSearchParams(window.location.search).get("cid");

if(conversationId != null) {
  localStorage.setItem(VOICE_COMPASS_SESSION_KEY, conversationIdFromURL);
} else {
  conversationId = localStorage.getItem(VOICE_COMPASS_SESSION_KEY);
}

const client = ${clientName}.create({
  // HARD CODED PARAMS
  apiKey: "REPLACE_WITH_API_KEY",
  workspaceId: "REPLACE_WITH_WORKSPACE_ID",
  journeyId: "REPLACE_WITH_JOURNEY_ID",

  // DYNAMIC PARAMS
  conversationId: conversationId,
  languageCode: navigator.language
});

client.sendStep("REPLACE_WITH_STEP_ID");
`;
    const prefixString = " ".repeat(indentSpaces);
    return content
      .split("\n")
      .map((line) => prefixString + line)
      .join("\n");
  };

  switch (usageFrom) {
    case Usage.SimpleHTML:
      return `
## A simple HTML example

The \`conversationID\` and the \`languageCode\` must be set dynamically.

In this example,
- the \`conversationId\` comes from a URL search param (\`CID\`, e.g. \`http://example.com?cid=123\`).
- the \`languageCode\` comes from the browser's language settings. (\`navigator.language\`)

_Note: When using this approach, pass \`conversationId\` in the URL as a search param when navigating to new pages.
For an alternative, see the next example._

~~~html
<!-- Multimodal sample HTML -->
<!-- Downloaded from https://nlxai.github.io/#/multimodal-usage -->
<html lang="en">
  <head>
    <title>NLX Multimodal Example</title>
  </head>
  <body>
    <script defer src="${umdScriptTags.voiceCompass}"></script>
    <script>
      const client = nlxai.voiceCompass.create({
        // HARD CODED PARAMS
        apiKey: "REPLACE_WITH_API_KEY",
        workspaceId: "REPLACE_WITH_WORKSPACE_ID",
        journeyId: "REPLACE_WITH_JOURNEY_ID",

        // DYNAMIC PARAMS
        conversationId: new URLSearchParams(window.location.search).get("cid"),
        languageCode: navigator.language
      });

      client.sendStep('REPLACE_WITH_STEP_ID');
    </script>
  </body>
</html>
~~~`;
    case Usage.WithPersitanceHTML:
      return `
## Persisting \`conversationId\` between Pages (in HTML)

${withPersistanceContent}

~~~html
<!-- Multimodal sample HTML -->
<!-- Downloaded from https://nlxai.github.io/#/multimodal-usage -->
<html lang="en">
  <head>
    <title>NLX Multimodal Example</title>
  </head>
  <body>
    <script defer src="${umdScriptTags.voiceCompass}"></script>
    <script>
${withPersitanceJavascript("nlxai.voiceCompass", 6)}
    </script>
  </body>
</html>
~~~`;

    case Usage.WithPersistanceBundled:
      return `
## Persisting \`conversationId\` between Pages (in JavaScript)

${withPersistanceContent}

~~~typescript

import voiceCompass from '@nlxai/voice-compass'

${withPersitanceJavascript("voiceCompass")}
~~~`;
    case Usage.Node:
      return `
## From Node.js (or other non-web environments)

The \`conversationID\` and the \`languageCode\` must be set dynamically.

When not using web, you'll have to determine how to fetch these on a case-by-case basis.

~~~typescript

import voiceCompass from '@nlxai/voice-compass'

const client = voiceCompass.create({
  // HARD CODED PARAMS
  apiKey: "REPLACE_WITH_API_KEY",
  workspaceId: "REPLACE_WITH_WORKSPACE_ID",
  journeyId: "REPLACE_WITH_JOURNEY_ID",

  // DYNAMIC PARAMS
  conversationId:  "REPLACE_WITH_CONVERSATION_ID",
  languageCode: "REPLACE_WITH_LANGUAGE_CODE"
});

client.sendStep("REPLACE_WITH_STEP_ID");
~~~`;
    default:
      assertNever(usageFrom); // exhaustiveness checking
  }
}

export const MultimodalUsage = () => {
  const [usageFrom, setUsageFrom] = useState<Usage>(Usage.SimpleHTML);
  return (
    <>
      <PageTitle pretitle="Voice Compass" title="Usage" />
      <PageContent md={header} />
      <RadioList
        selected={usageFrom}
        onChange={setUsageFrom}
        options={[
          {
            value: Usage.SimpleHTML,
            label: "Simple usage in HTML",
            id: "simple",
          },
          {
            value: Usage.WithPersitanceHTML,
            label: "Persisting `conversationId` between Pages (in HTML)",
            id: "persistance-html",
          },
          {
            value: Usage.WithPersistanceBundled,
            label: "Persisting `conversationId` between Pages (in JavaScript)",
            id: "persistance-bundle",
          },
          {
            value: Usage.Node,
            label: "From Node.js or other non-web environments",
            id: "nodejs",
          },
        ]}
      />
      <br />
      <PageContent md={getUsageFrom(usageFrom)} />
    </>
  );
};
