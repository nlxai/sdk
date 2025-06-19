/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC, type ComponentType } from "react";
import { Touchpoint } from "./Icons";

export interface LaunchButtonProps {
  label: string;
  className?: string;
  showLabel?: boolean;
  onClick?: () => void;
  iconUrl?: string;
  Custom?: ComponentType<{ className?: string; onClick?: () => void }>;
}

export const LaunchButton: FC<LaunchButtonProps> = (props) => {
  const { Custom } = props;
  if (Custom != null) {
    return <Custom className={props.className} onClick={props.onClick} />;
  }
  return (
    <button
      className={clsx(
        "p-3 w-fit bg-background text-primary-80 rounded-outer",
        "after:content-[''] after:rounded-outer after:absolute after:inset-0 after:pointer-events-none",
        "hover:after:bg-primary-10",
        props.className,
      )}
      disabled={props.onClick == null}
      onClick={props.onClick}
    >
      <span className="block flex-none w-8 h-8">
        {props.iconUrl == null ? (
          <Touchpoint />
        ) : (
          <img src={props.iconUrl} className="w-8 h-8" />
        )}
      </span>
      {props.showLabel ?? false ? <span>{props.label}</span> : null}
    </button>
  );
};
