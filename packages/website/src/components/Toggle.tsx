import { type ReactNode } from "react";
import { clsx } from "clsx";

interface Props<T> {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange?: (newValue: T) => void;
}

export const Toggle = <T,>(props: Props<T>): ReactNode => {
  const disabled = props.onChange == null;
  return (
    <div
      className={clsx(
        "rounded-full w-fit space-x-1 p-0.5 inline-flex bg-black10",
        {
          "opacity-70": disabled,
        },
      )}
    >
      {props.options.map((option) => (
        <button
          key={String(option.value)}
          onClick={() => {
            props.onChange?.(option.value);
          }}
          disabled={disabled}
          className={clsx({
            "px-10 py-0.5 rounded-full text-xs transition-colors duration-200":
              true,
            "text-black40": props.value !== option.value,
            "hover:bg-blue05 hover:text-blueMain disabled:hover:bg-transparent disabled:hover:text-black40":
              props.value !== option.value && props.onChange,
            "bg-white text-black80": props.value === option.value,
          })}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
