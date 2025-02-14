import { type FC, type ReactNode } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

export const Carousel: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ScrollContainer className="flex gap-x-2 pt-3 pb-1 overflow-x-auto no-scrollbar px-2 -mx-2">
      {children}
    </ScrollContainer>
  );
};
