/* eslint-disable jsdoc/require-jsdoc */
import { useState, type FC } from "react";
import { clsx } from "clsx";
import { type ConversationHandler } from "@nlxai/chat-core";

import { Ripple } from "./Ripple";
import { IconButton } from "./ui/IconButton";
import { Mic, Touchpoint } from "./ui/Icons";
import { useVoice } from "../voice";

export const FullscreenVoice: FC<{
  handler: ConversationHandler;
  className?: string;
}> = ({ handler, className }) => {
  const [active, setActive] = useState<boolean>(false);

  const { roomState, isUserSpeaking, isApplicationSpeaking } = useVoice({
    active,
    handler,
  });

  return (
    <div
      className={clsx(
        "relative flex flex-col items-center justify-center",
        className,
      )}
    >
      <div className="rounded-full w-fit relative">
        <div className="bg-[rgb(40,41,47)] w-[128px] h-[128px] p-4 z-10 relative rounded-full">
          <Touchpoint className="w-full h-full text-[rgb(134,135,138)]" />
        </div>
        {active && isApplicationSpeaking ? (
          <Ripple className="rounded-full" />
        ) : null}
      </div>
      <div className="w-fit flex-none absolute bottom-4 left-1/2 transform -translate-x-1/2">
        {active && isUserSpeaking ? <Ripple className="rounded-inner" /> : null}
        <IconButton
          Icon={Mic}
          label="Voice"
          type={
            active ? (roomState === "error" ? "error" : "activated") : "ghost"
          }
          onClick={() => {
            setActive((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};
