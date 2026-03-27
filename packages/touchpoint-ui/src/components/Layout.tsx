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

export const HeaderContainer: FC<{
  leftColumn: boolean;
  children: ReactNode;
}> = ({ leftColumn, children }) => {
  return (
    <div
      className={clsx("flex p-2 md:p-3 items-center justify-between gap-2", {
        "md:absolute md:w-fit md:flex-col md:left-0 md:transform md:-translate-x-full md:translate-y-0":
          leftColumn,
        "@3xl/main:absolute @3xl/main:left-0 @3xl/main:right-0 @3xl/main:top-0":
          !leftColumn,
      })}
    >
      {children}
    </div>
  );
};

export const InputContainer: FC<{
  windowSize: WindowSize;
  children: ReactNode;
}> = ({ windowSize, children }) => {
  return (
    <div
      className={clsx(
        "p-2 md:p-3 flex flex-col flex-none gap-2",
        windowSize === "full" ? "w-full md:max-w-content md:mx-auto" : "",
      )}
    >
      {children}
    </div>
  );
};
