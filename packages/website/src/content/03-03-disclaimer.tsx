import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Note } from "../components/Note";
import { Disclaimer } from "../custom-components/Disclaimer";
import { InlineWidget } from "../components/InlineWidget";
import { disclaimerSnippet } from "../snippets";

export const content = `
This disclaimer component can be used as a discrete notice at the beginning of the conversation. For example, they can allow users to opt in for tracking.

~~~js
${disclaimerSnippet}
~~~
`;

export const WebWidgetComponentsDisclaimer = () => {
  return (
    <>
      <PageTitle pretitle="Web widget components" title="Disclaimer" />
      <InlineWidget
        className="mb-8"
        items={[[{ type: "custom", element: <Disclaimer /> }]]}
      />
      <PageContent md={content} />
      <Note
        title="Note"
        body="This component example is purely presentational. What happens when the user clicks the 'Accept' or 'Deny' buttons should be wired up according individual tracking setups and privacy policy."
      />
    </>
  );
};
