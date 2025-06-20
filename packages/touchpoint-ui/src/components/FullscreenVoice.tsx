/* eslint-disable jsdoc/require-jsdoc */
import {
  useState,
  type Dispatch,
  type SetStateAction,
  type FC,
  type ReactNode,
  useEffect,
} from "react";
import { clsx } from "clsx";
import type { Context, ConversationHandler } from "@nlxai/chat-core";
import type {
  ColorMode,
  InitializeConversation,
  CustomModalityComponent,
} from "../types";

import { FullscreenError } from "./FullscreenError";
import { Ripple } from "./Ripple";
import { Loader, LoaderAnimation } from "./ui/Loader";
import { IconButton } from "./ui/IconButton";
import { TextButton } from "./ui/TextButton";
import {
  Touchpoint,
  ArrowForward,
  Mic,
  MicOff,
  Volume,
  Restart,
  VolumeOff,
} from "./ui/Icons";
import {
  type SoundCheck,
  type ModalitiesWithContext,
  useVoice,
} from "../voice";

interface Props {
  colorMode: ColorMode;
  handler: ConversationHandler;
  speakersEnabled: boolean;
  brandIcon?: string;
  className?: string;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  context?: Context;
  initializeConversation: InitializeConversation;
  customModalities?: Record<string, CustomModalityComponent<unknown>>;
}

const SoundCheckDevices: FC<{ soundCheck: SoundCheck }> = ({ soundCheck }) => {
  return (
    <>
      <div className="flex items-center gap-2 text-primary-80">
        <span
          className={clsx(
            "block w-10 h-10 p-2 flex-none",
            soundCheck.micAllowed ? "" : "text-error-primary",
          )}
        >
          {soundCheck.micAllowed ? <Mic /> : <MicOff />}
        </span>
        <input
          className="px-3 py-2 rounded-inner bg-primary-5 w-full flex-grow text-primary-80"
          value={soundCheck.micNames[0]}
          placeholder="Mic not found"
          disabled
        />
      </div>
      <div className="flex items-center gap-2 text-primary-80">
        <span
          className={clsx(
            "block w-10 h-10 p-2 flex-none",
            soundCheck.speakerNames[0] != null ? "" : "text-error-primary",
          )}
        >
          {soundCheck.speakerNames[0] != null ? <Volume /> : <VolumeOff />}
        </span>
        <input
          className="px-3 py-2 rounded-inner bg-primary-5 w-full flex-grow text-primary-80"
          value={soundCheck.speakerNames[0]}
          placeholder="Speaker not found"
          disabled
        />
      </div>
    </>
  );
};

export const SoundCheckUi: FC<{
  soundCheck: SoundCheck | null;
}> = ({ soundCheck }) => {
  const [longerThanUsual, setLongerThanUsual] = useState<boolean>(false);

  const loading = soundCheck == null;

  useEffect(() => {
    if (!loading) {
      setLongerThanUsual(false);
      return;
    }
    const timeout = setTimeout(() => {
      setLongerThanUsual(true);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [loading, setLongerThanUsual]);

  return (
    <div className="space-y-4 text-primary-80">
      <p className="px-1">
        Get ready to join a voice experience. Please ensure your microphone and
        speakers are turned on and enabled on this page.
      </p>
      {soundCheck != null ? (
        <SoundCheckDevices soundCheck={soundCheck} />
      ) : longerThanUsual ? (
        <div className="flex gap-2 bg-primary-10 rounded-outer p-2">
          <span className="text-accent inline-block flex-none w-5 h-5">
            <LoaderAnimation />
          </span>
          <p className="text-base">
            I cannot access your microphone. Check your browser settings and
            refresh the page.
          </p>
        </div>
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
  active,
  setActive,
  initializeConversation,
  context,
  customModalities = {},
}) => {
  const [micEnabled, setMicEnabled] = useState<boolean>(true);

  const {
    roomState,
    soundCheck,
    isUserSpeaking,
    isApplicationSpeaking,
    retrySoundCheck,
    roomData,
  } = useVoice({
    active,
    micEnabled,
    speakersEnabled,
    handler,
    context,
  });

  if (!active) {
    return (
      <Container className={className}>
        <div className="p-4 h-full flex flex-col justify-between">
          <SoundCheckUi soundCheck={soundCheck} />
          {soundCheck != null ? (
            soundCheck.micAllowed ? (
              <TextButton
                type="main"
                label="I'm ready"
                Icon={ArrowForward}
                onClick={() => {
                  setActive(true);
                  // Might not be supported on the backend and is implemented inconsistently compared to voice mini
                  // TODO: look into improvements
                  initializeConversation(handler, context);
                }}
              />
            ) : (
              <TextButton
                type="ghost"
                label="Retry sound check"
                Icon={Restart}
                onClick={retrySoundCheck}
              />
            )
          ) : null}
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
