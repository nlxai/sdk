/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { type ConversationHandler } from "@nlxai/core";

import { Escalate, Restart, ArrowLeft } from "./ui/Icons";
import { useCopy } from "../utils/useCopy";
import { TextButton } from "./ui/TextButton";
import { clsx } from "clsx";
import { IconButton } from "./ui/IconButton";

interface SettingsProps {
  onClose: () => void;
  reset: () => void;
  handler: ConversationHandler;
  className?: string;
}

export const Settings: FC<SettingsProps> = ({
  onClose,
  handler,
  reset,
  className,
}) => {
  const copy = useCopy();
  return (
    <div
      className={clsx(
        "p-2 md:p-3 flex flex-col relative grow justify-center gap-2",
        className,
      )}
    >
      <IconButton
        className="absolute! top-2 left-2 md:top-3 md:left-3"
        type="ghost"
        Icon={ArrowLeft}
        label="Settings"
        onClick={onClose}
      />
      <TextButton
        label={copy.restartConversationButtonLabel}
        Icon={Restart}
        type="ghost"
        onClick={reset}
      />
      <TextButton
        label={copy.escalationButtonLabel}
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
