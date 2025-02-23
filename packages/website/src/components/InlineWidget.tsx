import { type FC, type ReactNode, useEffect, useState, useRef } from "react";
import { last, flatten } from "ramda";
import { clsx } from "clsx";

export type Item =
  | { type: "user"; message: string }
  | { type: "bot"; message: string }
  | { type: "custom"; element: ReactNode };

const Loader: FC<unknown> = () => (
  <div className="inline-flex items-center py-1 space-x-1">
    <div className="w-1.5 h-1.5 animate-bounce rounded-full bg-current"></div>
    <div
      className="w-1.5 h-1.5 animate-bounce rounded-full bg-current"
      style={{ animationDelay: "-0.15s" }}
    ></div>
    <div
      className="w-1.5 h-1.5 animate-bounce rounded-full bg-current"
      style={{ animationDelay: "-0.3s" }}
    ></div>
  </div>
);

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

  const loader: "user" | "bot" | undefined =
    displayedItems.length === props.items.length
      ? undefined
      : // initial eslint integration
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        last(last(displayedItems) || [])?.type === "user"
        ? "bot"
        : "user";

  const messagesContainer = useRef<HTMLDivElement | null>(null);

  const isFullyVisible = useRef(true);

  useEffect(() => {
    const callback: MutationCallback = (ch) => {
      const addedNodes = flatten(
        ch.map((entry) => Array.from(entry.addedNodes)),
      );
      const firstContentNode: Node | undefined = addedNodes[0];
      if (
        isFullyVisible.current &&
        // initial eslint integration
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        firstContentNode &&
        firstContentNode instanceof HTMLElement
      ) {
        firstContentNode.scrollIntoView({
          block: "end",
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
        // initial eslint integration
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (event[0]) {
          isFullyVisible.current = event[0].intersectionRatio > 0.95;
        }
      },
      {
        threshold: 0.95,
      },
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
      className={clsx(
        "rounded-xl max-w-sm max-h-[440px] shadow-lg overflow-hidden flex flex-col text-gray-900",
        props.className,
      )}
    >
      <div className="bg-blueMain text-white text-sm flex-none px-4 py-3">
        Support chat
      </div>
      <div
        className="space-y-4 flex-grow flex flex-col py-4 bg-white overflow-x-hidden overflow-y-auto"
        ref={messagesContainer}
      >
        {displayedItems.map((items: Item[], index: number) => {
          return (
            <div key={index} className="space-y-2 flex flex-col">
              {/* initial eslint integration */}
              {/* eslint-disable-next-line array-callback-return */}
              {items.map((item, itemIndex) => {
                if (item.type === "user") {
                  return (
                    <div
                      className={`w-fit self-end bg-blueMain text-white p-2 text-sm rounded-lg mx-4 ${
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
        {/* initial eslint integration */}
        {}
        {loader &&
          (loader === "user" ? (
            <div
              className={`bg-blueMain w-fit self-end mx-4 px-2 py-2 rounded-lg text-white`}
            >
              <Loader />
            </div>
          ) : (
            <div
              className={`bg-gray-100 w-fit mx-4 px-2 py-2 rounded-lg text-gray-600`}
            >
              <Loader />
            </div>
          ))}
      </div>
      <input
        className="text-sm flex-none px-4 py-3 focus:outline-none border-t border-gray-200"
        placeholder="Type your message..."
      />
    </div>
  );
};
