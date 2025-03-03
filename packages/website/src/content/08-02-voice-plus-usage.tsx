import { type FC, useState } from "react";

import { PageContent } from "../components/PageContent";
import { RadioList } from "../components/RadioList";
import {
  Environment,
  umdScriptTags,
  voicePlusSetupSnippet,
  voicePlusSnippet,
} from "../snippets";

const header = `
The Voice+ client is initiated with _dynamic_ params and _hard-coded_ parameters.

### Hard-Coded params

Hard-coded params should be simply copied and pasted from the NLX console. They are:

- \`workspaceId\`: the ID of the Dialog Studio workspace.
- \`scriptId\`: the ID of the Voice+ script inside the workspace.
- \`apiKey\`: the API key generated on the script.

### Dynamic Params

Dynamic params should be set based on the user's context. They are

- \`conversationId\`: should be passed to your Voice+ client upon initialization (via, for instance, a URL param)
- \`languageCode\`: should be set based on the user's language. If you don't support internationalization you can hard-code this to the language you support.

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
  // initial eslint integration
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  throw new Error("Unexpected object: " + x);
}

function getUsageFrom(usageFrom: Usage): string {
  const persitanceCodeSample = (
    usageFrom: Usage.WithPersistanceBundled | Usage.WithPersitanceHTML,
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ) => {
    const environment =
      usageFrom === Usage.WithPersitanceHTML
        ? Environment.Html
        : Environment.Bundle;
    const content = `let conversationId = new URLSearchParams(window.location.search).get("cid");

if(conversationId != null) {
  localStorage.setItem(MULTIMODAL_SESSION_KEY, conversationIdFromURL);
} else {
  conversationId = localStorage.getItem(MULTIMODAL_SESSION_KEY);
}

${voicePlusSnippet({
  environment,
  config: {
    conversationIdSnippet: "conversationId",
    languageCodeSnippet: "navigator.language",
  },
})}`;
    if (environment === Environment.Html) {
      return `~~~html
${umdScriptTags.voicePlusCore}
<script>
${content
  .split("\n")
  .map((line) => "  " + line)
  .join("\n")}
</script>
~~~`;
    }

    return `~~~typescript
import * as voicePlus from "@nlxai/voice-plus-core"

${content}
~~~`;
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
${voicePlusSetupSnippet({
  environment: Environment.Html,
  config: {
    conversationIdSnippet:
      'new URLSearchParams(window.location.search).get("cid")',
    languageCodeSnippet: "navigator.language",
  },
})}
~~~`;
    case Usage.WithPersitanceHTML:
    case Usage.WithPersistanceBundled:
      return `
## Persisting \`conversationId\` between Pages (in ${usageFrom === Usage.WithPersitanceHTML ? "HTML" : "JavaScript"})

The \`conversationID\` and the \`languageCode\` must be set dynamically.
In this example,
- Initially, the \`conversationId\` comes from a URL search param (\`CID\`, e.g. \`http://example.com?cid=123\`).
    - then it is stored in \`localStorage\`
    - on on subsequent pages, if the URL search param is missing, it will fetch the value from  \`localStorage\`
- the \`languageCode\` comes from the browser's language settings. (\`navigator.language\`)

Storing the \`conversationId\` in local storage allows for navigation between pages without passing the CID in a search param.

${persitanceCodeSample(usageFrom)}
`;
    case Usage.Node:
      return `
## From Node.js (or other non-web environments)

The \`conversationID\` and the \`languageCode\` must be set dynamically.

When not using web, you'll have to determine how to fetch these on a case-by-case basis.

~~~typescript
${voicePlusSetupSnippet({ environment: Environment.Node })}
~~~`;
    default:
      assertNever(usageFrom); // exhaustiveness checking
  }
}

export const navGroup: string = "Voice+";

export const title: string = "Usage";

export const Content: FC<unknown> = () => {
  const [usageFrom, setUsageFrom] = useState<Usage>(Usage.SimpleHTML);
  return (
    <>
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
