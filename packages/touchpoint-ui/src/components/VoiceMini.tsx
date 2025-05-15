/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/chat-core";
import { type ReactNode, useState, type FC } from "react";

import { useVoice } from "../voice";
import { LoaderAnimation } from "./ui/Loader";
import { Ripple } from "./Ripple";
import { IconButton } from "./ui/IconButton";
import { ArrowForward, Mic, Volume } from "./ui/Icons";
import { TextButton } from "./ui/TextButton";
import { SoundCheckUi } from "./FullscreenVoice";
import { ErrorMessage } from "./ErrorMessage";

const Container: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-background rounded-outer p-2 max-w-[320px] space-y-4">
    {children}
  </div>
);

const CompactContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-background rounded-outer p-2 w-fit flex items-center gap-2">
    {children}
  </div>
);

export const VoiceMini: FC<{ handler: ConversationHandler }> = ({
  handler,
}) => {
  const [active, setActive] = useState<boolean>(false);

  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const [speakersEnabled, setSpeakersEnabled] = useState<boolean>(true);

  const { roomState, soundCheck, isUserSpeaking, isApplicationSpeaking } =
    useVoice({
      active,
      micEnabled,
      speakersEnabled,
      handler,
    });

  if (!active) {
    return (
      <Container>
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
      <Container>
        <ErrorMessage message="Something went wrong" />
      </Container>
    );
  }

  if (roomState === "pending") {
    return (
      <Container>
        <div className="flex items-center p-8">
          <span className="w-6 h-6 block text-accent">
            <LoaderAnimation />
          </span>
        </div>
      </Container>
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
          Icon={Volume}
          label="Speakers"
          type={speakersEnabled ? "activated" : "ghost"}
          onClick={() => {
            setSpeakersEnabled((prev) => !prev);
          }}
        />
      </div>
    </CompactContainer>
  );
};
