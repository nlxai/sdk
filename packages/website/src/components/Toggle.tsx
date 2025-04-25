import { type ReactNode } from "react";
import { clsx } from "clsx";

interface Props<T> {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange?: (newValue: T) => void;
  className?: string;
}

export const Toggle = <T,>(props: Props<T>): ReactNode => {
  const disabled = props.onChange == null;
  return (
    <div
      className={clsx(
        "rounded-full w-fit gap-1 p-0.5 inline-flex bg-primary-10 text-primary-80",
        {
          "opacity-70": disabled,
        },
        props.className,
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
            "px-10 py-0.5 flex-grow rounded-full text-xs whitespace-pre": true,
            "enabled:hover:bg-primary-10":
              props.value !== option.value && props.onChange,
            "bg-secondary-80": props.value === option.value,
          })}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
