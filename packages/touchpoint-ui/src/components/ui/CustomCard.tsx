import { clsx } from "clsx";
import ScrollContainer from "react-indiana-drag-scroll";
import { type FC, type ReactNode } from "react";

import { type Icon } from "../ui/Icons";

export interface CustomCardProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const CustomCards: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ScrollContainer className="flex gap-x-2 pt-3 pb-1 overflow-x-auto no-scrollbar px-2 -mx-2">
      {children}
    </ScrollContainer>
  );
};

export const CustomCard: FC<CustomCardProps> = ({
  children,
  selected,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        "block shrink-0 rounded-base overflow-hidden",
        "w-80 space-y-px",
        selected ? "outline outline-2 outline-accent" : "",
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CustomCardImage: FC<{ src: string }> = ({ src }) => {
  return <img src={src} alt="" className="w-full h-52 object-cover" />;
};

export interface CustomCardRowProps {
  left: ReactNode;
  right: ReactNode;
  Icon?: Icon;
}

export const CustomCardRow: FC<CustomCardRowProps> = ({
  left,
  right,
  Icon,
}) => {
  return (
    <div className="flex items-center relative justify-between gap-2 bg-primary-5 px-3 py-4">
      <div className="space-y-1 text-left">{left}</div>
      <div className="space-y-1 text-right">{right}</div>
      {Icon != null ? (
        <Icon className="text-primary-60 w-4 h-4 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
      ) : null}
    </div>
  );
};
