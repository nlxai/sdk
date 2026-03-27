/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { ProviderStack } from "../ProviderStack";
import { LaunchButton } from "../components/ui/LaunchButton";
import { clsx } from "clsx";
import { Main, HeaderContainer, InputContainer } from "../components/Layout";
import { IconButton } from "../components/ui/IconButton";
import { Input } from "../components/Input";
import { Close } from "../components/ui/Icons";
import { Messages } from "../components/Messages";
import { mockConversationHandler, responses, useEscapeKeyHandler } from "./shared";
import { useFeedback } from "../feedback";
import { type WindowSize, type ColorMode } from "../interface";

export const Mock2: FC<{
  embedded: boolean;
  colorMode?: ColorMode;
  isExpanded: boolean;
  onClose: () => void;
  onExpand: () => void;
}> = (props) => {
  const colorMode = props.colorMode ?? "dark";
  const { isExpanded, onClose, onExpand } = props;

  useEscapeKeyHandler(onClose);

  const [feedbackState, feedbackActions] = useFeedback(mockConversationHandler);

  const windowSize: WindowSize = "half";

  if (!isExpanded) {
    return (
      <ProviderStack
        className="fixed z-launch-button bottom-2 right-2 w-fit"
        theme={{
          fontFamily: "monospace",
          accent: "light-dark(purple, pink)",
        }}
        colorMode={colorMode}
        languageCode="en-US"
      >
        <LaunchButton
          className="backdrop-blur-sm"
          onClick={onExpand}
          label="Expand chat"
        />
      </ProviderStack>
    );
  }

  return (
    <ProviderStack
      className={clsx(
        "grid grid-cols-2 xl:grid-cols-[1fr_632px]",
        props.embedded ? "w-full h-full" : "fixed inset-0 z-touchpoint",
      )}
      theme={{
        fontFamily: "monospace",
        accent: "light-dark(purple, pink)",
      }}
      colorMode={colorMode}
      languageCode="en-US"
    >
      {windowSize === "half" ? (
        <div className="hidden md:block bg-overlay" />
      ) : null}
      <Main windowSize={windowSize}>
        <HeaderContainer leftColumn={windowSize === "half"}>
          <IconButton
            Icon={Close}
            label="Close"
            onClick={onClose}
            type="overlay"
          />
        </HeaderContainer>
        <Messages
          isWaiting={false}
          handler={mockConversationHandler}
          responses={responses}
          userMessageBubble={true}
          agentMessageBubble={true}
          chatMode={true}
          colorMode={colorMode}
          uploadedFiles={{}}
          lastApplicationResponseIndex={3}
          modalityComponents={{}}
          enabled={true}
          feedbackState={feedbackState}
          feedbackActions={feedbackActions}
          className={clsx(
            "grow",
            (windowSize as WindowSize) === "full"
              ? "w-full md:max-w-content md:mx-auto"
              : "",
          )}
        />
        <InputContainer windowSize={windowSize}>
          <Input
            enabled
            handler={mockConversationHandler}
            onFileUpload={() => {}}
          />
        </InputContainer>
      </Main>
    </ProviderStack>
  );
};
