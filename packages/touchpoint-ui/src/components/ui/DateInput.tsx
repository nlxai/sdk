/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC, useState } from "react";
import { InputMask, unformat } from "@react-input/mask";
import { ArrowForward, Calendar } from "./Icons";
import { IconButton } from "./IconButton";

interface DateInputProps {
  onSubmit: () => void;
  isDisabled?: boolean;
}

const options = {
  mask: "DD / MM / YYYY",
  replacement: { D: /\d/, M: /\d/, Y: /\d/ },
};

export const DateInput: FC<DateInputProps> = ({
  onSubmit,
  isDisabled = false,
}) => {
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  return (
    <div
      className={`relative bg-primary-5 flex items-center justify-between pl-4 py-2 pr-2 rounded-plus transition-colors duration-500 before:content-[''] before:absolute before:transition-colors before:-z-10 before:inset-0 before:bg-transparent ${isDisabled ? "" : "hover:bg-secondary-20"}`}
    >
      <div className="flex items-center">
        <Calendar className="w-4 h-4 text-primary-60" />
        <InputMask
          {...options}
          separate
          className={`bg-transparent text-primary-80 outline-0 ml-2 py-2.5 ${isDisabled ? "placeholder-primary-20 pointer-events-none" : "placeholder-primary-40"}`}
          placeholder="DD / MM / YYYY"
          onChange={(event) => {
            const value = event.target.value;
            const input = unformat(value, options);
            console.log(value); // <-- the value to parse and use

            if (input?.length === 8) {
              setIsInputEmpty(false);
            } else {
              setIsInputEmpty(true);
            }
          }}
        />
      </div>
      <IconButton
        className="flex-none"
        label="Send message"
        onClick={
          isInputEmpty
            ? undefined
            : () => {
                onSubmit();
              }
        }
        type="main"
        Icon={ArrowForward}
      />
    </div>
  );
};
