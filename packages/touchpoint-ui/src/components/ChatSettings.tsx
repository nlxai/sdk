/* eslint-disable jsdoc/require-jsdoc */
import { type FC, type Dispatch, type SetStateAction } from "react";
import { type ConversationHandler } from "@nlxai/chat-core";

import { ArrowForward, Escalate, Restart } from "./ui/Icons";
import { TextButton } from "./ui/TextButton";
import { type ColorMode, type WindowSize } from "../types";
import { clsx } from "clsx";

interface ChatSettingsProps {
  onClose: () => void;
  handler: ConversationHandler;
  colorMode: ColorMode;
  windowSize: WindowSize;
  setColorModeOverride: Dispatch<SetStateAction<ColorMode | null>>;
  setWindowSizeOverride: Dispatch<SetStateAction<WindowSize | null>>;
  className?: string;
}

export const ChatSettings: FC<ChatSettingsProps> = ({
  onClose,
  handler,
  colorMode,
  windowSize,
  setColorModeOverride,
  setWindowSizeOverride,
  className,
}) => {
  return (
    <div
      className={clsx(
        "p-2 md:p-3 flex flex-col flex-grow justify-center gap-2",
        className,
      )}
    >
      <TextButton
        label="Restart conversation"
        Icon={Restart}
        type="ghost"
        onClick={() => {
          handler.reset();
          onClose();
        }}
      />
      <TextButton
        label="Talk to an agent"
        Icon={Escalate}
        type="ghost"
        onClick={() => {
          // TODO: avoid hard-coding default intent by exposing from the SDK
          handler.sendIntent("NLX.Escalation");
          onClose();
        }}
      />
      <div className="grid grid-cols-2 gap-2">
        <TextButton
          label="Dark mode"
          Icon={ArrowForward}
          type={colorMode === "dark" ? "main" : "ghost"}
          onClick={() => {
            setColorModeOverride("dark");
          }}
        />
        <TextButton
          label="Light mode"
          Icon={ArrowForward}
          type={colorMode === "light" ? "main" : "ghost"}
          onClick={() => {
            setColorModeOverride("light");
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TextButton
          label="Half width"
          Icon={ArrowForward}
          type={windowSize === "half" ? "main" : "ghost"}
          onClick={() => {
            setWindowSizeOverride("half");
          }}
        />
        <TextButton
          label="Full width"
          Icon={ArrowForward}
          type={windowSize === "full" ? "main" : "ghost"}
          onClick={() => {
            setWindowSizeOverride("full");
          }}
        />
      </div>
    </div>
  );
};
