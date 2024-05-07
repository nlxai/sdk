import { type FC, type ReactNode } from "react";

export const Labeled: FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <label className="block space-y-0.5">
      <p className="text-xs text-gray-600">{label}</p>
      <div className="flex items-center space-x-2">{children}</div>
    </label>
  );
};

export const inputClass =
  "text-sm px-1.5 py-1 block w-full rounded border border-gray-300";
