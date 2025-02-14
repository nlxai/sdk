/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC, type ReactNode } from "react";

import { type Icon } from "../ui/Icons";

export interface CustomCardProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const CustomCard: FC<CustomCardProps> = ({
  children,
  selected,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        "block shrink-0 rounded-inner overflow-hidden",
        "w-80 space-y-px",
        selected ? "outline outline-2 outline-accent" : "",
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CustomCardImageRow: FC<{ src: string; alt?: string }> = ({
  src,
  alt,
}) => {
  return <img src={src} alt={alt} className="w-full h-52 object-cover" />;
};

export interface CustomCardRowProps {
  left: ReactNode;
  right: ReactNode;
  icon?: Icon;
}

export const CustomCardRow: FC<CustomCardRowProps> = ({
  left,
  right,
  icon: Icon,
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
