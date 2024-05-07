import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { DatePicker } from "../custom-components/DatePicker";
import { InlineWidget, type Item } from "../components/InlineWidget";

export const content = `
This component allows for the user to select a date. For example, the user could select a date of birth, or a date of an appointment. The date picker is a text input that opens a calendar when clicked. The user can then select a date that they are looking for flight tickets.

~~~js
const DatePicker = ({ submitted, onSubmit }) => {
  const [datepicker, setDatepicker] = useState(null);

  useEffect(() => {
    const elem = document.getElementById("datepicker");
    const datepicker = new window.Datepicker(elem, {
      weekStart: 1, // Monday
    });
    datepicker.setDate(new Date());
    setDatepicker(datepicker);
  }, []);

  return html\`
    <form
      className="chat-datepicker"
      onSubmit=\${(ev) => {
        ev.preventDefault();

        const date = datepicker.getDate();
        onSubmit(date);

        datepicker.setDate({ clear: true });
      }}
    >
      <div id="datepicker"></div>
      <button type="submit" disabled=\${submitted}>Submit</button>
    </form>
  \`;
};
~~~
`;

export const WebWidgetComponentsDatePicker = (): JSX.Element => {
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
