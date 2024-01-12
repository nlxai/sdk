import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { InlineWidget, Item } from "../components/InlineWidget";
import { disclaimerSnippet } from "../snippets";
import { Payment } from "../custom-components/Payment";

export const content = `
This component allows you to pay for a product or service directly in the chat. You can use a credit card, or other methods like Apple Pay or Google Pay via Stripe.

~~~js
${disclaimerSnippet}
~~~
`;

export const WebWidgetComponentsPayment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const items: Item[][] = [
    [
      {
        type: "custom",
        element: <Payment />,
      },
    ],
  ];

  if (submitted) {
    items.push([
      {
        type: "bot",
        message: `Thank you! Your payment was submitted.`,
      },
    ]);
  }

  return (
    <>
      <PageTitle pretitle="Web widget components" title="Payment" />
      <InlineWidget className="mb-8" items={items} />
      <PageContent md={content} />
    </>
  );
};
