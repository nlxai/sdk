import { marked, type MarkedExtension } from "marked";
import React, {
  type FC,
  type ReactNode,
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
import { type Response, type ConversationHandler } from "@nlxai/chat-core";
import {
  CloseIcon,
  MinimizeIcon,
  ChatIcon,
  SendIcon,
  ErrorOutlineIcon,
} from "./icons";
import * as constants from "./ui/constants";
import {
  type Props,
  type StorageType,
  type CustomModalityComponent,
} from "./props";
import * as C from "./ui/components";

export { default as React } from "react";
export { default as ReactDOM } from "react-dom";

export {
  type Props,
  type TitleBar,
  type CustomModalityComponent,
} from "./props";
export { type Theme } from "./theme";
export { defaultTheme } from "./ui/constants";

export interface WidgetInstance {
  teardown: () => void;
  expand: () => void;
  collapse: () => void;
  getConversationHandler: () => ConversationHandler | undefined;
}

export interface WidgetRef {
  expand: () => void;
  collapse: () => void;
  conversationHandler: ConversationHandler;
}

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
      {/* initial eslint integration */}
      {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
      {showMessage && props.message && (
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
  customModalities: Record<string, CustomModalityComponent>;
  allowChoiceReselection?: boolean;
}> = (props) => (
  <C.MessageGroups>
    {/* initial eslint integration */}
    {/* eslint-disable-next-line array-callback-return */}
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
                          // initial eslint integration
                          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                  console.warn(
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

      if (response.type === "user" && response.payload.type === "text") {
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
    })}
    {props.children}
  </C.MessageGroups>
);

const storageKey = "nlxchat-session";

interface SessionData {
  conversationId?: string;
  responses: Response[];
}

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const saveSession = (chat: ChatHook, storeIn: StorageType) => {
  const storage = storeIn === "sessionStorage" ? sessionStorage : localStorage;
  storage.setItem(
    storageKey,
    JSON.stringify({
      responses: chat.responses,
      conversationId: chat.conversationHandler.currentConversationId(),
    }),
  );
};

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const clearSession = (storeIn: StorageType) => {
  const storage = storeIn === "sessionStorage" ? sessionStorage : localStorage;
  storage.removeItem(storageKey);
};

export const retrieveSession = (storeIn: StorageType): SessionData | null => {
  try {
    const storage =
      storeIn === "sessionStorage" ? sessionStorage : localStorage;
    const data = JSON.parse(storage.getItem(storageKey) ?? "");
    const responses: Response[] | undefined = data?.responses;
    const conversationId: string | undefined = data?.conversationId;
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

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useConversationHandler = () => {
  return useContext(ConversationHandlerContext);
};

// initial eslint integration
// eslint-disable-next-line react/display-name
export const Widget = forwardRef<WidgetRef, Props>((props, ref) => {
  const [windowInnerHeightValue, setWindowInnerHeightValue] = useState<
    number | null
  >(null);

  useEffect(() => {
    setWindowInnerHeightValue(window.innerHeight);
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleResize = () => {
      setWindowInnerHeightValue(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const savedSessionData = useMemo(
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    () => (props.storeIn ? retrieveSession(props.storeIn) : null),
    [props.storeIn],
  );

  const configWithSession = useMemo(() => {
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!savedSessionData) {
      return props.config;
    }
    return {
      ...props.config,
      conversationId:
        // initial eslint integration
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
        savedSessionData.conversationId || props.config.conversationId,
      // initial eslint integration
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      responses: savedSessionData.responses || props.config.responses,
    };
  }, [props.config, savedSessionData]);

  // Chat

  const chat = useChat(configWithSession);

  useEffect(() => {
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (props.storeIn) {
      saveSession(chat, props.storeIn);
    }
  }, [chat.responses, props.storeIn]);

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

  const inputRef = useRef(null);

  useEffect(() => {
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-optional-chain
    if (inputRef && inputRef.current) {
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
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handler = (ev: KeyboardEvent) => {
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

  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setBubble(true);
    }, 3000);

    const timeout2 = setTimeout(() => {
      setBubble(false);
    }, 20000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const node = messagesContainerRef.current;
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messagesContainerRef]);

  useEffect(() => {
    scrollToBottom();
  }, [chat.responses]);

  // Download

  const submit =
    chat.inputValue.replace(/ /gi, "") !== "" &&
    (() => {
      chat.conversationHandler.sendText(chat.inputValue);
      chat.setInputValue("");
    });

  const mergedTheme = useMemo(
    () => ({
      ...constants.defaultTheme,
      ...(props.theme ?? {}),
      windowInnerHeight: windowInnerHeightValue,
    }),
    [props.theme, windowInnerHeightValue],
  );

  return (
    <ConversationHandlerContext.Provider value={chat.conversationHandler}>
      <ThemeProvider theme={mergedTheme}>
        <>
          {/* initial eslint integration */}
          {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
          {props.bubble ? (
            <C.PinBubble
              isActive={!expanded && bubble}
              onClick={() => {
                setBubble(false);
              }}
              content={props.bubble}
            />
          ) : null}
          {expanded && (
            <C.Container>
              <C.Main ref={messagesContainerRef}>
                {/* initial eslint integration */}
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                {props.titleBar && (
                  <C.TitleBar>
                    {/* initial eslint integration */}
                    {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                    {props.titleBar.logo && (
                      <C.TitleIcon src={props.titleBar.logo} />
                    )}
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
                )}
                <MessageGroups
                  chat={chat}
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
                <C.Input
                  ref={inputRef}
                  value={chat.inputValue}
                  placeholder={props.inputPlaceholder ?? "Type something..."}
                  onChange={(event: any) => {
                    // initial eslint integration
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    chat.setInputValue(event.target.value);
                  }}
                  onKeyPress={(event: any) => {
                    // initial eslint integration
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    if (event.key === "Enter" && submit) {
                      submit();
                    }
                  }}
                />
                <C.BottomButtonsContainer>
                  <C.IconButton
                    // initial eslint integration
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    disabled={Boolean(!submit)}
                    onClick={() => {
                      // initial eslint integration
                      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                      if (submit) {
                        submit();
                      }
                    }}
                  >
                    <SendIcon />
                  </C.IconButton>
                </C.BottomButtonsContainer>
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
            ) : // initial eslint integration
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            props.chatIcon ? (
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
