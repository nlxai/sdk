/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { clsx } from "clsx";

const PingCircle: FC<{ k: number; className?: string }> = ({
  k,
  className,
}) => {
  const duration = 1.5;
  const s = (no: number): string => `${no}s`;
  return (
    <div
      className={clsx("bg-accent-20 animate-ping absolute inset-0", className)}
      style={{
        animationDelay: s(-duration * k),
        animationDuration: s(duration),
      }}
    />
  );
};

export const Ripple: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <>
      <PingCircle k={0.12} className={className} />
      <PingCircle k={0.24} className={className} />
      <PingCircle k={0.36} className={className} />
      <PingCircle k={0.48} className={className} />
    </>
  );
};
