/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC } from "react";

import { type IconProps } from "./Icons";

export type IconButtonType =
  | "main"
  | "ghost"
  | "activated"
  | "coverup"
  | "overlay";

interface IconButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  type: IconButtonType;
  Icon: FC<IconProps>;
}

const mainClass =
  "bg-primary-80 text-secondary-80 enabled:hover:before:bg-primary-80 focus:before:bg-primary-80 enabled:active:before:bg-secondary-10 disabled:bg-primary-10 disabled:text-secondary-40";

const ghostClass =
  "bg-primary-5 text-primary-80 enabled:hover:before:bg-primary-10 focus:before:bg-primary-10 enabled:active:before:bg-secondary-10 disabled:bg-primary-5 disabled:text-primary-20";

const activatedClass =
  "bg-accent text-secondary-80 enabled:hover:before:bg-primary-40 focus:before:bg-primary-40 enabled:active:before:bg-secondary-10 disabled:bg-accent-20";

const coverupClass =
  "bg-secondary-60 backdrop-blur text-primary-80 enabled:hover:before:bg-primary-10 focus:before:bg-primary-10 enabled:active:before:bg-secondary-10 disabled:bg-secondary-20 disabled:text-primary-20";

const overlayClass =
  "bg-background backdrop-blur text-primary-80 enabled:hover:before:bg-primary-10 focus:before:bg-primary-10 enabled:active:before:bg-secondary-10 disabled:bg-secondary-20 disabled:text-primary-20";

export const IconButton: FC<IconButtonProps> = ({
  onClick,
  type,
  label,
  className,
  Icon,
}) => {
  const isDisabled = onClick == null;
  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={label}
      className={clsx(
        "p-3 w-10 h-10 transition-colors rounded-inner relative z-10 overflow-hidden before:content-[''] before:absolute before:transition-colors before:-z-10 before:inset-0 before:bg-transparent focus:outline-0",
        type === "main" ? mainClass : null,
        type === "ghost" ? ghostClass : null,
        type === "activated" ? activatedClass : null,
        type === "coverup" ? coverupClass : null,
        type === "overlay" ? overlayClass : null,
        className,
      )}
    >
      <Icon />
    </button>
  );
};
