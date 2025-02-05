import { useState, type FC } from "react";

import { PageContent } from "../components/PageContent";
import { BehaviorEditor } from "../components/ChatConfiguration";
import { Behavior, setupSnippet } from "../snippets";

export const content = `
The widget can be configured to handle a number of custom behaviors. Select one from below and see how the code snippet changes:
`;

export const codeContent = (behavior: Behavior): string => `
~~~html
${setupSnippet({
  config: { botUrl: "", languageCode: "en-US", headers: { "nlx-api-key": "" } },
  titleBar: { title: "Support chat" },
  behavior,
})}
~~~
`;

export const navGroup: string = "Web widget";

export const title: string = "Custom behaviors";

export const Content: FC<unknown> = () => {
  const [behavior, setBehavior] = useState<Behavior>(Behavior.Simple);
  return (
    <div className="space-y-4">
      <PageContent md={content} />
      <BehaviorEditor behavior={behavior} setBehavior={setBehavior} />
      <PageContent md={codeContent(behavior)} />
    </div>
  );
};
