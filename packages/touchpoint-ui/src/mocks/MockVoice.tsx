/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { clsx } from "clsx";

import { ProviderStack } from "../ProviderStack";
import { LaunchButton } from "../components/ui/LaunchButton";
import { Main, HeaderContainer } from "../components/Layout";
import { IconButton } from "../components/ui/IconButton";
import { Close, Mic } from "../components/ui/Icons";
import { mockConversationHandler, mockTheme, responses } from "./shared";
import { type WindowSize, type ColorMode } from "../interface";
import { VoiceIcon } from "../components/FullscreenVoice";
import { defaultModalities } from "../components/defaultModalities";
import { VoiceModalities } from "../components/VoiceModalities";
import { Ripple } from "../components/Ripple";

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
        </HeaderContainer>
        <div
          className={clsx(
            "grow flex flex-col",
            windowSize === "full" ? "w-full md:max-w-content md:mx-auto" : "",
          )}
        >
          <div className="relative grow">
            <div className="absolute inset-0 flex items-center justify-center">
              <VoiceIcon colorMode={colorMode} addRipple className="relative" />
            </div>
            <VoiceModalities
              responses={responses}
              modalityComponents={defaultModalities}
              renderedAsOverlay={true}
              handler={mockConversationHandler}
              showTranscript={true}
              className={clsx(
                "w-full",
                "absolute inset-0 overflow-auto p-2 md:p-3 space-y-4 z-10",
                "border-b border-solid border-primary-10",
              )}
            />
          </div>
          <div className="flex items-center justify-center py-4 flex-none">
            <div className="w-fit relative">
              <Ripple className="rounded-inner" />
              <IconButton
                Icon={Mic}
                label="Voice"
                type={"activated"}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </Main>
    </ProviderStack>
  );
};
