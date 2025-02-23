import { type FC, type ReactNode } from "react";

export const Labeled: FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <label className="block space-y-0.5">
      <p className="text-xs text-primary-60">{label}</p>
      <div className="flex items-center space-x-2">{children}</div>
    </label>
  );
};

export const inputClass =
  "text-sm px-1.5 py-1 block w-full rounded-lg text-primary-80 bg-primary-5 placeholder:text-primary-20 focus:outline-none focus:bg-primary-10";
