/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { type ConversationHandler } from "../../../core/lib";

import { Escalate, Restart } from "./ui/Icons";
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
        onClick={reset}
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
