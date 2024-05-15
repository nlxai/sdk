import { type FC } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { journeyManagerSnippet } from "../snippets";

export const content = `
The [@nlxai/journey-manager](https://www.npmjs.com/package/@nlxai/journey-manager) package is used to manage multimodal journeys without writing dedicated frontend code.

In contrast to the conventional multimodal setup, where developers would use the [barebones multimodal API](/multimodal-getting-started) to attach explicit event handling code to clicks and page loads, the journey manager works by pre-annotating your visual asset's interactive elements using the Dialog Studio desktop application.

Once you are ready, download a single code snippet and included on your page. Your asset is now enhanced with multimodal capabilities.

## Setup

Add this code to the head of your document:

~~~html
${journeyManagerSnippet}
~~~

The \`nlxai.journeyManager.run\` method has the following arguments:
- a journey configuration identical to that of [the regular multimodal API](/multimodal-getting-started).
- an object containing triggers that map step ID's to specific interactions or events such as page loads or clicks.
`;

export const JourneyManagerGettingStarted: FC<unknown> = () => {
  return (
    <>
      <PageTitle pretitle="Journey manager" title="Getting started" />
      <PageContent md={content} />
    </>
  );
};
