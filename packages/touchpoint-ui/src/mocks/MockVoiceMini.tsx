/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { ProviderStack } from "../ProviderStack";
import { LaunchButton } from "../components/ui/LaunchButton";
import { clsx } from "clsx";
import { IconButton } from "../components/ui/IconButton";
import { Close } from "../components/ui/Icons";
import { mockConversationHandler, mockTheme, responses } from "./shared";
import { type ColorMode } from "../interface";
import { VoiceMiniControls } from "../components/Layout";

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
      className={clsx("fixed bottom-2 right-2")}
      theme={mockTheme}
      colorMode={colorMode}
      languageCode="en-US"
    >
      <VoiceMiniControls>
        <IconButton label="Close" Icon={Close} type="error" onClick={onClose} />
      </VoiceMiniControls>
    </ProviderStack>
  );
};
