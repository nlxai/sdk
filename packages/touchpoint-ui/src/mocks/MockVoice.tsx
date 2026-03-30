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
import { mockConversationHandler, responses } from "./shared";
import { useFeedback } from "../feedback";
import { type WindowSize, type ColorMode } from "../interface";
import { VoiceIcon } from "../components/FullscreenVoice";

export const MockVoice: FC<{
  embedded: boolean;
  colorMode?: ColorMode;
  isExpanded: boolean;
  onClose: () => void;
  onExpand: () => void;
  windowSize: WindowSize;
}> = (props) => {
  const colorMode = props.colorMode ?? "dark";
  const { isExpanded, onClose, onExpand, windowSize } = props;

  const [feedbackState, feedbackActions] = useFeedback(mockConversationHandler);

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
        <div className="grow">
          <VoiceIcon colorMode={colorMode} addRipple className="relative" />
        </div>
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
