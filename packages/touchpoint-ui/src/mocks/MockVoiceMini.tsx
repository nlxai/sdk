/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { ProviderStack } from "../ProviderStack";
import { LaunchButton } from "../components/ui/LaunchButton";
import { clsx } from "clsx";
import { IconButton } from "../components/ui/IconButton";
import { Close } from "../components/ui/Icons";
import { mockConversationHandler, mockTheme, responses } from "./shared";
import { type ColorMode } from "../interface";
import { VoiceMiniControls, voiceMiniPanelClass } from "../components/Layout";
import { VoiceModalities } from "../components/VoiceModalities";
import { defaultModalities } from "../components/defaultModalities";

export const MockVoiceMini: FC<{
  colorMode?: ColorMode;
  isExpanded: boolean;
  onClose: () => void;
  onExpand: () => void;
}> = (props) => {
  const colorMode = props.colorMode ?? "dark";
  const { isExpanded, onClose, onExpand } = props;

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
      className={clsx("fixed bottom-2 right-2 z-touchpoint")}
      theme={mockTheme}
      colorMode={colorMode}
      languageCode="en-US"
    >
      <VoiceMiniControls>
        <IconButton label="Close" Icon={Close} type="error" onClick={onClose} />
        <VoiceModalities
          className={clsx(
            voiceMiniPanelClass,
            "absolute right-0 -top-2 transform translate-x-0 -translate-y-full max-h-[360px] overflow-auto",
          )}
          responses={[
            ...responses,
            ...responses.map((res) => ({
              ...res,
              receivedAt: res.receivedAt + 10000000,
            })),
          ]}
          renderedAsOverlay={false}
          showTranscript={false}
          modalityComponents={defaultModalities}
          handler={mockConversationHandler}
        />
      </VoiceMiniControls>
    </ProviderStack>
  );
};
