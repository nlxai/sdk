/* eslint-disable jsdoc/require-jsdoc */
import { type FC, type Dispatch, type SetStateAction } from "react";
import { type ConversationHandler } from "@nlxai/chat-core";

import { ArrowForward, Escalate, Restart } from "./ui/Icons";
import { TextButton } from "./ui/TextButton";
import { type WindowSize } from "../types";
import { clsx } from "clsx";

interface ChatSettingsProps {
  onClose: () => void;
  handler: ConversationHandler;
  windowSize: WindowSize;
  setWindowSizeOverride: Dispatch<SetStateAction<WindowSize | null>>;
  className?: string;
}

export const ChatSettings: FC<ChatSettingsProps> = ({
  onClose,
  handler,
  windowSize,
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
          handler.reset({ clearResponses: true });
          handler.sendWelcomeIntent();
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
