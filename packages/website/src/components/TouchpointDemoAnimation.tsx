import {
  type FC,
  type MutableRefObject,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { clsx } from "clsx";

import { IconButton } from "./TouchpointComponents/IconButton";
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
            <div className="flex overflow-hidden gap-2" key={messageIndex}>
              {message.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  className="w-[290px] h-48 flex-none"
                />
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const SendIcon: FC<unknown> = () => {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path
        d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const Undo: FC<unknown> = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19V21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const Settings: FC<unknown> = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M19.1064 12.9302C19.1459 12.6333 19.1657 12.3266 19.1657 12C19.1657 11.6833 19.1459 11.3667 19.0965 11.0698L21.1053 9.50625C21.2834 9.36771 21.3329 9.10052 21.2241 8.9026L19.3241 5.61719C19.2053 5.39948 18.9579 5.33021 18.7402 5.39948L16.3751 6.34948C15.8803 5.97344 15.3558 5.65677 14.772 5.41927L14.4157 2.90573C14.3761 2.66823 14.1782 2.5 13.9407 2.5H10.1407C9.90323 2.5 9.71521 2.66823 9.67563 2.90573L9.31938 5.41927C8.73552 5.65677 8.20115 5.98333 7.71625 6.34948L5.35115 5.39948C5.13344 5.32031 4.88604 5.39948 4.7673 5.61719L2.87719 8.9026C2.75844 9.11042 2.79802 9.36771 2.99594 9.50625L5.00479 11.0698C4.95532 11.3667 4.91573 11.6932 4.91573 12C4.91573 12.3068 4.93552 12.6333 4.985 12.9302L2.97615 14.4938C2.79802 14.6323 2.74855 14.8995 2.8574 15.0974L4.7574 18.3828C4.87615 18.6005 5.12354 18.6698 5.34125 18.6005L7.70636 17.6505C8.20115 18.0266 8.72563 18.3432 9.30948 18.5807L9.66573 21.0943C9.71521 21.3318 9.90323 21.5 10.1407 21.5H13.9407C14.1782 21.5 14.3761 21.3318 14.4058 21.0943L14.7621 18.5807C15.3459 18.3432 15.8803 18.0266 16.3652 17.6505L18.7303 18.6005C18.948 18.6797 19.1954 18.6005 19.3142 18.3828L21.2142 15.0974C21.3329 14.8797 21.2834 14.6323 21.0954 14.4938L19.1064 12.9302ZM12.0407 15.5625C10.0814 15.5625 8.47823 13.9594 8.47823 12C8.47823 10.0406 10.0814 8.4375 12.0407 8.4375C14.0001 8.4375 15.6032 10.0406 15.6032 12C15.6032 13.9594 14.0001 15.5625 12.0407 15.5625Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TouchpointDemoAnimation: FC<{
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
        <div className="flex items-center justify-between">
          <IconButton
            Icon={Undo}
            label="Reset"
            type="ghost"
            onClick={() => {}}
          />
          <IconButton
            Icon={Settings}
            label="Settings"
            type="ghost"
            onClick={() => {}}
          />
        </div>
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
      <div className="p-2 relative">
        <input
          ref={inputRef}
          className="peer text-base flex-none text-primary-80 w-full px-4 py-4 bg-primary-5 focus:outline-none rounded-outer disabled:text-primary-20"
          placeholder="Type your message..."
        />
        <button
          aria-label="Send message"
          className="p-3 w-10 h-10 absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors rounded-inner z-10 overflow-hidden before:content-[''] before:absolute before:transition-colors before:-z-10 before:inset-0 before:bg-transparent focus:outline-0 bg-primary-80 text-secondary-80 enabled:hover:before:bg-primary-80 focus:before:bg-primary-80 enabled:active:before:bg-secondary-10 peer-disabled:bg-primary-10 peer-disabled:text-secondary-40 flex-none"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
