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
import { marked } from "marked";

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
import { UserMessage } from "./Messages";

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
  showTranscript,
  modalityComponents,
  handler,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const displayElements = responses
    .map((response) => {
      const modalities =
        (response.type === ResponseType.Application
          ? response.payload.modalities
          : undefined) ?? {};
      const modalityEntries: ModalityEntry[] = Object.entries(modalities)
        .map(([key, value]) => {
          const Component = modalityComponents[key];
          if (Component == null) {
            return null;
          }
          return { key, value, Component };
        })
        .filter((entry): entry is ModalityEntry => entry != null);
      // If nothing is to be rendered, return an explicit `null` so rendering the container can be completely skipped as well
      if (!showTranscript && modalityEntries.length === 0) {
        return null;
      }
      return (
        <div className="space-y-2" key={response.receivedAt}>
          {showTranscript && response.type === ResponseType.Application
            ? response.payload.messages.map((message, messageIndex) => {
                return (
                  <div key={messageIndex} className="text-base">
                    <div
                      className={clsx("space-y-6 markdown")}
                      dangerouslySetInnerHTML={{
                        __html: marked(message.text, { async: false }),
                      }}
                    />
                  </div>
                );
              })
            : null}
          {showTranscript &&
          response.type === ResponseType.User &&
          response.payload.type === "text" ? (
            <UserMessage text={response.payload.text} bubble={false} />
          ) : null}
          {modalityEntries.map(({ key, value, Component }) => {
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
  }, [displayElements.length]);

  if (displayElements.length === 0) {
    return null;
  }

  return (
    <div className={className} ref={containerRef}>
      <ErrorBoundary fallback={<ErrorMessage message="Something went wrong" />}>
        {displayElements}
      </ErrorBoundary>
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
      <div className="rounded-full w-fit absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-0">
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
        {voice.state?.isApplicationSpeaking ? (
          <Ripple className="rounded-full" />
        ) : null}
      </div>
      <VoiceModalities
        className="p-2 md:p-3 w-full max-w-content mx-auto grow overflow-auto border-b border-solid boder-primary-10 z-10"
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
