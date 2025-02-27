import { type FC, type ReactNode, useEffect, useState } from "react";
import { clsx } from "clsx";

export type Item =
  | { type: "user"; message: string }
  | { type: "images"; images: string[] }
  | { type: "loader" }
  | { type: "bot"; message: string }
  | { type: "custom"; element: ReactNode };

export const TouchpointExampleWidget: FC<{
  items: Item[][];
  className?: string;
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

  const currentItem = props.items[tick % props.items.length];

  return (
    <div
      className={clsx(
        "rounded-3xl shadow-lg bg-secondary-80 overflow-hidden flex flex-col text-gray-900 backdrop-blur-xl",
        props.className,
      )}
    >
      <div className="space-y-4 flex-grow flex flex-col p-3 overflow-x-hidden overflow-y-auto">
        <div className="space-y-2 flex flex-col">
          {currentItem.map((item, itemIndex) => {
            if (item.type === "user") {
              return (
                <div
                  className="w-fit self-end text-sm text-primary-60"
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
            if (item.type === "images") {
              return (
                <div className="flex gap-2" key={itemIndex}>
                  {item.images.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} className="h-48" />
                  ))}
                </div>
              );
            }
            if (item.type === "custom") {
              return <div key={itemIndex}>{item.element}</div>;
            }
            return null;
          })}
        </div>
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
