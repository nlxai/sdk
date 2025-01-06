/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC } from "react";
import { type IconProps } from "./Icons";

interface TextButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  type?: "main" | "ghost";
  Icon: FC<IconProps>;
}

export const TextButton: FC<TextButtonProps> = ({
  onClick,
  label,
  type = "ghost",
  Icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={onClick == null}
      className={clsx(
        "relative z-10 w-full px-5 py-4 transition-colors rounded-plus flex justify-between items-center focus:outline-0 overflow-hidden before:content-[''] before:absolute before:transition-colors before:-z-10 before:inset-0 before:bg-transparent",
        {
          "bg-primary-80 text-secondary-80 enabled:hover:before:bg-primary-80 focus:before:bg-primary-80 active:before:bg-secondary-10 disabled:bg-primary-10 disabled:text-secondary-40":
            type === "main",
          "bg-primary-5 text-primary-80 enabled:hover:before:bg-primary-5 focus:before:bg-primary-5 active:before:bg-secondary-10 disabled:bg-primary-5 disabled:text-primary-20":
            type === "ghost",
        },
        className,
      )}
    >
      {label}
      <Icon size={16} />
    </button>
  );
};
