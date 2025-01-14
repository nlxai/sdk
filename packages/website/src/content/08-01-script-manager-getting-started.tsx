import { type FC, useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { RadioList } from "../components/RadioList";
import { voicePlusWebSnippet } from "../snippets";

export const content = `
The [@nlxai/voice-plus-web](https://www.npmjs.com/package/@nlxai/voice-plus-web) package is used to manage Voice+ scripts without writing dedicated frontend code.

In contrast to the conventional Voice+ setup, where developers would use the [barebones Voice+ API](/multimodal-getting-started) to attach explicit event handling code to clicks and page loads, the journey manager works by pre-annotating your visual asset's interactive elements using the Dialog Studio desktop application.

Once you are ready, download a single code snippet and included on your page. Your asset is now enhanced with Voice+ capabilities.

## Setup

Add this code to the head of your document, including templates for the custom behaviors of your choice:
`;

export const codeContent = (config: { digressionButton: boolean }): string => {
  return `~~~html
${voicePlusWebSnippet(config)}
~~~`;
};

export const postContent = `
The \`nlxai.voicePlusWeb.run\` method takes an object argument with the following fields:
- \`config\`: a script configuration identical to that of [the regular Voice+ API](/voice-plus-getting-started).
- \`triggers\`: an object containing triggers that map step ID's to specific interactions or events such as page loads or clicks.
- \`onDigression\`: a callback used to handle digression, with the Voice+ client as an argument in case you are sending steps as a response.
`;

export const ScriptManagerGettingStarted: FC<unknown> = () => {
  const [digressionButton, setDigressionButton] = useState<boolean>(false);

  return (
    <>
      <PageTitle pretitle="Script manager" title="Getting started" />
      <PageContent md={content} />
      <div className="py-4">
        <RadioList
          options={[
            { id: "nothing", value: false, label: "Basic behavior" },
            { id: "digression", value: true, label: "Show digression button" },
          ]}
          selected={digressionButton}
          onChange={setDigressionButton}
        />
      </div>
      <PageContent md={codeContent({ digressionButton })} />
      <PageContent md={postContent} />
    </>
  );
};
