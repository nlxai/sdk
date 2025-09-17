/* eslint-disable jsdoc/require-jsdoc */
import { type FC, useEffect, useRef } from "react";
import { Rive, Layout, Fit } from "@rive-app/webgl2";

function resolveCssVariable(
  name: string,
  canvas: HTMLCanvasElement,
): [number, number, number, number] {
  // Resolve CSS variables and/or functions as these are not supported in canvas
  canvas.style.borderColor = name;
  const comp = getComputedStyle(canvas).getPropertyValue("border-color");

  // Use Canvas to turn the color into
  const context = canvas.getContext("2d");
  if (!context) return [0, 0, 0, 255];
  context.fillStyle = comp;
  context.fillRect(0, 0, 1, 1);

  canvas.style.display = "none";
  return [...context.getImageData(0, 0, 1, 1).data] as [
    number,
    number,
    number,
    number,
  ];
}

export const RiveAnimation: FC<{ restored: boolean }> = ({ restored }) => {
  const samplerRef = useRef<HTMLCanvasElement | null>(null);
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const sampler = samplerRef.current;
    if (canvas == null || sampler == null) {
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
          const runNoWave = vmi.trigger("runNoWave");
          const color = vmi.color("color");
          const voiceInput = vmi.number("voiceInput");

          if (voiceInput != null) {
            voiceInput.value = 100;
          }
          color?.rgba(...resolveCssVariable("var(--accent)", sampler));

          if (restored) {
            runNoWave?.trigger();
          } else {
            run?.trigger();
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
  }, [restored]);

  return (
    <>
      <canvas ref={samplerRef} width="1" height="1" />
      <canvas
        className="pointer-events-none fixed inset-0"
        ref={ref}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
};
