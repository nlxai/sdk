 
import { clsx } from "clsx";
import { type FC, type ReactNode } from "react";

/**
 * Standard text component with base typography styles applied.
 * @example
 * ```tsx
 * import { BaseText, React } from '@nlx/touchpoint-ui';
 *
 * const MyText = () => (
 *  <BaseText faded>This is some standard text.</BaseText>
 * );
 * ```
 * @category Modality components
 */
export const BaseText: FC<{
  children: ReactNode;
  /** Show in a slightly dimmer style (primary-60 instead of primary-80). */
  faded?: boolean;
  /** Custom CSS class name */
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

/**
 * Small text component with smaller typography styles applied.
 * @category Modality components
 */
export const SmallText: FC<{
  children: ReactNode;
  /** Custom CSS class name */
  className?: string;
}> = ({ children, className }) => (
  <p className={clsx("text-sm text-primary-60", className)}>{children}</p>
);
