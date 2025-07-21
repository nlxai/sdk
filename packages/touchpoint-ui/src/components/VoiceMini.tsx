/* eslint-disable jsdoc/require-jsdoc */
import type { Context, ConversationHandler } from "@nlxai/chat-core";
import { type ReactNode, useState, type FC } from "react";
import { clsx } from "clsx";

import type { CustomModalityComponent } from "../types";
import { useVoice } from "../voice";
import { LoaderAnimation } from "./ui/Loader";
import { Ripple } from "./Ripple";
import { IconButton } from "./ui/IconButton";
import {
  Close,
  Mic,
  MicOff,
  Volume,
  VolumeOff,
  Restart,
  Undo,
} from "./ui/Icons";
import { TextButton } from "./ui/TextButton";
import { VoiceModalities } from "./FullscreenVoice";
import { ErrorMessage } from "./ErrorMessage";

const containerClass =
  "bg-background backdrop-blur text-primary-80 rounded-outer p-2 w-[calc(100vw-16px)] max-w-[360px] space-y-4";

const Container: FC<{
  children: ReactNode;
  onClose: () => void;
  renderCollapse: boolean;
}> = ({ children, renderCollapse, onClose }) => (
  <div className={containerClass}>
    {renderCollapse && (
      <div className="flex items-center justify-end">
        <IconButton onClick={onClose} Icon={Close} type="ghost" label="Close" />
      </div>
    )}
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

const VoiceModalitiesWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    className={clsx(
      containerClass,
      "absolute right-0 -top-2 transform -translate-y-full",
    )}
  >
    {children}
  </div>
);

export const VoiceMini: FC<{
  customModalities: Record<string, CustomModalityComponent<unknown>>;
  handler: ConversationHandler;
  renderCollapse: boolean;
  onClose: (event: Event) => void;
  context?: Context;
}> = ({ handler, context, onClose, customModalities, renderCollapse }) => {
  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const [speakersEnabled, setSpeakersEnabled] = useState<boolean>(true);

  const onCloseHandler = (): void => {
    onClose(new Event("close"));
  };

  const { roomState, isUserSpeaking, isApplicationSpeaking, retry, roomData } =
    useVoice({
      micEnabled,
      speakersEnabled,
      handler,
      context,
    });

  if (roomState === "error") {
    return (
      <Container renderCollapse={renderCollapse} onClose={onCloseHandler}>
        <ErrorMessage message="I couldn’t connect" />
        <TextButton
          type="ghost"
          label="Retry"
          Icon={Restart}
          onClick={() => {
            void retry();
          }}
        />
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
          Icon={micEnabled ? Mic : MicOff}
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
          onCloseHandler();
        }}
      />
      {roomData != null ? (
        <VoiceModalities
          Wrapper={VoiceModalitiesWrapper}
          roomData={roomData}
          customModalities={customModalities}
          handler={handler}
        />
      ) : null}
    </CompactContainer>
  );
};
