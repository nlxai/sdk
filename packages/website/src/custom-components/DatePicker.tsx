import htm from "htm";
import "./DatePicker.css";
import { createElement, useEffect, type FC, useState } from "react";

const html = htm.bind(createElement);

export const DatePicker: FC<{
  submitted: boolean;
  onSubmit: (date: Date) => void;
}> = ({ submitted, onSubmit }) => {
  const [datepicker, setDatepicker] = useState(null);

  useEffect(() => {
    const elem = document.getElementById("datepicker");
    const datepicker = new (window as any).Datepicker(elem, {
      weekStart: 1, // Monday
    });
    datepicker.setDate(new Date());
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setDatepicker(datepicker);
  }, []);

  return html`
    <form
      className="chat-datepicker"
      onSubmit=${(ev: any) => {
        ev.preventDefault();

        const date = (datepicker as any).getDate();
        // initial eslint integration
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onSubmit(date);

        (datepicker as any).setDate({ clear: true });
      }}
    >
      <div id="datepicker"></div>
      <button type="submit" disabled=${submitted}>Submit</button>
    </form>
  `;
};
