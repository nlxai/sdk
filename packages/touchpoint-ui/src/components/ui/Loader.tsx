/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC } from "react";

import { useContextValue } from "../../context";

export interface LoaderProps {
  label: string;
}

export const Loader: FC<LoaderProps> = ({ label }) => {
  const { mode } = useContextValue();

  return (
    <div className={clsx("h-full w-full flex items-center justify-center")}>
      <div className="flex flex-col items-center justify-center gap-3">
        <video
          className={clsx(
            "w-8 h-8 block",
            mode === "dark" ? "bg-blend-multiply" : "bg-blend-lighten",
          )}
          autoPlay
          muted
          loop
        >
          <source
            src={mode === "dark" ? "/loader-dark.mp4" : "/loader-light.mp4"}
            type="video/mp4"
          />
        </video>
        <p className="text-primary-60">{label}</p>
      </div>
    </div>
  );
};
