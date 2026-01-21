/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";

export const Notice: FC<{
  text: string;
}> = ({ text }) => {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <div className="border-b border-solid border-primary-60 h-[1px]"></div>
      <p className="text-primary-60 text-center w-fit max-w-[220px]">{text}</p>
      <div className="border-b border-solid border-primary-60 h-[1px]"></div>
    </div>
  );
};
