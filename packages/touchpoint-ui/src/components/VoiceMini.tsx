/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/chat-core";
import { useState, type FC } from "react";

import { useVoice } from "../voice";
import { Ripple } from "./Ripple";
import { IconButton } from "./ui/IconButton";
import { ArrowForward, Mic, Volume } from "./ui/Icons";
import { TextButton } from "./ui/TextButton";
import { SoundCheckUi } from "./FullscreenVoice";

export const VoiceMini: FC<{ handler: ConversationHandler }> = ({
  handler,
}) => {
  const [active, setActive] = useState<boolean>(false);

  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const [speakersEnabled, setSpeakersEnabled] = useState<boolean>(true);

  const { roomState, soundCheck, isUserSpeaking, isApplicationSpeaking } =
    useVoice({
      active,
      micEnabled: true,
      handler,
    });

  return (
    <div className="bg-background rounded-outer p-2 flex items-center gap-2">
      {active ? (
        <>
          <div className="w-fit relative">
            {isUserSpeaking ? <Ripple className="rounded-inner" /> : null}
            <IconButton
              Icon={Mic}
              label="Microphone"
              type={
                roomState === "error"
                  ? "error"
                  : micEnabled
                    ? "activated"
                    : "ghost"
              }
              onClick={() => {
                setMicEnabled((prev) => !prev);
              }}
            />
          </div>
          <div className="w-fit relative">
            {isApplicationSpeaking ? (
              <Ripple className="rounded-inner" />
            ) : null}
            <IconButton
              Icon={Volume}
              label="Speakers"
              type={
                roomState === "error"
                  ? "error"
                  : speakersEnabled
                    ? "activated"
                    : "ghost"
              }
              onClick={() => {
                setSpeakersEnabled((prev) => !prev);
              }}
            />
          </div>
        </>
      ) : (
        <div className="max-w-[320px] space-y-4">
          <SoundCheckUi soundCheck={soundCheck} />
          <TextButton
            type="main"
            label="I'm ready"
            Icon={ArrowForward}
            onClick={() => {
              setActive(true);
            }}
          />
        </div>
      )}
    </div>
  );
};
