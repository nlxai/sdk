import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { BehaviorEditor } from "../components/ChatConfiguration";
import { Behavior, setupSnippet } from "../snippets";

export const content = `
The widget can be configured to handle a number of custom behaviors. Select one from below and see how the code snippet changes:
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const codeContent = (behavior: Behavior) => `
~~~html
${setupSnippet({
  config: { botUrl: "", languageCode: "en-US", headers: { "nlx-api-key": "" } },
  titleBar: { title: "Support chat" },
  behavior,
})}
~~~
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const WebWidgetCustomBehaviors = () => {
  const [behavior, setBehavior] = useState<Behavior>(Behavior.Simple);
  return (
    <>
      <PageTitle pretitle="Web widget" title="Custom behaviors" />
      <div className="space-y-4">
        <PageContent md={content} />
        <BehaviorEditor behavior={behavior} setBehavior={setBehavior} />
        <PageContent md={codeContent(behavior)} />
      </div>
    </>
  );
};
