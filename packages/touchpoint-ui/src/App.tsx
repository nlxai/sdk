/* eslint-disable jsdoc/require-jsdoc */
import {
  type ReactNode,
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
  ResponseType,
  isConfigValid,
  type Subscriber,
  type Response,
  type ApplicationResponse,
} from "@nlxai/core";
import { clsx } from "clsx";
import { findLastIndex } from "ramda";

import { LaunchButton } from "./components/ui/LaunchButton";
import { Header } from "./components/Header";
import { FullscreenVoice } from "./components/FullscreenVoice";
import { Settings } from "./components/Settings";
import { MessageChoices, Messages } from "./components/Messages";
import { FullscreenError } from "./components/FullscreenError";
import { Input } from "./components/Input";
import type {
  WindowSize,
  ChoiceMessage,
  NormalizedTouchpointConfiguration,
} from "./types";
import { CustomPropertiesContainer } from "./components/Theme";
import { VoiceMini } from "./components/VoiceMini";
import { gatherAutomaticContext } from "./bidirectional/automaticContext";
import { commandHandler } from "./bidirectional/commandHandler";

/**
 * Main Touchpoint creation properties object
 */
interface Props extends NormalizedTouchpointConfiguration {
  embedded: boolean;
  onClose: ((event: Event) => void) | null;
  enableSettings: boolean;
  enabled: boolean;
}

export interface AppRef {
  setExpanded: (val: boolean) => void;
  getExpanded: () => boolean;
  getConversationHandler: () => ConversationHandler;
}

const App = forwardRef<AppRef, Props>((props, ref) => {
  const restoredConversation =
    sessionStorage.getItem("nlxActiveVoiceConversationId") ===
    props.config.conversationId;

  const responseData = useMemo(() => {
    const responsesData =
      sessionStorage.getItem("nlxActiveConversationResponses") ?? "{}";
    try {
      const responses = JSON.parse(responsesData);
      if (Array.isArray(responses[props.config.conversationId])) {
        return responses[props.config.conversationId];
      }
    } catch (err) {
      return null;
    }
  }, [props.config.conversationId]);

  const handler = useMemo(() => {
    return createConversation({ responses: responseData, ...props.config });
  }, [props.config, responseData]);

  const [responses, setResponses] = useState<Response[]>([]);

  const isWaiting = responses[responses.length - 1]?.type === ResponseType.User;

  const colorMode = props.colorMode ?? "dark";

  const [isExpanded, setIsExpanded] = useState(
    props.embedded || restoredConversation,
  );

  const configValid = isConfigValid(props.config);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const isExpandedRef = useRef<boolean>(props.embedded || restoredConversation);

  const input = props.input ?? "text";

  const onClose = useCallback(
    (event: Event) => {
      if (props.onClose != null) {
        props.onClose(event);
        sessionStorage.removeItem("nlxActiveVoiceConversationId");
        // In text mode, collapsing should leave the conversation intact so re-expanding fully resumes it.
        // In voice, the behavior is designed to be consistent with voice mini, where the close button also hangs up the call.
        // Subsequently re-expanding the experience should start a brand new call.
        if (input === "voice" || input === "voiceMini") {
          handler.reset({ clearResponses: true });
        }
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
      const conversationId = handler.currentConversationId();
      if (input === "text" && conversationId != null) {
        sessionStorage.setItem(
          "nlxActiveConversationResponses",
          JSON.stringify({ [conversationId]: responses }),
        );
      }
    };
    handler.subscribe(fn);
    return () => {
      handler.unsubscribe(fn);
    };
  }, [handler, setResponses]);

  const conversationInitialized = useRef<boolean>(restoredConversation);

  useEffect(() => {
    if (!isExpanded || conversationInitialized.current) {
      return;
    }
    conversationInitialized.current = true;

    if (input !== "text" || responseData == null || responseData.length === 0) {
      props.initializeConversation(handler, props.initialContext);
    }
    if (props.config.conversationId != null)
      sessionStorage.setItem(
        "nlxActiveVoiceConversationId",
        props.config.conversationId,
      );
  }, [props.initializeConversation, props.initialContext, handler, isExpanded]);

  const pageState = useRef<{
    formElements: Record<string, Element>;
    links: Record<string, string>;
  }>({
    formElements: {},
    links: {},
  });

  useEffect(() => {
    if (
      isExpanded &&
      props.bidirectional != null &&
      props.bidirectional.automaticContext !== false
    ) {
      return gatherAutomaticContext(handler, (val) => {
        pageState.current = val;
      });
    }
  }, [isExpanded, handler, props.bidirectional]);

  useEffect(() => {
    if (
      props.bidirectional != null &&
      (props.bidirectional.navigation != null ||
        props.bidirectional.input != null ||
        props.bidirectional.custom != null ||
        props.bidirectional.automaticContext !== false)
    ) {
      return commandHandler(handler, props.bidirectional, pageState);
    }
  }, [props.bidirectional, handler]);

  const windowSize: WindowSize =
    props.windowSize ?? (props.embedded ? "full" : "half");

  const lastApplicationResponse = useMemo<{
    index: number;
    response: ApplicationResponse;
  } | null>(() => {
    const index = findLastIndex(
      (res) => res.type === ResponseType.Application,
      responses,
    );
    if (index === -1) {
      return null;
    }
    const response = responses[index];
    if (response?.type !== ResponseType.Application) {
      return null;
    }
    return { index, response };
  }, [responses]);

  const choiceMessage = useMemo<ChoiceMessage | undefined>(() => {
    if (lastApplicationResponse == null) {
      return;
    }
    const choiceMessageIndex = findLastIndex((message) => {
      return message.choices.length > 0;
    }, lastApplicationResponse.response.payload.messages);
    if (choiceMessageIndex === -1) {
      return;
    }
    const choiceMessage =
      lastApplicationResponse.response.payload.messages[choiceMessageIndex];
    if (choiceMessage == null) {
      return;
    }
    return {
      message: choiceMessage,
      messageIndex: choiceMessageIndex,
      responseIndex: lastApplicationResponse.index,
    };
  }, [lastApplicationResponse]);

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const customModalities = props.customModalities ?? {};

  const [fullscreenVoiceSpeakersEnabled, setFullscreenVoiceSpeakersEnabled] =
    useState<boolean>(true);

  // Used as key to voice components so they are destroyed and re-initialized e.g. on conversation reset
  const [voiceKey, setVoiceKey] = useState<number>(0);

  const reset = (): void => {
    handler.reset({ clearResponses: true });
    if (input !== "voice") {
      props.initializeConversation(handler, props.initialContext);
    }
    const newConversationId = handler.currentConversationId();
    if (sessionStorage.getItem("nlxConversationId") !== null) {
      if (newConversationId == null) {
        sessionStorage.removeItem("nlxConversationId");
      } else {
        sessionStorage.setItem("nlxConversationId", newConversationId);
      }
    }

    if (newConversationId != null) {
      sessionStorage.setItem("nlxActiveVoiceConversationId", newConversationId);
    }
    setVoiceKey((prev) => prev + 1);
  };

  if (handler == null) {
    return null;
  }

  if (!isExpanded) {
    return props.launchIcon !== false ? (
      <CustomPropertiesContainer
        className="fixed z-launchButton bottom-2 right-2 w-fit"
        theme={props.theme}
        colorMode={colorMode}
      >
        <LaunchButton
          className="backdrop-blur"
          iconUrl={
            typeof props.launchIcon === "string" ? props.launchIcon : undefined
          }
          Custom={
            typeof props.launchIcon === "function"
              ? props.launchIcon
              : undefined
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
        className={clsx(
          "w-fit",
          props.embedded ? "" : "fixed z-touchpoint bottom-2 right-2",
        )}
      >
        <VoiceMini
          key={voiceKey}
          handler={handler}
          context={props.initialContext}
          onClose={() => {
            onClose(new Event("close"));
          }}
          renderCollapse={props.onClose != null}
          customModalities={customModalities}
        />
      </CustomPropertiesContainer>
    );
  }

  const textContent = (): ReactNode => {
    if (isSettingsOpen) {
      return (
        <Settings
          reset={() => {
            reset();
            setIsSettingsOpen(false);
          }}
          className={clsx(
            "flex-none",
            windowSize === "full" ? "w-full md:max-w-content md:mx-auto" : "",
          )}
          onClose={() => {
            setIsSettingsOpen(false);
          }}
          handler={handler}
        />
      );
    }
    if (!configValid) {
      return <FullscreenError />;
    }
    return (
      <>
        <Messages
          enabled={props.enabled}
          userMessageBubble={props.userMessageBubble ?? false}
          agentMessageBubble={props.agentMessageBubble ?? false}
          chatMode={props.chatMode ?? false}
          isWaiting={isWaiting}
          lastApplicationResponseIndex={lastApplicationResponse?.index}
          responses={responses}
          colorMode={colorMode}
          handler={handler}
          uploadedFiles={uploadedFiles}
          customModalities={customModalities}
          className={clsx(
            "flex-grow",
            windowSize === "full" ? "w-full md:max-w-content md:mx-auto" : "",
          )}
        />
        <div
          className={clsx(
            "p-2 md:p-3 flex flex-col flex-none gap-2",
            windowSize === "full" ? "w-full md:max-w-content md:mx-auto" : "",
          )}
        >
          {choiceMessage != null ? (
            <MessageChoices {...choiceMessage} handler={handler} />
          ) : null}
          {choiceMessage?.message.selectedChoiceId != null ? null : (
            <Input
              enabled={props.enabled}
              handler={handler}
              uploadUrl={
                lastApplicationResponse?.response.payload.metadata
                  ?.uploadUrls?.[0]
              }
              onFileUpload={({ uploadId, file }) => {
                setUploadedFiles((prev) => ({
                  ...prev,
                  [uploadId]: file,
                }));
              }}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <CustomPropertiesContainer
      theme={props.theme}
      colorMode={colorMode}
      className={clsx(
        "grid grid-cols-2 xl:grid-cols-[1fr_632px]",
        props.embedded ? "w-full h-full" : "fixed inset-0 z-touchpoint",
      )}
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
          errorThemedCloseButton={input === "voice"}
          speakerControls={
            input === "voice"
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
          collapse={onClose}
          reset={reset}
        />
        {input === "text" ? (
          textContent()
        ) : (
          <>
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
                reset={() => {
                  reset();
                  setIsSettingsOpen(false);
                }}
                handler={handler}
              />
            ) : null}
            <FullscreenVoice
              key={voiceKey}
              initializeConversation={props.initializeConversation}
              brandIcon={props.brandIcon}
              handler={handler}
              speakersEnabled={fullscreenVoiceSpeakersEnabled}
              colorMode={colorMode}
              className={isSettingsOpen ? "hidden" : "flex-grow"}
              context={props.initialContext}
              customModalities={customModalities}
            />
          </>
        )}
      </div>
    </CustomPropertiesContainer>
  );
});

App.displayName = "App";

export default App;
