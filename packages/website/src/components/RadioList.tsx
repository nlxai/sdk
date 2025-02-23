import { type ReactNode } from "react";

export const RadioList = <T,>({
  selected,
  options,
  onChange,
}: {
  selected: T;
  options: Array<{ id: string; value: T; label: string }>;
  onChange: (val: T) => void;
}): ReactNode => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div className="flex items-center" key={option.id}>
          <input
            id={option.id}
            type="radio"
            className="w-4 h-4 text-accent bg-primary-10 border-primary-20 focus:ring-accent dark:ring-offset-accent-20 focus:ring-2"
            checked={option.value === selected}
            onChange={() => {
              onChange(option.value);
            }}
          />
          <label htmlFor={option.id} className="ms-2 text-primary-80">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};
