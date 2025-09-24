/* eslint-disable no-console */
/* eslint-disable jsdoc/require-jsdoc */
import {
  type Context,
  type ConversationHandler,
  type VoiceHandler,
  type VoiceState,
  type ModalitiesWithContext,
  MissingAudioPermissionsError,
} from "@nlxai/core";

import { useEffect, useRef, useState } from "react";

// Voice

type VoiceRoomState =
  | "noAudioPermissions"
  | "pending"
  | "active"
  | "error"
  | "terminated";

interface VoiceHookReturn {
  roomState: VoiceRoomState;
  isUserSpeaking: boolean;
  isApplicationSpeaking: boolean;
  modalities: ModalitiesWithContext[];
  retry: () => Promise<void>;
}

interface VoiceHookParams {
  micEnabled: boolean;
  speakersEnabled: boolean;
  handler: ConversationHandler;
  context?: Context;
}

export const useVoice = ({
  handler,
  context,
  speakersEnabled,
  micEnabled,
}: VoiceHookParams): VoiceHookReturn => {
  const [roomState, setRoomState] = useState<VoiceRoomState>("pending");

  const [voiceState, setVoiceState] = useState<VoiceState>({
    isTerminated: false,
    isUserSpeaking: false,
    isApplicationSpeaking: false,
    modalities: [],
  });

  const voiceHandlerRef = useRef<VoiceHandler | null>(null);

  useEffect(() => {
    if (voiceHandlerRef.current != null) {
      return;
    }
    setRoomState("pending");
    handler
      .initiateVoiceConnection(context, (state: VoiceState) => {
        setVoiceState(state);
        if (state.isTerminated) setRoomState("terminated");
      })
      .then((vh) => {
        voiceHandlerRef.current = vh;
        setRoomState("active");
      })
      .catch((err) => {
        if (err instanceof MissingAudioPermissionsError) {
          setRoomState("noAudioPermissions");
          return;
        }
        console.error("Failed to initiate voice connection:", err);
        setRoomState("error");
      });
    return () => {
      void voiceHandlerRef.current?.disconnect();
    };
  }, [context, handler]);

  useEffect(() => {
    void voiceHandlerRef.current?.setMicrophone(micEnabled);
  }, [micEnabled]);

  useEffect(() => {
    void voiceHandlerRef.current?.setSpeakers(speakersEnabled);
  }, [speakersEnabled]);

  return {
    roomState,
    isUserSpeaking: voiceState.isUserSpeaking,
    isApplicationSpeaking: voiceState.isApplicationSpeaking,
    retry: voiceHandlerRef.current?.retry ?? (async () => {}),
    modalities: voiceState.modalities,
  };
};
