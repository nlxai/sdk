import {
  type FC,
  type MutableRefObject,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { clsx } from "clsx";

import { Loader } from "./Loader";

export type BotMessage =
  | { type: "text"; message: string }
  | { type: "images"; images: string[] };

export type Item =
  | { type: "user"; message: string; previousBotMessage: string }
  | { type: "loader" }
  | { type: "bot"; messages: BotMessage[] };

interface StepShared {
  onNext: () => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
}

const UserStep: FC<
  { message: string; previousBotMessage: string } & StepShared
> = ({ message, previousBotMessage, onNext, inputRef }) => {
  const tick = useRef<number>(0);
  useEffect(() => {
    const inputNode = inputRef.current;
    if (inputNode != null) {
      inputNode.disabled = false;
    }
    const interval = setInterval(() => {
      tick.current = tick.current + 1;
      if (inputNode != null) {
        inputNode.value = message.slice(0, tick.current);
      }
      if (tick.current === message.length) {
        setTimeout(() => {
          onNext();
        }, 1000);
      }
    }, 3000 / message.length);
    return () => {
      clearInterval(interval);
    };
  }, [onNext, message]);
  return <div className="text-primary-90 text-base">{previousBotMessage}</div>;
};

const LoaderStep: FC<StepShared> = ({ onNext, inputRef }) => {
  useEffect(() => {
    const inputNode = inputRef.current;
    if (inputNode != null) {
      inputNode.disabled = true;
    }
    const timeout = setTimeout(onNext, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [onNext]);
  return <Loader label="Thinking" className="absolute inset-0" />;
};

const BotStep: FC<{ messages: BotMessage[] } & StepShared> = ({
  messages,
  inputRef,
  onNext,
}) => {
  useEffect(() => {
    const inputNode = inputRef.current;
    if (inputNode != null) {
      inputNode.value = "";
      inputNode.disabled = false;
    }
    const timeout = setTimeout(onNext, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [onNext]);
  return (
    <div className="space-y-2">
      {messages.map((message, messageIndex) => {
        if (message.type === "text") {
          return (
            <div className="text-primary-90 text-base" key={messageIndex}>
              {message.message}
            </div>
          );
        }
        if (message.type === "images") {
          return (
            <div className="flex gap-2" key={messageIndex}>
              {message.images.map((imageUrl, index) => (
                <img key={index} src={imageUrl} className="h-48" />
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export const TouchpointExampleWidget: FC<{
  items: Item[];
  className?: string;
}> = (props) => {
  const [tick, setTick] = useState(0);

  const onNext = useCallback(() => {
    setTick((prev) => prev + 1);
  }, [setTick]);

  const currentItem = props.items[tick % props.items.length];

  const inputRef = useRef<HTMLInputElement | null>(null);

  const stepShared = { onNext, inputRef };

  return (
    <div
      className={clsx(
        "rounded-3xl shadow-lg bg-secondary-80 overflow-hidden flex flex-col text-gray-900 backdrop-blur-xl",
        "pointer-events-none select-none",
        props.className,
      )}
    >
      <div className="space-y-4 flex-grow flex flex-col p-3 overflow-x-hidden overflow-y-auto">
        <div className="space-y-2 flex flex-col flex-grow relative">
          {(() => {
            if (currentItem.type === "user") {
              return (
                <UserStep
                  message={currentItem.message}
                  previousBotMessage={currentItem.previousBotMessage}
                  {...stepShared}
                />
              );
            }
            if (currentItem.type === "loader") {
              return <LoaderStep {...stepShared} />;
            }
            if (currentItem.type === "bot") {
              return (
                <BotStep messages={currentItem.messages} {...stepShared} />
              );
            }
            return null;
          })()}
        </div>
      </div>
      <div className="p-2">
        <input
          ref={inputRef}
          className="text-base flex-none text-primary-80 w-full px-4 py-4 bg-primary-5 focus:outline-none rounded-outer disabled:text-primary-20"
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};
