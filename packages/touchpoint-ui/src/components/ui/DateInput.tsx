/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC, useState } from "react";
import { InputMask } from "@react-input/mask";
import { ArrowForward, Date } from "./Icons";
import { IconButton } from "./IconButton";

interface DateInputProps {
  onSubmit?: (date: string) => void;
}

const options = {
  mask: "MM / DD / YYYY",
  replacement: { D: /\d/, M: /\d/, Y: /\d/ },
  showMask: true,
};

export const DateInput: FC<DateInputProps> = ({ onSubmit }) => {
  const isDisabled = onSubmit == null;

  const [parsedInput, setParsedInput] = useState<string | null>(null);

  return (
    <div
      className={clsx(
        "relative bg-primary-5 flex items-center justify-between pl-4 py-2 pr-2 rounded-outer transition-colors duration-500 before:content-[''] before:absolute before:transition-colors before:-z-10 before:inset-0 before:bg-transparent",
        isDisabled ? "" : "hover:bg-secondary-20",
      )}
    >
      <div className="flex items-center">
        <Date className="w-4 h-4 text-primary-60" />
        <InputMask
          {...options}
          separate
          className={clsx(
            "bg-transparent text-primary-80 outline-0 ml-2 py-2.5",
            isDisabled
              ? "placeholder-primary-20 pointer-events-none"
              : "placeholder-primary-40",
          )}
          placeholder="MM / DD / YYYY"
          onChange={(event) => {
            const value = event.target.value;
            const [month, day, year] = value.split(" / ");
            if (
              month != null &&
              month.length === 2 &&
              day != null &&
              day.length === 2 &&
              year != null &&
              year.length === 4
            ) {
              setParsedInput(`${year}-${month}-${day}`);
            } else {
              setParsedInput(null);
            }
          }}
        />
      </div>
      <IconButton
        className="flex-none"
        label="Send message"
        onClick={
          parsedInput == null || onSubmit == null
            ? undefined
            : () => {
                onSubmit(parsedInput);
              }
        }
        type="main"
        Icon={ArrowForward}
      />
    </div>
  );
};
