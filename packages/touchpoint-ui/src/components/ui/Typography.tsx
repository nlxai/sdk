/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type FC, type ReactNode } from "react";

export const BaseText: FC<{
  children: ReactNode;
  faded?: boolean;
  className?: string;
}> = ({ children, className, faded }) => (
  <p
    className={clsx(
      "text-base",
      faded ? "text-primary-60" : "text-primary-80",
      className,
    )}
  >
    {children}
  </p>
);

export const SmallText: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <p className={clsx("text-sm text-primary-60", className)}>{children}</p>;
