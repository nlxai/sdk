/* eslint-disable jsdoc/require-jsdoc */
import {
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
  type Theme,
  type CustomModalityComponent,
} from "./types";
import { Context } from "./context";
import { CustomPropertiesContainer } from "./components/Theme";

export interface Props {
  config: Config;
  windowSize?: WindowSize;
  colorMode?: ColorMode;
  logoUrl?: LogoUrl;
  theme?: Partial<Theme>;
  customModalities?: Record<string, CustomModalityComponent<any>>;
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

  const colorMode = props.colorMode ?? "dark";

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

  const customModalities = props.customModalities ?? {};

  if (handler == null) {
    return null;
  }

  return (
    <Context.Provider value={{ handler }}>
      {isExpanded ? (
        <CustomPropertiesContainer
          theme={props.theme}
          colorMode={colorMode}
          className="grid grid-cols-2 xl:grid-cols-[1fr_632px] fixed inset-0 z-touchpoint"
        >
          {windowSize === "half" ? (
            <div className="hidden md:block bg-overlay" />
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
                className={clsx(
                  "flex-none",
                  windowSize === "full"
                    ? "w-full md:max-w-content md:mx-auto"
                    : "",
                )}
                onClose={() => {
                  setIsSettingsOpen(false);
                }}
                windowSize={windowSize}
                setWindowSizeOverride={setWindowSizeOverride}
                handler={handler}
              />
            ) : (
              <>
                <ChatMessages
                  isWaiting={isWaiting}
                  lastBotResponseIndex={lastBotResponse?.index}
                  responses={responses}
                  colorMode={colorMode}
                  handler={handler}
                  uploadedFiles={uploadedFiles}
                  customModalities={customModalities}
                  className={clsx(
                    "flex-grow",
                    windowSize === "full"
                      ? "w-full md:max-w-content md:mx-auto"
                      : "",
                  )}
                />
                <ChatInput
                  className={clsx(
                    "flex-none",
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
        </CustomPropertiesContainer>
      ) : (
        <CustomPropertiesContainer
          className="font-sans"
          theme={props.theme}
          colorMode={colorMode}
        >
          <LaunchButton
            className="fixed z-100 bottom-2 right-2 backdrop-blur z-launchButton"
            iconUrl={
              props.logoUrl == null
                ? undefined
                : typeof props.logoUrl === "string"
                  ? props.logoUrl
                  : props.logoUrl[colorMode]
            }
            onClick={() => {
              setIsExpanded(true);
            }}
            label="Expand chat"
          />
        </CustomPropertiesContainer>
      )}
    </Context.Provider>
  );
});

App.displayName = "App";

export default App;
