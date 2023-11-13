import React, {
  type FC,
  type ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";
import { flatten } from "ramda";

type Item =
  | { type: "user"; message: string }
  | { type: "bot"; message: string }
  | { type: "custom"; element: ReactNode };

export const InlineWidget: FC<{
  items: Item[][];
  className?: string;
  animated?: boolean;
}> = (props) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [setTick]);

  const displayedItems = props.animated
    ? props.items.slice(0, 1 + (tick % props.items.length))
    : props.items;

  const messagesContainer = useRef<HTMLDivElement | null>(null);

  const isFullyVisible = useRef(true);

  useEffect(() => {
    const callback: MutationCallback = (ch) => {
      const addedNodes = flatten(
        ch.map((entry) => Array.from(entry.addedNodes))
      );
      const firstContentNode: Node | undefined = addedNodes[0];
      if (
        isFullyVisible.current &&
        firstContentNode &&
        firstContentNode instanceof HTMLElement
      ) {
        firstContentNode.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    };
    const observer = new MutationObserver(callback);
    if (messagesContainer.current) {
      observer.observe(messagesContainer.current, {
        childList: true,
      });
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (event) => {
        if (event[0]) {
          isFullyVisible.current = event[0].intersectionRatio > 0.95;
        }
      },
      {
        threshold: 0.95,
      }
    );
    if (messagesContainer.current) {
      observer.observe(messagesContainer.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`rounded-xl max-w-sm max-h-[440px] shadow-lg overflow-hidden flex flex-col ${
        props.className || ""
      }`}
    >
      <div className="bg-sky-500 text-white text-sm flex-none px-4 py-3">
        Support chat
      </div>
      <div
        className="space-y-4 flex-grow flex flex-col py-4 bg-white overflow-x-hidden overflow-y-auto"
        ref={messagesContainer}
      >
        {displayedItems.map((items: Item[], index: number) => {
          return (
            <div key={index} className="space-y-2 flex flex-col">
              {items.map((item, itemIndex) => {
                if (item.type === "user") {
                  return (
                    <div
                      className={`w-fit self-end bg-sky-500 text-white p-2 text-sm rounded-lg mx-4 ${
                        props.animated ? "animate-slideInFromRight" : ""
                      }`}
                      key={itemIndex}
                    >
                      {item.message}
                    </div>
                  );
                }
                if (item.type === "bot") {
                  return (
                    <div
                      className={`w-fit self-start bg-gray-100 p-2 text-sm rounded-lg mx-4 ${
                        props.animated ? "animate-slideInFromLeft" : ""
                      }`}
                      key={itemIndex}
                    >
                      {item.message}
                    </div>
                  );
                }
                if (item.type === "custom") {
                  return (
                    <div
                      className={`w-full ${
                        props.animated ? "animate-slideInFromLeft" : ""
                      }`}
                      key={itemIndex}
                    >
                      {item.element}
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
      <input
        className="text-sm flex-none px-4 py-3 focus:outline-none border-t border-gray-200"
        placeholder="Say something"
      />
    </div>
  );
};
