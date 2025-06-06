/* eslint-disable jsdoc/require-jsdoc */
import {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useCallback,
} from "react";
import {
  type ConversationHandler,
  createConversation,
  isConfigValid,
  type Subscriber,
  type Response,
  type BotResponse,
} from "@nlxai/chat-core";
import { clsx } from "clsx";
import { findLastIndex } from "ramda";

import { LaunchButton } from "./components/ui/LaunchButton";
import { Header } from "./components/Header";
import { FullscreenVoice } from "./components/FullscreenVoice";
import { Settings } from "./components/Settings";
import { Messages } from "./components/Messages";
import { FullscreenError } from "./components/FullscreenError";
import { Input } from "./components/Input";
import type {
  WindowSize,
  ChoiceMessage,
  TouchpointConfiguration,
  InitializeConversation,
} from "./types";
import { CustomPropertiesContainer } from "./components/Theme";
import { VoiceMini } from "./components/VoiceMini";

/**
 * Main Touchpoint creation properties object
 */
interface Props extends TouchpointConfiguration {
  embedded: boolean;
  onClose: ((event: Event) => void) | null;
  enableSettings: boolean;
  enabled: boolean;
  initializeConversation: InitializeConversation;
}

export interface AppRef {
  setExpanded: (val: boolean) => void;
  getExpanded: () => boolean;
  getConversationHandler: () => ConversationHandler;
}

const App = forwardRef<AppRef, Props>((props, ref) => {
  const handler = useMemo(() => {
    return createConversation(props.config);
  }, [props.config]);

  const [responses, setResponses] = useState<Response[]>([]);

  const isWaiting = responses[responses.length - 1]?.type === "user";

  const colorMode = props.colorMode ?? "dark";

  const [isExpanded, setIsExpanded] = useState(props.embedded);

  const configValid = isConfigValid(props.config);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const isExpandedRef = useRef<boolean>(props.embedded);

  const input = props.input ?? "text";

  const onClose = useCallback(
    (event: Event) => {
      if (props.onClose != null) {
        props.onClose(event);
        if (!event.defaultPrevented) {
          setIsExpanded(false);
        }
      }
    },
    [props.onClose, setIsExpanded],
  );

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

  const conversationInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (!isExpanded || conversationInitialized.current) {
      return;
    }
    conversationInitialized.current = true;
    props.initializeConversation(handler, props.initialContext);
  }, [props.initializeConversation, props.initialContext, handler, isExpanded]);

  const windowSize: WindowSize =
    props.windowSize ?? (props.embedded ? "full" : "half");

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

  const [voiceActive, setVoiceActive] = useState<boolean>(false);

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const customModalities = props.customModalities ?? {};

  const [fullscreenVoiceSpeakersEnabled, setFullscreenVoiceSpeakersEnabled] =
    useState<boolean>(true);

  if (handler == null) {
    return null;
  }

  if (!isExpanded) {
    return props.launchIcon !== false ? (
      <CustomPropertiesContainer
        className="font-sans"
        theme={props.theme}
        colorMode={colorMode}
      >
        <LaunchButton
          className="fixed z-100 bottom-2 right-2 backdrop-blur z-launchButton"
          iconUrl={
            typeof props.launchIcon === "string" ? props.launchIcon : undefined
          }
          onClick={() => {
            setIsExpanded(true);
          }}
          label="Expand chat"
        />
      </CustomPropertiesContainer>
    ) : null;
  }

  if (input === "voiceMini") {
    return (
      <CustomPropertiesContainer
        theme={props.theme}
        colorMode={colorMode}
        className="fixed bottom-2 right-2 w-fit"
      >
        <VoiceMini handler={handler} context={props.initialContext} />
      </CustomPropertiesContainer>
    );
  }

  return (
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
          windowSize={props.embedded ? "embedded" : windowSize}
          errorThemedCloseButton={input === "voice" && voiceActive}
          speakerControls={
            input === "voice" && voiceActive
              ? {
                  enabled: fullscreenVoiceSpeakersEnabled,
                  setEnabled: setFullscreenVoiceSpeakersEnabled,
                }
              : undefined
          }
          colorMode={colorMode}
          brandIcon={props.brandIcon}
          isSettingsOpen={isSettingsOpen}
          enabled={props.enabled}
          toggleSettings={
            props.enableSettings
              ? () => {
                  setIsSettingsOpen((prev) => !prev);
                }
              : undefined
          }
          renderCollapse={props.onClose != null}
          collapse={(event) => {
            setVoiceActive(false);
            onClose(event);
          }}
          reset={() => {
            handler.reset({ clearResponses: true });
            props.initializeConversation(handler);

            setVoiceActive(false);
          }}
        />
        {isSettingsOpen ? (
          <Settings
            className={clsx(
              "flex-none",
              windowSize === "full" ? "w-full md:max-w-content md:mx-auto" : "",
            )}
            onClose={() => {
              setIsSettingsOpen(false);
            }}
            handler={handler}
          />
        ) : input === "text" ? (
          <>
            {configValid ? (
              <Messages
                enabled={props.enabled}
                userMessageBubble={props.userMessageBubble ?? false}
                agentMessageBubble={props.agentMessageBubble ?? false}
                chatMode={props.chatMode ?? false}
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
              enabled={props.enabled}
              choiceMessage={choiceMessage}
              handler={handler}
              uploadUrl={
                lastBotResponse?.response.payload.metadata?.uploadUrls?.[0]
              }
              onFileUpload={({ uploadId, file }) => {
                setUploadedFiles((prev) => ({
                  ...prev,
                  [uploadId]: file,
                }));
              }}
            />
          </>
        ) : (
          <FullscreenVoice
            active={voiceActive}
            setActive={setVoiceActive}
            brandIcon={props.brandIcon}
            handler={handler}
            speakersEnabled={fullscreenVoiceSpeakersEnabled}
            colorMode={colorMode}
            className="flex-grow"
            context={props.initialContext}
          />
        )}
      </div>
    </CustomPropertiesContainer>
  );
});

App.displayName = "App";

export default App;
