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
  ResponseType,
} from "@nlxai/core";
import type { ColorMode, CustomModalityComponent } from "../interface";

import { FullscreenError } from "./FullscreenError";
import { Ripple } from "./Ripple";
import { Loader } from "./ui/Loader";
import { IconButton } from "./ui/IconButton";
import { TextButton } from "./ui/TextButton";
import { Touchpoint, Mic, MicOff, Restart } from "./ui/Icons";
import { type VoiceHandler, type VoiceState, initiateVoice } from "../voice";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "./ErrorMessage";

interface Props {
  colorMode: ColorMode;
  handler: ConversationHandler;
  responses: Response[];
  speakersEnabled: boolean;
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

interface ModalityEntry {
  key: string;
  value: any;
  Component: CustomModalityComponent<unknown>;
}

export const VoiceModalities: FC<{
  className?: string;
  responses: Response[];
  modalityComponents: Record<string, CustomModalityComponent<unknown>>;
  renderedAsOverlay: boolean;
  showTranscript: boolean;
  handler: ConversationHandler;
}> = ({
  className,
  responses,
  renderedAsOverlay,
  modalityComponents,
  handler,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const customModalityComponents = responses
    .map((response) => {
      if (response.type !== ResponseType.Application) {
        return null;
      }
      const modalities = response.payload.modalities;
      if (modalities == null) {
        return null;
      }
      const entries: ModalityEntry[] = Object.entries(modalities)
        .map(([key, value]) => {
          const Component = modalityComponents[key];
          if (Component == null) {
            return null;
          }
          return { key, value, Component };
        })
        .filter((entry): entry is ModalityEntry => entry != null);
      if (entries.length === 0) {
        return null;
      }
      return (
        <div className="space-y-2 last:h-full" key={response.receivedAt}>
          {entries.map(({ key, value, Component }) => {
            return (
              <Component
                key={key}
                renderedAsOverlay={renderedAsOverlay}
                data={value}
                conversationHandler={handler}
                enabled={true}
              />
            );
          })}
        </div>
      );
    })
    .filter(Boolean);

  useEffect(() => {
    const container = containerRef.current;
    if (container == null) {
      return;
    }
    const lastChild = container.lastChild;
    if (lastChild instanceof HTMLElement) {
      lastChild.scrollIntoView({ behavior: "smooth" });
    }
  }, [customModalityComponents.length]);

  if (customModalityComponents.length === 0) {
    return null;
  }

  return (
    <div className={className} ref={containerRef}>
      <ErrorBoundary fallback={<ErrorMessage message="Something went wrong" />}>
        {customModalityComponents}
      </ErrorBoundary>
    </div>
  );
};

export const FullscreenVoice: FC<Props> = ({
  handler,
  speakersEnabled,
  responses,
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
        {voice.state?.isApplicationSpeaking ? (
          <Ripple className="rounded-full" />
        ) : null}
      </div>
      <VoiceModalities
        className="absolute p-4 top-0 left-0 right-0 bottom-[72px] z-10 space-y-2 max-h-full overflow-auto border-b border-solid border-primary-10"
        showTranscript={false}
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
