import { type FC, type ReactNode, useEffect, useState } from "react";
import { last } from "ramda";
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

  return (
    <div
      className={clsx(
        "rounded-3xl shadow-lg bg-secondary-80 overflow-hidden flex flex-col text-gray-900 backdrop-blur-xl",
        props.className,
      )}
    >
      <div className="space-y-4 flex-grow flex flex-col p-3 overflow-x-hidden overflow-y-auto">
        {displayedItems.map((items: Item[], index: number) => {
          return (
            <div key={index} className="space-y-2 flex flex-col">
              {items.map((item, itemIndex) => {
                if (item.type === "user") {
                  return (
                    <div
                      className={`w-fit self-end text-sm text-primary-60 ${
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
                    <div className="text-primary-90 text-base" key={itemIndex}>
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
                return null;
              })}
            </div>
          );
        })}
        {loader &&
          (loader === "user" ? (
            <div
              className={
                "bg-accent w-fit self-end mx-4 px-2 py-2 rounded-lg text-secondary-80"
              }
            >
              <Loader />
            </div>
          ) : (
            <div
              className={
                "bg-secondary-20 w-fit mx-4 px-2 py-2 rounded-lg text-primary-80"
              }
            >
              <Loader />
            </div>
          ))}
      </div>
      <div className="p-2">
        <input
          className="text-base flex-none w-full px-4 py-4 bg-primary-5 focus:outline-none rounded-outer"
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};
