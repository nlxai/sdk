import { clsx } from "clsx";
import { type FC, useRef, useState } from "react";
import { InputMask } from "@react-input/mask";
import { ArrowForward, Date } from "./Icons";
import { IconButton } from "./IconButton";

/**
 * Props for the DateInput component
 * @inline
 * @hidden
 */
export interface DateInputProps {
  /**
   * Handler function called when the date is submitted
   * @param date - The submitted date in YYYY-MM-DD format
   */
  onSubmit?: (date: string) => void;
  /**
   * Custom CSS class name
   */
  className?: string;
}

const options = {
  mask: "MM / DD / YYYY",
  replacement: { D: /\d/, M: /\d/, Y: /\d/ },
  showMask: true,
};

/**
 * A date input
 * @example
 * ```tsx
 * import { DateInput, React } from '@nlx/touchpoint-ui';
 *
 * const MyDateInput = ({conversationHandler}) => (
 *  <DateInput onSubmit={(date) => conversationHandler.sendContext({myDate: date}) } />
 * );
 * ```
 * @category Modality components
 */
export const DateInput: FC<DateInputProps> = ({ onSubmit, className }) => {
  const isDisabled = onSubmit == null;

  const [parsedInput, setParsedInput] = useState<string | null>(null);
  const [maskedValue, setMaskedValue] = useState<string>("");
  const nativeDateInputRef = useRef<HTMLInputElement>(null);
  const maskedInputRef = useRef<HTMLInputElement>(null);

  const handleNativeDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const nativeValue = event.target.value; // YYYY-MM-DD format
    if (nativeValue !== "") {
      const [year, month, day] = nativeValue.split("-");
      const formattedValue = `${month} / ${day} / ${year}`;
      setMaskedValue(formattedValue);
      setParsedInput(nativeValue);

      // Update the masked input value
      if (maskedInputRef.current) {
        maskedInputRef.current.value = formattedValue;
      }
    }
  };

  return (
    <div
      className={clsx(
        "relative bg-primary-5 flex items-center justify-between pl-4 py-2 pr-2 rounded-outer transition-colors duration-500 before:content-[''] before:absolute before:transition-colors before:-z-10 before:inset-0 before:bg-transparent",
        isDisabled ? "" : "hover:bg-secondary-20",
        className,
      )}
    >
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => nativeDateInputRef.current?.showPicker()}
          disabled={isDisabled}
          className={clsx(
            "flex-none text-primary-60",
            isDisabled
              ? "cursor-default"
              : "cursor-pointer hover:text-primary-80",
          )}
          aria-label="Open date picker"
        >
          <Date className="w-4 h-4" />
        </button>
        <input
          ref={nativeDateInputRef}
          type="date"
          className="absolute opacity-0 pointer-events-none"
          onChange={handleNativeDateChange}
          disabled={isDisabled}
        />
        <InputMask
          {...options}
          ref={maskedInputRef}
          value={maskedValue}
          className={clsx(
            "bg-transparent text-primary-80 outline-0 ml-2 py-2.5",
            isDisabled
              ? "placeholder-primary-20 pointer-events-none"
              : "placeholder-primary-40",
          )}
          placeholder="MM / DD / YYYY"
          onChange={(event) => {
            const value = event.target.value;
            setMaskedValue(value);
            const [month, day, year] = value.split(" / ");
            if (
              month != null &&
              month.length === 2 &&
              day != null &&
              day.length === 2 &&
              year != null &&
              year.length === 4
            ) {
              const isoDate = `${year}-${month}-${day}`;
              setParsedInput(isoDate);

              // Sync with native date input
              if (nativeDateInputRef.current) {
                nativeDateInputRef.current.value = isoDate;
              }
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
