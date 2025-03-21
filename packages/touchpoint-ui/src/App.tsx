/* eslint-disable jsdoc/require-jsdoc */
import {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import {
  type ConversationHandler,
  createConversation,
  isConfigValid,
  type Subscriber,
  type Response,
  type Config,
  type BotResponse,
} from "@nlxai/chat-core";
import { clsx } from "clsx";
import { findLastIndex } from "ramda";

import { LaunchButton } from "./components/ui/LaunchButton";
import { Header } from "./components/Header";
import { Settings } from "./components/Settings";
import { Messages } from "./components/Messages";
import { FullscreenError } from "./components/FullscreenError";
import { Input } from "./components/Input";
import {
  type ColorMode,
  type WindowSize,
  type ChoiceMessage,
  type Theme,
  type CustomModalityComponent,
} from "./types";
import { CustomPropertiesContainer } from "./components/Theme";

/**
 * Main Touchpoint creation properties object
 */
export interface Props {
  /**
   * Configuration object for Touchpoint
   */
  config: Config;
  /**
   * Optional window size for the chat window, defaults to `half`
   */
  windowSize?: WindowSize;
  /**
   * Optional color mode for the chat window, defaults to `dark`
   */
  colorMode?: ColorMode;
  /**
   * URL of icon used to display the brand in the chat header
   */
  brandIcon?: string;
  /**
   * URL of icon used on the launch icon in the bottom right when the experience is collapsed.
   *
   * When set to `false`, no launch button is shown at all. When not set or set to `true`, the default launch icon is rendered.
   */
  launchIcon?: string | boolean;
  /**
   * Optional theme object to override default theme values
   */
  theme?: Partial<Theme>;
  /**
   * Optional custom modality components to render in Touchpoint
   */
  customModalities?: Record<string, CustomModalityComponent<any>>;
}

export interface AppRef {
  setExpanded: (val: boolean) => void;
  getExpanded: () => boolean;
  getConversationHandler: () => ConversationHandler;
}

const isDev = import.meta.env.DEV;

const App = forwardRef<AppRef, Props>((props, ref) => {
  const handler = useMemo(() => {
    return createConversation(props.config);
  }, [props.config]);

  const [responses, setResponses] = useState<Response[]>([]);

  const isWaiting = responses[responses.length - 1]?.type === "user";

  const colorMode = props.colorMode ?? "dark";

  const [isExpanded, setIsExpanded] = useState(isDev);

  const configValid = isConfigValid(props.config);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const isExpandedRef = useRef<boolean>(isDev);

  useEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  useImperativeHandle(
    ref,
    () => {
      return {
        setExpanded: setIsExpanded,
        getExpanded() {
          return isExpandedRef.current;
        },
        getConversationHandler() {
          return handler;
        },
      };
    },
    [handler, setIsExpanded],
  );

  useEffect(() => {
    const fn: Subscriber = (responses) => {
      setResponses(responses);
    };
    handler.subscribe(fn);
    return () => {
      handler.unsubscribe(fn);
    };
  }, [handler, setResponses]);

  const initialWelcomeIntentSent = useRef<boolean>(false);

  useEffect(() => {
    if (!isExpanded || initialWelcomeIntentSent.current) {
      return;
    }
    initialWelcomeIntentSent.current = true;
    handler.sendWelcomeIntent();
  }, [handler, isExpanded]);

  const windowSize: WindowSize = props.windowSize ?? "half";

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
    <>
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
            <Header
              windowSize={windowSize}
              colorMode={colorMode}
              brandIcon={props.brandIcon}
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
              <Settings
                className={clsx(
                  "flex-none",
                  windowSize === "full"
                    ? "w-full md:max-w-content md:mx-auto"
                    : "",
                )}
                onClose={() => {
                  setIsSettingsOpen(false);
                }}
                handler={handler}
              />
            ) : (
              <>
                {configValid ? (
                  <Messages
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
                ) : (
                  <FullscreenError />
                )}
                <Input
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
      ) : props.launchIcon !== false ? (
        <CustomPropertiesContainer
          className="font-sans"
          theme={props.theme}
          colorMode={colorMode}
        >
          <LaunchButton
            className="fixed z-100 bottom-2 right-2 backdrop-blur z-launchButton"
            iconUrl={
              typeof props.launchIcon === "string"
                ? props.launchIcon
                : undefined
            }
            onClick={() => {
              setIsExpanded(true);
            }}
            label="Expand chat"
          />
        </CustomPropertiesContainer>
      ) : null}
    </>
  );
});

App.displayName = "App";

export default App;
