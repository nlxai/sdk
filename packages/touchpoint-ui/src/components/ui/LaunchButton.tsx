/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC } from "react";
import { Assistant } from "./Icons";

export interface LaunchButtonProps {
  label: string;
  className?: string;
  showLabel?: boolean;
  onClick?: () => void;
  iconUrl?: string;
}

export const LaunchButton: FC<LaunchButtonProps> = (props) => {
  return (
    <button
      className={clsx(
        "p-3 w-fit bg-background text-primary-80 rounded-plus",
        "after:content-[''] after:rounded-plus after:absolute after:inset-0 after:pointer-events-none",
        "hover:after:bg-primary-10",
        props.className,
      )}
      disabled={props.onClick == null}
      onClick={props.onClick}
    >
      <span className="block flex-none w-8 h-8">
        {props.iconUrl == null ? (
          <Assistant />
        ) : (
          <img src={props.iconUrl} className="w-8 h-8" />
        )}
      </span>
      {props.showLabel ?? false ? <span>{props.label}</span> : null}
    </button>
  );
};
