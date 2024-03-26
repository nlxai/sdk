import React, { type ReactNode } from "react";

export const RadioList = <T extends unknown>({
  selected,
  options,
  onChange,
}: {
  selected: T;
  options: Array<{ id: string; value: T; label: string }>;
  onChange: (val: T) => void;
}): ReactNode => {
  console.log(selected, options);
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div className="flex items-center" key={option.id}>
          <input
            id={option.id}
            type="radio"
            className="w-4 h-4 text-blueMain bg-gray-100 border-gray-300 focus:ring-blueMain dark:focus:ring-blueDarker dark:ring-offset-gray-800 focus:ring-2"
            checked={option.value === selected}
            onChange={() => {
              onChange(option.value);
            }}
          />
          <label htmlFor={option.id} className="ms-2 text-black80">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};
