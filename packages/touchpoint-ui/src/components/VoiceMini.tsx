/* eslint-disable jsdoc/require-jsdoc */
import type { Context, ConversationHandler } from "@nlxai/chat-core";
import { type ReactNode, useState, type FC } from "react";
import { clsx } from "clsx";

import { useVoice } from "../voice";
import { LoaderAnimation } from "./ui/Loader";
import { Ripple } from "./Ripple";
import { IconButton } from "./ui/IconButton";
import { ArrowForward, Close, Mic, Volume, VolumeOff } from "./ui/Icons";
import { TextButton } from "./ui/TextButton";
import { SoundCheckUi } from "./FullscreenVoice";
import { ErrorMessage } from "./ErrorMessage";

const Container: FC<{ children: ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => (
  <div className="bg-background rounded-outer p-2 w-[calc(100%-16px)] max-w-[360px] space-y-4">
    <div className="flex items-center justify-end ">
      <IconButton onClick={onClose} Icon={Close} type="ghost" label="Close" />
    </div>
    {children}
  </div>
);

const CompactContainer: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      "bg-background rounded-outer p-2 w-fit flex items-center gap-2",
      className,
    )}
  >
    {children}
  </div>
);

const CloseButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      className="text-sm text-primary-60 hover:text-primary-80 text-center block w-full"
      onClick={onClick}
    >
      Close
    </button>
  );
};

export const VoiceMini: FC<{
  handler: ConversationHandler;
  onClose: () => void;
  context?: Context;
}> = ({ handler, context, onClose }) => {
  const [active, setActive] = useState<boolean>(false);

  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const [speakersEnabled, setSpeakersEnabled] = useState<boolean>(true);

  const { roomState, soundCheck, isUserSpeaking, isApplicationSpeaking } =
    useVoice({
      active,
      micEnabled,
      speakersEnabled,
      handler,
      context,
    });

  if (!active) {
    return (
      <Container onClose={onClose}>
        <SoundCheckUi soundCheck={soundCheck} />
        <TextButton
          type="main"
          label="I'm ready"
          Icon={ArrowForward}
          onClick={() => {
            setActive(true);
          }}
        />
      </Container>
    );
  }

  if (roomState === "error") {
    return (
      <Container onClose={onClose}>
        <ErrorMessage message="Something went wrong" />
        <CloseButton onClick={onClose} />
      </Container>
    );
  }

  if (roomState === "pending") {
    return (
      <CompactContainer className="relative">
        <IconButton
          Icon={Mic}
          label="Microphone"
          type="ghost"
          className="invisible"
        />
        <IconButton
          Icon={Volume}
          label="Speakers"
          type="ghost"
          className="invisible"
        />
        <IconButton
          Icon={Close}
          label="Close"
          type="ghost"
          className="invisible"
        />
        <span className="w-6 h-6 block text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoaderAnimation />
        </span>
      </CompactContainer>
    );
  }

  return (
    <CompactContainer>
      <div className="w-fit relative">
        {isUserSpeaking ? <Ripple className="rounded-inner" /> : null}
        <IconButton
          Icon={Mic}
          label="Microphone"
          type={micEnabled ? "activated" : "ghost"}
          onClick={() => {
            setMicEnabled((prev) => !prev);
          }}
        />
      </div>
      <div className="w-fit relative">
        {isApplicationSpeaking ? <Ripple className="rounded-inner" /> : null}
        <IconButton
          Icon={speakersEnabled ? Volume : VolumeOff}
          label="Speakers"
          type={speakersEnabled ? "activated" : "ghost"}
          onClick={() => {
            setSpeakersEnabled((prev) => !prev);
          }}
        />
      </div>
      <IconButton
        label="Close"
        Icon={Close}
        type="error"
        onClick={() => {
          setActive(false);
          onClose();
        }}
      />
    </CompactContainer>
  );
};
