/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { type ConversationHandler } from "@nlxai/core";

import { Escalate, Restart } from "./ui/Icons";
import { useCopy } from "../utils/useCopy";
import { TextButton } from "./ui/TextButton";
import { clsx } from "clsx";

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
        "p-2 md:p-3 flex flex-col grow justify-center gap-2",
        className,
      )}
    >
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
