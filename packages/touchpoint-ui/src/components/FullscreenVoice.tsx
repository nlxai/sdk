/* eslint-disable jsdoc/require-jsdoc */
import { useState, type FC, type ReactNode } from "react";
import { clsx } from "clsx";
import type { Context, ConversationHandler } from "@nlxai/chat-core";
import type {
  ColorMode,
  InitializeConversation,
  CustomModalityComponent,
} from "../types";

import { FullscreenError } from "./FullscreenError";
import { Ripple } from "./Ripple";
import { Loader } from "./ui/Loader";
import { IconButton } from "./ui/IconButton";
import { TextButton } from "./ui/TextButton";
import { Touchpoint, Mic, MicOff, Restart } from "./ui/Icons";
import { type ModalitiesWithContext, useVoice } from "../voice";

interface Props {
  colorMode: ColorMode;
  handler: ConversationHandler;
  speakersEnabled: boolean;
  brandIcon?: string;
  className?: string;
  context?: Context;
  initializeConversation: InitializeConversation;
  customModalities?: Record<string, CustomModalityComponent<unknown>>;
}

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

export const VoiceModalities: FC<{
  Wrapper?: FC<{ children: ReactNode }>;
  roomData: ModalitiesWithContext;
  customModalities: Record<string, CustomModalityComponent<unknown>>;
  handler: ConversationHandler;
}> = ({ Wrapper, roomData, customModalities, handler }) => {
  const modalityEntries = Object.entries(roomData.modalities);
  const customModalityComponents = modalityEntries
    .map(([key, value]) => {
      const Component = customModalities[key];
      if (Component != null) {
        return (
          <Component
            key={key}
            data={value}
            conversationHandler={handler}
            enabled={true}
          />
        );
      }
      return null;
    })
    .filter(Boolean);

  if (customModalityComponents.length > 0) {
    return Wrapper == null ? (
      customModalityComponents
    ) : (
      <Wrapper>{customModalityComponents}</Wrapper>
    );
  }
};

const VoiceModalitiesWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="absolute top-4 left-4 right-4">{children}</div>
);

export const FullscreenVoice: FC<Props> = ({
  handler,
  speakersEnabled,
  colorMode,
  brandIcon,
  className,
  context,
  customModalities = {},
}) => {
  const [micEnabled, setMicEnabled] = useState<boolean>(true);

  const { roomState, isUserSpeaking, isApplicationSpeaking, retry, roomData } =
    useVoice({
      micEnabled,
      speakersEnabled,
      handler,
      context,
    });

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
        <div className="w-full px-3 h-20 flex items-center">
          <TextButton
            type="ghost"
            label="Retry"
            Icon={Restart}
            onClick={() => {
              void retry();
            }}
          />
        </div>
      </Container>
    );
  }

  if (roomState === "terminated") {
    return (
      <Container className={className}>
        <div
          className={clsx(
            "flex-grow flex flex-col items-center justify-center gap-6 text-primary-80",
          )}
        >
          <Touchpoint className="w-20 h-20 text-primary-20" />
          <div className="text-center">
            <h3 className="text-xl mb-2">The conversation has ended</h3>
            <p>You can close this panel now or restart.</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className={className}>
      <div className="rounded-full w-fit relative">
        <div
          className={clsx(
            "w-[128px] h-[128px] p-4 z-10 relative rounded-full overflow-hidden bg-cover bg-center",
            // This color imitates primary5 overlayed on the regular background, but it has to be solid
            brandIcon != null
              ? ""
              : colorMode === "dark"
                ? "bg-[rgb(40,41,47)]"
                : "bg-[rgb(175,175,175)]",
          )}
          style={
            brandIcon != null ? { backgroundImage: `url(${brandIcon})` } : {}
          }
        >
          {brandIcon == null ? (
            <Touchpoint className="w-full h-full text-primary-40" />
          ) : null}
        </div>
        {isApplicationSpeaking ? <Ripple className="rounded-full" /> : null}
      </div>
      {roomData != null ? (
        <VoiceModalities
          Wrapper={VoiceModalitiesWrapper}
          roomData={roomData}
          customModalities={customModalities}
          handler={handler}
        />
      ) : null}
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
