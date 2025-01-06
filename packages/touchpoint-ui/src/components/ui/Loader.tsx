/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC } from "react";

import { useContextValue } from "../../context";
import loaderDark from "./loader-assets/loader-dark.mp4?base64";
import loaderLight from "./loader-assets/loader-light.mp4?base64";

export interface LoaderProps {
  label: string;
}

const toBase64ImageUrl = (encoded: string): string =>
  `data:image/mp4;base64,${encoded}`;

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
            src={
              mode === "dark"
                ? toBase64ImageUrl(loaderDark)
                : toBase64ImageUrl(loaderLight)
            }
            type="video/mp4"
          />
        </video>
        <p className="text-primary-60">{label}</p>
      </div>
    </div>
  );
};
