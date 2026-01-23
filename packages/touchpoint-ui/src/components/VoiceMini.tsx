/* eslint-disable jsdoc/require-jsdoc */
import {
  type Context,
  type ConversationHandler,
  type Response,
} from "@nlxai/core";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  type FC,
  type Dispatch,
  type SetStateAction,
} from "react";
import { clsx } from "clsx";

import type { CustomModalityComponent } from "../interface";
import { type VoiceHandler, type VoiceState, initiateVoice } from "../voice";
import { LoaderAnimation } from "./ui/Loader";
import { Ripple } from "./Ripple";
import { IconButton } from "./ui/IconButton";
import { Close, Mic, MicOff, Volume, VolumeOff, Restart } from "./ui/Icons";
import { TextButton } from "./ui/TextButton";
import { VoiceModalities } from "./FullscreenVoice";
import { ErrorMessage } from "./ErrorMessage";

const containerClass =
  "bg-background backdrop-blur-sm text-primary-80 rounded-outer p-2 w-[calc(100vw-16px)] max-w-[360px] space-y-4";

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

type WidgetVoiceState =
  | null
  | "loading"
  | { type: "error"; error: string }
  | { type: "success"; handler: VoiceHandler; state?: VoiceState };

const useWidgetVoiceState = (): [
  WidgetVoiceState,
  Dispatch<SetStateAction<WidgetVoiceState>>,
] => {
  const [voice, setVoice] = useState<WidgetVoiceState>(null);

  // Remember the last handler
  const currentVoiceHandler = useRef<null | VoiceHandler>(null);
  useEffect(() => {
    if (voice != null && voice !== "loading" && voice.type !== "error") {
      currentVoiceHandler.current = voice.handler;
    }
  }, [voice]);

  // Perform final cleanup when component is unmounted
  useEffect(() => {
    return () => {
      if (currentVoiceHandler.current != null) {
        void currentVoiceHandler.current.disconnect();
      }
    };
  }, []);

  return [voice, setVoice];
};

const VoiceMiniLoader: FC<{ brandIconView: ReactNode }> = ({
  brandIconView,
}) => {
  return (
    <CompactContainer className="relative">
      {brandIconView}
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
};

export const VoiceMini: FC<{
  modalityComponents: Record<string, CustomModalityComponent<unknown>>;
  showTranscript: boolean;
  responses: Response[];
  handler: ConversationHandler;
  brandIcon?: string;
  renderCollapse: boolean;
  onClose: (event: Event) => void;
  context?: Context;
}> = ({
  handler,
  context,
  showTranscript,
  onClose,
  modalityComponents,
  renderCollapse,
  responses,
  brandIcon,
}) => {
  const onCloseHandler = (): void => {
    onClose(new Event("close"));
  };

  const brandIconView =
    brandIcon != null ? (
      <img
        className="w-10 h-10 block flex-none object-contain object-center"
        src={brandIcon}
        role="presentation"
      />
    ) : null;

  const [voice, setVoice] = useWidgetVoiceState();

  useEffect(() => {
    const fn = async (): Promise<void> => {
      try {
        const voiceHandler = await initiateVoice(
          handler,
          context ?? {},
          (newVoiceState) => {
            setVoice((prev) =>
              prev === null || prev === "loading" || prev.type === "error"
                ? prev
                : { ...prev, state: newVoiceState },
            );
          },
        );
        setVoice({ type: "success", handler: voiceHandler });
      } catch (err) {
        setVoice({ type: "error", error: String(err) });
      }
    };
    void fn();
  }, [handler, setVoice, context]);

  const retry = async (): Promise<void> => {
    try {
      if (voice != null && voice !== "loading" && voice.type !== "error") {
        await voice.handler.disconnect();
      }
      setVoice(null);
      const voiceHandler = await initiateVoice(
        handler,
        context ?? {},
        (newVoiceState) => {
          setVoice((prev) =>
            prev === null || prev === "loading" || prev.type === "error"
              ? prev
              : { ...prev, state: newVoiceState },
          );
        },
      );
      setVoice({ type: "success", handler: voiceHandler });
    } catch (err) {
      setVoice({ type: "error", error: String(err) });
    }
  };

  if (voice == null || voice === "loading") {
    return <VoiceMiniLoader brandIconView={brandIconView} />;
  }

  if (voice.type === "error") {
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

  const micEnabled = voice.state?.isMicEnabled ?? true;
  const speakersEnabled = voice.state?.isSpeakersEnabled ?? true;

  return (
    <CompactContainer>
      {brandIconView}
      <div className="w-fit relative">
        {voice.state?.isUserSpeaking ? (
          <Ripple className="rounded-inner" />
        ) : null}
        <IconButton
          Icon={voice.state?.isMicEnabled ? Mic : MicOff}
          label="Microphone"
          type={voice.state?.isMicEnabled ? "activated" : "ghost"}
          onClick={() => {
            void voice.handler.setMicrophone(!micEnabled);
          }}
        />
      </div>
      <div className="w-fit relative">
        {voice.state?.isApplicationSpeaking ? (
          <Ripple className="rounded-inner" />
        ) : null}
        <IconButton
          Icon={speakersEnabled ? Volume : VolumeOff}
          label="Speakers"
          type={speakersEnabled ? "activated" : "ghost"}
          onClick={() => {
            void voice.handler.setSpeakers(!speakersEnabled);
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
      <VoiceModalities
        className={clsx(
          containerClass,
          "absolute right-0 -top-2 transform translate-x-0 -translate-y-full max-h-[360px] overflow-auto",
        )}
        responses={responses}
        renderedAsOverlay={false}
        showTranscript={showTranscript}
        modalityComponents={modalityComponents}
        handler={handler}
      />
    </CompactContainer>
  );
};
