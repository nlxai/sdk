/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { useEffect, useRef, useState, type FC } from "react";
// import vid from "./loader-assets/loader-dark.mp4";

export interface LoaderProps {
  label: string;
}

const r = 30;
const rc = 17;

const ease = (
  t: number,
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
): number => {
  // TODO: use control points
  return (
    (1 - t) ** 3 * 0 +
    3 * (1 - t) ** 2 * t * y1 +
    3 * (1 - t) * t ** 2 * y2 +
    t ** 3
  );
};

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

const getDistance = (t: number, quarter: number): number => {
  const pt1: [number, number] = [0, 0.2];
  const pt2: [number, number] = [0.7, 1];
  const easeD = ease(t, pt1, pt2);
  const easeD2 = ease(1 - t, pt1, pt2);

  return quarter === 0
    ? easeD
    : quarter === 1
      ? easeD2
      : quarter === 2
        ? easeD
        : easeD2;
};

const getRotation = (t: number, quarter: number): number => {
  const pt1: [number, number] = [0.9, 0];
  const pt2: [number, number] = [0.1, 1];
  const easeR = ease(t, pt1, pt2);
  const easeR2 = ease(1 - t, pt1, pt2);
  return quarter === 0
    ? 45 * easeR
    : quarter === 1
      ? 45 + 45 * (1 - easeR2)
      : quarter === 2
        ? 90 + 45 * easeR
        : 135 + 45 * (1 - easeR2);
};

export const Loader: FC<LoaderProps> = ({ label }) => {
  const [time, setTime] = useState<{ start: number; current: number } | null>(
    null,
  );
  const stop = useRef<boolean>(false);
  useEffect(() => {
    const animate = (): void => {
      setTime((prev) => {
        const time = new Date().getTime();
        return prev == null
          ? { start: time, current: time }
          : { ...prev, current: time };
      });
      if (!stop.current) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [stop, setTime]);
  if (time == null) {
    return null;
  }
  const diff = time.current - time.start;

  const adjustedTime = diff / 500;
  const unit = Math.floor(adjustedTime);
  const quarter = unit % 4;
  const t = adjustedTime - unit;

  const dFactor = getDistance(t, quarter);
  const rotation = getRotation(t, quarter);

  const dropShadowRadius = dFactor > 0.2 ? 0 : (8 * (0.2 - dFactor)) / 0.2;

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
            <g transform={`translate(50 50) rotate(${rotation})`}>
              <Pair d={r * dFactor} />
            </g>
          </svg>
        </div>
        {/* <video className={clsx("w-16 h-16 block")} autoPlay muted loop>
          <source src={vid} type="video/mp4" />
        </video> */}
        <p className="text-primary-60">{label}</p>
      </div>
    </div>
  );
};
