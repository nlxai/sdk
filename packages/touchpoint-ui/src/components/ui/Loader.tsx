/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { useEffect, useRef, useState, type FC } from "react";

// Note: Understanding and debugging this code can be made easier using this
// notebook: https://observablehq.com/@gampleman/touchpoint-animation-debugging

export interface LoaderProps {
  label: string;
}

const r = 30;
const rc = 17;

const ease = (x: number): number =>
  x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

const moveDuration = 990;
const pauseDuration = 300;

const totalDuration = moveDuration + pauseDuration;

// A pair of circles a dynamic distance apart, with a connecting goop if they are close enough
const Pair: FC<{ d: number }> = ({ d }) => {
  const halfPi = Math.PI / 2;
  const limitRatio = d / rc / 2.8;
  const angleAdjustment = halfPi * Math.min(limitRatio, 1);
  const s =
    limitRatio < 1
      ? ((d - Math.sin(angleAdjustment)) / Math.cos(angleAdjustment)) * 0.5
      : 0;
  const x1 = -d;
  const x2 = d;
  const edgeX = d - rc * Math.sin(angleAdjustment);
  const edgeY = rc * Math.cos(angleAdjustment);
  const controlX = edgeX - s * Math.cos(angleAdjustment);
  const controlY = edgeY - s * Math.sin(angleAdjustment);
  return (
    <>
      <circle cx={x1} cy="0" r={rc} />
      <circle cx={x2} cy="0" r={rc} />
      {limitRatio < 0.45 ? (
        <path
          d={`
            M${-edgeX},${edgeY} 
            C${-controlX},${controlY} ${controlX},${controlY} ${edgeX},${edgeY} L${edgeX},${-edgeY}
            C${controlX},${-controlY} ${-controlX},${-controlY} ${-edgeX},${-edgeY} Z
          `}
        />
      ) : null}
    </>
  );
};

const getDistance = (t: number): number => {
  if (t < 1 / 3) {
    return t * 3;
  }
  if (t < 2 / 3) {
    return 1;
  }

  return 3 - t * 3;
};

const getSpin = (t: number): number => {
  if (t < 1 / 3) {
    return 0;
  }
  if (t < 2 / 3) {
    return (t - 1 / 3) * 3;
  }
  return 1;
};

export const Loader: FC<LoaderProps> = ({ label }) => {
  const [time, setTime] = useState<{ start: number; current: number } | null>(
    null,
  );
  const stop = useRef<boolean>(false);
  useEffect(() => {
    const animate = (time: number): void => {
      setTime((prev) => {
        return prev == null
          ? { start: time, current: time }
          : { ...prev, current: time };
      });
      if (!stop.current) {
        requestAnimationFrame(animate);
      }
    };
    if (!stop.current) {
      requestAnimationFrame(animate);
    }
  }, [stop, setTime]);
  if (time == null) {
    return null;
  }
  let dFactor, spin;

  const diff = time.current - time.start;
  const elapsed = diff % totalDuration;
  const count = Math.floor(diff / totalDuration);

  if (elapsed < moveDuration) {
    const adjustedTime = diff / totalDuration;

    const unit = Math.floor(adjustedTime);

    const t = ease((adjustedTime - unit) * (totalDuration / moveDuration));

    dFactor = getDistance(t);
    spin = count % 2 ? getSpin(t) : 1 + getSpin(t);
  } else {
    dFactor = 0;
    spin = 0;
  }

  const dropShadowRadius = dFactor > 0.2 ? 0 : (5 * (0.2 - dFactor)) / 0.2;

  return (
    <div className={clsx("h-full w-full flex items-center justify-center")}>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className={clsx("w-8 h-8 block text-accent")}>
          <svg
            viewBox="0 0 100 100"
            stroke="none"
            fill="currentColor"
            style={{
              filter: `drop-shadow(0 0 ${dropShadowRadius}px rgb(var(--accent)))`,
            }}
          >
            <g transform={`translate(50 50) rotate(${spin * 90})`}>
              <Pair d={r * dFactor} />
            </g>
          </svg>
        </div>
        <p className="text-primary-60">{label}</p>
      </div>
    </div>
  );
};
