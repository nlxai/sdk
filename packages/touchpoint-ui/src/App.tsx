/* eslint-disable jsdoc/require-jsdoc */
import {
  type FC,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  useCallback,
  forwardRef,
  useMemo,
} from "react";
import {
  type ConversationHandler,
  createConversation,
  type Subscriber,
  type Response,
  type Config,
  type BotResponse,
} from "@nlxai/chat-core";
import { clsx } from "clsx";
import { findLastIndex } from "ramda";

import { LaunchButton } from "./components/ui/LaunchButton";
import { ChatHeader } from "./components/ChatHeader";
import { ChatSettings } from "./components/ChatSettings";
import { ChatMessages } from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import {
  type ColorMode,
  type WindowSize,
  type LogoUrl,
  type ChoiceMessage,
} from "./types";
import { Context } from "./context";

export interface Props {
  config: Config;
  windowSize?: WindowSize;
  colorMode?: ColorMode;
  logoUrl?: LogoUrl;
  overrides?: {
    loader?: FC<unknown>;
  };
}

export interface AppRef {
  expand: () => void;
  collapse: () => void;
  getConversationHandler: () => ConversationHandler | null;
}

const isDev = import.meta.env.DEV;

const App = forwardRef<AppRef, Props>((props, ref) => {
  const [handler, setHandler] = useState<ConversationHandler | null>(null);

  const [responses, setResponses] = useState<Response[]>([]);

  const isWaiting = responses[responses.length - 1]?.type === "user";

  const [colorModeOverride, setColorModeOverride] = useState<ColorMode | null>(
    null,
  );

  const [windowSizeOverride, setWindowSizeOverride] =
    useState<WindowSize | null>(null);

  const [isExpanded, setIsExpanded] = useState(isDev);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const expand = useCallback(() => {
    setIsExpanded(true);
  }, [setIsExpanded]);

  const collapse = useCallback(() => {
    setIsExpanded(false);
  }, [setIsExpanded]);

  useImperativeHandle(
    ref,
    () => {
      return {
        expand,
        collapse,
        getConversationHandler: () => handler,
      };
    },
    [expand, collapse, handler],
  );

  useEffect(() => {
    setHandler(createConversation(props.config));
  }, [props.config, setHandler]);

  useEffect(() => {
    if (handler == null) {
      return;
    }
    const fn: Subscriber = (responses) => {
      setResponses(responses);
    };
    handler.subscribe(fn);
    return () => {
      handler?.unsubscribe(fn);
    };
  }, [handler, setResponses]);

  const initialWelcomeIntentSent = useRef<boolean>(false);

  useEffect(() => {
    if (handler == null || !isExpanded || initialWelcomeIntentSent.current) {
      return;
    }
    initialWelcomeIntentSent.current = true;
    handler.sendWelcomeIntent();
  }, [handler, isExpanded]);

  const windowSize: WindowSize =
    windowSizeOverride ?? props.windowSize ?? "half";

  const colorMode: ColorMode = colorModeOverride ?? props.colorMode ?? "dark";

  const lastBotResponse = useMemo<{
    index: number;
    response: BotResponse;
  } | null>(() => {
    const index = findLastIndex((res) => res.type === "bot", responses);
    if (index === -1) {
      return null;
    }
    const response = responses[index];
    if (response?.type !== "bot") {
      return null;
    }
    return { index, response };
  }, [responses]);

  const choiceMessage = useMemo<ChoiceMessage | undefined>(() => {
    if (lastBotResponse == null) {
      return;
    }
    const choiceMessageIndex = findLastIndex((message) => {
      return message.choices.length > 0;
    }, lastBotResponse.response.payload.messages);
    if (choiceMessageIndex === -1) {
      return;
    }
    const choiceMessage =
      lastBotResponse.response.payload.messages[choiceMessageIndex];
    if (choiceMessage == null) {
      return;
    }
    return {
      message: choiceMessage,
      messageIndex: choiceMessageIndex,
      responseIndex: lastBotResponse.index,
    };
  }, [lastBotResponse]);

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  if (handler == null) {
    return null;
  }

  return (
    <Context.Provider value={{ handler }}>
      {isExpanded ? (
        <div
          data-theme={colorMode}
          className="grid grid-cols-2 xl:grid-cols-[1fr_632px] fixed inset-0 z-touchpoint font-sans"
        >
          {windowSize === "half" ? (
            <div className="hidden md:block bg-overlay"></div>
          ) : null}
          <div
            className={clsx(
              "w-full bg-background text-primary-80 flex relative flex-col h-full backdrop-blur-overlay",
              {
                "col-span-2 md:col-span-1": windowSize === "half",
                "col-span-2": windowSize === "full",
              },
            )}
          >
            <ChatHeader
              windowSize={windowSize}
              colorMode={colorMode}
              logoUrl={props.logoUrl}
              isSettingsOpen={isSettingsOpen}
              toggleSettings={() => {
                setIsSettingsOpen((prev) => !prev);
              }}
              collapse={() => {
                setIsExpanded(false);
              }}
              reset={() => {
                handler.reset({ clearResponses: true });
                handler.sendWelcomeIntent();
              }}
            />
            {isSettingsOpen ? (
              <ChatSettings
                className={
                  windowSize === "full"
                    ? "w-full md:max-w-content md:mx-auto"
                    : ""
                }
                onClose={() => {
                  setIsSettingsOpen(false);
                }}
                colorMode={colorMode}
                windowSize={windowSize}
                setColorModeOverride={setColorModeOverride}
                setWindowSizeOverride={setWindowSizeOverride}
                handler={handler}
              />
            ) : (
              <>
                <ChatMessages
                  isWaiting={isWaiting}
                  responses={responses}
                  colorMode={colorMode}
                  handler={handler}
                  uploadedFiles={uploadedFiles}
                  className={
                    windowSize === "full"
                      ? "w-full md:max-w-content md:mx-auto"
                      : ""
                  }
                />
                <ChatInput
                  className={clsx(
                    windowSize === "full"
                      ? "w-full md:max-w-content md:mx-auto"
                      : "",
                  )}
                  choiceMessage={choiceMessage}
                  handler={handler}
                  uploadUrl={
                    lastBotResponse?.response.payload.metadata?.uploadUrls?.[0]
                  }
                  onFileUpload={({ uploadId, file }) => {
                    setUploadedFiles((prev) => ({ ...prev, [uploadId]: file }));
                  }}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <div data-theme={colorMode} className="font-sans">
          <LaunchButton
            className="fixed z-100 bottom-2 right-2 backdrop-blur z-launchButton"
            onClick={() => {
              setIsExpanded(true);
            }}
            label="Expand chat"
          />
        </div>
      )}
    </Context.Provider>
  );
});

App.displayName = "App";

export default App;
