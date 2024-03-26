import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { InlineWidget, type Item } from "../components/InlineWidget";
import { disclaimerSnippet } from "../snippets";
import SecureInput from "../custom-components/SecureInput";

export const content = `
This component allows you to create a secure input field. The input field is rendered in an iframe, and the inputted data is sent to the bot via a secure channel. This means that the inputted data is not accessible to the website owner.

~~~js
${disclaimerSnippet}
~~~
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const WebWidgetComponentsSecureInput = () => {
  // initial eslint integration
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitted, setSubmitted] = useState(false);

  const items: Item[][] = [
    [
      {
        type: "custom",
        element: <SecureInput />,
      },
    ],
  ];

  if (submitted) {
    items.push([
      {
        type: "bot",
        message: `Thank you! You're now logged in.`,
      },
    ]);
  }

  return (
    <>
      <PageTitle pretitle="Web widget components" title="Secure input" />
      <InlineWidget className="mb-8" items={items} />
      <PageContent md={content} />
    </>
  );
};
