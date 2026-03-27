/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { clsx } from "clsx";

export interface RadioOption<T> {
  value: T;
  label: string;
}

interface RadioProps<T> {
  options: Array<RadioOption<T>>;
  value: T;
  onChange: (value: T) => void;
  name: string;
  className?: string;
}

export const Radio: FC<RadioProps<string | number>> = ({
  options,
  value,
  onChange,
  name,
  className,
}) => {
  return (
    <fieldset className={clsx("space-y-2", className)}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => { onChange(option.value); }}
            className="w-4 h-4"
          />
          <span className="text-sm text-primary-80">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
};
