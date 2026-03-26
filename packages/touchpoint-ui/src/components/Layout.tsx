/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC, type ReactNode } from "react";
import { type WindowSize } from "../interface";

export const Main: FC<{ windowSize: WindowSize; children: ReactNode }> = ({
  windowSize,
  children,
}) => {
  return (
    <div
      className={clsx(
        "@container/main",
        "w-full bg-background text-primary-80 flex relative flex-col h-full backdrop-blur-overlay",
        {
          "col-span-2 md:col-span-1": windowSize === "half",
          "col-span-2": windowSize === "full",
        },
      )}
    >
      {children}
    </div>
  );
};
