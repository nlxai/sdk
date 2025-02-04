/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { type ConversationHandler } from "@nlxai/chat-core";

import { Escalate, Restart } from "./ui/Icons";
import { TextButton } from "./ui/TextButton";
import { clsx } from "clsx";

interface ChatSettingsProps {
  onClose: () => void;
  handler: ConversationHandler;
  className?: string;
}

export const ChatSettings: FC<ChatSettingsProps> = ({
  onClose,
  handler,
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
    </div>
  );
};
