import { marked } from "marked";
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
import { CloseIcon, ChatIcon, AirplaneIcon, ErrorOutlineIcon } from "./icons";
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

const toStringWithLeadingZero = (n: number): string => {
  if (n < 10) {
    return `0${n}`;
  }
  return `${n}`;
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

const MessageGroups: FC<{
  chat: ChatHook;
  children?: ReactNode;
  customModalities: Record<string, CustomModalityComponent>;
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
                          // initial eslint integration
                          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                          return botMessage.selectedChoiceId
                            ? {
                                disabled: true,
                                selected:
                                  botMessage.selectedChoiceId ===
                                  choice.choiceId,
                              }
                            : {
                                onClick: () => {
                                  props.chat.conversationHandler.sendChoice(
                                    choice.choiceId,
                                  );
                                },
                              };
                        })()}
                        dangerouslySetInnerHTML={{
                          __html: marked(
                            choice.choiceText +
                              // initial eslint integration
                              // eslint-disable-next-line no-constant-condition
                              (false ? " asdf fadsfds  fdsa fdsa fdsa " : ""),
                          ),
                        }}
                      ></C.ChoiceButton>
                    ))}
                  </C.ChoicesContainer>
                )}
              </C.Message>
            ))}
            {/* initial eslint integration */}
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing */}
            {Object.entries(response.payload.modalities || {}).map(
              ([key, value]) => {
                const Component = props.customModalities[key];
                // initial eslint integration
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (Component) {
                  return <Component key={key} data={value} />;
                }
                return null;
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
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
    const data = JSON.parse(storage.getItem(storageKey) || "");
    const responses: Response[] | undefined = data?.responses;
    const conversationId: string | undefined = data?.conversationId;
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (responses) {
      let expirationTimestamp: number | undefined;
      responses.forEach((response) => {
        // initial eslint integration
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (response.type === "bot" && response.payload.expirationTimestamp) {
          expirationTimestamp = response.payload.expirationTimestamp;
        }
      });
      // initial eslint integration
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!expirationTimestamp || new Date().getTime() < expirationTimestamp) {
        return { responses, conversationId };
      } else {
        return { responses };
      }
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

  // initial eslint integration
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dateTimestamp = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${toStringWithLeadingZero(
      d.getMonth() + 1,
    )}-${toStringWithLeadingZero(d.getDate())}-${toStringWithLeadingZero(
      d.getHours(),
    )}:${toStringWithLeadingZero(d.getMinutes())}`;
  }, [chat.responses]);

  const mergedTheme = useMemo(
    () => ({
      ...constants.defaultTheme,
      // initial eslint integration
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
      ...(props.theme || {}),
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
                    <C.TitleContainer>
                      {/* initial eslint integration */}
                      {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                      {props.titleBar.logo && (
                        <C.TitleIcon src={props.titleBar.logo} />
                      )}
                      <C.Title>{props.titleBar.title}</C.Title>
                    </C.TitleContainer>
                  </C.TitleBar>
                )}
                <MessageGroups
                  chat={chat}
                  // initial eslint integration
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
                  customModalities={props.customModalities || {}}
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
                  // initial eslint integration
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
                  placeholder={props.inputPlaceholder || "Type something..."}
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
                    <AirplaneIcon />
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
            {expanded ? (
              <CloseIcon />
            // initial eslint integration
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            ) : props.chatIcon ? (
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
