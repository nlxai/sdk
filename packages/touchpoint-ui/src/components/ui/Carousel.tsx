/* eslint-disable jsdoc/require-jsdoc */
import { type FC, type ReactNode } from "react";
import { clsx } from "clsx";
import ScrollContainer from "react-indiana-drag-scroll";

export const Carousel: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <ScrollContainer
      className={clsx(
        "flex gap-x-2 overflow-x-auto no-scrollbar px-2 -mx-2",
        className,
      )}
    >
      {children}
    </ScrollContainer>
  );
};
