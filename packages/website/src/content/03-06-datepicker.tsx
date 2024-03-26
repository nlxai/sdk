import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { DatePicker } from "../custom-components/DatePicker";
import { InlineWidget, type Item } from "../components/InlineWidget";
import { datePickerSnippet } from "../snippets";

export const content = `
This component allows for the user to select a date. For example, the user could select a date of birth, or a date of an appointment. The date picker is a text input that opens a calendar when clicked. The user can then select a date that they are looking for flight tickets.

~~~js
${datePickerSnippet}
~~~
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const WebWidgetComponentsDatePicker = () => {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const items: Item[][] = [
    [
      {
        type: "custom",
        element: (
          <DatePicker
            submitted={submitted}
            onSubmit={(date: Date) => {
              setSubmitted(true);
              setDate(date);
            }}
          />
        ),
      },
    ],
  ];

  if (submitted) {
    const formattedDate = (window as any).Datepicker.formatDate(
      date,
      "MM d, yyyy",
    );
    items.push([
      {
        type: "bot",
        message: `Thank you! We will look for flights on ${formattedDate}.`,
      },
    ]);
  }

  return (
    <>
      <PageTitle pretitle="Web widget components" title="Date picker" />
      <InlineWidget className="mb-8" items={items} />
      <PageContent md={content} />
    </>
  );
};
