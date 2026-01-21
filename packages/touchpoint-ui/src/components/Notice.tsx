/* eslint-disable jsdoc/require-jsdoc */
import { type FC, useRef, useState, useMemo } from "react";
import { useResizeObserver } from "@react-hookz/web";

export const Notice: FC<{
  text: string;
}> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [containerSize, setContainerSize] = useState<
    ResizeObserverEntry | undefined
  >();
  const [textSize, setTextSize] = useState<ResizeObserverEntry | undefined>();
  useResizeObserver(containerRef, setContainerSize);
  useResizeObserver(textRef, setTextSize);
  const borderWidth = useMemo(() => {
    if (containerSize?.contentRect == null || textSize?.contentRect == null) {
      return null;
    }
    return (
      (containerSize.contentRect.width - textSize.contentRect.width) / 2 - 12
    );
  }, [containerSize, textSize]);
  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center relative"
    >
      {borderWidth != null ? (
        <>
          <div
            className="absolute border-b border-solid border-primary-60 h-[1px] left-0 top-1/2 transform -translate-y-1/2"
            style={{ width: borderWidth + "px" }}
          ></div>
          <div
            className="absolute border-b border-solid border-primary-60 h-[1px] right-0 top-1/2 transform -translate-y-1/2"
            style={{ width: borderWidth + "px" }}
          ></div>
        </>
      ) : null}
      <p ref={textRef} className="w-fit text-primary-60 max-w-[220px]">
        {text}
      </p>
    </div>
  );
};
