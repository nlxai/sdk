/* eslint-disable jsdoc/require-jsdoc */
import { type FC, useEffect, useRef } from "react";
import { Rive, Layout, Fit } from "@rive-app/webgl2";

export const RiveAnimation: FC<unknown> = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas == null) {
      return;
    }
    const riveInstance = new Rive({
      src: "https://assets.nlx.ai/touchpoint/voice-plus-animation.riv",
      canvas,
      autoBind: true,
      autoplay: true,
      stateMachines: "State Machine 1",
      layout: new Layout({
        fit: Fit.Fill,
      }),
      onLoad: () => {
        riveInstance.resizeDrawingSurfaceToCanvas();
        const vmi = riveInstance.viewModelInstance;
        if (vmi != null) {
          const run = vmi.trigger("run");
          const color = vmi.color("color");
          /* TODO: set this to the accent color rgb (ignore opacity)
           * I suppose we might have to do something empirical like hidden-render a <p className="text-accent">  and read its computed color
           * color?.rgb(255, 0, 0);
           */
          if (run != null) {
            run.trigger();
          }
        }
      },
    });

    const handleResize = (): void => {
      riveInstance.resizeDrawingSurfaceToCanvas();
    };

    window.addEventListener("resize", handleResize, false);

    return () => {
      riveInstance.cleanup();
      window.removeEventListener("resize", handleResize, false);
    };
  }, []);

  return (
    <canvas
      className="pointer-events-none fixed inset-0"
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
