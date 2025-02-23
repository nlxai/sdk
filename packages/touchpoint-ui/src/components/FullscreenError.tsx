/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { clsx } from "clsx";

import { Assistant } from "./ui/Icons";

export const FullscreenError: FC<unknown> = () => (
  <div
    className={clsx(
      "flex-grow flex flex-col items-center justify-center gap-6 text-primary-80",
      // Used in CSS
      "fullscreen-error",
    )}
  >
    <Assistant className="w-20 h-20 text-primary-20" />
    <div className="text-center">
      <h3 className="text-xl mb-2">Oops!</h3>
      <p>Something went wrong.</p>
      <p>Try again later.</p>
    </div>
  </div>
);
