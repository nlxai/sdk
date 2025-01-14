/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC, type ReactNode } from "react";

export const BaseText: FC<{ children: ReactNode; faded?: boolean }> = ({
  children,
  faded,
}) => (
  <p
    className={clsx("text-base", faded ? "text-primary-60" : "text-primary-80")}
  >
    {children}
  </p>
);

export const SmallText: FC<{ children: ReactNode }> = ({ children }) => (
  <p className="text-sm text-primary-60">{children}</p>
);
