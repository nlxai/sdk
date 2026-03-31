/* eslint-disable jsdoc/require-jsdoc */
import {
  type Context,
  type ConversationHandler,
  type Response,
} from "@nlxai/core";
import { type ReactNode, useEffect, type FC } from "react";
import { clsx } from "clsx";

import type { CustomModalityComponent } from "../interface";
import { initiateVoice } from "../voice";
import { LoaderAnimation } from "./ui/Loader";
import { Ripple } from "./Ripple";
import { IconButton } from "./ui/IconButton";
import { Close, Mic, MicOff, Volume, VolumeOff, Restart } from "./ui/Icons";
import { TextButton } from "./ui/TextButton";
import { useWidgetVoiceState } from "./FullscreenVoice";
import { VoiceModalities } from "./VoiceModalities";
import { ErrorMessage } from "./ErrorMessage";
import {
  VoiceMiniControls,
  VoiceMiniPanel,
  voiceMiniPanelClass,
} from "./Layout";

const VoiceMiniLoader: FC<{ brandIconView: ReactNode }> = ({
  brandIconView,
}) => {
  return (
    <VoiceMiniControls className="relative">
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
    </VoiceMiniControls>
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
      <VoiceMiniPanel onClose={renderCollapse ? onCloseHandler : undefined}>
        <ErrorMessage message="I couldn’t connect" />
        <TextButton
          type="ghost"
          label="Retry"
          Icon={Restart}
          onClick={() => {
            void retry();
          }}
        />
      </VoiceMiniPanel>
    );
  }

  const micEnabled = voice.state?.isMicEnabled ?? true;
  const speakersEnabled = voice.state?.isSpeakersEnabled ?? true;

  return (
    <VoiceMiniControls>
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
          voiceMiniPanelClass,
          "absolute right-0 -top-2 transform translate-x-0 -translate-y-full max-h-[360px] overflow-auto",
        )}
        responses={responses}
        renderedAsOverlay={false}
        showTranscript={showTranscript}
        modalityComponents={modalityComponents}
        handler={handler}
      />
    </VoiceMiniControls>
  );
};
