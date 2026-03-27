/* eslint-disable jsdoc/require-jsdoc */
import { type FC, useState } from "react";
import { ProviderStack } from "../ProviderStack";
import { LaunchButton } from "../components/ui/LaunchButton";
import { clsx } from "clsx";
import { Main, HeaderContainer, InputContainer } from "../components/Layout";
import { IconButton } from "../components/ui/IconButton";
import { Input } from "../components/Input";
import { Close } from "../components/ui/Icons";
import { Messages } from "../components/Messages";
import { mockConversationHandler, responses } from "./shared";
import { useFeedback } from "../feedback";
import { type WindowSize } from "../interface";

export const Mock1: FC<{ embedded: boolean }> = (props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
        colorMode={"dark"}
        languageCode="en-US"
      >
        <LaunchButton
          className="backdrop-blur-sm"
          onClick={() => {
            setIsExpanded(true);
          }}
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
      colorMode={"dark"}
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
            onClick={() => {
              setIsExpanded(false);
            }}
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
          colorMode="dark"
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
