/* eslint-disable jsdoc/require-jsdoc */
import type { FC, CSSProperties } from "react";
import { clsx } from "clsx";

const PingCircle: FC<{
  k: number;
  className?: string;
  style?: CSSProperties;
}> = ({ k, className, style }) => {
  const duration = 1.5;
  const s = (no: number): string => `${no}s`;
  return (
    <div
      className={clsx("bg-current animate-ping absolute inset-0", className)}
      style={{
        animationDelay: s(-duration * k),
        animationDuration: s(duration),
        ...(style ?? {}),
      }}
    />
  );
};
/**
 * A ripple effect composed of expanding circles.
 * @category Modality components
 */
export const Ripple: FC<{
  className?: string;
  style?: CSSProperties;
}> = ({ className, style }) => {
  const cls = clsx("text-accent-20", className);
  return (
    <>
      <PingCircle k={0.12} className={cls} style={style} />
      <PingCircle k={0.24} className={cls} style={style} />
      <PingCircle k={0.36} className={cls} style={style} />
      <PingCircle k={0.48} className={cls} style={style} />
    </>
  );
};
