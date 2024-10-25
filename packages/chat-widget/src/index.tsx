import { marked, type MarkedExtension } from "marked";
import {
  type FC,
  type ReactNode,
  type ChangeEvent,
  createRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useContext,
  useMemo,
  createContext,
  forwardRef,
} from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { useChat, type ChatHook } from "@nlxai/chat-react";
import {
  type Response,
  type BotResponse,
  type ConversationHandler,
  type UploadUrl,
  getCurrentExpirationTimestamp,
} from "@nlxai/chat-core";
import {
  CloseIcon,
  MinimizeIcon,
  ChatIcon,
  SendIcon,
  CheckIcon,
  AddPhotoIcon,
  ErrorOutlineIcon,
} from "./icons";
import { last, equals, findLast } from "ramda";
import * as constants from "./ui/constants";
import {
  type Props,
  type StorageType,
  type CustomModalityComponent,
} from "./props";
import * as C from "./ui/components";

/** @hidden */
export { default as React } from "react";
/** @hidden */
export { default as ReactDOM } from "react-dom";

/** @hidden */
export { getCurrentExpirationTimestamp } from "@nlxai/chat-core";

export {
  type Props,
  type TitleBar,
  type CustomModalityComponent,
  type StorageType,
  type Nudge,
} from "./props";
export { type Theme } from "./theme";
export { defaultTheme } from "./ui/constants";

// use a custom Console to indicate we really want to log to the console and it's not incidental. `console.log` causes an eslint error
const Console = console;

/**
 * A handler for a Widget. Created with {@link create}
 */
export interface WidgetInstance {
  /**
   * End the conversation, clean up all event handlers, and remove the widget from the DOM.
   * If you want to additionally clear a stored session, explicitly call {@link clearSession} with your {@link Props}.
   */
  teardown: () => void;
  /**
   * Expand the widget and call the `onExpand` callback if present.
   */
  expand: () => void;
  /**
   * Collapse the widget and call the `onCollapse` callback if present.
   */
  collapse: () => void;
  /**
   * Get the ConversationHandler for widget. Returns undefined if the widget has not yet been established.
   * Note that this might not be available synchronously after widget initialization, and therefore an `undefined` check is highly recommended before use.
   * See: https://developers.nlx.ai/headless-api-reference#interfacesconversationhandlermd
   */
  getConversationHandler: () => ConversationHandler | undefined;
}

/**
 * Widget Ref, for use when rendering a Widget without using the `create` helper function.
 */
export interface WidgetRef {
  /**
   * {@inheritDoc WidgetInstance.expand}
   */
  expand: () => void;
  /**
   * {@inheritDoc WidgetInstance.collapse}
   */
  collapse: () => void;
  /**
   * the ConversationHandler for the widget.
   */
  conversationHandler: ConversationHandler;
}

/**
 * Create a new chat widget and renders it as the last element in the body.
 * @param props -
 * @returns the WidgetInstance to script widget behavior.
 */
export const create = (props: Props): WidgetInstance => {
  const node = document.createElement("div");
  node.setAttribute("id", "widget-container");
  node.setAttribute("style", `z-index: ${constants.largeZIndex};`);
  document.body.appendChild(node);
  const root = createRoot(node);
  const ref = createRef<WidgetRef>();
  root.render(<Widget {...props} ref={ref} />);
  return {
    teardown: () => {
      root.unmount();
    },
    expand: () => {
      ref.current?.expand();
    },
    collapse: () => {
      ref.current?.collapse();
    },
    getConversationHandler: () => {
      return ref.current?.conversationHandler;
    },
  };
};

const Loader: FC<{ message?: string; showAfter?: number }> = (props) => {
  const [showMessage, setShowMessage] = useState(props.showAfter === 0);
  useEffect(() => {
    const timeoutDuration =
      typeof props.showAfter === "number" ? props.showAfter : 2500;
    const timeout = setTimeout(() => {
      setShowMessage(true);
    }, timeoutDuration);
    return () => {
      clearTimeout(timeout);
    };
  }, [setShowMessage, props.showAfter]);

  return (
    <C.LoaderContainer>
      <C.PendingMessageDots />
      {showMessage && props.message != null && (
        <C.LoaderText>{props.message}</C.LoaderText>
      )}
    </C.LoaderContainer>
  );
};

const markdownRendererOverrides: MarkedExtension = {
  renderer: {
    link(href, title, text) {
      const link = marked.Renderer.prototype.link.call(this, href, title, text);
      return link.replace("<a", "<a target='_blank' ");
    },
  },
};

marked.use(markdownRendererOverrides);

const MessageGroups: FC<{
  chat: ChatHook;
  children?: ReactNode;
  uploadedFiles: Record<string, File>;
  customModalities: Record<string, CustomModalityComponent>;
  allowChoiceReselection?: boolean;
}> = (props) => (
  <C.MessageGroups>
    {props.chat.responses.map((response, responseIndex) => {
      if (response.type === "bot") {
        return (
          <C.MessageGroup key={responseIndex}>
            {response.payload.messages.map((botMessage, botMessageIndex) => (
              <C.Message type="bot" key={botMessageIndex}>
                <C.MessageBody
                  dangerouslySetInnerHTML={{
                    __html: marked(botMessage.text),
                  }}
                />
                {botMessage.choices.length > 0 && (
                  <C.ChoicesContainer>
                    {botMessage.choices.map((choice, choiceIndex) => (
                      <C.ChoiceButton
                        key={choiceIndex}
                        {...(() => {
                          const allowChoiceReselection =
                            props.allowChoiceReselection ?? false;
                          const selected =
                            botMessage.selectedChoiceId === choice.choiceId;
                          return !allowChoiceReselection &&
                            botMessage.selectedChoiceId != null
                            ? {
                                disabled: true,
                                selected,
                              }
                            : {
                                selected,
                                onClick: () => {
                                  props.chat.conversationHandler.sendChoice(
                                    choice.choiceId,
                                    {},
                                    // Upon reselection, send the node ID
                                    allowChoiceReselection
                                      ? {
                                          nodeId: botMessage.nodeId,
                                          intentId:
                                            botMessage.metadata?.intentId,
                                          responseIndex,
                                          messageIndex: botMessageIndex,
                                        }
                                      : {
                                          responseIndex,
                                          messageIndex: botMessageIndex,
                                        },
                                  );
                                },
                              };
                        })()}
                        dangerouslySetInnerHTML={{
                          __html: marked(choice.choiceText),
                        }}
                      ></C.ChoiceButton>
                    ))}
                  </C.ChoicesContainer>
                )}
              </C.Message>
            ))}
            {Object.entries(response.payload.modalities ?? {}).map(
              ([key, value]) => {
                const Component = props.customModalities[key];
                if (Component == null) {
                  Console.warn(
                    `Custom component implementation missing for the ${key} modality.`,
                  );
                  return null;
                }
                return <Component key={key} data={value} />;
              },
            )}
          </C.MessageGroup>
        );
      }

      if (response.type === "failure") {
        return (
          <C.FailureMessage key={responseIndex}>
            <ErrorOutlineIcon />
            {response.payload.text}
          </C.FailureMessage>
        );
      }

      if (response.type === "user") {
        if (response.payload.type === "text") {
          return (
            <C.MessageGroup key={responseIndex}>
              <C.Message type="user">
                <C.MessageBody
                  dangerouslySetInnerHTML={{
                    __html: marked(response.payload.text),
                  }}
                />
              </C.Message>
            </C.MessageGroup>
          );
        }

        if (response.payload.type === "structured") {
          const { uploadIds, utterance } = response.payload;
          if (uploadIds == null) {
            return null;
          }
          return (
            <C.MessageGroup key={responseIndex}>
              <C.Message type="user">
                {utterance != null ? (
                  <C.MessageBody
                    dangerouslySetInnerHTML={{
                      __html: marked(utterance),
                    }}
                  />
                ) : null}
              </C.Message>
              {uploadIds.map((uploadId) => {
                const file = props.uploadedFiles[uploadId];
                if (file != null) {
                  return (
                    <img
                      key={uploadId}
                      style={{ width: "100%", borderRadius: "10px" }}
                      src={URL.createObjectURL(file)}
                      role="presentation"
                    />
                  );
                }
                return null;
              })}
            </C.MessageGroup>
          );
        }
      }

      return null;
    })}
    {props.children}
  </C.MessageGroups>
);

const storageKey = "nlxchat-session";

interface SessionData {
  conversationId?: string;
  responses: Response[];
}

interface SessionIdentifier {
  botUrl: string;
  languageCode: string;
}

const saveSession = (
  sessionIdentifier: SessionIdentifier,
  sessionData: SessionData,
  storeIn: StorageType,
): void => {
  const storage = storeIn === "sessionStorage" ? sessionStorage : localStorage;
  storage.setItem(
    storageKey,
    JSON.stringify({
      sessionIdentifier,
      data: sessionData,
    }),
  );
};

/**
 * Clears stored session history.
 * @param storeIn - where to clear the session.
 */
export const clearSession = (storeIn: StorageType): void => {
  const storage = storeIn === "sessionStorage" ? sessionStorage : localStorage;
  storage.removeItem(storageKey);
};

// user shouldn't have to handle managing `storeIn` config after widget is started
const retrieveSession = (
  sessionIdentifier: SessionIdentifier,
  storeIn: StorageType,
): SessionData | null => {
  try {
    const storage =
      storeIn === "sessionStorage" ? sessionStorage : localStorage;
    const data = JSON.parse(storage.getItem(storageKey) ?? "");
    const savedSessionIdentifier = data?.sessionIdentifier;
    if (!equals(savedSessionIdentifier, sessionIdentifier)) {
      return null;
    }
    const responses: Response[] | undefined = data?.data?.responses;
    const conversationId: string | undefined = data?.data?.conversationId;
    if (responses != null) {
      return { responses, conversationId };
    }
    return null;
  } catch (err) {
    return null;
  }
};

const ConversationHandlerContext = createContext<ConversationHandler | null>(
  null,
);

// If the last bot message contains the payload 'nlx:input-disabled=true'
const isInputDisabled = (responses: Response[]): boolean => {
  const lastResponse = last(responses);
  if (lastResponse == null) {
    return false;
  }
  if (lastResponse.type !== "bot") {
    return false;
  }
  const payload = lastResponse.payload.payload ?? "";
  return new URLSearchParams(payload).get("nlx:input-disabled") === "true";
};

/**
 * IMPORTANT: upload state will get wiped out if there is a newer bot response comes in with different upload configuration.
 * This is generally the way conversations are intended to work (choice buttons also do not work by default after new messages come in),
 * and it's worth keeping these limitations in mind when designing/maintaining state management.
 */
const findActiveUpload = (responses: Response[]): UploadUrl | null => {
  const lastBotResponse = findLast(
    (response): response is BotResponse => response.type === "bot",
    responses,
  );
  if (lastBotResponse == null) {
    return null;
  }
  return lastBotResponse.payload.metadata?.uploadUrls?.[0] ?? null;
};

interface ImageUploadProps {
  upload: UploadUrl;
  onNewFile: (file: File) => void;
}

type UploadStatus = "empty" | "uploading" | "uploaded";

const ImageUpload: FC<ImageUploadProps> = (props) => {
  const [status, setStatus] = useState<UploadStatus>("empty");

  if (status === "uploading") {
    return <C.PendingMessageDots />;
  }

  if (status === "uploaded") {
    return (
      <C.UploadSuccess>
        <CheckIcon />
      </C.UploadSuccess>
    );
  }

  const handleChange = async (
    ev: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = ev.target.files?.[0];
    if (file == null) {
      return;
    }
    setStatus("uploading");
    try {
      await fetch(props.upload.url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: file,
      });
      props.onNewFile(file);
      setStatus("uploaded");
    } catch (_err) {
      // TODO: add error handling
      setStatus("empty");
    }
  };

  return (
    <C.UploadIconLabel>
      <input
        type="file"
        onChange={(ev) => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handleChange(ev);
        }}
      />
      <AddPhotoIcon />
    </C.UploadIconLabel>
  );
};

/**
 * Hook to get the ConversationHandler for the widget.
 * This may be called before the Widget has been created.
 * It will return null until the Widget has been created and the conversation has been established.
 * @returns the ConversationHandler if the widget has been created and its conversation has been established, otherwise it returns null.
 */
export const useConversationHandler = (): ConversationHandler | null => {
  return useContext(ConversationHandlerContext);
};

export const Widget = forwardRef<WidgetRef, Props>(function Widget(props, ref) {
  const [windowInnerHeightValue, setWindowInnerHeightValue] = useState<
    number | null
  >(null);

  useEffect(() => {
    setWindowInnerHeightValue(window.innerHeight);
    const handleResize = (): void => {
      setWindowInnerHeightValue(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const savedSessionData = useMemo(
    () =>
      props.storeIn != null
        ? retrieveSession(
            {
              botUrl: props.config.botUrl,
              languageCode: props.config.languageCode,
            },
            props.storeIn,
          )
        : null,
    [props.storeIn, props.config],
  );

  const configWithSession = useMemo(() => {
    if (savedSessionData == null) {
      return props.config;
    }
    return {
      ...props.config,
      conversationId:
        savedSessionData.conversationId ?? props.config.conversationId,
      responses: savedSessionData.responses ?? props.config.responses,
    };
  }, [props.config, savedSessionData]);

  // Chat

  const chat = useChat(configWithSession);

  useEffect(() => {
    if (props.storeIn != null) {
      saveSession(
        {
          botUrl: props.config.botUrl,
          languageCode: props.config.languageCode,
        },
        {
          responses: chat.responses,
          conversationId: chat.conversationHandler.currentConversationId(),
        },
        props.storeIn,
      );
    }
  }, [
    chat.responses,
    props.config.botUrl,
    props.config.languageCode,
    props.storeIn,
  ]);

  // Maintain a set of expioration timestamps for which resets have been performed, to ensure they are not handled multiple times
  const resetTimestamps = useRef(new Set<number>());

  useEffect(() => {
    const expirationTimestamp = getCurrentExpirationTimestamp(chat.responses);
    if (expirationTimestamp != null) {
      const until = expirationTimestamp - new Date().getTime();
      if (until <= 0) {
        if (!resetTimestamps.current.has(expirationTimestamp)) {
          resetTimestamps.current.add(expirationTimestamp);
          chat.conversationHandler.reset({ clearResponses: false });
          return;
        }
      }
      const timeout = setTimeout(() => {
        if (!resetTimestamps.current.has(expirationTimestamp)) {
          resetTimestamps.current.add(expirationTimestamp);
          chat.conversationHandler.reset({ clearResponses: false });
        }
      }, until);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [chat.responses, chat.conversationHandler.reset]);

  // Expanded state

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) {
      props.onExpand?.(chat.conversationHandler);
    } else {
      props.onCollapse?.(chat.conversationHandler);
    }
  }, [expanded, chat.conversationHandler]);

  const expand = useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);

  const collapse = useCallback(() => {
    setExpanded(false);
  }, [setExpanded]);

  useImperativeHandle(ref, () => {
    return {
      expand,
      collapse,
      conversationHandler: chat.conversationHandler,
    };
  });

  // Input focus

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current != null) {
      (inputRef as any).current.focus();
    }
  }, [expanded, chat.responses]);

  useEffect(() => {
    if (expanded) {
      scrollToBottom();
    }
  }, [expanded]);

  // Escape handling

  useEffect(() => {
    const handler = (ev: KeyboardEvent): void => {
      if (ev.key === "Escape") {
        setExpanded(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  // Bubble

  const [isNudgeVisible, setIsNudgeVisible] = useState(false);

  const showNudgeAfter = props.nudge?.showAfter ?? 3_000;
  const hideNudgeAfter = props.nudge?.hideAfter ?? 20_000;

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsNudgeVisible(true);
      timeout = setTimeout(() => {
        setIsNudgeVisible(false);
      }, hideNudgeAfter);
    }, showNudgeAfter);

    return () => {
      clearTimeout(timeout);
    };
  }, [showNudgeAfter, hideNudgeAfter]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const node = messagesContainerRef.current;
    if (node != null) {
      node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    }
  }, [messagesContainerRef]);

  useEffect(() => {
    scrollToBottom();
  }, [chat.responses]);

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const activeUpload = findActiveUpload(chat.responses);

  const submit =
    chat.inputValue.replace(/ /gi, "") !== "" &&
    (() => {
      if (activeUpload !== null) {
        chat.conversationHandler.sendStructured({
          uploadIds: [activeUpload.uploadId],
          utterance: chat.inputValue,
        });
        chat.setInputValue("");
        return;
      }
      chat.conversationHandler.sendText(chat.inputValue);
      chat.setInputValue("");
    });

  const inputDisabled = isInputDisabled(chat.responses);

  const mergedTheme = useMemo(
    () => ({
      ...constants.defaultTheme,
      ...(props.theme ?? {}),
      windowInnerHeight: windowInnerHeightValue,
      inputDisabled,
    }),
    [props.theme, windowInnerHeightValue, inputDisabled],
  );

  return (
    <ConversationHandlerContext.Provider value={chat.conversationHandler}>
      <ThemeProvider theme={mergedTheme}>
        <>
          {props.nudge != null ? (
            <C.PinBubble
              isActive={!expanded && isNudgeVisible}
              onClick={() => {
                props.onNudgeClose?.(chat.conversationHandler);
                setIsNudgeVisible(false);
              }}
              content={props.nudge.content}
            />
          ) : null}
          {expanded && (
            <C.Container>
              <C.Main ref={messagesContainerRef}>
                {props.titleBar != null ? (
                  <C.TitleBar>
                    {props.titleBar.logo != null ? (
                      <C.TitleIcon src={props.titleBar.logo} />
                    ) : null}
                    <C.Title>{props.titleBar.title}</C.Title>
                    {props.titleBar.withCollapseButton ?? false ? (
                      <C.TitleBarButton
                        title="Minimize"
                        onClick={() => {
                          collapse();
                        }}
                      >
                        <MinimizeIcon />
                      </C.TitleBarButton>
                    ) : null}
                    {props.titleBar.withCloseButton ?? false ? (
                      <C.TitleBarButton
                        title="Close"
                        onClick={() => {
                          collapse();
                          props.onClose?.();
                          chat.conversationHandler.reset({
                            clearResponses: true,
                          });
                        }}
                      >
                        <CloseIcon />
                      </C.TitleBarButton>
                    ) : null}
                  </C.TitleBar>
                ) : null}
                <MessageGroups
                  chat={chat}
                  uploadedFiles={uploadedFiles}
                  customModalities={props.customModalities ?? {}}
                  allowChoiceReselection={props.allowChoiceReselection}
                >
                  {chat.waiting && (
                    <C.MessageGroup>
                      <C.Message type="bot">
                        <Loader
                          message={props.loaderMessage}
                          showAfter={props.showLoaderMessageAfter}
                        />
                      </C.Message>
                    </C.MessageGroup>
                  )}
                </MessageGroups>
              </C.Main>
              <C.Bottom>
                {inputDisabled ? null : (
                  <>
                    <C.Input
                      ref={inputRef}
                      value={chat.inputValue}
                      placeholder={
                        props.inputPlaceholder ?? "Type something..."
                      }
                      onChange={(event: any) => {
                        chat.setInputValue(
                          (event.target as HTMLInputElement).value,
                        );
                      }}
                      onKeyUp={(event: any) => {
                        if (event.key === "Enter" && submit !== false) {
                          submit();
                        }
                      }}
                    />
                    <C.BottomButtonsContainer>
                      {activeUpload == null ? null : (
                        <ImageUpload
                          key={activeUpload.uploadId}
                          upload={activeUpload}
                          onNewFile={(file) => {
                            setUploadedFiles((prev) => ({
                              ...prev,
                              [activeUpload.uploadId]: file,
                            }));
                          }}
                        />
                      )}
                      <C.IconButton
                        disabled={Boolean(submit === false)}
                        onClick={() => {
                          if (submit !== false) {
                            submit();
                          }
                        }}
                      >
                        <SendIcon />
                      </C.IconButton>
                    </C.BottomButtonsContainer>
                  </>
                )}
              </C.Bottom>
            </C.Container>
          )}
          <C.Pin
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded &&
            !(
              (props.titleBar?.withCloseButton ?? false) ||
              (props.titleBar?.withCollapseButton ?? false)
            ) ? (
              <CloseIcon />
            ) : props.chatIcon != null ? (
              <img src={props.chatIcon} />
            ) : (
              <ChatIcon />
            )}
          </C.Pin>
        </>
      </ThemeProvider>
    </ConversationHandlerContext.Provider>
  );
});
