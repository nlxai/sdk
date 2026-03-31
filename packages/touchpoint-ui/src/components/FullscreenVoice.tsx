/* eslint-disable jsdoc/require-jsdoc */
import {
  useMemo,
  useState,
  useRef,
  useEffect,
  type FC,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { clsx } from "clsx";
import {
  type Context,
  type ConversationHandler,
  type Response,
} from "@nlxai/core";

import type { ColorMode, CustomModalityComponent } from "../interface";
import { FullscreenError } from "./FullscreenError";
import { Ripple } from "./Ripple";
import { Loader } from "./ui/Loader";
import { IconButton } from "./ui/IconButton";
import { TextButton } from "./ui/TextButton";
import { Touchpoint, Mic, MicOff, Restart } from "./ui/Icons";
import { type VoiceHandler, type VoiceState, initiateVoice } from "../voice";
import { VoiceModalities } from "./VoiceModalities";

interface Props {
  colorMode: ColorMode;
  handler: ConversationHandler;
  responses: Response[];
  speakersEnabled: boolean;
  showTranscript: boolean;
  brandIcon?: string;
  className?: string;
  context?: Context;
  modalityComponents: Record<string, CustomModalityComponent<unknown>>;
}

export type WidgetVoiceState =
  | null
  | "loading"
  | { type: "error"; error: string }
  | { type: "success"; handler: VoiceHandler; state?: VoiceState };

export const useWidgetVoiceState = (): [
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

export const VoiceIcon: FC<{
  brandIcon?: string;
  colorMode: ColorMode;
  addRipple: boolean;
  className?: string;
}> = ({ brandIcon, colorMode, addRipple, className }) => {
  return (
    <div className={clsx("rounded-full w-fit", className)}>
      <div
        className={clsx(
          "w-[128px] h-[128px] p-4 relative rounded-full overflow-hidden bg-cover bg-center",
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
      {addRipple ? <Ripple className="rounded-full z-[-1]" /> : null}
    </div>
  );
};

export const FullscreenVoice: FC<Props> = ({
  handler,
  speakersEnabled,
  responses,
  showTranscript,
  colorMode,
  brandIcon,
  className,
  context,
  modalityComponents,
}) => {
  const [micEnabled, setMicEnabled] = useState<boolean>(true);

  const [voice, setVoice] = useWidgetVoiceState();

  const setSpeakers = useMemo(() => {
    if (voice == null || voice === "loading" || voice.type === "error") {
      return null;
    }
    return voice.handler.setSpeakers;
  }, [voice]);

  useEffect(() => {
    if (setSpeakers != null) {
      void setSpeakers(speakersEnabled);
    }
  }, [setSpeakers, speakersEnabled]);

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
    return (
      <Container className={className}>
        <Loader />
      </Container>
    );
  }

  if (voice.type === "error") {
    return (
      <Container className={className}>
        <FullscreenError />
        <div className="w-full px-3 h-20 flex items-center max-w-content mx-auto">
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

  if (voice.state?.isTerminated) {
    return (
      <Container className={className}>
        <div
          className={clsx(
            "grow flex flex-col items-center justify-center gap-6 text-primary-80",
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
      <VoiceIcon
        brandIcon={brandIcon}
        colorMode={colorMode}
        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-[-1]"
        addRipple={voice.state?.isApplicationSpeaking ?? false}
      />
      <VoiceModalities
        className="p-2 md:p-3 w-full max-w-content mx-auto grow overflow-auto border-b border-solid boder-primary-10 space-y-2"
        showTranscript={showTranscript}
        responses={responses}
        renderedAsOverlay
        modalityComponents={modalityComponents}
        handler={handler}
      />
      <div className="w-fit flex-none absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-0">
        {voice.state?.isUserSpeaking ? (
          <Ripple className="rounded-inner" />
        ) : null}
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
