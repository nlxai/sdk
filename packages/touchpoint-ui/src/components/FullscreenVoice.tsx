/* eslint-disable jsdoc/require-jsdoc */
import {
  useState,
  type Dispatch,
  type SetStateAction,
  type FC,
  ReactNode,
} from "react";
import { clsx } from "clsx";
import { type ConversationHandler } from "@nlxai/chat-core";
import { type ColorMode } from "../types";

import { FullscreenError } from "./FullscreenError";
import { Ripple } from "./Ripple";
import { Loader } from "./ui/Loader";
import { IconButton } from "./ui/IconButton";
import { TextButton } from "./ui/TextButton";
import {
  Touchpoint,
  ArrowForward,
  Mic,
  MicOff,
  Volume,
  VolumeOff,
  Play,
} from "./ui/Icons";
import { type SoundCheck, useVoice } from "../voice";

interface Props {
  colorMode: ColorMode;
  handler: ConversationHandler;
  className?: string;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const SoundCheckUi: FC<{ soundCheck: SoundCheck | null }> = ({
  soundCheck,
}) => {
  return (
    <div className="space-y-4 text-primary-80">
      <p>
        Get ready to join a voice experience. Please ensure your microphone and
        speakers are turned on and functioning.
      </p>
      {soundCheck != null ? (
        <>
          <div className="flex items-center gap-3 text-primary-80">
            <span
              className={clsx(
                "block w-10 h-10 p-1.5 flex-none",
                soundCheck.micAllowed ? "" : "text-error-primary",
              )}
            >
              {soundCheck.micAllowed ? <Mic /> : <MicOff />}
            </span>
            {soundCheck.micAllowed ? "enabled" : "disabled"}
          </div>
          <div className="flex items-center gap-3 text-primary-80">
            <span
              className={clsx(
                "block w-10 h-10 p-1.5 flex-none",
                soundCheck.micAllowed ? "" : "text-error-primary",
              )}
            >
              {soundCheck.micAllowed ? <Volume /> : <VolumeOff />}
            </span>
            {soundCheck.micAllowed ? "enabled" : "disabled"}
          </div>
          <IconButton
            label="Play"
            Icon={Play}
            onClick={() => {}}
            type="ghost"
          />
        </>
      ) : null}
    </div>
  );
};

const Container: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => (
  <div
    className={clsx(
      "relative flex flex-col items-center justify-center",
      className,
    )}
  >
    {children}
  </div>
);

export const FullscreenVoice: FC<Props> = ({
  handler,
  colorMode,
  className,
  active,
  setActive,
}) => {
  const [micEnabled, setMicEnabled] = useState<boolean>(true);

  const { roomState, soundCheck, isUserSpeaking, isApplicationSpeaking } =
    useVoice({
      active,
      micEnabled,
      speakersEnabled: true,
      handler,
    });

  if (!active) {
    return (
      <Container className={className}>
        <div className="p-4 h-full flex flex-col justify-between">
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
      </Container>
    );
  }

  if (roomState === "pending") {
    return (
      <Container className={className}>
        <Loader />
      </Container>
    );
  }

  if (roomState === "error") {
    return (
      <Container className={className}>
        <FullscreenError />
      </Container>
    );
  }

  return (
    <Container className={className}>
      <div className="rounded-full w-fit relative">
        <div
          className={clsx(
            "w-[128px] h-[128px] p-4 z-10 relative rounded-full",
            // This color imitates primary5 overlayed on the regular background, but it has to be solid
            colorMode === "dark"
              ? "bg-[rgb(40,41,47)]"
              : "bg-[rgb(175,175,175)]",
          )}
        >
          <Touchpoint className="w-full h-full text-primary-40" />
        </div>
        {isApplicationSpeaking ? <Ripple className="rounded-full" /> : null}
      </div>
      <div className="w-fit flex-none absolute bottom-4 left-1/2 transform -translate-x-1/2">
        {isUserSpeaking ? <Ripple className="rounded-inner" /> : null}
        <IconButton
          Icon={micEnabled ? Mic : MicOff}
          label="Voice"
          type={micEnabled ? "activated" : "ghost"}
          onClick={() => {
            setMicEnabled((prev) => !prev);
          }}
        />
      </div>
    </Container>
  );
};
