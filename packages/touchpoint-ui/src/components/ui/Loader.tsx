/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { useEffect, useRef, useState, type FC } from "react";
import vid from "./loader-assets/loader-dark.mp4";

export interface LoaderProps {
  label: string;
}

const r = 28;
const rc = 15;

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
  const phase = diff / 225;
  const dFactor = 0.5 + 0.5 * Math.sin(phase);
  const dropShadowRadius = dFactor > 0.2 ? 0 : (4 * (0.2 - dFactor)) / 0.2;
  return (
    <div className={clsx("h-full w-full flex items-center justify-center")}>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className={clsx("w-16 h-16 block text-accent")}>
          <svg
            viewBox="0 0 100 100"
            stroke="none"
            fill="currentColor"
            style={{
              filter: `drop-shadow(0 0 ${dropShadowRadius}px rgb(var(--accent)))`,
            }}
          >
            <g
              transform={`translate(50 50) rotate(${90 - 90 * (0.5 + 0.5 * Math.cos(phase))})`}
            >
              <Pair d={r * dFactor} />
            </g>
          </svg>
        </div>
        <video className={clsx("w-16 h-16 block")} autoPlay muted loop>
          <source src={vid} type="video/mp4" />
        </video>
        <p className="text-primary-60">{label}</p>
      </div>
    </div>
  );
};
