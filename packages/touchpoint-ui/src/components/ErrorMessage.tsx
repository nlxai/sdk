/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { Warning } from "./ui/Icons";

export const ErrorMessage: FC<{
  message: string;
}> = ({ message }) => {
  return (
    <div className="bg-error-secondary text-error-primary text-base p-3 rounded-inner flex items-center gap-2">
      <Warning className="w-4 h-4 flex-none" />
      <p className="text-primary-80">{message}</p>
    </div>
  );
};
