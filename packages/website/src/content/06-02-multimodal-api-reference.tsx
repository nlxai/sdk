import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";

export const content = `
The starting point of the package is the \`create\` method, which initializes a Voice Compass client. It takes the following parameters:

- \`apiKey\`: the API key generated for the journey.
- \`journeyId\`: the ID of the journey.

*Note: these values are collected and auto-generated when the journey is deployed.*

The resulting client has the following methods:

- \`sendStep\`, sending a step update with the following fields:
  - \`stepId\`: the next step to transition to.
  - \`context\` (optional, advanced): set Dialog Studio context attributes.
- \`changeJourneyId\` (advanced): transition to a new journey.
- \`getLatestStepId\` (advanced): retrieve the ID of the last step played.
`;

export const MultimodalApiReference = () => {
  return (
    <>
      <PageTitle pretitle="Voice Compass" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
