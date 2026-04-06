/* eslint-disable jsdoc/require-jsdoc */
import { useState, type FC } from "react";
import { ProviderStack } from "../ProviderStack";
import { LaunchButton } from "../components/ui/LaunchButton";
import { clsx } from "clsx";
import { Main, HeaderContainer, InputContainer } from "../components/Layout";
import { IconButton } from "../components/ui/IconButton";
import { Input } from "../components/Input";
import { Close, Settings as SettingsIcon } from "../components/ui/Icons";
import { Messages } from "../components/Messages";
import { mockConversationHandler, mockTheme, responses } from "./shared";
import { useFeedback } from "../feedback";
import { type WindowSize, type ColorMode } from "../interface";
import { defaultModalities } from "../components/defaultModalities";
import { Settings } from "../components/Settings";

export const MockText: FC<{
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

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  if (!isExpanded) {
    return (
      <ProviderStack
        className="fixed z-launch-button bottom-2 right-2 w-fit"
        theme={mockTheme}
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
      theme={mockTheme}
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
          <IconButton
            Icon={SettingsIcon}
            label="Settings"
            onClick={() => {
              setSettingsOpen(true);
            }}
            type="overlay"
          />
        </HeaderContainer>
        {settingsOpen ? (
          <Settings
            reset={() => {}}
            className={clsx(
              windowSize === "full" ? "w-full md:max-w-content md:mx-auto" : "",
            )}
            onClose={() => {
              setSettingsOpen(false);
            }}
            handler={mockConversationHandler}
          />
        ) : (
          <>
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
              modalityComponents={defaultModalities}
              enabled={true}
              feedbackState={feedbackState}
              feedbackActions={feedbackActions}
              className={clsx(
                "grow",
                windowSize === "full"
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
          </>
        )}
      </Main>
    </ProviderStack>
  );
};
